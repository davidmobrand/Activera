'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-mindful-50 to-white">
      <div className="max-w-md w-full px-8 py-10 bg-white/80 backdrop-blur-sm rounded-xl shadow-soft border border-mindful-100">
        <h2 className="text-2xl font-display text-warmth-700 mb-4">
          Something went wrong!
        </h2>
        <p className="text-mindful-600 mb-6">
          An error occurred while processing your request. Please try again.
        </p>
        <Button 
          onClick={reset}
          className="bg-mindful-600 hover:bg-mindful-700 text-white"
        >
          Try again
        </Button>
      </div>
    </div>
  )
} 