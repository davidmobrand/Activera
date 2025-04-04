import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Exercise, ExerciseCategory, UserRole } from '@/lib/types'
import { mockDb } from '@/lib/mockData'

export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new Response('Unauthorized', { status: 401 })
    }

    const exercises = await mockDb.findExercisesByCategory(ExerciseCategory.NARVARO)
    return Response.json(exercises)
  } catch (error) {
    console.error('Error fetching exercises:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return new Response('Unauthorized', { status: 401 })
    }

    const data = await request.json()
    const exercise = await mockDb.createExercise({
      ...data,
      userId: session.user.id
    })

    return Response.json(exercise)
  } catch (error) {
    console.error('Error creating exercise:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id || session.user.role !== UserRole.ADMIN) {
      return new Response('Unauthorized', { status: 401 })
    }

    const data = await request.json()
    const { id } = data

    if (!id) {
      return new Response('Exercise ID is required', { status: 400 })
    }

    const exercise = await mockDb.findExerciseById(id)
    if (!exercise) {
      return new Response('Exercise not found', { status: 404 })
    }

    const updatedExercise = await mockDb.updateExercise(id, data)
    if (!updatedExercise) {
      return new Response('Failed to update exercise', { status: 500 })
    }

    return Response.json(updatedExercise)
  } catch (error) {
    console.error('Error updating exercise:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
} 