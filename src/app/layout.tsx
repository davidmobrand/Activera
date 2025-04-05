import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Navigation from '@/components/layout/Navigation'
import AuthProvider from '@/components/AuthProvider'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ACTivera - Exercise Progress Tracking',
  description: 'Track your mindfulness and ACT exercises',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <LanguageProvider>
            <Navigation />
            <main>
              {children}
            </main>
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  )
} 