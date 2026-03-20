import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FloorPlan Studio - Premium Floor Plan Visualization',
  description: 'Transform standard floor plans into premium stylish visualizations',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#0a0a0a] text-white" style={{ fontFamily: 'Inter, system-ui, -apple-system, sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
