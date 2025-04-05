'use client'

import { useSession } from 'next-auth/react'
import NotLoggedIn from '@/components/NotLoggedIn'
import Link from 'next/link'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { ExerciseCategoryEnum } from '@/lib/types'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const { t } = useTranslation()

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-mindful-50 to-white">
        <LoadingSpinner className="h-12 w-12 text-mindful-600" />
      </div>
    )
  }

  if (!session) {
    return <NotLoggedIn />
  }

  const categories = [
    {
      key: ExerciseCategoryEnum.NARVARO,
      slug: 'narvaro',
      color: 'bg-mindful-100 text-mindful-800'
    },
    {
      key: ExerciseCategoryEnum.OPPENHET,
      slug: 'oppenhet',
      color: 'bg-calm-100 text-calm-800'
    },
    {
      key: ExerciseCategoryEnum.ENGAGEMANG,
      slug: 'engagemang',
      color: 'bg-warmth-100 text-warmth-800'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-mindful-50 to-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-display text-mindful-800 mb-4">
            {t.common('welcome')}, {session.user?.name || session.user?.email}
          </h1>
          <p className="text-lg text-mindful-600">
            Choose a category to begin your mindfulness journey
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {categories.map((category) => (
            <Link 
              key={category.slug}
              href={`/exercises/${category.slug}`}
              className="block group"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-soft border border-mindful-100 hover:border-mindful-200 transition-all duration-300 transform hover:-translate-y-1">
                <div className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-4 ${category.color}`}>
                  {t.category(category.key).name}
                </div>
                <p className="text-mindful-600">{t.category(category.key).description}</p>
              </div>
            </Link>
          ))}
        </div>

        {session.user?.role === 'ADMIN' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-soft border border-mindful-100">
            <h2 className="text-2xl font-display text-mindful-800 mb-6">{t.common('adminDashboard')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/admin/exercises">
                <div className="bg-mindful-50 rounded-lg p-4 border border-mindful-100 hover:border-mindful-200 transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="font-medium text-mindful-800">{t.common('manageExercises')}</h3>
                  <p className="text-sm text-mindful-600 mt-1">Create and manage mindfulness exercises</p>
                </div>
              </Link>
              <Link href="/admin/users">
                <div className="bg-mindful-50 rounded-lg p-4 border border-mindful-100 hover:border-mindful-200 transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="font-medium text-mindful-800">{t.common('manageUsers')}</h3>
                  <p className="text-sm text-mindful-600 mt-1">Manage user accounts and permissions</p>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 