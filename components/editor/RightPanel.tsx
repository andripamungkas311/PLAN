'use client'

import { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import type { SelectedObjectProps, RoomInfo } from './FabricCanvas'

interface RightPanelProps {
  selectedObject: SelectedObjectProps | null
  rooms: RoomInfo[]
  onUpdateObject: (props: Partial<SelectedObjectProps>) => void
  onApplyPreset: (color: string) => void
  onDeleteSelected: () => void
}

const COLORS = ['#C9A84C', '#D4AF37', '#E8D5A3', '#8A8A8A', '#ffffff']

export default function RightPanel({
  selectedObject,
  rooms,
  onUpdateObject,
  onApplyPreset,
  onDeleteSelected,
}: RightPanelProps) {
  const [editName, setEditName] = useState('')
  const [editArea, setEditArea] = useState('')
  const [editColor, setEditColor] = useState('#C9A84C')
  const [editOpacity, setEditOpacity] = useState(8)

  // Sync form when selection changes
  useEffect(() => {
    if (selectedObject) {
      setEditName(selectedObject.name ?? '')
      setEditArea(selectedObject.area ?? '')
      setEditColor(selectedObject.fillColor ?? '#C9A84C')
      setEditOpacity(selectedObject.opacity ?? 8)
    }
  }, [selectedObject])

  const handleApply = () => {
    onUpdateObject({
      name: editName,
      area: editArea,
      fillColor: editColor,
      opacity: editOpacity,
    })
  }

  return (
    <aside className="w-60 flex-shrink-0 border-l border-[rgba(201,168,76,0.15)] bg-[#0d0d0d] flex flex-col overflow-y-auto">
      {/* Rooms list */}
      <div className="p-4 border-b border-[rgba(201,168,76,0.1)]">
        <h3 className="text-[#8A8A8A] text-xs font-semibold uppercase tracking-wider mb-3">
          Комнаты
        </h3>
        {rooms.length === 0 ? (
          <p className="text-[#555] text-xs italic">
            Нарисуйте комнаты инструментом «Комната»
          </p>
        ) : (
          <div className="space-y-1">
            {rooms.map((room) => (
              <div
                key={room.id}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all text-sm ${
                  selectedObject?.id === room.id
                    ? 'bg-[rgba(201,168,76,0.12)] border border-[rgba(201,168,76,0.35)] text-[#E8D5A3]'
                    : 'text-[#8A8A8A] border border-transparent'
                }`}
              >
                <span className="truncate">{room.name}</span>
                <span className="text-xs text-[#8A8A8A] ml-2 flex-shrink-0">
                  {room.area} м²
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Properties panel */}
      {selectedObject && selectedObject.type !== 'image' && (
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[#8A8A8A] text-xs font-semibold uppercase tracking-wider">
              Свойства
            </h3>
            <button
              onClick={onDeleteSelected}
              title="Удалить"
              className="text-[#555] hover:text-red-400 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-[#8A8A8A] text-xs block mb-1.5">Название</label>
              <input
                type="text"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[rgba(201,168,76,0.2)] rounded-lg px-3 py-2 text-sm text-[#E8D5A3] focus:outline-none focus:border-[#C9A84C] transition-colors"
              />
            </div>

            {selectedObject.type === 'room' && (
              <div>
                <label className="text-[#8A8A8A] text-xs block mb-1.5">Площадь (м²)</label>
                <input
                  type="number"
                  value={editArea}
                  onChange={(e) => setEditArea(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-[rgba(201,168,76,0.2)] rounded-lg px-3 py-2 text-sm text-[#E8D5A3] focus:outline-none focus:border-[#C9A84C] transition-colors"
                />
              </div>
            )}

            {(selectedObject.type === 'room' || selectedObject.type === 'wall') && (
              <>
                <div>
                  <label className="text-[#8A8A8A] text-xs block mb-1.5">Цвет</label>
                  <div className="flex gap-2 flex-wrap">
                    {COLORS.map((c) => (
                      <button
                        key={c}
                        onClick={() => setEditColor(c)}
                        className={`w-6 h-6 rounded-full border-2 transition-all ${
                          editColor === c
                            ? 'border-white scale-110'
                            : 'border-transparent hover:border-[#8A8A8A]'
                        }`}
                        style={{ background: c }}
                        title={c}
                      />
                    ))}
                  </div>
                </div>

                {selectedObject.type === 'room' && (
                  <div>
                    <label className="text-[#8A8A8A] text-xs block mb-1.5">
                      Прозрачность: {editOpacity}%
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="40"
                      value={editOpacity}
                      onChange={(e) => setEditOpacity(Number(e.target.value))}
                      className="w-full accent-[#C9A84C]"
                    />
                  </div>
                )}
              </>
            )}

            <button
              onClick={handleApply}
              className="w-full bg-[#C9A84C] hover:bg-[#D4AF37] text-black text-sm font-semibold py-2 rounded-lg transition-colors"
            >
              Применить
            </button>
          </div>
        </div>
      )}

      {/* Style presets */}
      <div className="p-4 border-t border-[rgba(201,168,76,0.1)] mt-auto">
        <h3 className="text-[#8A8A8A] text-xs font-semibold uppercase tracking-wider mb-3">
          Стили (применить ко всем)
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {[
            { name: 'Золото', bg: '#C9A84C' },
            { name: 'Серебро', bg: '#A0A0A0' },
            { name: 'Синий', bg: '#4A90D9' },
          ].map((preset) => (
            <button
              key={preset.name}
              onClick={() => onApplyPreset(preset.bg)}
              className="flex flex-col items-center gap-1 p-2 rounded-lg border border-[rgba(201,168,76,0.15)] hover:border-[rgba(201,168,76,0.4)] transition-all"
            >
              <div className="w-6 h-6 rounded" style={{ background: preset.bg }} />
              <span className="text-[#8A8A8A] text-[10px]">{preset.name}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
