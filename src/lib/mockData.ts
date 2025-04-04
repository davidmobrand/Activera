// User Types and Data
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
  createdAt: Date;
  updatedAt: Date;
}

// Exercise Types and Data
export const ExerciseCategory = {
  OPPENHET: 'OPPENHET',
  NARVARO: 'NARVARO',
  ENGAGEMANG: 'ENGAGEMANG'
} as const;

export type ExerciseCategory = typeof ExerciseCategory[keyof typeof ExerciseCategory];

export type Exercise = {
  id: string;
  title: string;
  content: string;
  category: ExerciseCategory;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  mediaIds: string[];
};

// Media Types and Data
export const MediaType = {
  IMAGE: 'IMAGE',
  AUDIO: 'AUDIO'
} as const;

export type MediaType = typeof MediaType[keyof typeof MediaType];

export type Media = {
  id: string;
  exerciseId: string;
  type: MediaType;
  url: string;
  name: string;
  createdAt: string;
};

export interface ExerciseProgress {
  id: string;
  userId: string;
  exerciseId: string;
  completed: boolean;
  notes?: string;
  startedAt: Date;
  completedAt?: Date;
}

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@activera.com',
    password: '$2a$10$mockHashedPasswordForAdmin',
    role: UserRole.ADMIN,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'Test Client',
    email: 'client@example.com',
    password: '$2a$10$mockHashedPasswordForClient',
    role: UserRole.CLIENT,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    password: '$2a$10$mockHashedPassword',
    role: UserRole.CLIENT,
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15')
  },
  {
    id: '4',
    name: 'Michael Chen',
    email: 'michael@example.com',
    password: '$2a$10$mockHashedPassword',
    role: UserRole.CLIENT,
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-03-01')
  },
  {
    id: '5',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    password: '$2a$10$mockHashedPassword',
    role: UserRole.CLIENT,
    createdAt: new Date('2024-03-15'),
    updatedAt: new Date('2024-03-15')
  }
];

// Mock Media Files
export const mediaFiles: Media[] = [
  {
    id: '1',
    exerciseId: '1',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/peaceful-meditation.jpg',
    name: 'Peaceful Meditation at Sunrise',
    createdAt: new Date('2024-01-15').toISOString()
  },
  {
    id: '2',
    exerciseId: '1',
    type: MediaType.AUDIO,
    url: '/assets/exercises/audio/calm-meditation.mp3',
    name: 'Calming Meditation Music',
    createdAt: new Date('2024-01-15').toISOString()
  },
  {
    id: '3',
    exerciseId: '2',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/mindful-yoga.jpg',
    name: 'Mindful Yoga Pose',
    createdAt: new Date('2024-01-16').toISOString()
  },
  {
    id: '4',
    exerciseId: '2',
    type: MediaType.AUDIO,
    url: '/assets/exercises/audio/zen-meditation.mp3',
    name: 'Zen Meditation Sounds',
    createdAt: new Date('2024-01-16').toISOString()
  }
];

// Mock Exercises
export const exercises: Exercise[] = [
  {
    id: '1',
    title: 'Mindful Breathing',
    content: `
      <h2>Mindful Breathing Exercise</h2>
      <p>This simple but powerful mindfulness exercise will help you stay present and centered.</p>
      <img src="/assets/exercises/images/peaceful-meditation.jpg" alt="Peaceful Meditation at Sunrise" />
      <h3>Instructions:</h3>
      <ol>
        <li>Find a comfortable seated position</li>
        <li>Close your eyes or maintain a soft gaze</li>
        <li>Focus your attention on your breath</li>
        <li>Notice the sensation of breathing without trying to change it</li>
        <li>When your mind wanders, gently bring it back to your breath</li>
      </ol>
      <p>Listen to this calming meditation music while practicing:</p>
      <audio controls src="/assets/exercises/audio/calm-meditation.mp3"></audio>
      <p>Practice this exercise for 5-10 minutes daily to develop mindfulness.</p>
    `,
    category: ExerciseCategory.NARVARO,
    userId: '1',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01'),
    mediaIds: ['1', '2']
  },
  {
    id: '2',
    title: 'Body Scan Meditation',
    content: `
      <h2>Body Scan Meditation</h2>
      <p>A gentle practice to develop body awareness and release tension.</p>
      <img src="/assets/exercises/images/mindful-yoga.jpg" alt="Mindful Yoga Pose" />
      <h3>Instructions:</h3>
      <ol>
        <li>Lie down in a comfortable position</li>
        <li>Bring awareness to your breath</li>
        <li>Gradually scan your body from toes to head</li>
        <li>Notice any sensations without judgment</li>
        <li>Release tension with each exhale</li>
      </ol>
      <p>Practice with this calming zen music:</p>
      <audio controls src="/assets/exercises/audio/zen-meditation.mp3"></audio>
      <p>Take 15-20 minutes to complete this practice.</p>
    `,
    category: ExerciseCategory.OPPENHET,
    userId: '1',
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date('2024-01-02'),
    mediaIds: ['3', '4']
  },
  {
    id: '3',
    title: 'Gratitude Journal',
    content: `
      <p>Practice gratitude with these prompts:</p>
      <ul>
        <li>List three things you're grateful for today</li>
        <li>Write about someone who helped you recently</li>
        <li>Describe a small moment that brought you joy</li>
      </ul>
      <p>Spend at least 5 minutes writing your responses.</p>
    `,
    category: ExerciseCategory.OPPENHET,
    userId: '1',
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
    mediaIds: []
  },
  {
    id: '4',
    title: 'Values Reflection',
    content: `
      <p>Reflect on your personal values:</p>
      <ol>
        <li>List your top 3 personal values</li>
        <li>For each value, write why it's important to you</li>
        <li>Describe a recent situation where you honored these values</li>
        <li>Consider how you can better align your actions with your values</li>
      </ol>
      <p>Take 15-20 minutes for this exercise.</p>
    `,
    category: ExerciseCategory.ENGAGEMANG,
    userId: '1',
    createdAt: new Date('2024-01-04'),
    updatedAt: new Date('2024-01-04'),
    mediaIds: []
  },
  {
    id: '5',
    title: 'Self-Compassion Practice',
    content: `
      <p>Practice self-compassion with these steps:</p>
      <ol>
        <li>Identify a situation causing you difficulty</li>
        <li>Acknowledge your feelings without judgment</li>
        <li>Recognize that everyone experiences challenges</li>
        <li>Write a kind message to yourself</li>
      </ol>
      <p>Take 10 minutes for this exercise.</p>
    `,
    category: ExerciseCategory.OPPENHET,
    userId: '1',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
    mediaIds: []
  }
].map(e => ({
  ...e,
  mediaIds: e.mediaIds.map(id => mediaFiles.find(m => m.id === id)?.id || '')
}));

// Mock Exercise Progress
export const exerciseProgress: ExerciseProgress[] = [
  {
    id: '1',
    userId: '2',
    exerciseId: 'mindful-breathing',
    completed: true,
    notes: 'This was very helpful for reducing stress.',
    startedAt: new Date('2024-01-01'),
    completedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    userId: '2',
    exerciseId: 'accepting-emotions',
    completed: true,
    notes: 'Found it challenging but rewarding.',
    startedAt: new Date('2024-01-15'),
    completedAt: new Date('2024-01-15')
  },
  {
    id: '3',
    userId: '3',
    exerciseId: 'mindful-breathing',
    completed: true,
    notes: 'Really helped with anxiety.',
    startedAt: new Date('2024-02-15'),
    completedAt: new Date('2024-02-15')
  },
  {
    id: '4',
    userId: '3',
    exerciseId: 'body-scan',
    completed: true,
    notes: 'Felt more relaxed afterward.',
    startedAt: new Date('2024-02-20'),
    completedAt: new Date('2024-02-20')
  },
  {
    id: '5',
    userId: '4',
    exerciseId: 'values-exploration',
    completed: true,
    notes: 'Helped clarify my priorities.',
    startedAt: new Date('2024-03-01'),
    completedAt: new Date('2024-03-01')
  },
  {
    id: '6',
    userId: '4',
    exerciseId: 'committed-action',
    completed: false,
    notes: 'Working on implementing changes.',
    startedAt: new Date('2024-03-10')
  },
  {
    id: '7',
    userId: '5',
    exerciseId: 'self-compassion',
    completed: true,
    notes: 'This practice was transformative.',
    startedAt: new Date('2024-03-15'),
    completedAt: new Date('2024-03-15')
  },
  {
    id: '8',
    userId: '5',
    exerciseId: 'defusion-techniques',
    completed: false,
    notes: 'Still practicing these techniques.',
    startedAt: new Date('2024-03-20')
  }
];

// Mock Database Implementation
export function findMediaByExerciseId(exerciseId: string): Media[] {
  return mediaFiles.filter(media => media.exerciseId === exerciseId);
}

export function createMedia(media: Omit<Media, 'id' | 'createdAt'>): Media {
  const newMedia: Media = {
    ...media,
    id: Math.random().toString(36).substring(7),
    createdAt: new Date().toISOString()
  };
  mediaFiles.push(newMedia);
  return newMedia;
}

export function deleteMedia(id: string): void {
  const index = mediaFiles.findIndex(media => media.id === id);
  if (index !== -1) {
    mediaFiles.splice(index, 1);
  }
}

export function createExerciseProgress(data: {
  userId: string;
  exerciseId: string;
  completed: boolean;
  notes?: string;
  completedAt?: Date;
}): ExerciseProgress {
  const newProgress: ExerciseProgress = {
    id: Math.random().toString(36).substring(7),
    userId: data.userId,
    exerciseId: data.exerciseId,
    completed: data.completed,
    notes: data.notes,
    startedAt: new Date(),
    completedAt: data.completedAt
  };
  exerciseProgress.push(newProgress);
  return newProgress;
}

export function findExerciseById(id: string): Exercise | undefined {
  return exercises.find(exercise => exercise.id === id);
}

export function findExercises(): Exercise[] {
  return exercises;
}

export function findExerciseProgress(userId: string): ExerciseProgress[] {
  return exerciseProgress.filter(progress => progress.userId === userId);
}

export function findUserById(id: string): User | undefined {
  return users.find(user => user.id === id);
}

export function findUsers(): User[] {
  return users;
}

export function findExercisesByCategory(category: ExerciseCategory): Exercise[] {
  return exercises.filter(exercise => exercise.category === category);
}

export function updateExerciseProgress(id: string, data: { completed: boolean; completedAt?: Date }): ExerciseProgress {
  const index = exerciseProgress.findIndex(progress => progress.id === id);
  if (index === -1) {
    throw new Error('Exercise progress not found');
  }
  
  const updatedProgress = {
    ...exerciseProgress[index],
    ...data
  };
  exerciseProgress[index] = updatedProgress;
  return updatedProgress;
}

export function getExerciseMedia(mediaIds: string[]): Media[] {
  return mediaFiles.filter(media => mediaIds.includes(media.id));
}

export function findUserByEmail(email: string): User | undefined {
  return users.find(user => user.email === email);
}

// Export a namespace object with all functions and data
export const mockDb = {
  media: mediaFiles,
  exercises,
  findMediaByExerciseId,
  createMedia,
  deleteMedia,
  createExerciseProgress,
  findExerciseById,
  findExercises,
  findExerciseProgress,
  findUserById,
  findUsers,
  findExercisesByCategory,
  updateExerciseProgress,
  getExerciseMedia,
  findUserByEmail
} as const;