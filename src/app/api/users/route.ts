import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { User, UserRole } from '@/lib/types'
import { mockDb } from '@/lib/mockData'
import { users } from '@/lib/mockData/users'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    console.log('[API] Users GET - Session:', session)

    if (!session?.user?.id || session.user.role !== UserRole.ADMIN) {
      console.log('[API] Users GET - Unauthorized access attempt')
      return new Response('Unauthorized', { status: 401 })
    }

    // Return all users from the mock data
    return Response.json(users)
  } catch (error) {
    console.error('[API] Users GET - Error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    console.log('[API] Users POST - Session:', session)

    if (!session?.user?.id || session.user.role !== UserRole.ADMIN) {
      console.log('[API] Users POST - Unauthorized access attempt')
      return new Response('Unauthorized', { status: 401 })
    }

    const data = await request.json()
    
    // Validate required fields
    if (!data.email || !data.password || !data.role) {
      return new Response('Missing required fields', { status: 400 })
    }

    // Check if email is already taken
    const existingUser = await mockDb.users.findByEmail(data.email)
    if (existingUser) {
      return new Response('Email already in use', { status: 400 })
    }

    const newUser = await mockDb.users.create(data)
    console.log('[API] Users POST - Created user:', newUser)
    return Response.json(newUser)
  } catch (error) {
    console.error('[API] Users POST - Error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
} 