import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-mindful-50 to-white">
      <div className="max-w-md w-full px-8 py-10 bg-white/80 backdrop-blur-sm rounded-xl shadow-soft border border-mindful-100 text-center">
        <h2 className="text-4xl font-display text-mindful-800 mb-2">404</h2>
        <h3 className="text-2xl font-display text-mindful-700 mb-4">
          Page Not Found
        </h3>
        <p className="text-mindful-600 mb-6">
          The page you are looking for does not exist.
        </p>
        <Link href="/dashboard">
          <Button className="bg-mindful-600 hover:bg-mindful-700 text-white">
            Return to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
} 