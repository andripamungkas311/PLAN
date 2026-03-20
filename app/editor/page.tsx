'use client'

import { useState, useRef } from 'react'
import { TopBar, LeftSidebar, RightPanel } from '@/components/editor'
import FabricCanvas, {
  type CanvasAPI,
  type SelectedObjectProps,
  type RoomInfo,
} from '@/components/editor/FabricCanvas'
import UploadArea from '@/components/editor/UploadArea'

export default function EditorPage() {
  const [activeTool, setActiveTool] = useState('select')
  const [showGrid, setShowGrid] = useState(true)
  const [zoom, setZoom] = useState(100)
  const [canUndo, setCanUndo] = useState(false)
  const [canRedo, setCanRedo] = useState(false)
  const [selectedObject, setSelectedObject] = useState<SelectedObjectProps | null>(null)
  const [rooms, setRooms] = useState<RoomInfo[]>([])
  const [projectName] = useState('Новый проект')
  const [hasContent, setHasContent] = useState(false)
  const [savedMsg, setSavedMsg] = useState(false)
  const [showExportMenu, setShowExportMenu] = useState(false)

  const apiRef = useRef<CanvasAPI | null>(null)

  const handleToolChange = (tool: string) => {
    if (tool === 'grid') {
      setShowGrid((v) => !v)
    } else {
      setActiveTool(tool)
    }
  }

  const handleUndo = () => apiRef.current?.undo()
  const handleRedo = () => apiRef.current?.redo()

  const handleSave = () => {
    apiRef.current?.saveProject(projectName)
    setSavedMsg(true)
    setTimeout(() => setSavedMsg(false), 2000)
  }

  const handleExportPNG = () => {
    apiRef.current?.exportPNG()
    setShowExportMenu(false)
  }

  const handleExportSVG = () => {
    apiRef.current?.exportSVG()
    setShowExportMenu(false)
  }

  const handleFileUpload = (dataUrl: string) => {
    setHasContent(true)
    setTimeout(() => apiRef.current?.loadImage(dataUrl), 150)
  }

  const handleUpdateObject = (props: Partial<SelectedObjectProps>) => {
    apiRef.current?.updateSelectedObject(props)
  }

  const handleApplyPreset = (color: string) => {
    apiRef.current?.applyPreset(color)
  }

  const handleDeleteSelected = () => {
    apiRef.current?.deleteSelected()
  }

  const handleZoomChange = (delta: number) => {
    const next = Math.max(25, Math.min(400, zoom + delta))
    setZoom(next)
    apiRef.current?.setZoom(next)
  }

  return (
    <div className="h-screen flex flex-col bg-[#0a0a0a] overflow-hidden">
      <TopBar
        canUndo={canUndo}
        canRedo={canRedo}
        savedMsg={savedMsg}
        onUndo={handleUndo}
        onRedo={handleRedo}
        onSave={handleSave}
        showExportMenu={showExportMenu}
        onToggleExportMenu={() => setShowExportMenu((v) => !v)}
        onExportPNG={handleExportPNG}
        onExportSVG={handleExportSVG}
      />

      {!hasContent ? (
        <div className="flex-1 flex items-center justify-center">
          <UploadArea
            onUpload={handleFileUpload}
            onStartEmpty={() => setHasContent(true)}
          />
        </div>
      ) : (
        <div className="flex flex-1 overflow-hidden">
          <LeftSidebar
            activeTool={activeTool}
            showGrid={showGrid}
            onToolChange={handleToolChange}
          />

          {/* Canvas area */}
          <div className="flex-1 flex flex-col overflow-hidden relative">
            <FabricCanvas
              activeTool={activeTool}
              showGrid={showGrid}
              onSelectionChange={setSelectedObject}
              onHistoryChange={(u, r) => { setCanUndo(u); setCanRedo(r) }}
              onZoomChange={setZoom}
              onRoomsChange={setRooms}
              apiRef={apiRef}
            />

            {/* Zoom controls */}
            <div className="absolute bottom-11 right-4 flex items-center gap-2 bg-[#111111] border border-[rgba(201,168,76,0.2)] rounded-lg px-3 py-2 z-10">
              <button
                onClick={() => handleZoomChange(-10)}
                className="text-[#8A8A8A] hover:text-[#C9A84C] transition-colors w-5 text-center"
              >
                −
              </button>
              <span className="text-[#E8D5A3] text-xs tabular-nums w-10 text-center font-medium">
                {zoom}%
              </span>
              <button
                onClick={() => handleZoomChange(10)}
                className="text-[#8A8A8A] hover:text-[#C9A84C] transition-colors w-5 text-center"
              >
                +
              </button>
            </div>

            {/* Status bar */}
            <div className="h-7 flex items-center px-4 gap-4 border-t border-[rgba(201,168,76,0.1)] bg-[#0d0d0d] flex-shrink-0">
              <span className="text-[#8A8A8A] text-xs">
                Инструмент:{' '}
                <span className="text-[#C9A84C] capitalize">{activeTool}</span>
              </span>
              <span className="text-[#8A8A8A] text-xs">
                Масштаб: <span className="text-[#C9A84C]">{zoom}%</span>
              </span>
              <span className="text-[#8A8A8A] text-xs ml-auto">
                {rooms.length} комнат
              </span>
            </div>
          </div>

          <RightPanel
            selectedObject={selectedObject}
            rooms={rooms}
            onUpdateObject={handleUpdateObject}
            onApplyPreset={handleApplyPreset}
            onDeleteSelected={handleDeleteSelected}
          />
        </div>
      )}
    </div>
  )
}
