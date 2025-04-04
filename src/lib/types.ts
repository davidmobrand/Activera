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

export const ExerciseCategoryDescription = {
  [ExerciseCategory.OPPENHET]: 'Övningar för att utveckla din förmåga att vara öppen för nya erfarenheter och acceptera dina tankar och känslor som de är. Här tränar du på att möta livets utmaningar med nyfikenhet och flexibilitet.',
  [ExerciseCategory.NARVARO]: 'Övningar som hjälper dig att vara närvarande i nuet och uppmärksamma dina upplevelser utan att döma. Här lär du dig mindfulness och att hantera stress genom medveten närvaro.',
  [ExerciseCategory.ENGAGEMANG]: 'Övningar som stödjer dig i att leva ett rikt och meningsfullt liv i linje med dina värderingar. Här utforskar du vad som är viktigt för dig och tar steg mot dina mål.'
} as const;

export type ExerciseCategory = typeof ExerciseCategory[keyof typeof ExerciseCategory];

import { Language } from './i18n/types';

export interface Exercise {
  id: string;
  translations: {
    [lang in Language]: {
      title: string;
      content: string;
    };
  };
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