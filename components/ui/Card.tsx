import React from 'react'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
}

export default function Card({ children, className = '', hover = false }: CardProps) {
  return (
    <div
      className={`bg-[#111111] border border-[rgba(201,168,76,0.2)] rounded-xl p-6 ${
        hover ? 'hover:border-[rgba(201,168,76,0.5)] hover:bg-[#141414] transition-all duration-200 cursor-pointer' : ''
      } ${className}`}
    >
      {children}
    </div>
  )
}
