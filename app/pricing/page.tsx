import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Check, Zap } from 'lucide-react'
import Link from 'next/link'

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out FloorPlan Studio.',
    features: [
      '3 projects per month',
      'Basic room recognition',
      'Standard export (PNG)',
      'Watermarked output',
      'Community support',
    ],
    cta: 'Get Started Free',
    href: '/editor',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: 'per month',
    description: 'For professionals who need premium output.',
    features: [
      'Unlimited projects',
      'Advanced AI recognition',
      'High-res export (PNG, SVG, PDF)',
      'No watermarks',
      'Custom style presets',
      'Priority support',
    ],
    cta: 'Start Pro Trial',
    href: '/editor',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Business',
    price: '$49',
    period: 'per month',
    description: 'For teams and agencies with high volume needs.',
    features: [
      'Everything in Pro',
      'Team collaboration',
      'API access',
      'White-label exports',
      'Custom branding',
      'Dedicated support',
      'SLA guarantee',
    ],
    cta: 'Contact Sales',
    href: '/editor',
    highlighted: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />
      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Simple, <span className="text-[#C9A84C]">transparent pricing</span>
            </h1>
            <p className="text-[#8A8A8A] text-lg max-w-xl mx-auto">
              No hidden fees. Cancel anytime. Start free, upgrade when you need more.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative rounded-xl p-6 border flex flex-col ${
                  plan.highlighted
                    ? 'bg-[#141414] border-[#C9A84C] shadow-lg shadow-[#C9A84C]/10'
                    : 'bg-[#111111] border-[rgba(201,168,76,0.2)]'
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#C9A84C] text-black text-xs font-bold px-3 py-1 rounded-full">
                    {plan.badge}
                  </div>
                )}

                <div className="mb-6">
                  <h2 className="text-xl font-bold text-white mb-1">{plan.name}</h2>
                  <p className="text-[#8A8A8A] text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold text-[#E8D5A3]">{plan.price}</span>
                    <span className="text-[#8A8A8A] text-sm">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check size={16} className="text-[#C9A84C] flex-shrink-0 mt-0.5" />
                      <span className="text-[#8A8A8A]">{f}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`w-full py-2.5 rounded-lg text-sm font-semibold text-center transition-all ${
                    plan.highlighted
                      ? 'bg-[#C9A84C] hover:bg-[#D4AF37] text-black'
                      : 'bg-[#1a1a1a] hover:bg-[#222] text-[#E8D5A3] border border-[rgba(201,168,76,0.3)] hover:border-[rgba(201,168,76,0.6)]'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* FAQ teaser */}
          <div className="mt-16 text-center">
            <p className="text-[#8A8A8A] text-sm">
              Have questions?{' '}
              <span className="text-[#C9A84C] cursor-pointer hover:underline">
                <Zap size={14} className="inline mb-0.5" /> Chat with us
              </span>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
