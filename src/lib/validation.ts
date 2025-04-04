import { z } from 'zod';
import { UserRole, ExerciseCategory, MediaType } from './types';

// User Validation
export const UserSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum([UserRole.ADMIN, UserRole.CLIENT]),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

// Exercise Validation
export const ExerciseSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  content: z.string().min(1),
  category: z.enum([ExerciseCategory.OPPENHET, ExerciseCategory.NARVARO, ExerciseCategory.ENGAGEMANG]),
  userId: z.string(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  mediaIds: z.array(z.string()),
  order: z.number().int().positive()
});

// Media Validation
export const MediaSchema = z.object({
  id: z.string(),
  exerciseId: z.string(),
  type: z.enum([MediaType.IMAGE, MediaType.AUDIO]),
  url: z.string().url(),
  name: z.string().min(1),
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
export const CreateMediaSchema = MediaSchema.omit({ id: true, createdAt: true });
export const CreateExerciseProgressSchema = ExerciseProgressSchema.omit({ id: true });

// Update Validation Schemas
export const UpdateUserSchema = UserSchema.partial().omit({ id: true, createdAt: true });
export const UpdateExerciseSchema = ExerciseSchema.partial().omit({ id: true, createdAt: true });
export const UpdateMediaSchema = MediaSchema.partial().omit({ id: true, createdAt: true });
export const UpdateExerciseProgressSchema = ExerciseProgressSchema.partial().omit({ id: true });

// Export types
export type User = z.infer<typeof UserSchema>;
export type Exercise = z.infer<typeof ExerciseSchema>;
export type Media = z.infer<typeof MediaSchema>;
export type ExerciseProgress = z.infer<typeof ExerciseProgressSchema>;

export type CreateUser = z.infer<typeof CreateUserSchema>;
export type CreateExercise = z.infer<typeof CreateExerciseSchema>;
export type CreateMedia = z.infer<typeof CreateMediaSchema>;
export type CreateExerciseProgress = z.infer<typeof CreateExerciseProgressSchema>;

export type UpdateUser = z.infer<typeof UpdateUserSchema>;
export type UpdateExercise = z.infer<typeof UpdateExerciseSchema>;
export type UpdateMedia = z.infer<typeof UpdateMediaSchema>;
export type UpdateExerciseProgress = z.infer<typeof UpdateExerciseProgressSchema>; 