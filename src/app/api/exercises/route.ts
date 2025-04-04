import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { mockDb, exercises, Exercise } from '@/lib/mockData'

export async function GET() {
  const session = await getServerSession(authOptions)
  
  console.log('[API] Exercises GET - Session:', session)

  try {
    const exercises = mockDb.findExercises()
    console.log('[API] Exercises GET - Success:', { count: exercises.length })
    return NextResponse.json(exercises)
  } catch (error) {
    console.error('[API] Exercises GET - Error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch exercises' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions)
  
  console.log('[API] Exercises POST - Session:', session)

  if (!session?.user || session.user.role !== 'ADMIN') {
    console.log('[API] Exercises POST - Unauthorized access attempt')
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await request.json()
    
    // Validate required fields
    if (!data.title || !data.content || !data.category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Create new exercise
    const newExercise: Exercise = {
      id: String(exercises.length + 1),
      title: data.title,
      content: data.content,
      category: data.category,
      userId: session.user.id,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      mediaIds: [],
      order: data.order || exercises.length + 1
    }

    exercises.push(newExercise)
    console.log('[API] Exercises POST - Created exercise:', newExercise)
    return NextResponse.json(newExercise)
  } catch (error) {
    console.error('[API] Exercises POST - Error:', error)
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
      updatedAt: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error updating exercise:', error)
    return NextResponse.json(
      { error: 'Failed to update exercise' },
      { status: 500 }
    )
  }
} 