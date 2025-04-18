import { InputHTMLAttributes, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  label?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, label, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="block text-sm font-medium text-stone-700 mb-1">
          {label}
        </label>
        <input
          type={type}
          className={`
            w-full
            rounded-md
            border
            px-3
            py-2.5
            sm:py-2
            text-base
            sm:text-sm
            bg-white
            ${error ? 'border-warmth-300 focus:border-warmth-400' : 'border-stone-200 focus:border-ocean-300'}
            focus:ring
            ${error ? 'focus:ring-warmth-200' : 'focus:ring-ocean-200'}
            focus:ring-opacity-50
            disabled:opacity-50
            disabled:cursor-not-allowed
            placeholder:text-stone-400
            touch-manipulation
            appearance-none
            ${className}
          `}
          ref={ref}
          {...props}
        />
        {error && (
          <p className="mt-2 text-sm text-warmth-600">{error}</p>
        )}
      </div>
    )
  }
) 