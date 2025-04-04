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
  order: number;
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
    mediaIds: ['1', '2'],
    order: 1
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
    mediaIds: ['3', '4'],
    order: 1
  },
  {
    id: '3',
    title: 'Five Senses Grounding',
    content: `
      <h2>Five Senses Grounding Exercise</h2>
      <p>A powerful mindfulness exercise to anchor yourself in the present moment using your senses.</p>
      <h3>Instructions:</h3>
      <ol>
        <li>Find a comfortable position and take a deep breath</li>
        <li>Notice 5 things you can SEE in your environment</li>
        <li>Identify 4 things you can FEEL (textures, temperature, etc.)</li>
        <li>Focus on 3 different SOUNDS you can hear</li>
        <li>Recognize 2 distinct SMELLS in your surroundings</li>
        <li>Pay attention to 1 TASTE in your mouth</li>
      </ol>
      <p>This exercise is particularly helpful during moments of anxiety or when feeling disconnected.</p>
    `,
    category: ExerciseCategory.NARVARO,
    userId: '1',
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date('2024-01-03'),
    mediaIds: [],
    order: 2
  },
  {
    id: '4',
    title: 'Leaves on a Stream',
    content: `
      <h2>Leaves on a Stream Visualization</h2>
      <p>A gentle exercise for practicing acceptance and letting go of difficult thoughts.</p>
      <h3>Instructions:</h3>
      <ol>
        <li>Imagine yourself sitting beside a gently flowing stream</li>
        <li>Picture leaves floating by on the surface of the water</li>
        <li>When thoughts arise, place each one on a leaf</li>
        <li>Watch as the leaves carrying your thoughts drift away</li>
        <li>If you get caught up in a thought, gently return to watching the stream</li>
      </ol>
      <p>Remember: The goal isn't to get rid of thoughts, but to practice letting them come and go.</p>
    `,
    category: ExerciseCategory.OPPENHET,
    userId: '1',
    createdAt: new Date('2024-01-04'),
    updatedAt: new Date('2024-01-04'),
    mediaIds: [],
    order: 2
  },
  {
    id: '5',
    title: 'Values Compass',
    content: `
      <h2>Values Compass Exercise</h2>
      <p>An exercise to help you identify and connect with your core values.</p>
      <h3>Instructions:</h3>
      <ol>
        <li>Take a moment to reflect on what matters most to you in life</li>
        <li>Consider different life domains (relationships, work, personal growth, etc.)</li>
        <li>For each domain, ask yourself:
          <ul>
            <li>What kind of person do I want to be in this area?</li>
            <li>What do I want to stand for?</li>
            <li>What qualities do I want to embody?</li>
          </ul>
        </li>
        <li>Write down specific actions that align with these values</li>
        <li>Choose one small step you can take today</li>
      </ol>
      <p>Use this compass regularly to guide your decisions and actions.</p>
    `,
    category: ExerciseCategory.ENGAGEMANG,
    userId: '1',
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-05'),
    mediaIds: [],
    order: 1
  },
  {
    id: '6',
    title: 'Mindful Walking',
    content: `
      <h2>Mindful Walking Practice</h2>
      <p>A practice to bring mindfulness to everyday movement.</p>
      <h3>Instructions:</h3>
      <ol>
        <li>Find a quiet space where you can walk slowly</li>
        <li>Stand still and become aware of your body's weight and balance</li>
        <li>Begin walking very slowly, paying attention to each movement</li>
        <li>Notice the lifting, moving, and placing of each foot</li>
        <li>Feel the contact between your feet and the ground</li>
        <li>When your mind wanders, gently return to the sensations of walking</li>
      </ol>
      <p>Practice this for 5-10 minutes, gradually increasing the duration.</p>
    `,
    category: ExerciseCategory.NARVARO,
    userId: '1',
    createdAt: new Date('2024-01-06'),
    updatedAt: new Date('2024-01-06'),
    mediaIds: [],
    order: 3
  },
  {
    id: '7',
    title: 'Acceptance of Emotions',
    content: `
      <h2>Acceptance of Emotions Exercise</h2>
      <p>A practice for developing a more accepting relationship with difficult emotions.</p>
      <h3>Instructions:</h3>
      <ol>
        <li>Notice any emotion present right now</li>
        <li>Observe where you feel it in your body</li>
        <li>Describe the sensation (temperature, weight, movement, etc.)</li>
        <li>Make room for the emotion - imagine creating space around it</li>
        <li>Allow it to be there, just as it is</li>
        <li>Notice that you are larger than any emotion</li>
      </ol>
      <p>Practice this especially with emotions you typically try to avoid.</p>
    `,
    category: ExerciseCategory.OPPENHET,
    userId: '1',
    createdAt: new Date('2024-01-07'),
    updatedAt: new Date('2024-01-07'),
    mediaIds: [],
    order: 3
  },
  {
    id: '8',
    title: 'Committed Action Plan',
    content: `
      <h2>Committed Action Planning Exercise</h2>
      <p>A structured approach to taking value-guided action.</p>
      <h3>Instructions:</h3>
      <ol>
        <li>Select one of your core values</li>
        <li>Identify a specific goal that expresses this value</li>
        <li>Break down the goal into small, manageable steps</li>
        <li>For each step, consider:
          <ul>
            <li>What might get in the way?</li>
            <li>How will you handle obstacles?</li>
            <li>What support do you need?</li>
          </ul>
        </li>
        <li>Schedule your first action step</li>
        <li>Track your progress and adjust as needed</li>
      </ol>
      <p>Remember: Focus on the process rather than the outcome.</p>
    `,
    category: ExerciseCategory.ENGAGEMANG,
    userId: '1',
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-08'),
    mediaIds: [],
    order: 2
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
];

// Mock Database Functions
export const findMediaByExerciseId = (exerciseId: string | string[]) => {
  if (Array.isArray(exerciseId)) {
    return mediaFiles.filter(media => exerciseId.includes(media.exerciseId));
  }
  return mediaFiles.filter(media => media.exerciseId === exerciseId);
};

export const createMedia = (media: Omit<Media, 'id' | 'createdAt'>) => {
  const newMedia = {
    ...media,
    id: String(mediaFiles.length + 1),
    createdAt: new Date().toISOString()
  };
  mediaFiles.push(newMedia);
  return newMedia;
};

export const deleteMedia = (id: string) => {
  const index = mediaFiles.findIndex(media => media.id === id);
  if (index !== -1) {
    mediaFiles.splice(index, 1);
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

export const findExercisesByCategory = (category: ExerciseCategory) => {
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
  const newUser = {
    ...data,
    id: String(users.length + 1),
    createdAt: new Date(),
    updatedAt: new Date()
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
    return mediaFiles.filter(media => exerciseId.includes(media.exerciseId));
  }
  return mediaFiles.filter(media => media.exerciseId === exerciseId);
};

// Export mockDb object with all functions
export const mockDb = {
  findMediaByExerciseId,
  createMedia,
  deleteMedia,
  findExerciseById,
  findExercises,
  findExercisesByCategory,
  findExerciseProgress,
  createExerciseProgress,
  updateExerciseProgress,
  findUserById,
  findUserByEmail,
  findUsers,
  createUser,
  deleteUser,
  getExerciseMedia
};