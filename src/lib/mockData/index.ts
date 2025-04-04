import type { Media, MediaType, MediaInput } from '../types';
import {
  findUserById,
  findUserByEmail,
  createUser,
  updateUser,
  deleteUser
} from './users';
import {
  findMediaByExerciseId,
  createMedia,
  updateMedia,
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

export interface MockDb {
  // User functions
  findUserById: typeof findUserById;
  findUserByEmail: typeof findUserByEmail;
  createUser: typeof createUser;
  updateUser: typeof updateUser;
  deleteUser: typeof deleteUser;

  // Media functions
  findMediaByExerciseId: typeof findMediaByExerciseId;
  createMedia: typeof createMedia;
  updateMedia: typeof updateMedia;
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

export const mockDb: MockDb = {
  findUserById,
  findUserByEmail,
  createUser,
  updateUser,
  deleteUser,

  findMediaByExerciseId,
  createMedia,
  updateMedia,
  deleteMedia,
  getExerciseMedia,

  findExerciseById,
  findExercises,
  findExercisesByCategory,
  createExercise,
  updateExercise,
  deleteExercise,

  findExerciseProgress,
  createExerciseProgress,
  updateExerciseProgress
}; 