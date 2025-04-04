export const UserRole = {
  ADMIN: 'ADMIN',
  CLIENT: 'CLIENT'
} as const;

export type UserRole = typeof UserRole[keyof typeof UserRole];

export interface User {
  id: string;
  name?: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: string;
  updatedAt: string;
}

export const ExerciseCategory = {
  OPPENHET: 'OPPENHET',
  NARVARO: 'NARVARO',
  ENGAGEMANG: 'ENGAGEMANG'
} as const;

export const ExerciseCategoryDisplay = {
  [ExerciseCategory.OPPENHET]: 'Öppenhet',
  [ExerciseCategory.NARVARO]: 'Närvaro',
  [ExerciseCategory.ENGAGEMANG]: 'Engagemang'
} as const;

export type ExerciseCategory = typeof ExerciseCategory[keyof typeof ExerciseCategory];

export interface Exercise {
  id: string;
  title: string;
  content: string;
  category: ExerciseCategory;
  userId: string;
  createdAt: string;
  updatedAt: string;
  mediaIds: string[];
  order: number;
}

export const MediaType = {
  IMAGE: 'IMAGE',
  AUDIO: 'AUDIO'
} as const;

export type MediaType = typeof MediaType[keyof typeof MediaType];

export interface MediaInput {
  exerciseId: string;
  type: MediaType;
  name: string;
}

export interface Media extends MediaInput {
  id: string;
  url: string;
  createdAt: string;
  updatedAt: string;
}

export interface ExerciseProgress {
  id: string;
  userId: string;
  exerciseId: string;
  completed: boolean;
  notes?: string;
  startedAt: Date;
  completedAt?: Date;
} 