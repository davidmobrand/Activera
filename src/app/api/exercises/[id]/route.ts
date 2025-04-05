import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Exercise, UserRole } from '@/lib/types'
import { mockDb } from '@/lib/mockData'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const exercise = await mockDb.exercises.findById(params.id)
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

    const existingExercise = await mockDb.exercises.findById(params.id)
    if (!existingExercise) {
      return new Response('Exercise not found', { status: 404 })
    }

    // Only allow users to update their own exercises or admin users
    if (existingExercise.userId !== session.user.id && session.user.role !== UserRole.ADMIN) {
      return new Response('Unauthorized', { status: 401 })
    }

    const data = await request.json()
    const updatedExercise = await mockDb.exercises.update(params.id, data)
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

    const existingExercise = await mockDb.exercises.findById(params.id)
    if (!existingExercise) {
      return new Response('Exercise not found', { status: 404 })
    }

    // Only allow users to delete their own exercises or admin users
    if (existingExercise.userId !== session.user.id && session.user.role !== UserRole.ADMIN) {
      return new Response('Unauthorized', { status: 401 })
    }

    mockDb.exercises.delete(params.id)
    return new Response(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting exercise:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
} 