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

import type { Media, MediaType } from '../types';
import type { CreateMedia } from '../validation';

export * from './users';
export * from './media';
export * from './exercises';
export * from './exerciseProgress';

interface MockDb {
  // User functions
  findUserById: typeof findUserById;
  findUserByEmail: typeof findUserByEmail;
  findUsers: typeof findUsers;
  createUser: typeof createUser;
  deleteUser: typeof deleteUser;

  // Media functions
  findMediaByExerciseId: typeof findMediaByExerciseId;
  createMedia: {
    (data: { exerciseId: string; type: MediaType; url: string; name: string; }): Media;
  };
  deleteMedia: typeof deleteMedia;
  getExerciseMedia: typeof getExerciseMedia;

  // Exercise functions
  findExerciseById: typeof findExerciseById;
  findExercises: typeof findExercises;
  findExercisesByCategory: typeof findExercisesByCategory;
  createExercise: typeof createExercise;
  updateExercise: typeof updateExercise;
  deleteExercise: typeof deleteExercise;

  // Exercise Progress functions
  findExerciseProgress: typeof findExerciseProgress;
  createExerciseProgress: typeof createExerciseProgress;
  updateExerciseProgress: typeof updateExerciseProgress;
}

// Export mockDb object with all functions
export const mockDb: MockDb = {
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
}; 