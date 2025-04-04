export enum ExerciseCategory {
  NARVARO = 'NARVARO',
  OPPENHET = 'OPPENHET',
  ENGAGEMANG = 'ENGAGEMANG'
}

export interface Exercise {
  id: string
  title: string
  content: string
  category: ExerciseCategory
  userId: string
  createdAt: Date
  updatedAt: Date
  mediaIds: string[]
  order: number
}

export interface Media {
  id: string
  exerciseId: string
  type: MediaType
  url: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export enum MediaType {
  IMAGE = 'IMAGE',
  AUDIO = 'AUDIO',
  VIDEO = 'VIDEO'
}

export interface ExerciseProgress {
  id: string
  userId: string
  exerciseId: string
  completed: boolean
  notes?: string
  startedAt: Date
  completedAt?: Date
} 