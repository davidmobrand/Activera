import { ButtonHTMLAttributes, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success' | 'ghost' | 'link'
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
    primary: "bg-act-500 hover:bg-act-600 text-cream-50 shadow-sm",
    secondary: "bg-sage-100 hover:bg-sage-200 text-sage-700 shadow-sm",
    outline: "border border-act-300 text-act-600 hover:bg-act-50 hover:border-act-400",
    danger: "bg-warmth-500 hover:bg-warmth-600 text-cream-50 shadow-sm",
    success: "bg-sage-500 hover:bg-sage-600 text-cream-50 shadow-sm",
    ghost: "text-act-500 hover:bg-act-50 hover:text-act-600",
    link: "text-act-500 hover:text-act-600 underline-offset-4 hover:underline",
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