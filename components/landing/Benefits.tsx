import { Zap, Shield, Star, Users } from 'lucide-react'
import Card from '@/components/ui/Card'

const benefits = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'AI-powered recognition processes your floor plan in under 10 seconds. No manual tracing required.',
  },
  {
    icon: Star,
    title: 'Premium Quality',
    description: 'Professional-grade output with crisp lines, elegant typography, and pixel-perfect proportions.',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description: 'Your files are processed securely and never stored permanently. Your data stays yours.',
  },
  {
    icon: Users,
    title: 'Team Ready',
    description: 'Share projects with your team, collaborate in real-time, and manage everything from a dashboard.',
  },
]

export default function Benefits() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Why <span className="text-[#C9A84C]">FloorPlan Studio</span>
          </h2>
          <p className="text-[#8A8A8A] max-w-xl mx-auto">
            Built for architects, real estate professionals, and interior designers who demand excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => (
            <Card key={b.title} hover>
              <div className="w-11 h-11 rounded-xl bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.25)] flex items-center justify-center mb-5">
                <b.icon size={20} className="text-[#C9A84C]" />
              </div>
              <h3 className="font-semibold text-white mb-2">{b.title}</h3>
              <p className="text-[#8A8A8A] text-sm leading-relaxed">{b.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
