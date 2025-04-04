import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { mockDb } from '@/lib/mockData'

export async function GET() {
  const session = await getServerSession(authOptions)
  
  console.log('[API] Users GET - Session:', session)

  if (!session?.user || session.user.role !== 'ADMIN') {
    console.log('[API] Users GET - Unauthorized access attempt')
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const users = mockDb.findUsers()
    console.log('[API] Users GET - Success:', { count: users.length })
    return NextResponse.json(users)
  } catch (error) {
    console.error('[API] Users GET - Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  console.log('[API] Users POST - Session:', session)

  if (!session?.user || session.user.role !== 'ADMIN') {
    console.log('[API] Users POST - Unauthorized access attempt')
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await request.json()
    
    // Validate required fields
    if (!data.email || !data.password || !data.role) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if email is already taken
    const existingUser = mockDb.findUserByEmail(data.email)
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already in use' },
        { status: 400 }
      )
    }

    const newUser = mockDb.createUser(data)
    console.log('[API] Users POST - Created user:', newUser)
    return NextResponse.json(newUser)
  } catch (error) {
    console.error('[API] Users POST - Error:', error)
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    )
  }
} 