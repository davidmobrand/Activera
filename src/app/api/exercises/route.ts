import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Exercise, ExerciseCategoryEnum } from '@/lib/types'
import { mockDb } from '@/lib/mockData'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category') as ExerciseCategoryEnum | null

    if (category) {
      const exercises = await mockDb.exercises.findByCategory(category)
      return NextResponse.json(exercises)
    }

    // Get all exercises by category and combine them
    const exercises = await Promise.all(
      Object.values(ExerciseCategoryEnum).map(category => 
        mockDb.exercises.findByCategory(category)
      )
    ).then(results => results.flat())
    
    return NextResponse.json(exercises)
  } catch (error) {
    console.error('Error fetching exercises:', error)
    return NextResponse.json({ error: 'Failed to fetch exercises' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    const exercise = await mockDb.exercises.create({
      ...data,
      userId: session.user.id,
    })
    return NextResponse.json(exercise)
  } catch (error) {
    console.error('Error creating exercise:', error)
    return NextResponse.json({ error: 'Failed to create exercise' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ error: 'Missing exercise ID' }, { status: 400 })
    }

    const data = await request.json()
    const updatedExercise = await mockDb.exercises.update(id, data)
    return NextResponse.json(updatedExercise)
  } catch (error) {
    console.error('Error updating exercise:', error)
    return NextResponse.json({ error: 'Failed to update exercise' }, { status: 500 })
  }
} 