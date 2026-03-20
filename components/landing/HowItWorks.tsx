import { Upload, Eye, Edit, Download } from 'lucide-react'

const steps = [
  {
    icon: Upload,
    step: '01',
    title: 'Upload',
    description: 'Upload any floor plan image — photos, PDFs, scans, or sketches.',
  },
  {
    icon: Eye,
    step: '02',
    title: 'Recognize',
    description: 'AI automatically detects rooms, walls, doors, and windows.',
  },
  {
    icon: Edit,
    step: '03',
    title: 'Edit',
    description: 'Customize labels, colors, room names, and furniture with our editor.',
  },
  {
    icon: Download,
    step: '04',
    title: 'Export',
    description: 'Export as high-resolution PNG, SVG, or PDF ready for use.',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How it <span className="text-[#C9A84C]">works</span>
          </h2>
          <p className="text-[#8A8A8A] max-w-xl mx-auto">
            Four simple steps to turn any floor plan into a premium presentation-ready visualization.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[rgba(201,168,76,0.3)] to-transparent" />

          {steps.map((s) => (
            <div key={s.step} className="relative bg-[#111111] border border-[rgba(201,168,76,0.2)] rounded-xl p-6 hover:border-[rgba(201,168,76,0.5)] transition-all duration-200 group">
              <div className="w-12 h-12 rounded-xl bg-[#1a1a1a] border border-[rgba(201,168,76,0.3)] flex items-center justify-center mb-5 group-hover:border-[#C9A84C] group-hover:bg-[rgba(201,168,76,0.1)] transition-all">
                <s.icon size={22} className="text-[#C9A84C]" />
              </div>
              <div className="absolute top-4 right-5 text-[#8A8A8A]/30 font-bold text-3xl tabular-nums">{s.step}</div>
              <h3 className="font-semibold text-white mb-2 text-lg">{s.title}</h3>
              <p className="text-[#8A8A8A] text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
