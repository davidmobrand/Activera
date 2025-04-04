import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { mockDb, Exercise } from '@/lib/mockData'

export async function GET() {
  try {
    // Get exercises using the findExercises function
    const exercises = mockDb.findExercises()
    
    // Map exercises to ensure we're returning the correct format
    const formattedExercises = exercises.map(exercise => ({
      id: exercise.id,
      title: exercise.title,
      content: exercise.content,
      category: exercise.category,
      userId: exercise.userId,
      createdAt: exercise.createdAt,
      updatedAt: exercise.updatedAt,
      media: mockDb.getExerciseMedia(exercise.id)
    }))

    return NextResponse.json(formattedExercises)
  } catch (error) {
    console.error('Error fetching exercises:', error)
    return NextResponse.json(
      { error: 'Failed to fetch exercises' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await request.json()
    const newExercise = {
      id: Math.random().toString(),
      ...data,
      userId: session.user.id,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    // In a real app, we would save to database
    // For now, just return the mock exercise
    return NextResponse.json(newExercise)
  } catch (error) {
    console.error('Error creating exercise:', error)
    return NextResponse.json(
      { error: 'Failed to create exercise' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await request.json()
    const { id, title, content, category, order } = data

    // In a real app, we would update the database
    // For now, just return the mock updated exercise
    return NextResponse.json({
      id,
      title,
      content,
      category,
      order,
      userId: session.user.id,
      updatedAt: new Date()
    })
  } catch (error) {
    console.error('Error updating exercise:', error)
    return NextResponse.json(
      { error: 'Failed to update exercise' },
      { status: 500 }
    )
  }
} 