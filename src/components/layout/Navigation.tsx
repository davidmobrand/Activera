'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { ExerciseCategory } from '@/lib/types'
import { LanguageSelector } from '@/components/LanguageSelector'
import { useTranslation } from '@/lib/i18n/useTranslation'

export function Navigation() {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const { t } = useTranslation()

  // Don't render anything if loading or not authenticated
  if (status === 'loading' || !session) return null

  const isAdmin = session.user?.role === 'ADMIN'
  const isActive = (path: string) => pathname === path

  // Only show admin links if user is admin
  const menuItems = [
    { href: '/dashboard', label: 'Dashboard' },
    ...(isAdmin
      ? [
          { href: '/admin/exercises', label: 'Manage Exercises' },
          { href: '/admin/users', label: 'Manage Users' },
        ]
      : [
          { href: '/exercises/oppenhet', label: t.category('OPPENHET').name },
          { href: '/exercises/narvaro', label: t.category('NARVARO').name },
          { href: '/exercises/engagemang', label: t.category('ENGAGEMANG').name },
        ]),
  ]

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/dashboard" className="text-xl font-bold text-blue-600">
                ACTivera
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    isActive(item.href)
                      ? 'border-blue-500 text-gray-900'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-sm text-gray-500 mr-4">
              {session.user?.name || session.user?.email}
              {isAdmin && ' (Admin)'}
            </span>
            <LanguageSelector />
            <div className="ml-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => signOut({ callbackUrl: '/login' })}
              >
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
} 