import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { mockDb } from '@/lib/mockData'

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  debug: true, // Enable debug logs in production
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('[Auth] Authorizing credentials:', { email: credentials?.email })
        
        if (!credentials?.email || !credentials?.password) {
          console.log('[Auth] Missing credentials')
          throw new Error('Missing credentials')
        }

        const user = mockDb.findUserByEmail(credentials.email)
        console.log('[Auth] Found user:', user ? { ...user, password: undefined } : null)
        
        if (!user) {
          console.log('[Auth] No user found')
          throw new Error('No user found')
        }

        // For development, accept hardcoded passwords
        const isValidPassword = 
          (credentials.password === 'admin123' && user.email === 'admin@activera.com') ||
          (credentials.password === 'client123' && user.email === 'client@example.com')

        console.log('[Auth] Password validation:', { isValid: isValidPassword })

        if (!isValidPassword) {
          console.log('[Auth] Invalid password')
          throw new Error('Invalid password')
        }

        console.log('[Auth] Authorization successful')
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      }
    })
  ],
  callbacks: {
    async session({ session, token }) {
      console.log('[Auth] Session callback:', { session, token })
      if (session.user) {
        session.user.role = token.role
        session.user.id = token.id
      }
      return session
    },
    async jwt({ token, user }) {
      console.log('[Auth] JWT callback:', { token, user })
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    }
  }
} 