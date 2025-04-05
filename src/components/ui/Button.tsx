import { ButtonHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50'
  
  const variants = {
    primary: 'bg-act-600 text-cream-50 hover:bg-act-700 focus-visible:ring-act-500',
    secondary: 'bg-sage-100 text-sage-700 hover:bg-sage-200 focus-visible:ring-sage-400',
    outline: 'border border-act-200 text-act-600 hover:bg-cream-50 focus-visible:ring-act-400',
    danger: 'bg-act-600 text-cream-50 hover:bg-act-700 focus-visible:ring-act-500',
    success: 'bg-sage-600 text-cream-50 hover:bg-sage-700 focus-visible:ring-sage-500',
  }

  const sizes = {
    sm: 'h-8 px-3 text-sm',
    md: 'h-10 px-4',
    lg: 'h-12 px-6 text-lg',
  }

  return (
    <button
      className={twMerge(
        baseStyles,
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
} 