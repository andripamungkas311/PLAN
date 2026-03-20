'use client'

import { Move, Square, Minus, Type, ZoomIn, ZoomOut, Grid, LucideIcon } from 'lucide-react'

interface Tool {
  id: string
  icon: LucideIcon
  label: string
}

const tools: Tool[] = [
  { id: 'select', icon: Move, label: 'Select & Move' },
  { id: 'room', icon: Square, label: 'Draw Room' },
  { id: 'wall', icon: Minus, label: 'Add Wall' },
  { id: 'text', icon: Type, label: 'Add Text' },
  { id: 'zoomin', icon: ZoomIn, label: 'Zoom In' },
  { id: 'zoomout', icon: ZoomOut, label: 'Zoom Out' },
  { id: 'grid', icon: Grid, label: 'Toggle Grid' },
]

interface LeftSidebarProps {
  activeTool?: string
  onToolChange?: (tool: string) => void
}

export default function LeftSidebar({ activeTool = 'select', onToolChange }: LeftSidebarProps) {
  return (
    <aside className="w-14 flex flex-col items-center py-3 gap-1 border-r border-[rgba(201,168,76,0.15)] bg-[#0d0d0d] flex-shrink-0">
      {tools.map((tool) => (
        <button
          key={tool.id}
          title={tool.label}
          onClick={() => onToolChange?.(tool.id)}
          className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-150 group relative ${
            activeTool === tool.id
              ? 'bg-[rgba(201,168,76,0.15)] border border-[#C9A84C] text-[#C9A84C]'
              : 'text-[#8A8A8A] hover:bg-[#1a1a1a] hover:text-[#E8D5A3]'
          }`}
        >
          <tool.icon size={18} />
          {/* Tooltip */}
          <div className="absolute left-full ml-2 px-2 py-1 bg-[#1a1a1a] border border-[rgba(201,168,76,0.2)] rounded text-xs text-[#E8D5A3] whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50">
            {tool.label}
          </div>
        </button>
      ))}
    </aside>
  )
}
