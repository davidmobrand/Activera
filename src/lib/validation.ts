import { z } from 'zod';
import { UserRole, ExerciseCategoryEnum, MediaType, DifficultyLevel, TimeOfDay } from './types';

// User Validation
export const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.nativeEnum(UserRole),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

const TranslationSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  accessibility: z.string().optional(),
  prerequisites: z.string().optional(),
  progressIndicators: z.string().optional(),
});

const TranslationsSchema = z.object({
  en: TranslationSchema,
  sv: TranslationSchema,
});

// Exercise Validation
export const ExerciseSchema = z.object({
  id: z.string(),
  translations: TranslationsSchema,
  category: z.nativeEnum(ExerciseCategoryEnum),
  difficulty: z.nativeEnum(DifficultyLevel),
  recommendedTime: z.array(z.nativeEnum(TimeOfDay)),
  relatedExerciseIds: z.array(z.string()),
  userId: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  mediaIds: z.array(z.string()),
  order: z.number().int().positive()
});

// Media Validation
export const MediaInputSchema = z.object({
  exerciseId: z.string(),
  type: z.enum([MediaType.IMAGE, MediaType.AUDIO]),
  name: z.string().min(1)
});

export const MediaSchema = MediaInputSchema.extend({
  id: z.string(),
  url: z.string().url(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

// Exercise Progress Validation
export const ExerciseProgressSchema = z.object({
  id: z.string(),
  userId: z.string(),
  exerciseId: z.string(),
  completed: z.boolean(),
  notes: z.string().optional(),
  startedAt: z.date(),
  completedAt: z.date().optional()
});

// Input Validation Schemas
export const CreateUserSchema = UserSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const CreateExerciseSchema = ExerciseSchema.omit({ id: true, createdAt: true, updatedAt: true });
export const CreateExerciseProgressSchema = ExerciseProgressSchema.omit({ id: true });
export const CreateMediaSchema = MediaInputSchema;

// Update Validation Schemas
export const UpdateUserSchema = UserSchema.partial().omit({ id: true, createdAt: true });
export const UpdateExerciseSchema = ExerciseSchema.omit({ id: true, createdAt: true, updatedAt: true }).partial();
export const UpdateMediaSchema = MediaSchema.partial().omit({ id: true, createdAt: true });
export const UpdateExerciseProgressSchema = ExerciseProgressSchema.partial().omit({ id: true });

// Export types
export type User = z.infer<typeof UserSchema>;
export type Exercise = z.infer<typeof ExerciseSchema>;
export type Media = z.infer<typeof MediaSchema>;
export type MediaInput = z.infer<typeof MediaInputSchema>;
export type ExerciseProgress = z.infer<typeof ExerciseProgressSchema>;

export type CreateUser = z.infer<typeof CreateUserSchema>;
export type CreateExercise = z.infer<typeof CreateExerciseSchema>;
export type CreateMedia = z.infer<typeof CreateMediaSchema>;
export type CreateExerciseProgress = z.infer<typeof CreateExerciseProgressSchema>;

export type UpdateUser = z.infer<typeof UpdateUserSchema>;
export type UpdateExercise = z.infer<typeof UpdateExerciseSchema>;
export type UpdateMedia = z.infer<typeof UpdateMediaSchema>;
export type UpdateExerciseProgress = z.infer<typeof UpdateExerciseProgressSchema>; 