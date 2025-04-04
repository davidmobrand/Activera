import { AuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { mockDb } from './mockData'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            console.log('[Auth] Missing credentials')
            return null
          }

          console.log('[Auth] Attempting login with email:', credentials.email)

          const user = await mockDb.users.findByEmail(credentials.email)
          console.log('[Auth] Found user:', user ? { ...user, password: undefined } : null)
          
          if (!user) {
            console.log('[Auth] User not found')
            return null
          }

          // In a real application, you would hash the password and compare hashes
          if (user.password !== credentials.password) {
            console.log('[Auth] Invalid password')
            return null
          }

          console.log('[Auth] Login successful')
          return {
            id: user.id,
            email: user.email,
            role: user.role,
          }
        } catch (error) {
          console.error('[Auth] Error during authentication:', error)
          return null
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string
        session.user.role = token.role as string
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
} 