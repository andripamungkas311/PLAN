'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[rgba(201,168,76,0.15)] bg-[#0a0a0a]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#C9A84C] flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                <rect x="2" y="2" width="9" height="9" stroke="black" strokeWidth="1.5"/>
                <rect x="13" y="2" width="9" height="5" stroke="black" strokeWidth="1.5"/>
                <rect x="2" y="13" width="5" height="9" stroke="black" strokeWidth="1.5"/>
                <rect x="9" y="13" width="13" height="9" stroke="black" strokeWidth="1.5"/>
              </svg>
            </div>
            <span className="font-bold text-lg text-[#E8D5A3] tracking-tight">FloorPlan Studio</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/editor" className="text-sm text-[#8A8A8A] hover:text-[#E8D5A3] transition-colors">Редактор</Link>
            <Link href="/pricing" className="text-sm text-[#8A8A8A] hover:text-[#E8D5A3] transition-colors">Тарифы</Link>
            <Link href="/dashboard" className="text-sm text-[#8A8A8A] hover:text-[#E8D5A3] transition-colors">Дашборд</Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" size="sm">Войти</Button>
            <Button variant="primary" size="sm">
              <Link href="/editor">Попробовать бесплатно</Link>
            </Button>
          </div>

          <button
            className="md:hidden text-[#8A8A8A] hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-[#111111] border-t border-[rgba(201,168,76,0.15)] px-4 py-4 flex flex-col gap-3">
          <Link href="/editor" className="text-sm text-[#8A8A8A] hover:text-[#E8D5A3] py-2">Редактор</Link>
          <Link href="/pricing" className="text-sm text-[#8A8A8A] hover:text-[#E8D5A3] py-2">Тарифы</Link>
          <Link href="/dashboard" className="text-sm text-[#8A8A8A] hover:text-[#E8D5A3] py-2">Дашборд</Link>
          <Button variant="primary" size="sm" className="mt-2">
            <Link href="/editor">Попробовать бесплатно</Link>
          </Button>
        </div>
      )}
    </header>
  )
}
