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
    primary: 'bg-mindful-600 text-white hover:bg-mindful-700 focus-visible:ring-mindful-500',
    secondary: 'bg-mindful-100 text-mindful-700 hover:bg-mindful-200 focus-visible:ring-mindful-400',
    outline: 'border border-mindful-200 text-mindful-700 hover:bg-mindful-50 focus-visible:ring-mindful-400',
    danger: 'bg-warmth-600 text-white hover:bg-warmth-700 focus-visible:ring-warmth-500',
    success: 'bg-calm-600 text-white hover:bg-calm-700 focus-visible:ring-calm-500',
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