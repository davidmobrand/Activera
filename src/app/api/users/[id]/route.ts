import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { User, UserRole } from '@/lib/types'
import { mockDb } from '@/lib/mockData'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new Response('Unauthorized', { status: 401 })
    }

    const user = await mockDb.findUserById(params.id)
    if (!user) {
      return new Response('User not found', { status: 404 })
    }

    // Only allow users to access their own data unless they're an admin
    if (user.id !== session.user.id && session.user.role !== UserRole.ADMIN) {
      return new Response('Unauthorized', { status: 401 })
    }

    return Response.json(user)
  } catch (error) {
    console.error('Error fetching user:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new Response('Unauthorized', { status: 401 })
    }

    const user = await mockDb.findUserById(params.id)
    if (!user) {
      return new Response('User not found', { status: 404 })
    }

    // Only allow users to update their own data unless they're an admin
    if (user.id !== session.user.id && session.user.role !== UserRole.ADMIN) {
      return new Response('Unauthorized', { status: 401 })
    }

    const data = await request.json()
    const updatedUser = await mockDb.updateUser(params.id, data)

    if (!updatedUser) {
      return new Response('Failed to update user', { status: 500 })
    }

    return Response.json(updatedUser)
  } catch (error) {
    console.error('Error updating user:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new Response('Unauthorized', { status: 401 })
    }

    // Only allow admins to delete users
    if (session.user.role !== UserRole.ADMIN) {
      return new Response('Unauthorized', { status: 401 })
    }

    const success = await mockDb.deleteUser(params.id)
    if (!success) {
      return new Response('User not found', { status: 404 })
    }

    return new Response(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting user:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
} 