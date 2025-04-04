import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { ExerciseProgress } from '@/lib/types'
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

    const allProgress = await mockDb.exerciseProgress.findByUserId(session.user.id)
    const progress = allProgress.find((p: ExerciseProgress) => p.exerciseId === params.id)
    return Response.json(progress || null)
  } catch (error) {
    console.error('Error fetching exercise progress:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new Response('Unauthorized', { status: 401 })
    }

    const data = await request.json()
    const { completed, notes } = data

    if (typeof completed !== 'boolean') {
      return new Response('Invalid completed status', { status: 400 })
    }

    const progress = await mockDb.exerciseProgress.create({
      exerciseId: params.id,
      userId: session.user.id,
      completed,
      notes: notes || '',
      startedAt: new Date()
    })

    return Response.json(progress)
  } catch (error) {
    console.error('Error creating exercise progress:', error)
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

    const data = await request.json()
    const { completed, notes } = data

    if (typeof completed !== 'boolean') {
      return new Response('Invalid completed status', { status: 400 })
    }

    // First find the existing progress
    const allProgress = await mockDb.exerciseProgress.findByUserId(session.user.id)
    const existingProgress = allProgress.find((p: ExerciseProgress) => p.exerciseId === params.id)

    if (!existingProgress) {
      return new Response('Progress not found', { status: 404 })
    }

    const progress = await mockDb.exerciseProgress.update(existingProgress.id, {
      completed,
      notes: notes || '',
      completedAt: completed ? new Date() : undefined
    })

    if (!progress) {
      return new Response('Failed to update progress', { status: 500 })
    }

    return Response.json(progress)
  } catch (error) {
    console.error('Error updating exercise progress:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
} 