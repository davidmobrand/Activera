'use client'

import { useSession } from 'next-auth/react'
import NotLoggedIn from '@/components/NotLoggedIn'
import Link from 'next/link'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { ExerciseCategoryEnum } from '@/lib/types'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const { t } = useTranslation()

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
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
      color: 'bg-blue-100 text-blue-800'
    },
    {
      key: ExerciseCategoryEnum.OPPENHET,
      slug: 'oppenhet',
      color: 'bg-green-100 text-green-800'
    },
    {
      key: ExerciseCategoryEnum.ENGAGEMANG,
      slug: 'engagemang',
      color: 'bg-purple-100 text-purple-800'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          {t.common('welcome')}, {session.user?.name || session.user?.email}
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {categories.map((category) => (
            <Link 
              key={category.slug}
              href={`/exercises/${category.slug}`}
              className="block"
            >
              <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 ${category.color}`}>
                  {t.category(category.key).name}
                </div>
                <p className="text-gray-600">{t.category(category.key).description}</p>
              </div>
            </Link>
          ))}
        </div>

        {session.user?.role === 'ADMIN' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">{t.common('adminDashboard')}</h2>
            <div className="space-y-2">
              <Link 
                href="/admin/exercises"
                className="block text-blue-600 hover:text-blue-800"
              >
                {t.common('manageExercises')}
              </Link>
              <Link 
                href="/admin/users"
                className="block text-blue-600 hover:text-blue-800"
              >
                {t.common('manageUsers')}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 