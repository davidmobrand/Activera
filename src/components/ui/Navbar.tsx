'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import { Button } from './Button'

export function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/dashboard" className="text-xl font-bold text-gray-800">
                ACTivera
              </Link>
            </div>
          </div>

          <div className="flex items-center">
            {session?.user?.role === 'ADMIN' && (
              <>
                <Link href="/admin/exercises" className="text-gray-600 hover:text-gray-900 px-3 py-2">
                  Manage Exercises
                </Link>
                <Link href="/admin/users" className="text-gray-600 hover:text-gray-900 px-3 py-2">
                  Manage Users
                </Link>
              </>
            )}
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