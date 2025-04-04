import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full px-6 py-8 bg-white rounded-lg shadow-md text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">404</h2>
        <h3 className="text-2xl font-semibold text-gray-700 mb-4">
          Page Not Found
        </h3>
        <p className="text-gray-600 mb-6">
          The page you are looking for does not exist.
        </p>
        <Link href="/dashboard">
          <Button>Return to Dashboard</Button>
        </Link>
      </div>
    </div>
  )
} 