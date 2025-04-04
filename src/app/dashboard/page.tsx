'use client'

import { useSession } from 'next-auth/react'
import NotLoggedIn from '@/components/NotLoggedIn'

export default function DashboardPage() {
  const { data: session, status } = useSession()

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

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Welcome, {session.user?.name || session.user?.email}
        </h1>
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Your Dashboard</h2>
          <p className="text-gray-600">
            You are logged in as: {session.user?.email}
            <br />
            Role: {session.user?.role}
          </p>
        </div>
      </div>
    </div>
  )
} 