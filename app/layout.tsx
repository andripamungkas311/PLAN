import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FloorPlan Studio - Профессиональная визуализация планировок',
  description: 'Превратите стандартные планировки в стильные Premium-визуализации',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="bg-[#0a0a0a] text-white" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
