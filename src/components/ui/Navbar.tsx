'use client'

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Button } from './Button'
import { Session } from 'next-auth'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { Menu, X } from 'lucide-react'

interface NavbarProps {
  session: Session | null;
}

export function Navbar({ session }: NavbarProps) {
  const isAdmin = session?.user?.role === 'ADMIN'
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-stone-50/90 border-b border-stone-200 backdrop-blur-sm shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/dashboard" className="text-2xl font-display text-ocean-700 hover:text-ocean-600 transition-colors">
                ACTivera
              </Link>
            </div>
            {/* Desktop menu */}
            {isAdmin && (
              <div className="hidden md:ml-6 md:flex md:space-x-8">
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
            {/* Desktop sign out button */}
            <div className="hidden md:flex">
              <Button
                onClick={() => signOut({ callbackUrl: '/login' })}
                variant="outline"
                size="sm"
              >
                {t.common('signOut')}
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2.5 rounded-md text-stone-600 hover:text-stone-900 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-ocean-500 touch-manipulation"
                aria-expanded={isOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div 
          className={`md:hidden transition-all duration-200 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="pt-2 pb-3 space-y-1">
            {isAdmin && (
              <>
                <Link
                  href="/admin/exercises"
                  className="block px-4 py-2.5 rounded-md text-base font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50 active:bg-stone-100"
                  onClick={() => setIsOpen(false)}
                >
                  {t.common('manageExercises')}
                </Link>
                <Link
                  href="/admin/users"
                  className="block px-4 py-2.5 rounded-md text-base font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50 active:bg-stone-100"
                  onClick={() => setIsOpen(false)}
                >
                  {t.common('manageUsers')}
                </Link>
              </>
            )}
            <button
              onClick={() => {
                setIsOpen(false)
                signOut({ callbackUrl: '/login' })
              }}
              className="block w-full text-left px-4 py-2.5 rounded-md text-base font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50 active:bg-stone-100"
            >
              {t.common('signOut')}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
} 