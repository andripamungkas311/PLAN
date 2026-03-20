import { Zap, Shield, Star, Users } from 'lucide-react'
import { Card } from '@/components/ui'

const benefits = [
  {
    icon: Zap,
    title: 'Молниеносная скорость',
    description: 'ИИ-распознавание обрабатывает планировку менее чем за 10 секунд. Никаких ручных построений.',
  },
  {
    icon: Star,
    title: 'Премиум-качество',
    description: 'Профессиональный результат с чёткими линиями, элегантной типографикой и точными пропорциями.',
  },
  {
    icon: Shield,
    title: 'Конфиденциальность прежде всего',
    description: 'Ваши файлы обрабатываются безопасно и не хранятся постоянно. Ваши данные остаются вашими.',
  },
  {
    icon: Users,
    title: 'Командная работа',
    description: 'Делитесь проектами с командой, сотрудничайте в реальном времени и управляйте всем из дашборда.',
  },
]

export default function Benefits() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Почему <span className="text-[#C9A84C]">FloorPlan Studio</span>
          </h2>
          <p className="text-[#8A8A8A] max-w-xl mx-auto">
            Создан для архитекторов, риэлторов и дизайнеров интерьеров, стремящихся к совершенству.
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
