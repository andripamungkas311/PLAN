import { Check } from 'lucide-react'

interface Step {
  id: number
  label: string
}

const steps: Step[] = [
  { id: 1, label: 'Upload' },
  { id: 2, label: 'Recognize' },
  { id: 3, label: 'Edit' },
  { id: 4, label: 'Export' },
]

interface StepIndicatorProps {
  current?: number
}

export default function StepIndicator({ current = 3 }: StepIndicatorProps) {
  return (
    <div className="flex items-center gap-0">
      {steps.map((step, idx) => (
        <div key={step.id} className="flex items-center">
          <div className="flex items-center gap-2">
            <div
              className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                step.id < current
                  ? 'bg-[#C9A84C] text-black'
                  : step.id === current
                  ? 'bg-[rgba(201,168,76,0.2)] border border-[#C9A84C] text-[#C9A84C]'
                  : 'bg-[#1a1a1a] border border-[rgba(201,168,76,0.2)] text-[#8A8A8A]'
              }`}
            >
              {step.id < current ? <Check size={12} /> : step.id}
            </div>
            <span
              className={`text-xs font-medium hidden sm:block ${
                step.id === current ? 'text-[#C9A84C]' : step.id < current ? 'text-[#E8D5A3]' : 'text-[#8A8A8A]'
              }`}
            >
              {step.label}
            </span>
          </div>
          {idx < steps.length - 1 && (
            <div
              className={`w-8 h-px mx-2 ${
                step.id < current ? 'bg-[#C9A84C]' : 'bg-[rgba(201,168,76,0.2)]'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}
