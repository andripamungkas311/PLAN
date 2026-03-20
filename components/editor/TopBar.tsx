'use client'

import Link from 'next/link'
import { RotateCcw, RotateCw, Save, Download } from 'lucide-react'
import { Button } from '@/components/ui'
import StepIndicator from './StepIndicator'

interface TopBarProps {
  onUndo?: () => void
  onRedo?: () => void
  onSave?: () => void
  onExport?: () => void
}

export default function TopBar({ onUndo, onRedo, onSave, onExport }: TopBarProps) {
  return (
    <header className="h-14 flex items-center justify-between px-4 border-b border-[rgba(201,168,76,0.2)] bg-[#0d0d0d] flex-shrink-0">
      {/* Left: Logo */}
      <Link href="/" className="flex items-center gap-2 mr-6">
        <div className="w-7 h-7 rounded-md bg-[#C9A84C] flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
            <rect x="2" y="2" width="9" height="9" stroke="black" strokeWidth="1.5"/>
            <rect x="13" y="2" width="9" height="5" stroke="black" strokeWidth="1.5"/>
            <rect x="2" y="13" width="5" height="9" stroke="black" strokeWidth="1.5"/>
            <rect x="9" y="13" width="13" height="9" stroke="black" strokeWidth="1.5"/>
          </svg>
        </div>
        <span className="font-bold text-[#E8D5A3] text-sm hidden sm:block">FloorPlan Studio</span>
      </Link>

      {/* Center: Steps */}
      <div className="flex-1 flex justify-center">
        <StepIndicator current={3} />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1.5">
        <Button variant="ghost" size="sm" onClick={onUndo} title="Отменить">
          <RotateCcw size={16} />
        </Button>
        <Button variant="ghost" size="sm" onClick={onRedo} title="Повторить">
          <RotateCw size={16} />
        </Button>
        <div className="w-px h-5 bg-[rgba(201,168,76,0.2)] mx-1" />
        <Button variant="secondary" size="sm" onClick={onSave}>
          <Save size={15} />
          <span className="hidden sm:block">Сохранить</span>
        </Button>
        <Button variant="primary" size="sm" onClick={onExport}>
          <Download size={15} />
          <span className="hidden sm:block">Экспорт</span>
        </Button>
      </div>
    </header>
  )
}
