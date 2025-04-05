import Link from 'next/link'
import { useTranslation } from '@/lib/i18n/useTranslation'

export default function NotLoggedIn() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-mindful-50 to-white">
      <div className="max-w-md w-full px-8 py-10 bg-white/80 backdrop-blur-sm rounded-xl shadow-soft border border-mindful-100 text-center">
        <h2 className="text-2xl font-display text-mindful-800 mb-4">
          {t.common('notLoggedIn')}
        </h2>
        <p className="text-mindful-600 mb-6">
          {t.common('pleaseSignIn')}
        </p>
        <Link 
          href="/login" 
          className="text-mindful-600 hover:text-mindful-800 underline"
        >
          {t.common('signIn')}
        </Link>
      </div>
    </div>
  )
} 