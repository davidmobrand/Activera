'use server'

import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { mockDb } from '@/lib/mockData'
import { ExerciseProgress } from '@/lib/types'

type ProgressResponse = {
  success: boolean;
  error?: string;
}

export async function updateProgress(exerciseId: string, completed: boolean): Promise<ProgressResponse> {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return {
        success: false,
        error: 'You must be logged in to update progress'
      }
    }

    const exercise = await mockDb.exercises.findById(exerciseId)
    if (!exercise) {
      return {
        success: false,
        error: 'Exercise not found'
      }
    }

    const progress = await mockDb.exerciseProgress.findByUserId(session.user.id)
    const existingProgress = progress.find((p: ExerciseProgress) => p.exerciseId === exerciseId)

    if (existingProgress) {
      await mockDb.exerciseProgress.update(existingProgress.id, {
        completed,
        completedAt: completed ? new Date() : undefined
      })
    } else {
      await mockDb.exerciseProgress.create({
        userId: session.user.id,
        exerciseId,
        completed,
        notes: '',
        startedAt: new Date(),
        completedAt: completed ? new Date() : undefined
      })
    }

    // Revalidate the exercises page to reflect the changes
    revalidatePath('/exercises/[category]')
    
    return { success: true }
  } catch (error) {
    console.error('Error updating progress:', error)
    return {
      success: false,
      error: 'An unexpected error occurred while updating progress'
    }
  }
}

export async function completeExercise(exerciseId: string, completed: boolean) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      throw new Error('Not authenticated')
    }

    const userId = session.user.id

    // Find the exercise to ensure it exists
    const exercise = await mockDb.exercises.findById(exerciseId)
    if (!exercise) {
      throw new Error('Exercise not found')
    }

    // Update or create progress
    const progress = await mockDb.exerciseProgress.create({
      userId,
      exerciseId,
      completed,
      startedAt: new Date(),
      completedAt: completed ? new Date() : undefined,
      notes: ''
    })

    revalidatePath('/exercises')
    return { success: true, progress }
  } catch (error) {
    console.error('Error completing exercise:', error)
    return { success: false, error: 'Failed to update exercise progress' }
  }
} 