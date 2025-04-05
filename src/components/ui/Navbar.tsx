'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Button } from './Button'
import { Session } from 'next-auth'
import { useTranslation } from '@/lib/i18n/useTranslation'

interface NavbarProps {
  session: Session | null;
}

export function Navbar({ session }: NavbarProps) {
  const isAdmin = session?.user?.role === 'ADMIN'
  const { t } = useTranslation()

  return (
    <nav className="bg-stone-50/90 border-b border-stone-200 backdrop-blur-sm shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/dashboard" className="text-2xl font-display text-ocean-700 hover:text-ocean-600 transition-colors">
                ACTivera
              </Link>
            </div>
            {isAdmin && (
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link href="/admin/exercises" className="text-stone-600 hover:text-stone-900 px-3 py-2 rounded-md text-sm font-medium">
                  {t.common('manageExercises')}
                </Link>
                <Link href="/admin/users" className="text-stone-600 hover:text-stone-900 px-3 py-2 rounded-md text-sm font-medium">
                  {t.common('manageUsers')}
                </Link>
              </div>
            )}
          </div>

          <div className="flex items-center">
            <Button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="ml-4"
              variant="outline"
            >
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
} 