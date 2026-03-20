import Link from 'next/link'
import { ArrowRight, Upload } from 'lucide-react'
import Button from '@/components/ui/Button'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A84C]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        <div className="inline-flex items-center gap-2 bg-[#111111] border border-[rgba(201,168,76,0.3)] rounded-full px-4 py-1.5 text-xs text-[#C9A84C] mb-8 font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
          Premium floor plan visualization tool
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight">
          Transform a standard floor plan
          <br />
          <span className="text-[#C9A84C]">into a stylish premium layout</span>
          <br />
          in a minute
        </h1>

        <p className="text-[#8A8A8A] text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
          Upload your floor plan, let AI recognize rooms and walls, then customize with our
          elegant editor. Export as high-resolution images ready for presentations.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/editor">
            <Button variant="primary" size="lg">
              <Upload size={18} />
              Upload Floor Plan
              <ArrowRight size={18} />
            </Button>
          </Link>
          <Link href="/editor">
            <Button variant="secondary" size="lg">
              Try Demo
            </Button>
          </Link>
        </div>

        <p className="mt-6 text-[#8A8A8A] text-xs">No registration required · Free to start</p>

        {/* Preview */}
        <div className="mt-16 relative mx-auto max-w-3xl">
          <div className="bg-[#111111] border border-[rgba(201,168,76,0.25)] rounded-2xl overflow-hidden shadow-2xl shadow-[#C9A84C]/5">
            <div className="flex items-center gap-1.5 px-4 py-3 border-b border-[rgba(201,168,76,0.15)]">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 text-[#8A8A8A] text-xs">FloorPlan Studio — Editor</span>
            </div>
            <div className="p-6 bg-[#0d0d0d] min-h-[320px] flex items-center justify-center">
              <svg viewBox="0 0 600 400" className="w-full max-w-xl" style={{ background: '#0d0d0d' }}>
                {/* Living Room */}
                <rect x="20" y="20" width="220" height="180" fill="none" stroke="#C9A84C" strokeWidth="1.5"/>
                <text x="90" y="95" fill="#C9A84C" fontSize="13" fontWeight="bold" fontFamily="Inter,sans-serif">Living Room</text>
                <text x="100" y="113" fill="#8A8A8A" fontSize="10" fontFamily="Inter,sans-serif">28.5 m²</text>
                {/* Kitchen */}
                <rect x="240" y="20" width="160" height="110" fill="none" stroke="#C9A84C" strokeWidth="1.5"/>
                <text x="285" y="68" fill="#C9A84C" fontSize="13" fontWeight="bold" fontFamily="Inter,sans-serif">Kitchen</text>
                <text x="298" y="84" fill="#8A8A8A" fontSize="10" fontFamily="Inter,sans-serif">12.0 m²</text>
                {/* Hallway */}
                <rect x="240" y="130" width="160" height="70" fill="none" stroke="#C9A84C" strokeWidth="1.5"/>
                <text x="282" y="162" fill="#C9A84C" fontSize="13" fontWeight="bold" fontFamily="Inter,sans-serif">Hallway</text>
                <text x="292" y="178" fill="#8A8A8A" fontSize="10" fontFamily="Inter,sans-serif">8.3 m²</text>
                {/* Bedroom 1 */}
                <rect x="20" y="200" width="180" height="160" fill="none" stroke="#C9A84C" strokeWidth="1.5"/>
                <text x="65" y="275" fill="#C9A84C" fontSize="13" fontWeight="bold" fontFamily="Inter,sans-serif">Bedroom 1</text>
                <text x="78" y="293" fill="#8A8A8A" fontSize="10" fontFamily="Inter,sans-serif">18.2 m²</text>
                {/* Bedroom 2 */}
                <rect x="200" y="200" width="140" height="130" fill="none" stroke="#C9A84C" strokeWidth="1.5"/>
                <text x="235" y="260" fill="#C9A84C" fontSize="13" fontWeight="bold" fontFamily="Inter,sans-serif">Bedroom 2</text>
                <text x="245" y="278" fill="#8A8A8A" fontSize="10" fontFamily="Inter,sans-serif">14.8 m²</text>
                {/* Bathroom */}
                <rect x="340" y="200" width="60" height="130" fill="none" stroke="#C9A84C" strokeWidth="1.5"/>
                <text x="345" y="258" fill="#C9A84C" fontSize="10" fontWeight="bold" fontFamily="Inter,sans-serif">Bath</text>
                <text x="344" y="272" fill="#8A8A8A" fontSize="9" fontFamily="Inter,sans-serif">5.5 m²</text>
                {/* Door markers */}
                <path d="M 130 200 Q 150 180 170 200" fill="none" stroke="#C9A84C" strokeWidth="1" strokeDasharray="3,2"/>
                <path d="M 240 100 Q 260 80 280 100" fill="none" stroke="#C9A84C" strokeWidth="1" strokeDasharray="3,2" transform="rotate(90,260,100)"/>
              </svg>
            </div>
          </div>
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[#8A8A8A] text-xs bg-[#111111] border border-[rgba(201,168,76,0.2)] px-4 py-1.5 rounded-full">
            Premium visualization preview
          </div>
        </div>
      </div>
    </section>
  )
}
