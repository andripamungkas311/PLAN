import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}: ButtonProps) {
  const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#C9A84C]/40 disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-[#C9A84C] hover:bg-[#D4AF37] text-black font-semibold shadow-lg shadow-[#C9A84C]/20',
    secondary: 'bg-[#1a1a1a] hover:bg-[#222222] text-[#E8D5A3] border border-[rgba(201,168,76,0.3)] hover:border-[rgba(201,168,76,0.6)]',
    ghost: 'bg-transparent hover:bg-[#1a1a1a] text-[#8A8A8A] hover:text-[#E8D5A3]',
    outline: 'bg-transparent border border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C]/10',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
  }

  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  )
}
