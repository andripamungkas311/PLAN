import { Header } from '@/components/layout'
import DashboardClient from './DashboardClient'

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <Header />
      <DashboardClient />
    </div>
  )
}
