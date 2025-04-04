import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import AuthProvider from '@/components/AuthProvider'
import { Navbar } from '@/components/ui/Navbar'
import { getServerSession } from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ACTivera',
  description: 'ACT therapy exercises platform',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)
  
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {session && <Navbar />}
          <main className="min-h-screen bg-gray-50">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  )
} 