'use client'

import { useState } from 'react'

interface Room {
  name: string
  area: string
  color: string
}

const demoRooms: Room[] = [
  { name: 'Гостиная', area: '28.5', color: '#C9A84C' },
  { name: 'Кухня', area: '12.0', color: '#C9A84C' },
  { name: 'Спальня 1', area: '18.2', color: '#C9A84C' },
  { name: 'Спальня 2', area: '14.8', color: '#C9A84C' },
  { name: 'Ванная', area: '5.5', color: '#C9A84C' },
  { name: 'Коридор', area: '8.3', color: '#C9A84C' },
]

export default function RightPanel() {
  const [selected, setSelected] = useState<number | null>(0)
  const [editName, setEditName] = useState(demoRooms[0]?.name ?? '')

  const handleSelect = (idx: number) => {
    setSelected(idx)
    setEditName(demoRooms[idx]?.name ?? '')
  }

  return (
    <aside className="w-60 flex-shrink-0 border-l border-[rgba(201,168,76,0.15)] bg-[#0d0d0d] flex flex-col overflow-y-auto">
      {/* Rooms list */}
      <div className="p-4 border-b border-[rgba(201,168,76,0.1)]">
        <h3 className="text-[#8A8A8A] text-xs font-semibold uppercase tracking-wider mb-3">Комнаты</h3>
        <div className="space-y-1">
          {demoRooms.map((room, idx) => (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-all text-sm ${
                selected === idx
                  ? 'bg-[rgba(201,168,76,0.12)] border border-[rgba(201,168,76,0.35)] text-[#E8D5A3]'
                  : 'hover:bg-[#1a1a1a] text-[#8A8A8A] hover:text-[#E8D5A3] border border-transparent'
              }`}
            >
              <span className="truncate">{room.name}</span>
              <span className="text-xs text-[#8A8A8A] ml-2 flex-shrink-0">{room.area} m²</span>
            </button>
          ))}
        </div>
      </div>

      {/* Properties panel */}
      {selected !== null && (
        <div className="p-4">
          <h3 className="text-[#8A8A8A] text-xs font-semibold uppercase tracking-wider mb-4">Свойства</h3>

          <div className="space-y-4">
            <div>
              <label className="text-[#8A8A8A] text-xs block mb-1.5">Название комнаты</label>
              <input
                type="text"
                value={editName}
                onChange={e => setEditName(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-[rgba(201,168,76,0.2)] rounded-lg px-3 py-2 text-sm text-[#E8D5A3] focus:outline-none focus:border-[#C9A84C] transition-colors"
              />
            </div>

            <div>
              <label className="text-[#8A8A8A] text-xs block mb-1.5">Площадь (м²)</label>
              <input
                type="number"
                defaultValue={demoRooms[selected]?.area}
                className="w-full bg-[#1a1a1a] border border-[rgba(201,168,76,0.2)] rounded-lg px-3 py-2 text-sm text-[#E8D5A3] focus:outline-none focus:border-[#C9A84C] transition-colors"
              />
            </div>

            <div>
              <label className="text-[#8A8A8A] text-xs block mb-1.5">Цвет линии</label>
              <div className="flex gap-2">
                {['#C9A84C', '#D4AF37', '#E8D5A3', '#8A8A8A', '#ffffff'].map(c => (
                  <button
                    key={c}
                    className="w-6 h-6 rounded-full border-2 border-transparent hover:border-white transition-all"
                    style={{ background: c }}
                    title={c}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="text-[#8A8A8A] text-xs block mb-1.5">Прозрачность заливки</label>
              <input
                type="range"
                min="0"
                max="20"
                defaultValue="3"
                className="w-full accent-[#C9A84C]"
              />
            </div>

            <button className="w-full bg-[#C9A84C] hover:bg-[#D4AF37] text-black text-sm font-semibold py-2 rounded-lg transition-colors">
              Применить
            </button>
          </div>
        </div>
      )}

      {/* Style presets */}
      <div className="p-4 border-t border-[rgba(201,168,76,0.1)] mt-auto">
        <h3 className="text-[#8A8A8A] text-xs font-semibold uppercase tracking-wider mb-3">Стили</h3>
        <div className="grid grid-cols-3 gap-2">
          {[
            { name: 'Золото', bg: '#C9A84C' },
            { name: 'Серебро', bg: '#A0A0A0' },
            { name: 'Синий', bg: '#4A90D9' },
          ].map(preset => (
            <button
              key={preset.name}
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
