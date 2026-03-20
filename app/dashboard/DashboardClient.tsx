'use client'

import { useEffect, useState } from 'react'
import { FileText, Plus, Clock, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface Project {
  id: string
  name: string
  json: object
  thumbnail: string
  date: string
  rooms: number
}

function formatDate(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const min = Math.floor(diff / 60000)
  if (min < 60) return `${min} мин. назад`
  const hr = Math.floor(min / 60)
  if (hr < 24) return `${hr} ч. назад`
  const days = Math.floor(hr / 24)
  if (days === 1) return 'Вчера'
  if (days < 7) return `${days} дн. назад`
  return new Date(iso).toLocaleDateString('ru-RU')
}

export default function DashboardClient() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('fp_projects') || '{}') as Record<string, Project>
    setProjects(Object.values(stored).sort((a, b) => (b.date > a.date ? 1 : -1)))
    setLoaded(true)
  }, [])

  const handleDelete = (id: string) => {
    const stored = JSON.parse(localStorage.getItem('fp_projects') || '{}')
    delete stored[id]
    localStorage.setItem('fp_projects', JSON.stringify(stored))
    setProjects((prev) => prev.filter((p) => p.id !== id))
  }

  const totalRooms = projects.reduce((s, p) => s + (p.rooms || 0), 0)

  return (
    <main className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-3xl font-bold text-white">Мои проекты</h1>
            <p className="text-[#8A8A8A] text-sm mt-1">
              Управляйте своими проектами планировок
            </p>
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
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Всего проектов', value: String(projects.length) },
            { label: 'Всего комнат', value: String(totalRooms) },
            { label: 'В этом месяце', value: String(
              projects.filter((p) => {
                const d = new Date(p.date)
                const now = new Date()
                return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
              }).length
            )},
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-[#111111] border border-[rgba(201,168,76,0.2)] rounded-xl p-4"
            >
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

          {loaded && projects.length === 0 && (
            <div className="col-span-full text-center py-16 text-[#555] text-sm">
              Нет сохранённых проектов. Создайте новый проект в редакторе!
            </div>
          )}

          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-[#111111] border border-[rgba(201,168,76,0.2)] rounded-xl overflow-hidden hover:border-[rgba(201,168,76,0.5)] hover:bg-[#141414] transition-all group"
            >
              {/* Thumbnail */}
              <div className="bg-[#0d0d0d] border-b border-[rgba(201,168,76,0.1)] h-28 flex items-center justify-center relative overflow-hidden">
                {project.thumbnail ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.thumbnail}
                    alt={project.name}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <svg viewBox="0 0 200 120" className="w-full h-full p-4">
                    <rect x="10" y="10" width="80" height="60" fill="none" stroke="#C9A84C" strokeWidth="1.2" opacity="0.6"/>
                    <rect x="90" y="10" width="60" height="35" fill="none" stroke="#C9A84C" strokeWidth="1.2" opacity="0.6"/>
                    <rect x="10" y="70" width="60" height="40" fill="none" stroke="#C9A84C" strokeWidth="1.2" opacity="0.6"/>
                    <rect x="70" y="70" width="80" height="40" fill="none" stroke="#C9A84C" strokeWidth="1.2" opacity="0.6"/>
                  </svg>
                )}
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(project.id) }}
                  className="absolute top-2 right-2 w-6 h-6 rounded bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80"
                  title="Удалить проект"
                >
                  <Trash2 size={12} className="text-white" />
                </button>
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
                  <span className="flex items-center gap-1 ml-auto">
                    <Clock size={11} />
                    {formatDate(project.date)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
