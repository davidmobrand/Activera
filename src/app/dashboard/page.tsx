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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-act-50 to-white">
        <LoadingSpinner className="h-12 w-12 text-act-600" />
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
      color: 'bg-act-100 text-act-800'
    },
    {
      key: ExerciseCategoryEnum.OPPENHET,
      slug: 'oppenhet',
      color: 'bg-act-100 text-act-800'
    },
    {
      key: ExerciseCategoryEnum.ENGAGEMANG,
      slug: 'engagemang',
      color: 'bg-act-100 text-act-800'
    }
  ]

  return (
    <div className="p-6 bg-gradient-to-b from-act-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-display text-act-800 mb-4">
            {t.common('welcome')}, {session.user?.name || session.user?.email}
          </h1>
          <p className="text-lg text-act-600">
            {t.common('chooseCategoryText')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {categories.map((category) => (
            <Link 
              key={category.slug}
              href={`/exercises/${category.slug}`}
              className="block group"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-soft border border-act-100 hover:border-act-200 transition-all duration-300 transform hover:-translate-y-1">
                <div className={`inline-block px-4 py-1 rounded-full text-sm font-medium mb-4 ${category.color}`}>
                  {t.category(category.key).name}
                </div>
                <p className="text-act-600">{t.category(category.key).description}</p>
              </div>
            </Link>
          ))}
        </div>

        {session.user?.role === 'ADMIN' && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-soft border border-act-100">
            <h2 className="text-2xl font-display text-act-800 mb-6">{t.common('adminDashboard')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link href="/admin/exercises">
                <div className="bg-act-50 rounded-lg p-4 border border-act-100 hover:border-act-200 transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="font-medium text-act-800">{t.common('manageExercises')}</h3>
                  <p className="text-sm text-act-600 mt-1">Create and manage mindfulness exercises</p>
                </div>
              </Link>
              <Link href="/admin/users">
                <div className="bg-act-50 rounded-lg p-4 border border-act-100 hover:border-act-200 transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="font-medium text-act-800">{t.common('manageUsers')}</h3>
                  <p className="text-sm text-act-600 mt-1">Manage user accounts and permissions</p>
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 