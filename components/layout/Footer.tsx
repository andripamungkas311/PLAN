import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-[rgba(201,168,76,0.15)] bg-[#0a0a0a] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-md bg-[#C9A84C] flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
                  <rect x="2" y="2" width="9" height="9" stroke="black" strokeWidth="1.5"/>
                  <rect x="13" y="2" width="9" height="5" stroke="black" strokeWidth="1.5"/>
                  <rect x="2" y="13" width="5" height="9" stroke="black" strokeWidth="1.5"/>
                  <rect x="9" y="13" width="13" height="9" stroke="black" strokeWidth="1.5"/>
                </svg>
              </div>
              <span className="font-bold text-[#E8D5A3]">FloorPlan Studio</span>
            </div>
            <p className="text-[#8A8A8A] text-sm max-w-xs leading-relaxed">
              Превращайте стандартные планировки в стильные Premium-визуализации за минуты.
            </p>
          </div>

          <div>
            <h4 className="text-[#E8D5A3] text-sm font-semibold mb-3">Продукт</h4>
            <ul className="space-y-2">
              <li><Link href="/editor" className="text-[#8A8A8A] hover:text-[#C9A84C] text-sm transition-colors">Редактор</Link></li>
              <li><Link href="/pricing" className="text-[#8A8A8A] hover:text-[#C9A84C] text-sm transition-colors">Тарифы</Link></li>
              <li><Link href="/dashboard" className="text-[#8A8A8A] hover:text-[#C9A84C] text-sm transition-colors">Дашборд</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[#E8D5A3] text-sm font-semibold mb-3">Правовая информация</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="text-[#8A8A8A] hover:text-[#C9A84C] text-sm transition-colors">Политика конфиденциальности</Link></li>
              <li><Link href="#" className="text-[#8A8A8A] hover:text-[#C9A84C] text-sm transition-colors">Условия использования</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-[rgba(201,168,76,0.1)] text-center text-[#8A8A8A] text-xs">
          © 2024 FloorPlan Studio. Все права защищены.
        </div>
      </div>
    </footer>
  )
}
