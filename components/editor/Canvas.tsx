'use client'

import { useState } from 'react'
import FloorPlanSVG from './FloorPlanSVG'

interface CanvasProps {
  activeTool?: string
}

export default function Canvas({ activeTool = 'select' }: CanvasProps) {
  const [zoom, setZoom] = useState(100)

  const cursorMap: Record<string, string> = {
    select: 'default',
    room: 'crosshair',
    wall: 'crosshair',
    text: 'text',
    zoomin: 'zoom-in',
    zoomout: 'zoom-out',
    pan: 'grab',
  }

  return (
    <div className="flex-1 flex flex-col bg-[#0a0a0a] overflow-hidden relative">
      {/* Canvas area */}
      <div
        className="flex-1 flex items-center justify-center overflow-auto p-8"
        style={{ cursor: cursorMap[activeTool] || 'default' }}
      >
        {/* Grid background */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#C9A84C 1px, transparent 1px), linear-gradient(90deg, #C9A84C 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}
        />

        {/* Floor plan canvas */}
        <div
          className="relative bg-[#111111] border border-[rgba(201,168,76,0.25)] rounded-lg shadow-2xl shadow-black/50"
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: 'center',
            width: '720px',
            height: '520px',
          }}
        >
          <FloorPlanSVG />
        </div>
      </div>

      {/* Zoom controls */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 bg-[#111111] border border-[rgba(201,168,76,0.2)] rounded-lg px-3 py-2">
        <button
          onClick={() => setZoom(z => Math.max(25, z - 10))}
          className="text-[#8A8A8A] hover:text-[#C9A84C] transition-colors"
        >
          −
        </button>
        <span className="text-[#E8D5A3] text-xs tabular-nums w-10 text-center font-medium">{zoom}%</span>
        <button
          onClick={() => setZoom(z => Math.min(200, z + 10))}
          className="text-[#8A8A8A] hover:text-[#C9A84C] transition-colors"
        >
          +
        </button>
      </div>

      {/* Status bar */}
      <div className="h-7 flex items-center px-4 gap-4 border-t border-[rgba(201,168,76,0.1)] bg-[#0d0d0d]">
        <span className="text-[#8A8A8A] text-xs">
          Инструмент: <span className="text-[#C9A84C] capitalize">{activeTool}</span>
        </span>
        <span className="text-[#8A8A8A] text-xs">
          Масштаб: <span className="text-[#C9A84C]">{zoom}%</span>
        </span>
        <span className="text-[#8A8A8A] text-xs ml-auto">
          6 комнат · 87.3 м² всего
        </span>
      </div>
    </div>
  )
}
