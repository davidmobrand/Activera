import type { User, Exercise, Media, ExerciseProgress, UserRole, ExerciseCategoryEnum, MediaType } from './types';
import { exercises } from './mockData/exercises';
import { users } from './mockData/users';
import { media } from './mockData/media';
import { exerciseProgress } from './mockData/exerciseProgress';

// Mock Database Functions
export const findMediaByExerciseId = (exerciseId: string | string[]) => {
  if (Array.isArray(exerciseId)) {
    return media.filter((item: Media) => exerciseId.includes(item.exerciseId));
  }
  return media.filter((item: Media) => item.exerciseId === exerciseId);
};

export const createMedia = (mediaInput: Omit<Media, 'id' | 'createdAt'>) => {
  const newMedia = {
    ...mediaInput,
    id: String(media.length + 1),
    createdAt: new Date().toISOString()
  };
  media.push(newMedia);
  return newMedia;
};

export const deleteMedia = (id: string) => {
  const index = media.findIndex((item: Media) => item.id === id);
  if (index !== -1) {
    media.splice(index, 1);
    return true;
  }
  return false;
};

export const findExerciseById = (id: string) => {
  return exercises.find(exercise => exercise.id === id);
};

export const findExercises = () => {
  return exercises;
};

export const findExercisesByCategory = (category: ExerciseCategoryEnum) => {
  return exercises.filter(exercise => exercise.category === category);
};

export const findExerciseProgress = (userId: string) => {
  return exerciseProgress.filter(progress => progress.userId === userId);
};

export const createExerciseProgress = (progress: Omit<ExerciseProgress, 'id'>) => {
  const newProgress = {
    ...progress,
    id: String(exerciseProgress.length + 1)
  };
  exerciseProgress.push(newProgress);
  return newProgress;
};

export const updateExerciseProgress = (id: string, data: Partial<ExerciseProgress>) => {
  const index = exerciseProgress.findIndex(progress => progress.id === id);
  if (index !== -1) {
    exerciseProgress[index] = { ...exerciseProgress[index], ...data };
    return exerciseProgress[index];
  }
  return null;
};

export const findUserById = (id: string) => {
  return users.find(user => user.id === id);
};

export const findUserByEmail = (email: string) => {
  return users.find(user => user.email === email);
};

export const findUsers = () => {
  return users;
};

export const createUser = (data: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => {
  const now = new Date().toISOString();
  const newUser = {
    ...data,
    id: String(users.length + 1),
    createdAt: now,
    updatedAt: now
  };
  users.push(newUser);
  return newUser;
};

export const deleteUser = (id: string) => {
  const index = users.findIndex(user => user.id === id);
  if (index !== -1) {
    users.splice(index, 1);
    return true;
  }
  return false;
};

export const getExerciseMedia = (exerciseId: string | string[]) => {
  if (Array.isArray(exerciseId)) {
    return media.filter((item: Media) => exerciseId.includes(item.exerciseId));
  }
  return media.filter((item: Media) => item.exerciseId === exerciseId);
};

// Mock Database Interface
export interface MockDb {
  users: {
    findById: (id: string) => Promise<User | null>;
    findByEmail: (email: string) => Promise<User | null>;
    create: (user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>) => Promise<User>;
    update: (id: string, data: Partial<User>) => Promise<User>;
    delete: (id: string) => Promise<void>;
  };
  exercises: {
    findById: (id: string) => Promise<Exercise | null>;
    findByCategory: (category: ExerciseCategoryEnum) => Promise<Exercise[]>;
    create: (exercise: Omit<Exercise, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Exercise>;
    update: (id: string, data: Partial<Exercise>) => Promise<Exercise>;
    delete: (id: string) => Promise<void>;
  };
  media: {
    findById: (id: string) => Promise<Media | null>;
    findByExerciseId: (exerciseId: string) => Promise<Media[]>;
    create: (media: Omit<Media, 'id' | 'createdAt' | 'updatedAt'>) => Promise<Media>;
    update: (id: string, data: Partial<Media>) => Promise<Media>;
    delete: (id: string) => Promise<void>;
  };
  exerciseProgress: {
    findById: (id: string) => Promise<ExerciseProgress | null>;
    findByUserId: (userId: string) => Promise<ExerciseProgress[]>;
    create: (progress: Omit<ExerciseProgress, 'id'>) => Promise<ExerciseProgress>;
    update: (id: string, data: Partial<ExerciseProgress>) => Promise<ExerciseProgress>;
    delete: (id: string) => Promise<void>;
  };
}

// Mock Database Implementation
export const mockDb: MockDb = {
  users: {
    findById: async (id) => {
      const user = users.find(u => u.id === id);
      return user ? { ...user } : null;
    },
    findByEmail: async (email) => {
      const user = users.find(u => u.email === email);
      return user ? { ...user } : null;
    },
    create: async (userData) => {
      const newUser: User = {
        ...userData,
        id: String(users.length + 1),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      users.push(newUser);
      return { ...newUser };
    },
    update: async (id, data) => {
      const index = users.findIndex(u => u.id === id);
      if (index === -1) throw new Error('User not found');
      users[index] = {
        ...users[index],
        ...data,
        updatedAt: new Date().toISOString()
      };
      return { ...users[index] };
    },
    delete: async (id) => {
      const index = users.findIndex(u => u.id === id);
      if (index === -1) throw new Error('User not found');
      users.splice(index, 1);
    }
  },
  exercises: {
    findById: async (id) => {
      const exercise = exercises.find(e => e.id === id);
      return exercise ? { ...exercise } : null;
    },
    findByCategory: async (category) => {
      return exercises
        .filter(e => e.category === category)
        .map(e => ({ ...e }));
    },
    create: async (exerciseData) => {
      const newExercise: Exercise = {
        ...exerciseData,
        id: String(exercises.length + 1),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      exercises.push(newExercise);
      return { ...newExercise };
    },
    update: async (id, data) => {
      const index = exercises.findIndex(e => e.id === id);
      if (index === -1) throw new Error('Exercise not found');
      exercises[index] = {
        ...exercises[index],
        ...data,
        updatedAt: new Date().toISOString()
      };
      return { ...exercises[index] };
    },
    delete: async (id) => {
      const index = exercises.findIndex(e => e.id === id);
      if (index === -1) throw new Error('Exercise not found');
      exercises.splice(index, 1);
    }
  },
  media: {
    findById: async (id) => {
      const mediaItem = media.find(m => m.id === id);
      return mediaItem ? { ...mediaItem } : null;
    },
    findByExerciseId: async (exerciseId) => {
      return media
        .filter(m => m.exerciseId === exerciseId)
        .map(m => ({ ...m }));
    },
    create: async (mediaData) => {
      const newMedia: Media = {
        ...mediaData,
        id: String(media.length + 1),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      media.push(newMedia);
      return { ...newMedia };
    },
    update: async (id, data) => {
      const index = media.findIndex(m => m.id === id);
      if (index === -1) throw new Error('Media not found');
      media[index] = {
        ...media[index],
        ...data,
        updatedAt: new Date().toISOString()
      };
      return { ...media[index] };
    },
    delete: async (id) => {
      const index = media.findIndex(m => m.id === id);
      if (index === -1) throw new Error('Media not found');
      media.splice(index, 1);
    }
  },
  exerciseProgress: {
    findById: async (id) => {
      const progress = exerciseProgress.find(p => p.id === id);
      return progress ? { ...progress } : null;
    },
    findByUserId: async (userId) => {
      return exerciseProgress
        .filter(p => p.userId === userId)
        .map(p => ({ ...p }));
    },
    create: async (progressData) => {
      const newProgress: ExerciseProgress = {
        ...progressData,
        id: String(exerciseProgress.length + 1)
      };
      exerciseProgress.push(newProgress);
      return { ...newProgress };
    },
    update: async (id, data) => {
      const index = exerciseProgress.findIndex(p => p.id === id);
      if (index === -1) throw new Error('Progress not found');
      exerciseProgress[index] = {
        ...exerciseProgress[index],
        ...data
      };
      return { ...exerciseProgress[index] };
    },
    delete: async (id) => {
      const index = exerciseProgress.findIndex(p => p.id === id);
      if (index === -1) throw new Error('Progress not found');
      exerciseProgress.splice(index, 1);
    }
  }
};