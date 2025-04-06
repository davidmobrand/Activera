// Exercise Detail Component Tests
// This test suite verifies the rendering and functionality of the ExerciseDetail component

import { render, screen } from '@testing-library/react'
import { ExerciseDetail } from '../ExerciseDetail'
import { ExerciseCategoryEnum, DifficultyLevel, TimeOfDay } from '@/lib/types'

// Mock next-auth/react
jest.mock('next-auth/react', () => ({
  useSession: () => ({
    data: { user: { role: 'USER' } },
    status: 'authenticated'
  })
}))

const mockExercise = {
  id: 'test-1',
  translations: {
    en: {
      title: 'Test Exercise',
      introduction: 'Test introduction',
      duration: '10 minutes',
      benefits: 'Test benefits',
      instructions: 'Test instructions',
      tips: 'Test tips',
      accessibility: 'Test accessibility',
      prerequisites: 'Test prerequisites',
      progressIndicators: 'Test progress'
    },
    sv: {
      title: 'Test Övning',
      introduction: 'Test introduktion',
      duration: '10 minuter',
      benefits: 'Test fördelar',
      instructions: 'Test instruktioner',
      tips: 'Test tips',
      accessibility: 'Test tillgänglighet',
      prerequisites: 'Test förkunskaper',
      progressIndicators: 'Test framsteg'
    }
  },
  category: ExerciseCategoryEnum.NARVARO,
  difficulty: DifficultyLevel.BEGINNER,
  recommendedTime: [TimeOfDay.MORNING],
  relatedExerciseIds: [],
  userId: 'user-1',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  mediaIds: [],
  order: 1
}

describe('ExerciseDetail', () => {
  it('renders exercise details', () => {
    render(<ExerciseDetail exercise={mockExercise} />)
    expect(screen.getByText('Test Exercise')).toBeInTheDocument()
    expect(screen.getByText('Beginner')).toBeInTheDocument()
  })
}) 