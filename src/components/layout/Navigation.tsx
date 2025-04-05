'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { ExerciseCategoryEnum } from '@/lib/types'
import { LanguageSelector } from '@/components/LanguageSelector'
import { useTranslation } from '@/lib/i18n/useTranslation'
import { Menu, X } from 'lucide-react'

const Navigation = () => {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

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
    <nav className="bg-stone-50/90 border-b border-stone-200 backdrop-blur-sm shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/dashboard" className="text-2xl font-display text-mindful-700 hover:text-mindful-600 transition-colors">
                ACTivera
              </Link>
            </div>
            {/* Desktop menu */}
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center px-3 pt-1 border-b-2 text-sm font-medium transition-colors ${
                    isActive(item.href)
                      ? 'border-mindful-500 text-mindful-700 font-semibold'
                      : 'border-transparent text-stone-600 hover:border-stone-300 hover:text-stone-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {/* Desktop user info and buttons */}
            <div className="hidden md:flex md:items-center md:space-x-4">
              <span className="text-sm text-stone-600 font-medium">
                {session.user?.name || session.user?.email}
                {isAdmin && (
                  <span className="ml-2 bg-stone-100 text-stone-700 px-2 py-0.5 rounded-full text-xs">
                    {t.common('admin')}
                  </span>
                )}
              </span>
              <LanguageSelector />
              <Button
                variant="primary"
                size="sm"
                onClick={() => signOut({ callbackUrl: '/login' })}
              >
                {t.common('signOut')}
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2.5 rounded-md text-stone-600 hover:text-stone-900 hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-mindful-500 touch-manipulation"
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
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2.5 rounded-md text-base font-medium ${
                  isActive(item.href)
                    ? 'bg-mindful-50 text-mindful-700'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50 active:bg-stone-100'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-4 py-3 space-y-3">
              <div className="flex items-center">
                <span className="text-sm text-stone-600 font-medium">
                  {session.user?.name || session.user?.email}
                  {isAdmin && (
                    <span className="ml-2 bg-stone-100 text-stone-700 px-2 py-0.5 rounded-full text-xs">
                      {t.common('admin')}
                    </span>
                  )}
                </span>
              </div>
              <div className="flex flex-col space-y-2">
                <LanguageSelector />
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setIsOpen(false)
                    signOut({ callbackUrl: '/login' })
                  }}
                  className="w-full justify-center"
                >
                  {t.common('signOut')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export { Navigation }
export default Navigation 