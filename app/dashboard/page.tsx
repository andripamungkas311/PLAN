import { Header } from '@/components/layout'
import { FileText, Plus, Star, Clock } from 'lucide-react'
import Link from 'next/link'

const projects = [
  { id: 1, name: 'Квартира 3Б — Жилой этаж', rooms: 6, area: '87.3', date: '2 часа назад', starred: true },
  { id: 2, name: 'Офисная планировка — 2 этаж', rooms: 8, area: '142.0', date: 'Вчера', starred: false },
  { id: 3, name: 'Вилла — Первый этаж', rooms: 9, area: '210.5', date: '3 дня назад', starred: true },
  { id: 4, name: 'Студия — Черновик', rooms: 3, area: '38.2', date: '1 неделю назад', starred: false },
  { id: 5, name: 'Пентхаус — 3 уровень', rooms: 7, area: '165.8', date: '2 недели назад', starred: false },
  { id: 6, name: 'Торговый зал — Макет', rooms: 4, area: '95.0', date: '1 месяц назад', starred: false },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />
      <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-10">
            <div>
              <h1 className="text-3xl font-bold text-white">Мои проекты</h1>
              <p className="text-[#8A8A8A] text-sm mt-1">Управляйте своими проектами планировок</p>
            </div>
            <Link
              href="/editor"
              className="inline-flex items-center gap-2 bg-[#C9A84C] hover:bg-[#D4AF37] text-black font-semibold px-4 py-2.5 rounded-lg text-sm transition-colors"
            >
              <Plus size={16} />
              Новый проект
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
            {[
              { label: 'Всего проектов', value: '6' },
              { label: 'Общая площадь', value: '738.8 м²' },
              { label: 'Избранное', value: '2' },
              { label: 'В этом месяце', value: '3' },
            ].map(stat => (
              <div key={stat.label} className="bg-[#111111] border border-[rgba(201,168,76,0.2)] rounded-xl p-4">
                <div className="text-2xl font-bold text-[#E8D5A3] mb-1">{stat.value}</div>
                <div className="text-[#8A8A8A] text-xs">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Projects grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* New project card */}
            <Link href="/editor">
              <div className="bg-[#111111] border border-dashed border-[rgba(201,168,76,0.3)] rounded-xl p-6 flex flex-col items-center justify-center gap-3 min-h-[160px] hover:border-[#C9A84C] hover:bg-[#141414] transition-all group cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-[rgba(201,168,76,0.1)] border border-[rgba(201,168,76,0.3)] flex items-center justify-center group-hover:bg-[rgba(201,168,76,0.2)] transition-all">
                  <Plus size={22} className="text-[#C9A84C]" />
                </div>
                <span className="text-[#C9A84C] font-semibold text-sm">Новый проект</span>
              </div>
            </Link>

            {projects.map((project) => (
              <Link key={project.id} href="/editor">
                <div className="bg-[#111111] border border-[rgba(201,168,76,0.2)] rounded-xl overflow-hidden hover:border-[rgba(201,168,76,0.5)] hover:bg-[#141414] transition-all group cursor-pointer">
                  {/* Thumbnail */}
                  <div className="bg-[#0d0d0d] border-b border-[rgba(201,168,76,0.1)] h-28 flex items-center justify-center relative overflow-hidden">
                    <svg viewBox="0 0 200 120" className="w-full h-full p-4">
                      <rect x="10" y="10" width="80" height="60" fill="none" stroke="#C9A84C" strokeWidth="1.2" opacity="0.6"/>
                      <rect x="90" y="10" width="60" height="35" fill="none" stroke="#C9A84C" strokeWidth="1.2" opacity="0.6"/>
                      <rect x="10" y="70" width="60" height="40" fill="none" stroke="#C9A84C" strokeWidth="1.2" opacity="0.6"/>
                      <rect x="70" y="70" width="80" height="40" fill="none" stroke="#C9A84C" strokeWidth="1.2" opacity="0.6"/>
                      <rect x="90" y="45" width="60" height="25" fill="none" stroke="#C9A84C" strokeWidth="1.2" opacity="0.6"/>
                    </svg>
                    {project.starred && (
                      <div className="absolute top-2 right-2">
                        <Star size={14} className="text-[#C9A84C] fill-[#C9A84C]" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <h3 className="text-white font-medium text-sm mb-1 truncate group-hover:text-[#E8D5A3] transition-colors">
                      {project.name}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-[#8A8A8A]">
                      <span className="flex items-center gap-1">
                        <FileText size={11} />
                        {project.rooms} комнат
                      </span>
                      <span>{project.area} м²</span>
                      <span className="flex items-center gap-1 ml-auto">
                        <Clock size={11} />
                        {project.date}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
