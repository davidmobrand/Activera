import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-act-50 to-white">
      <div className="max-w-md w-full px-8 py-10 bg-white/80 backdrop-blur-sm rounded-xl shadow-soft border border-act-100 text-center">
        <h2 className="text-4xl font-display text-act-800 mb-2">404</h2>
        <h3 className="text-2xl font-display text-act-700 mb-4">
          Page Not Found
        </h3>
        <p className="text-act-600 mb-6">
          The page you are looking for does not exist.
        </p>
        <Link href="/dashboard">
          <Button variant="primary">
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
} 