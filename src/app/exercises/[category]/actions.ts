'use client'

import { updateProgress as serverUpdateProgress } from '../actions'

export async function updateExerciseProgress(exerciseId: string, completed: boolean) {
  try {
    const response = await serverUpdateProgress(exerciseId, completed)
    if (!response.success && response.error) {
      throw new Error(response.error)
    }
    return response.success
  } catch (error) {
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Failed to update progress')
  }
} 