import type { Media, MediaType, MediaInput, Exercise, ExerciseCategoryEnum } from '../types';
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
import type { CreateExercise } from '../validation';

interface ExerciseDb {
  findById: (id: string) => Exercise | undefined;
  findExercises: () => Exercise[];
  findByCategory: (category: ExerciseCategoryEnum) => Exercise[];
  create: (exercise: CreateExercise) => Exercise;
  update: (id: string, data: Partial<Exercise>) => Exercise;
  delete: (id: string) => boolean;
}

interface UserDb {
  findById: typeof findUserById;
  findByEmail: typeof findUserByEmail;
  create: typeof createUser;
  update: typeof updateUser;
  delete: typeof deleteUser;
}

interface MediaDb {
  findByExerciseId: typeof findMediaByExerciseId;
  create: typeof createMedia;
  update: typeof updateMedia;
  delete: typeof deleteMedia;
  getExerciseMedia: typeof getExerciseMedia;
}

interface ExerciseProgressDb {
  find: typeof findExerciseProgress;
  create: typeof createExerciseProgress;
  update: typeof updateExerciseProgress;
}

export interface MockDb {
  exercises: ExerciseDb;
  users: UserDb;
  media: MediaDb;
  exerciseProgress: ExerciseProgressDb;
}

const db = {
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

export const mockDb: MockDb = {
  exercises: {
    findById: db.findExerciseById,
    findExercises: db.findExercises,
    findByCategory: db.findExercisesByCategory,
    create: db.createExercise,
    update: db.updateExercise,
    delete: db.deleteExercise,
  },
  users: {
    findById: db.findUserById,
    findByEmail: db.findUserByEmail,
    create: db.createUser,
    update: db.updateUser,
    delete: db.deleteUser,
  },
  media: {
    findByExerciseId: db.findMediaByExerciseId,
    create: db.createMedia,
    update: db.updateMedia,
    delete: db.deleteMedia,
    getExerciseMedia: db.getExerciseMedia,
  },
  exerciseProgress: {
    find: db.findExerciseProgress,
    create: db.createExerciseProgress,
    update: db.updateExerciseProgress,
  },
}; 