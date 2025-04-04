import {
  findUserById,
  findUserByEmail,
  findUsers,
  createUser,
  deleteUser
} from './users';

import {
  findMediaByExerciseId,
  createMedia,
  deleteMedia,
  getExerciseMedia
} from './media';

import {
  findExerciseById,
  findExercises,
  findExercisesByCategory,
  createExercise,
  updateExercise,
  deleteExercise
} from './exercises';

import {
  findExerciseProgress,
  createExerciseProgress,
  updateExerciseProgress
} from './exerciseProgress';

export * from './users';
export * from './media';
export * from './exercises';
export * from './exerciseProgress';

// Export mockDb object with all functions
export const mockDb = {
  // User functions
  findUserById,
  findUserByEmail,
  findUsers,
  createUser,
  deleteUser,

  // Media functions
  findMediaByExerciseId,
  createMedia,
  deleteMedia,
  getExerciseMedia,

  // Exercise functions
  findExerciseById,
  findExercises,
  findExercisesByCategory,
  createExercise,
  updateExercise,
  deleteExercise,

  // Exercise Progress functions
  findExerciseProgress,
  createExerciseProgress,
  updateExerciseProgress
} as const; 