import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Exercise, UserRole } from '@/lib/types'
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

    const exercise = await mockDb.findExerciseById(params.id)
    if (!exercise) {
      return new Response('Exercise not found', { status: 404 })
    }

    return Response.json(exercise)
  } catch (error) {
    console.error('Error fetching exercise:', error)
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

    const exercise = await mockDb.findExerciseById(params.id)
    if (!exercise) {
      return new Response('Exercise not found', { status: 404 })
    }

    // Only allow users to update their own exercises or admin users
    if (exercise.userId !== session.user.id && session.user.role !== UserRole.ADMIN) {
      return new Response('Unauthorized', { status: 401 })
    }

    const data = await request.json()
    const updatedExercise = await mockDb.updateExercise(params.id, data)
    if (!updatedExercise) {
      return new Response('Failed to update exercise', { status: 500 })
    }

    return Response.json(updatedExercise)
  } catch (error) {
    console.error('Error updating exercise:', error)
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

    const exercise = await mockDb.findExerciseById(params.id)
    if (!exercise) {
      return new Response('Exercise not found', { status: 404 })
    }

    // Only allow users to delete their own exercises or admin users
    if (exercise.userId !== session.user.id && session.user.role !== UserRole.ADMIN) {
      return new Response('Unauthorized', { status: 401 })
    }

    const success = await mockDb.deleteExercise(params.id)
    if (!success) {
      return new Response('Failed to delete exercise', { status: 500 })
    }

    return new Response(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting exercise:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
} 