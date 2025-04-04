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
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-red-600 mb-4">
          Something went wrong!
        </h2>
        <p className="text-gray-600 mb-6">
          An error occurred while processing your request. Please try again.
        </p>
        <Button onClick={reset}>Try again</Button>
      </div>
    </div>
  )
} 