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
            console.error('[Auth] Missing credentials:', { email: !!credentials?.email, password: !!credentials?.password })
            throw new Error('Please provide both email and password')
          }

          console.log('[Auth] Attempting login with email:', credentials.email)

          const user = await mockDb.users.findByEmail(credentials.email)
          
          if (!user) {
            console.error('[Auth] User not found:', credentials.email)
            throw new Error('Invalid email or password')
          }

          // In a real application, you would hash the password and compare hashes
          if (user.password !== credentials.password) {
            console.error('[Auth] Invalid password for user:', credentials.email)
            throw new Error('Invalid email or password')
          }

          console.log('[Auth] Login successful for user:', { id: user.id, email: user.email, role: user.role })
          
          return {
            id: user.id,
            email: user.email,
            role: user.role,
            name: user.name
          }
        } catch (error) {
          console.error('[Auth] Authentication error:', error)
          throw error
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.name = user.name
      }
      return token
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string
        session.user.role = token.role as string
        session.user.name = token.name as string
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
    error: '/login'
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  debug: process.env.NODE_ENV === 'development'
} 