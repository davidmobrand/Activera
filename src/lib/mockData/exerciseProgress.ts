import { ExerciseProgress } from '../types';
import { CreateExerciseProgressSchema, ExerciseProgressSchema, UpdateExerciseProgressSchema } from '../validation';
import type { CreateExerciseProgress } from '../validation';

// Mock Exercise Progress
export const exerciseProgress: ExerciseProgress[] = [
  {
    id: '1',
    userId: '2',
    exerciseId: '1',
    completed: true,
    notes: 'Felt very relaxed after this session',
    startedAt: new Date('2024-01-15'),
    completedAt: new Date('2024-01-15')
  },
  {
    id: '2',
    userId: '2',
    exerciseId: '2',
    completed: false,
    startedAt: new Date('2024-01-16')
  }
].map(progress => ExerciseProgressSchema.parse(progress));

// Exercise Progress Database Functions
export const findExerciseProgress = (userId: string): ExerciseProgress[] => {
  return exerciseProgress
    .filter(progress => progress.userId === userId)
    .map(progress => ExerciseProgressSchema.parse(progress));
};

export const createExerciseProgress = (progress: CreateExerciseProgress): ExerciseProgress => {
  const validatedData = CreateExerciseProgressSchema.parse(progress);
  const newProgress = {
    ...validatedData,
    id: String(exerciseProgress.length + 1)
  };
  const validatedProgress = ExerciseProgressSchema.parse(newProgress);
  exerciseProgress.push(validatedProgress);
  return validatedProgress;
};

export const updateExerciseProgress = (id: string, data: Partial<ExerciseProgress>): ExerciseProgress | null => {
  const validatedData = UpdateExerciseProgressSchema.parse(data);
  const index = exerciseProgress.findIndex(progress => progress.id === id);
  if (index !== -1) {
    const updatedProgress = {
      ...exerciseProgress[index],
      ...validatedData
    };
    const validatedProgress = ExerciseProgressSchema.parse(updatedProgress);
    exerciseProgress[index] = validatedProgress;
    return validatedProgress;
  }
  return null;
}; 