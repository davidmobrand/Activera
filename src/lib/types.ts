import { Language } from './i18n/types'
import { UserRole } from './constants/users'
import { ExerciseCategoryEnum } from './constants/categories'
import { DifficultyLevel, TimeOfDay, MediaType } from './constants/exercises'

export const ExerciseCategoryDisplay = {
  [ExerciseCategoryEnum.NARVARO]: 'Närvaro',
  [ExerciseCategoryEnum.OPPENHET]: 'Öppenhet',
  [ExerciseCategoryEnum.ENGAGEMANG]: 'Engagemang',
} as const;

export const ExerciseCategoryDescription = {
  [ExerciseCategoryEnum.OPPENHET]: 'Övningar för att utveckla din förmåga att vara öppen för nya erfarenheter och acceptera dina tankar och känslor som de är. Här tränar du på att möta livets utmaningar med nyfikenhet och flexibilitet.',
  [ExerciseCategoryEnum.NARVARO]: 'Övningar som hjälper dig att vara närvarande i nuet och uppmärksamma dina upplevelser utan att döma. Här lär du dig mindfulness och att hantera stress genom medveten närvaro.',
  [ExerciseCategoryEnum.ENGAGEMANG]: 'Övningar som stödjer dig i att leva ett rikt och meningsfullt liv i linje med dina värderingar. Här utforskar du vad som är viktigt för dig och tar steg mot dina mål.'
} as const;

export type Translation = {
  title: string;
  introduction: string;
  duration: string;
  benefits: string;
  instructions: string;
  tips: string;
  accessibility: string;
  prerequisites: string;
  progressIndicators: string;
}

export interface Exercise {
  id: string
  translations: Record<Language, Translation>
  category: ExerciseCategoryEnum
  difficulty: DifficultyLevel
  recommendedTime: TimeOfDay[]
  relatedExerciseIds: string[]
  userId: string
  createdAt: string
  updatedAt: string
  mediaIds: string[]
  order: number
}

export interface User {
  id: string
  name?: string
  email: string
  password: string
  role: UserRole
  createdAt: string
  updatedAt: string
}

export interface MediaInput {
  exerciseId: string
  type: MediaType
  name: string
}

export interface Media extends MediaInput {
  id: string
  url: string
  createdAt: string
  updatedAt: string
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

export type PageProps<T = Record<string, string>> = {
  params: Promise<T>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

// Re-export constants for backward compatibility
export { UserRole, ExerciseCategoryEnum, DifficultyLevel, TimeOfDay, MediaType } 