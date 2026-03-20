'use client'

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef } from 'react'

export interface RoomInfo {
  id: string
  name: string
  area: string
  color: string
}

export interface SelectedObjectProps {
  id: string
  name: string
  area: string
  fillColor: string
  opacity: number
  type: 'room' | 'wall' | 'text' | 'image' | 'other'
}

export interface CanvasAPI {
  undo(): void
  redo(): void
  exportPNG(): void
  exportSVG(): void
  saveProject(name: string): string
  loadProject(id: string): void
  loadImage(dataUrl: string): void
  updateSelectedObject(props: Partial<SelectedObjectProps>): void
  applyPreset(fillColor: string): void
  deleteSelected(): void
  setZoom(zoomPct: number): void
}

interface FabricCanvasProps {
  activeTool: string
  showGrid: boolean
  onSelectionChange: (props: SelectedObjectProps | null) => void
  onHistoryChange: (canUndo: boolean, canRedo: boolean) => void
  onZoomChange: (zoom: number) => void
  onRoomsChange: (rooms: RoomInfo[]) => void
  apiRef: React.MutableRefObject<CanvasAPI | null>
}

function hexToRgba(hex: string, opacity: number): string {
  const clean = hex.replace('#', '')
  const r = parseInt(clean.slice(0, 2), 16)
  const g = parseInt(clean.slice(2, 4), 16)
  const b = parseInt(clean.slice(4, 6), 16)
  return `rgba(${r},${g},${b},${opacity})`
}

const EXTRA_PROPS = ['data']

export default function FabricCanvas({
  activeTool,
  showGrid,
  onSelectionChange,
  onHistoryChange,
  onZoomChange,
  onRoomsChange,
  apiRef,
}: FabricCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasElRef = useRef<HTMLCanvasElement>(null)

  // Mutable refs that don't need to trigger re-renders
  const fcRef = useRef<any>(null)
  const fabricModRef = useRef<any>(null)
  const historyRef = useRef<string[]>([])
  const historyIdxRef = useRef<number>(-1)
  const isDrawingRef = useRef(false)
  const drawStartRef = useRef({ x: 0, y: 0 })
  const currentShapeRef = useRef<any>(null)
  const activeToolRef = useRef(activeTool)
  const zoomRef = useRef(1.0)
  const selectedObjRef = useRef<any>(null)

  // Keep tool ref in sync with prop
  useEffect(() => {
    activeToolRef.current = activeTool
    const fc = fcRef.current
    if (!fc) return
    if (activeTool === 'select') {
      fc.isDrawingMode = false
      fc.selection = true
      fc.defaultCursor = 'default'
      fc.hoverCursor = 'move'
    } else if (activeTool === 'room' || activeTool === 'wall') {
      fc.isDrawingMode = false
      fc.selection = false
      fc.defaultCursor = 'crosshair'
      fc.hoverCursor = 'crosshair'
    } else if (activeTool === 'text') {
      fc.isDrawingMode = false
      fc.selection = false
      fc.defaultCursor = 'text'
      fc.hoverCursor = 'text'
    } else if (activeTool === 'zoomin') {
      fc.isDrawingMode = false
      fc.selection = false
      fc.defaultCursor = 'zoom-in'
    } else if (activeTool === 'zoomout') {
      fc.isDrawingMode = false
      fc.selection = false
      fc.defaultCursor = 'zoom-out'
    }
  }, [activeTool])

  useEffect(() => {
    if (!canvasElRef.current || !containerRef.current) return

    const cleanups: Array<() => void> = []

    import('fabric').then((fab) => {
      fabricModRef.current = fab
      const { Canvas, Rect, Line, IText } = fab as any

      const container = containerRef.current!
      const el = canvasElRef.current!

      const { width, height } = container.getBoundingClientRect()

      const fc = new Canvas(el, {
        backgroundColor: '#111111',
        selection: true,
        preserveObjectStacking: true,
        width: width || 800,
        height: height || 600,
      })
      fcRef.current = fc

      // ── Helpers ──────────────────────────────────────────────

      const saveHistory = () => {
        const json = JSON.stringify(fc.toJSON(EXTRA_PROPS))
        const slice = historyRef.current.slice(0, historyIdxRef.current + 1)
        slice.push(json)
        if (slice.length > 50) slice.shift()
        historyRef.current = slice
        historyIdxRef.current = slice.length - 1
        onHistoryChange(historyIdxRef.current > 0, false)
      }

      const getRooms = (): RoomInfo[] =>
        fc.getObjects()
          .filter((o: any) => o.data?.type === 'room')
          .map((o: any) => ({
            id: o.data.id,
            name: o.data.name || 'Комната',
            area: o.data.area || '0',
            color: o.stroke || '#C9A84C',
          }))

      saveHistory()

      // ── Resize observer ──────────────────────────────────────

      const ro = new ResizeObserver(([entry]) => {
        const { width: w, height: h } = entry.contentRect
        if (w > 0 && h > 0) {
          fc.setDimensions({ width: w, height: h })
          fc.renderAll()
        }
      })
      ro.observe(container)
      cleanups.push(() => ro.disconnect())

      // ── Selection events ──────────────────────────────────────

      const notifySelection = (obj: any) => {
        selectedObjRef.current = obj
        if (!obj) { onSelectionChange(null); return }
        onSelectionChange({
          id: obj.data?.id || '',
          name: obj.data?.name ?? (obj.type === 'i-text' ? obj.text : ''),
          area: obj.data?.area ?? '',
          fillColor: obj.stroke || obj.fill || '#C9A84C',
          opacity: Math.round((obj.data?.opacityPct ?? 8)),
          type: obj.data?.type || (obj.type === 'i-text' ? 'text' : 'other'),
        })
      }

      fc.on('selection:created', (e: any) => notifySelection(e.selected?.[0]))
      fc.on('selection:updated', (e: any) => notifySelection(e.selected?.[0]))
      fc.on('selection:cleared', () => notifySelection(null))

      // ── Drawing mouse events ──────────────────────────────────

      fc.on('mouse:down', (opt: any) => {
        const tool = activeToolRef.current
        if (!['room', 'wall', 'text', 'zoomin', 'zoomout'].includes(tool)) return

        // Fabric.js v7: use scenePoint for canvas coordinates
        const pointer = opt.scenePoint ?? opt.pointer ?? { x: 0, y: 0 }

        if (tool === 'zoomin' || tool === 'zoomout') {
          const factor = tool === 'zoomin' ? 1.2 : 1 / 1.2
          const newZoom = Math.max(0.25, Math.min(4, zoomRef.current * factor))
          const vp = opt.viewportPoint ?? { x: opt.e?.offsetX ?? 0, y: opt.e?.offsetY ?? 0 }
          fc.zoomToPoint({ x: vp.x, y: vp.y }, newZoom)
          zoomRef.current = newZoom
          onZoomChange(Math.round(newZoom * 100))
          return
        }

        if (tool === 'text') {
          const itext = new IText('Текст', {
            left: pointer.x,
            top: pointer.y,
            fontSize: 16,
            fill: '#E8D5A3',
            fontFamily: 'Inter, sans-serif',
            data: { type: 'text', id: `text_${Date.now()}` },
          })
          fc.add(itext)
          fc.setActiveObject(itext)
          itext.enterEditing()
          fc.renderAll()
          saveHistory()
          return
        }

        isDrawingRef.current = true
        drawStartRef.current = { x: pointer.x, y: pointer.y }

        if (tool === 'room') {
          const rect = new Rect({
            left: pointer.x,
            top: pointer.y,
            width: 0,
            height: 0,
            fill: hexToRgba('#C9A84C', 0.08),
            stroke: '#C9A84C',
            strokeWidth: 2,
            rx: 2,
            ry: 2,
            selectable: false,
            data: {
              type: 'room',
              id: `room_${Date.now()}`,
              name: 'Комната',
              area: '0',
              opacityPct: 8,
            },
          })
          fc.add(rect)
          currentShapeRef.current = rect
        } else if (tool === 'wall') {
          const line = new Line(
            [pointer.x, pointer.y, pointer.x, pointer.y],
            {
              stroke: '#E8D5A3',
              strokeWidth: 3,
              selectable: false,
              strokeLineCap: 'round',
              data: { type: 'wall', id: `wall_${Date.now()}` },
            },
          )
          fc.add(line)
          currentShapeRef.current = line
        }
      })

      fc.on('mouse:move', (opt: any) => {
        if (!isDrawingRef.current || !currentShapeRef.current) return
        const pointer = opt.scenePoint ?? opt.pointer ?? { x: 0, y: 0 }
        const tool = activeToolRef.current
        if (tool === 'room') {
          const s = drawStartRef.current
          const w = pointer.x - s.x
          const h = pointer.y - s.y
          currentShapeRef.current.set({
            left: w < 0 ? pointer.x : s.x,
            top: h < 0 ? pointer.y : s.y,
            width: Math.abs(w),
            height: Math.abs(h),
          })
          fc.renderAll()
        } else if (tool === 'wall') {
          currentShapeRef.current.set({ x2: pointer.x, y2: pointer.y })
          fc.renderAll()
        }
      })

      fc.on('mouse:up', () => {
        if (!isDrawingRef.current) return
        isDrawingRef.current = false
        const shape = currentShapeRef.current
        currentShapeRef.current = null
        if (!shape) return
        const tool = activeToolRef.current

        if (tool === 'room') {
          if ((shape.width ?? 0) < 10 || (shape.height ?? 0) < 10) {
            fc.remove(shape)
            fc.renderAll()
            return
          }
          shape.set({ selectable: true })
          // Estimate area: assume 1 m² = 100×100 px
          const areaM2 = ((shape.width * shape.height) / 10000).toFixed(1)
          shape.data = { ...shape.data, area: areaM2 }

          // Add centered label
          const label = new IText(shape.data.name, {
            left: shape.left + shape.width / 2,
            top: shape.top + shape.height / 2,
            fontSize: 13,
            fill: '#E8D5A3',
            textAlign: 'center',
            fontFamily: 'Inter, sans-serif',
            originX: 'center',
            originY: 'center',
            selectable: true,
            editable: true,
            data: { type: 'roomlabel', parentId: shape.data.id },
          })
          fc.add(label)
          fc.setActiveObject(shape)
        } else if (tool === 'wall') {
          const dx = (shape.x2 ?? 0) - (shape.x1 ?? 0)
          const dy = (shape.y2 ?? 0) - (shape.y1 ?? 0)
          if (Math.sqrt(dx * dx + dy * dy) < 5) {
            fc.remove(shape)
            fc.renderAll()
            return
          }
          shape.set({ selectable: true })
        }

        saveHistory()
        onRoomsChange(getRooms())
        fc.renderAll()
      })

      // Mouse-wheel zoom
      fc.on('mouse:wheel', (opt: any) => {
        opt.e.preventDefault()
        opt.e.stopPropagation()
        const delta = opt.e.deltaY
        let newZoom = fc.getZoom() * (0.999 ** delta)
        newZoom = Math.max(0.25, Math.min(4, newZoom))
        const vp = opt.viewportPoint ?? { x: opt.e?.offsetX ?? 0, y: opt.e?.offsetY ?? 0 }
        fc.zoomToPoint({ x: vp.x, y: vp.y }, newZoom)
        zoomRef.current = newZoom
        onZoomChange(Math.round(newZoom * 100))
      })

      // Save history after object modified/moved
      fc.on('object:modified', () => {
        saveHistory()
        onRoomsChange(getRooms())
      })

      // ── Public API ────────────────────────────────────────────

      apiRef.current = {
        undo() {
          if (historyIdxRef.current <= 0) return
          historyIdxRef.current--
          fc.loadFromJSON(historyRef.current[historyIdxRef.current]).then(() => {
            fc.renderAll()
            onHistoryChange(
              historyIdxRef.current > 0,
              historyIdxRef.current < historyRef.current.length - 1,
            )
            onRoomsChange(getRooms())
          })
        },

        redo() {
          if (historyIdxRef.current >= historyRef.current.length - 1) return
          historyIdxRef.current++
          fc.loadFromJSON(historyRef.current[historyIdxRef.current]).then(() => {
            fc.renderAll()
            onHistoryChange(
              historyIdxRef.current > 0,
              historyIdxRef.current < historyRef.current.length - 1,
            )
            onRoomsChange(getRooms())
          })
        },

        exportPNG() {
          const dataUrl = fc.toDataURL({ format: 'png', multiplier: 2 })
          const a = document.createElement('a')
          a.href = dataUrl
          a.download = 'floor-plan.png'
          a.click()
        },

        exportSVG() {
          const svg = fc.toSVG()
          const blob = new Blob([svg], { type: 'image/svg+xml' })
          const url = URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.href = url
          a.download = 'floor-plan.svg'
          a.click()
          URL.revokeObjectURL(url)
        },

        saveProject(name: string) {
          const id = `project_${Date.now()}`
          const thumbnail = fc.toDataURL({ format: 'png', multiplier: 0.3 })
          const json = fc.toJSON(EXTRA_PROPS)
          const stored = JSON.parse(localStorage.getItem('fp_projects') || '{}')
          stored[id] = {
            id,
            name,
            json,
            thumbnail,
            date: new Date().toISOString(),
            rooms: getRooms().length,
          }
          localStorage.setItem('fp_projects', JSON.stringify(stored))
          return id
        },

        loadProject(id: string) {
          const stored = JSON.parse(localStorage.getItem('fp_projects') || '{}')
          const project = stored[id]
          if (!project) return
          fc.loadFromJSON(project.json).then(() => {
            fc.renderAll()
            saveHistory()
            onRoomsChange(getRooms())
          })
        },

        loadImage(dataUrl: string) {
          const { Image: FabricImage } = fabricModRef.current as any
          FabricImage.fromURL(dataUrl, { crossOrigin: 'anonymous' })
            .then((img: any) => {
              const cw = fc.getWidth()
              const ch = fc.getHeight()
              const scale =
                Math.min(cw / img.width, ch / img.height) * 0.9
              img.set({
                scaleX: scale,
                scaleY: scale,
                left: (cw - img.width * scale) / 2,
                top: (ch - img.height * scale) / 2,
                selectable: true,
                opacity: 0.7,
                data: { type: 'image', id: `img_${Date.now()}` },
              })
              fc.add(img)
              fc.sendObjectToBack(img)
              fc.renderAll()
              saveHistory()
            })
            .catch(() => {
              // Fallback via HTMLImageElement
              const htmlImg = new Image()
              htmlImg.onload = () => {
                const img = new FabricImage(htmlImg)
                const cw = fc.getWidth()
                const ch = fc.getHeight()
                const scale =
                  Math.min(cw / htmlImg.width, ch / htmlImg.height) * 0.9
                img.set({
                  scaleX: scale,
                  scaleY: scale,
                  left: (cw - htmlImg.width * scale) / 2,
                  top: (ch - htmlImg.height * scale) / 2,
                  selectable: true,
                  opacity: 0.7,
                  data: { type: 'image', id: `img_${Date.now()}` },
                })
                fc.add(img)
                fc.sendObjectToBack(img)
                fc.renderAll()
                saveHistory()
              }
              htmlImg.src = dataUrl
            })
        },

        updateSelectedObject(props) {
          const obj = selectedObjRef.current
          if (!obj) return
          if (!obj.data) obj.data = {}

          if (props.name !== undefined) {
            obj.data.name = props.name
            if (obj.type === 'i-text') obj.set({ text: props.name })
            // Update associated roomlabel
            fc.getObjects().forEach((o: any) => {
              if (o.data?.type === 'roomlabel' && o.data?.parentId === obj.data.id) {
                o.set({ text: props.name })
              }
            })
          }
          if (props.area !== undefined) {
            obj.data.area = props.area
          }
          if (props.fillColor !== undefined || props.opacity !== undefined) {
            const color = props.fillColor ?? obj.stroke ?? '#C9A84C'
            const pct = props.opacity ?? obj.data.opacityPct ?? 8
            obj.data.opacityPct = pct
            obj.set({
              stroke: color,
              fill: hexToRgba(color, pct / 100),
            })
          }

          fc.renderAll()
          saveHistory()
          onRoomsChange(getRooms())
        },

        applyPreset(color: string) {
          fc.getObjects().forEach((o: any) => {
            if (o.data?.type === 'room') {
              o.set({ stroke: color, fill: hexToRgba(color, 0.08) })
              if (!o.data) o.data = {}
              o.data.opacityPct = 8
            }
          })
          fc.renderAll()
          saveHistory()
        },

        deleteSelected() {
          const active = fc.getActiveObject()
          if (!active) return
          // Also remove associated roomlabel if deleting a room
          if (active.data?.type === 'room') {
            const labelId = active.data?.id
            fc.getObjects().forEach((o: any) => {
              if (o.data?.type === 'roomlabel' && o.data?.parentId === labelId) {
                fc.remove(o)
              }
            })
          }
          fc.remove(active)
          fc.discardActiveObject()
          fc.renderAll()
          saveHistory()
          onRoomsChange(getRooms())
        },

        setZoom(zoomPct: number) {
          const zoom = zoomPct / 100
          fc.setZoom(zoom)
          zoomRef.current = zoom
          fc.renderAll()
        },
      }
    })

    return () => {
      cleanups.forEach((fn) => fn())
      fcRef.current?.dispose()
      fcRef.current = null
      apiRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden">
      {showGrid && (
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(201,168,76,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.05) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      )}
      <canvas ref={canvasElRef} className="absolute inset-0" />
    </div>
  )
}
