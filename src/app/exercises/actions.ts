'use server'

import { revalidatePath } from 'next/cache'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { mockDb } from '@/lib/mockData'

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

    const exercise = mockDb.findExerciseById(exerciseId)
    if (!exercise) {
      return {
        success: false,
        error: 'Exercise not found'
      }
    }

    const progress = mockDb.findExerciseProgress(session.user.id)
    const existingProgress = progress.find(p => p.exerciseId === exerciseId)

    if (existingProgress) {
      mockDb.updateExerciseProgress(existingProgress.id, {
        completed,
        completedAt: completed ? new Date() : undefined
      })
    } else {
      mockDb.createExerciseProgress({
        userId: session.user.id,
        exerciseId,
        completed,
        notes: '',
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