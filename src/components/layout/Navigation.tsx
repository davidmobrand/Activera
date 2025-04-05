'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { ExerciseCategoryEnum } from '@/lib/types'
import { LanguageSelector } from '@/components/LanguageSelector'
import { useTranslation } from '@/lib/i18n/useTranslation'

export default function Navigation() {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const { t } = useTranslation()

  // Don't render anything if loading or not authenticated
  if (status === 'loading' || !session) return null

  const isAdmin = session.user?.role === 'ADMIN'
  const isActive = (path: string) => pathname === path

  // Only show admin links if user is admin
  const menuItems = [
    { href: '/dashboard', label: t.common('dashboard') },
    ...(isAdmin
      ? [
          { href: '/admin/exercises', label: t.common('manageExercises') },
          { href: '/admin/users', label: t.common('manageUsers') },
        ]
      : [
          { href: '/exercises/oppenhet', label: t.category('OPPENHET').name },
          { href: '/exercises/narvaro', label: t.category('NARVARO').name },
          { href: '/exercises/engagemang', label: t.category('ENGAGEMANG').name },
        ]),
  ]

  return (
    <nav className="bg-gradient-mindful backdrop-blur-sm shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/dashboard" className="text-2xl font-display text-mindful-800 hover:text-mindful-600 transition-colors">
                ACTivera
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center px-3 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'border-mindful-500 text-mindful-800 font-semibold'
                      : 'border-transparent text-mindful-600 hover:border-mindful-300 hover:text-mindful-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-mindful-600 font-medium">
              {session.user?.name || session.user?.email}
              {isAdmin && (
                <span className="ml-2 bg-mindful-100 text-mindful-600 px-2 py-0.5 rounded-full text-xs">
                  {t.common('admin')}
                </span>
              )}
            </span>
            <LanguageSelector />
            <Button
              variant="outline"
              size="sm"
              onClick={() => signOut({ callbackUrl: '/login' })}
            >
              {t.common('signOut')}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
} 