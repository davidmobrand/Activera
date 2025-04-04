import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { mockDb } from '@/lib/mockData'

interface Props {
  params: {
    id: string
  }
}

export async function GET(request: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const exercise = mockDb.findExerciseById(params.id)
    
    if (!exercise) {
      return NextResponse.json({ error: 'Exercise not found' }, { status: 404 })
    }

    return NextResponse.json(exercise)
  } catch (error) {
    console.error('Error fetching exercise:', error)
    return NextResponse.json(
      { error: 'Failed to fetch exercise' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const data = await request.json()
    
    // In a real app, we would update the database
    // For now, just return the mock updated exercise
    const updatedExercise = {
      id: params.id,
      ...data,
      userId: session.user.id,
      updatedAt: new Date()
    }

    return NextResponse.json(updatedExercise)
  } catch (error) {
    console.error('Error updating exercise:', error)
    return NextResponse.json(
      { error: 'Failed to update exercise' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: Props) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // In a real app, we would delete from database
    // For now, just return success
    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error('Error deleting exercise:', error)
    return NextResponse.json(
      { error: 'Failed to delete exercise' },
      { status: 500 }
    )
  }
} 