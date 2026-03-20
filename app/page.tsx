import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/landing/Hero'
import HowItWorks from '@/components/landing/HowItWorks'
import BeforeAfter from '@/components/landing/BeforeAfter'
import Benefits from '@/components/landing/Benefits'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <BeforeAfter />
        <Benefits />

        {/* Pricing teaser */}
        <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0d0d0d] text-center">
          <h2 className="text-3xl font-bold mb-4">
            Простые, <span className="text-[#C9A84C]">прозрачные цены</span>
          </h2>
          <p className="text-[#8A8A8A] mb-8 max-w-md mx-auto">
            Начните бесплатно, обновитесь при необходимости.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#D4AF37] text-black font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            Посмотреть тарифы <ArrowRight size={18} />
          </Link>
        </section>
      </main>
      <Footer />
    </div>
  )
}
