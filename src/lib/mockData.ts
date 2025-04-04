import type { User, Exercise, Media, ExerciseProgress } from './types';
import { UserRole, ExerciseCategory, MediaType } from './types';
import { exercises } from './mockData/exercises';

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
  createdAt: string;
  updatedAt: string;
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
  createdAt: string;
  updatedAt: string;
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
  updatedAt: string;
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
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Test Client',
    email: 'client@example.com',
    password: '$2a$10$mockHashedPasswordForClient',
    role: UserRole.CLIENT,
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    password: '$2a$10$mockHashedPassword',
    role: UserRole.CLIENT,
    createdAt: '2024-02-15T00:00:00Z',
    updatedAt: '2024-02-15T00:00:00Z'
  },
  {
    id: '4',
    name: 'Michael Chen',
    email: 'michael@example.com',
    password: '$2a$10$mockHashedPassword',
    role: UserRole.CLIENT,
    createdAt: '2024-03-01T00:00:00Z',
    updatedAt: '2024-03-01T00:00:00Z'
  },
  {
    id: '5',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    password: '$2a$10$mockHashedPassword',
    role: UserRole.CLIENT,
    createdAt: '2024-03-15T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z'
  }
];

// Mock Media Files
export const mediaFiles: Media[] = [
  {
    id: '1',
    exerciseId: '1',
    type: MediaType.IMAGE,
    url: '/images/peaceful-meditation.jpg',
    name: 'Fridfull Meditation vid Soluppgång',
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString()
  },
  {
    id: '2',
    exerciseId: '1',
    type: MediaType.AUDIO,
    url: '/audio/calm-meditation.mp3',
    name: 'Lugnande Meditationsmusik',
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString()
  },
  {
    id: '3',
    exerciseId: '2',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/mindful-yoga.jpg',
    name: 'Medveten Yogaposition',
    createdAt: new Date('2024-01-16').toISOString(),
    updatedAt: new Date('2024-01-16').toISOString()
  },
  {
    id: '4',
    exerciseId: '2',
    type: MediaType.AUDIO,
    url: '/assets/exercises/audio/zen-meditation.mp3',
    name: 'Zen Meditationsljud',
    createdAt: new Date('2024-01-16').toISOString(),
    updatedAt: new Date('2024-01-16').toISOString()
  },
  {
    id: '5',
    exerciseId: '3',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/five-senses.jpg',
    name: 'Fem Sinnen Illustration',
    createdAt: new Date('2024-01-17').toISOString(),
    updatedAt: new Date('2024-01-17').toISOString()
  },
  {
    id: '6',
    exerciseId: '4',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/stream-leaves.jpg',
    name: 'Fridfull Bäck med Flytande Löv',
    createdAt: new Date('2024-01-18').toISOString(),
    updatedAt: new Date('2024-01-18').toISOString()
  },
  {
    id: '7',
    exerciseId: '5',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/compass-values.jpg',
    name: 'Kompass med Kärnvärderingar',
    createdAt: new Date('2024-01-19').toISOString(),
    updatedAt: new Date('2024-01-19').toISOString()
  },
  {
    id: '8',
    exerciseId: '6',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/mindful-walking.jpg',
    name: 'Person som Promenerar Medvetet i Naturen',
    createdAt: new Date('2024-01-20').toISOString(),
    updatedAt: new Date('2024-01-20').toISOString()
  },
  {
    id: '9',
    exerciseId: '7',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/emotional-awareness.jpg',
    name: 'Känslomässig Medvetenhet Illustration',
    createdAt: new Date('2024-01-21').toISOString(),
    updatedAt: new Date('2024-01-21').toISOString()
  },
  {
    id: '10',
    exerciseId: '8',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/action-plan.jpg',
    name: 'Action Planning and Goal Setting',
    createdAt: new Date('2024-01-22').toISOString(),
    updatedAt: new Date('2024-01-22').toISOString()
  },
  {
    id: '11',
    exerciseId: '9',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/mountain-meditation.jpg',
    name: 'Mountain Meditation Scene',
    createdAt: new Date('2024-01-23').toISOString(),
    updatedAt: new Date('2024-01-23').toISOString()
  },
  {
    id: '12',
    exerciseId: '9',
    type: MediaType.AUDIO,
    url: '/assets/exercises/audio/mountain-meditation.mp3',
    name: 'Mountain Meditation Guidance',
    createdAt: new Date('2024-01-23').toISOString(),
    updatedAt: new Date('2024-01-23').toISOString()
  },
  {
    id: '13',
    exerciseId: '10',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/defusion.jpg',
    name: 'Thought Defusion Exercise',
    createdAt: new Date('2024-01-24').toISOString(),
    updatedAt: new Date('2024-01-24').toISOString()
  },
  {
    id: '14',
    exerciseId: '11',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/values-in-action.jpg',
    name: 'Values in Action',
    createdAt: new Date('2024-01-25').toISOString(),
    updatedAt: new Date('2024-01-25').toISOString()
  },
  {
    id: '15',
    exerciseId: '12',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/self-compassion.jpg',
    name: 'Self-Compassion Practice',
    createdAt: new Date('2024-01-26').toISOString(),
    updatedAt: new Date('2024-01-26').toISOString()
  },
  {
    id: '16',
    exerciseId: '13',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/gratitude-journal.jpg',
    name: 'Gratitude Journaling',
    createdAt: new Date('2024-01-27').toISOString(),
    updatedAt: new Date('2024-01-27').toISOString()
  },
  {
    id: '17',
    exerciseId: '14',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/mindful-eating.jpg',
    name: 'Mindful Eating Practice',
    createdAt: new Date('2024-01-28').toISOString(),
    updatedAt: new Date('2024-01-28').toISOString()
  },
  {
    id: '18',
    exerciseId: '15',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/values-tree.jpg',
    name: 'Values Tree Visualization',
    createdAt: new Date('2024-01-29').toISOString(),
    updatedAt: new Date('2024-01-29').toISOString()
  },
  {
    id: '19',
    exerciseId: '16',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/observer-self.jpg',
    name: 'Observer Self Exercise',
    createdAt: new Date('2024-01-30').toISOString(),
    updatedAt: new Date('2024-01-30').toISOString()
  },
  {
    id: '20',
    exerciseId: '17',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/willingness.jpg',
    name: 'Willingness Practice',
    createdAt: new Date('2024-01-31').toISOString(),
    updatedAt: new Date('2024-01-31').toISOString()
  },
  {
    id: '21',
    exerciseId: '18',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/values-bullseye.jpg',
    name: 'Values Bullseye',
    createdAt: new Date('2024-02-01').toISOString(),
    updatedAt: new Date('2024-02-01').toISOString()
  },
  {
    id: '22',
    exerciseId: '19',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/mindful-movement.jpg',
    name: 'Mindful Movement',
    createdAt: new Date('2024-02-02').toISOString(),
    updatedAt: new Date('2024-02-02').toISOString()
  },
  {
    id: '23',
    exerciseId: '20',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/acceptance-diary.jpg',
    name: 'Acceptance Diary',
    createdAt: new Date('2024-02-03').toISOString(),
    updatedAt: new Date('2024-02-03').toISOString()
  },
  {
    id: '24',
    exerciseId: '21',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/body-awareness.jpg',
    name: 'Body Awareness Exercise',
    createdAt: new Date('2024-02-04').toISOString(),
    updatedAt: new Date('2024-02-04').toISOString()
  },
  {
    id: '25',
    exerciseId: '22',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/values-letter.jpg',
    name: 'Values Letter Writing',
    createdAt: new Date('2024-02-05').toISOString(),
    updatedAt: new Date('2024-02-05').toISOString()
  },
  {
    id: '26',
    exerciseId: '23',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/mindful-listening.jpg',
    name: 'Mindful Listening Practice',
    createdAt: new Date('2024-02-06').toISOString(),
    updatedAt: new Date('2024-02-06').toISOString()
  },
  {
    id: '27',
    exerciseId: '24',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/self-story.jpg',
    name: 'Self-as-Story Exercise',
    createdAt: new Date('2024-02-07').toISOString(),
    updatedAt: new Date('2024-02-07').toISOString()
  },
  {
    id: '28',
    exerciseId: '25',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/values-mirror.jpg',
    name: 'Values Mirror Exercise',
    createdAt: new Date('2024-02-08').toISOString(),
    updatedAt: new Date('2024-02-08').toISOString()
  },
  {
    id: "29",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/mindful-breathing-practice.jpg",
    name: "Mindful Breathing Practice",
    createdAt: "2024-03-20T10:00:00Z",
    updatedAt: "2024-03-20T10:00:00Z"
  },
  {
    id: "30",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/values-compass.jpg",
    name: "Values Compass Exercise",
    createdAt: "2024-03-20T10:01:00Z",
    updatedAt: "2024-03-20T10:01:00Z"
  },
  {
    id: "31",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/acceptance-mountain.jpg",
    name: "Acceptance Mountain",
    createdAt: "2024-03-20T10:02:00Z",
    updatedAt: "2024-03-20T10:02:00Z"
  },
  {
    id: "32",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/mindful-walking.jpg",
    name: "Mindful Walking Practice",
    createdAt: "2024-03-20T10:03:00Z",
    updatedAt: "2024-03-20T10:03:00Z"
  },
  {
    id: "33",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/values-action-plan.jpg",
    name: "Values Action Plan",
    createdAt: "2024-03-20T10:04:00Z",
    updatedAt: "2024-03-20T10:04:00Z"
  },
  {
    id: "34",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/defusion-exercise.jpg",
    name: "Defusion Exercise",
    createdAt: "2024-03-20T11:00:00Z",
    updatedAt: "2024-03-20T11:00:00Z"
  },
  {
    id: "35",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/self-compassion-meditation.jpg",
    name: "Self-Compassion Meditation",
    createdAt: "2024-03-20T11:01:00Z",
    updatedAt: "2024-03-20T11:01:00Z"
  },
  {
    id: "36",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/values-exploration.jpg",
    name: "Values Exploration",
    createdAt: "2024-03-20T11:02:00Z",
    updatedAt: "2024-03-20T11:02:00Z"
  },
  {
    id: "37",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/mindful-emotions.jpg",
    name: "Mindful Emotions",
    createdAt: "2024-03-20T11:03:00Z",
    updatedAt: "2024-03-20T11:03:00Z"
  },
  {
    id: "38",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/acceptance-practice.jpg",
    name: "Acceptance Practice",
    createdAt: "2024-03-20T11:04:00Z",
    updatedAt: "2024-03-20T11:04:00Z"
  },
  {
    id: "39",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/values-clarification.jpg",
    name: "Values Clarification Exercise",
    createdAt: "2024-03-20T12:00:00Z",
    updatedAt: "2024-03-20T12:00:00Z"
  },
  {
    id: "40",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/committed-action.jpg",
    name: "Committed Action Practice",
    createdAt: "2024-03-20T12:01:00Z",
    updatedAt: "2024-03-20T12:01:00Z"
  },
  {
    id: "41",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/mindful-goals.jpg",
    name: "Mindful Goals Setting",
    createdAt: "2024-03-20T12:02:00Z",
    updatedAt: "2024-03-20T12:02:00Z"
  },
  {
    id: "42",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/values-obstacles.jpg",
    name: "Values Obstacles Exercise",
    createdAt: "2024-03-20T12:03:00Z",
    updatedAt: "2024-03-20T12:03:00Z"
  },
  {
    id: "43",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/life-compass.jpg",
    name: "Life Compass Exercise",
    createdAt: "2024-03-20T12:04:00Z",
    updatedAt: "2024-03-20T12:04:00Z"
  },
  {
    id: "44",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/body-scan.jpg",
    name: "Body Scan Meditation",
    createdAt: "2024-03-20T13:00:00Z",
    updatedAt: "2024-03-20T13:00:00Z"
  },
  {
    id: "45",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/mindful-eating.jpg",
    name: "Mindful Eating Exercise",
    createdAt: "2024-03-20T13:01:00Z",
    updatedAt: "2024-03-20T13:01:00Z"
  },
  {
    id: "46",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/sound-awareness.jpg",
    name: "Sound Awareness Practice",
    createdAt: "2024-03-20T13:02:00Z",
    updatedAt: "2024-03-20T13:02:00Z"
  },
  {
    id: "47",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/mindful-movement.jpg",
    name: "Mindful Movement Exercise",
    createdAt: "2024-03-20T13:03:00Z",
    updatedAt: "2024-03-20T13:03:00Z"
  },
  {
    id: "48",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/present-moment.jpg",
    name: "Present Moment Exercise",
    createdAt: "2024-03-20T13:04:00Z",
    updatedAt: "2024-03-20T13:04:00Z"
  },
  {
    id: "49",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/thought-train.jpg",
    name: "Thought Train Exercise",
    createdAt: "2024-03-20T14:00:00Z",
    updatedAt: "2024-03-20T14:00:00Z"
  },
  {
    id: "50",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/radio-metaphor.jpg",
    name: "Radio Metaphor Exercise",
    createdAt: "2024-03-20T14:01:00Z",
    updatedAt: "2024-03-20T14:01:00Z"
  },
  {
    id: "51",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/values-diary.jpg",
    name: "Values Diary Exercise",
    createdAt: "2024-03-20T14:02:00Z",
    updatedAt: "2024-03-20T14:02:00Z"
  },
  {
    id: "52",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/life-roles.jpg",
    name: "Life Roles Exercise",
    createdAt: "2024-03-20T14:03:00Z",
    updatedAt: "2024-03-20T14:03:00Z"
  },
  {
    id: "53",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/thought-defusion.jpg",
    name: "Thought Defusion Exercise",
    createdAt: "2024-03-20T14:04:00Z",
    updatedAt: "2024-03-20T14:04:00Z"
  },
  {
    id: "54",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/breathing-space.jpg",
    name: "Three-Minute Breathing Space",
    createdAt: "2024-03-21T10:00:00Z",
    updatedAt: "2024-03-21T10:00:00Z"
  },
  {
    id: "55",
    exerciseId: "",
    type: MediaType.AUDIO,
    url: "/audio/breathing-space-guide.mp3",
    name: "Breathing Space Guidance",
    createdAt: "2024-03-21T10:00:00Z",
    updatedAt: "2024-03-21T10:00:00Z"
  },
  {
    id: "56",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/loving-kindness.jpg",
    name: "Loving-Kindness Meditation",
    createdAt: "2024-03-21T10:01:00Z",
    updatedAt: "2024-03-21T10:01:00Z"
  },
  {
    id: "57",
    exerciseId: "",
    type: MediaType.AUDIO,
    url: "/audio/loving-kindness-guide.mp3",
    name: "Loving-Kindness Guidance",
    createdAt: "2024-03-21T10:01:00Z",
    updatedAt: "2024-03-21T10:01:00Z"
  },
  {
    id: "58",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/values-exploration.jpg",
    name: "Values Life Areas",
    createdAt: "2024-03-21T10:02:00Z",
    updatedAt: "2024-03-21T10:02:00Z"
  },
  {
    id: "59",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/defusion-clouds.jpg",
    name: "Clouds in the Sky Exercise",
    createdAt: "2024-03-21T10:03:00Z",
    updatedAt: "2024-03-21T10:03:00Z"
  },
  {
    id: "60",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/mindful-stretching.jpg",
    name: "Mindful Stretching",
    createdAt: "2024-03-21T10:04:00Z",
    updatedAt: "2024-03-21T10:04:00Z"
  },
  {
    id: "61",
    exerciseId: "",
    type: MediaType.AUDIO,
    url: "/audio/mindful-stretching-guide.mp3",
    name: "Stretching Guidance",
    createdAt: "2024-03-21T10:04:00Z",
    updatedAt: "2024-03-21T10:04:00Z"
  },
  {
    id: "62",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/values-vision.jpg",
    name: "Values Vision Board",
    createdAt: "2024-03-21T10:05:00Z",
    updatedAt: "2024-03-21T10:05:00Z"
  },
  {
    id: "63",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/acceptance-waves.jpg",
    name: "Acceptance Waves",
    createdAt: "2024-03-21T10:06:00Z",
    updatedAt: "2024-03-21T10:06:00Z"
  },
  {
    id: "64",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/gratitude-practice.jpg",
    name: "Daily Gratitude Practice",
    createdAt: "2024-03-21T11:00:00Z",
    updatedAt: "2024-03-21T11:00:00Z"
  },
  {
    id: "65",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/self-story.jpg",
    name: "Self-Story Exercise",
    createdAt: "2024-03-21T11:00:00Z",
    updatedAt: "2024-03-21T11:00:00Z"
  },
  {
    id: "66",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/values-obstacles.jpg",
    name: "Values Obstacles Exercise",
    createdAt: "2024-03-21T11:00:00Z",
    updatedAt: "2024-03-21T11:00:00Z"
  },
  {
    id: "67",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/mindful-touch.jpg",
    name: "Mindful Touch Exercise",
    createdAt: "2024-03-21T11:00:00Z",
    updatedAt: "2024-03-21T11:00:00Z"
  },
  {
    id: "68",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/defusion-theater.jpg",
    name: "Mind Theater Exercise",
    createdAt: "2024-03-21T11:00:00Z",
    updatedAt: "2024-03-21T11:00:00Z"
  },
  {
    id: "69",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/values-legacy.jpg",
    name: "Values Legacy Exercise",
    createdAt: "2024-03-21T11:00:00Z",
    updatedAt: "2024-03-21T11:00:00Z"
  },
  {
    id: "70",
    exerciseId: "",
    type: MediaType.IMAGE,
    url: "/images/acceptance-garden.jpg",
    name: "Acceptance Garden",
    createdAt: "2024-03-21T11:00:00Z",
    updatedAt: "2024-03-21T11:00:00Z"
  }
].map(e => ({
  ...e,
  id: String(e.id),
  type: e.type as MediaType,
  createdAt: new Date(e.createdAt).toISOString(),
  updatedAt: new Date(e.updatedAt).toISOString()
}));

// Mock Exercises
export const exercises: Exercise[] = [
  {
    id: '1',
    title: 'Medveten Andning',
    content: `
      <h2>Övning i Medveten Andning</h2>
      <p>Denna enkla men kraftfulla mindfulness-övning hjälper dig att vara närvarande och centrerad.</p>
      <h3>Instruktioner:</h3>
      <ol>
        <li>Hitta en bekväm sittande position</li>
        <li>Blunda eller håll en mjuk blick</li>
        <li>Fokusera din uppmärksamhet på din andning</li>
        <li>Observera känslan av att andas utan att försöka förändra den</li>
        <li>När dina tankar vandrar, för varsamt tillbaka uppmärksamheten till andningen</li>
      </ol>
      <p>Öva denna övning 5-10 minuter dagligen för att utveckla mindfulness.</p>
    `,
    category: ExerciseCategory.NARVARO,
    userId: '1',
    mediaIds: ['1', '2'],
    order: 1,
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString()
  },
  {
    id: '2',
    title: 'Kroppsskanning',
    content: `
      <h2>Övning i Kroppsskanning</h2>
      <p>En guidad övning för att öka medvetenheten om din kropp och släppa fysisk spänning.</p>
      <h3>Instruktioner:</h3>
      <ol>
        <li>Ligg på rygg i en bekväm position</li>
        <li>Börja med att uppmärksamma dina tår</li>
        <li>Flytta långsamt uppmärksamheten genom hela kroppen</li>
        <li>Observera alla förnimmelser utan att döma</li>
        <li>Avsluta med att känna hela kroppen som en helhet</li>
      </ol>
      <p>Denna övning tar cirka 20 minuter och kan göras före sänggående för bättre sömn.</p>
    `,
    category: ExerciseCategory.NARVARO,
    userId: '1',
    mediaIds: ['3', '4'],
    order: 2,
    createdAt: new Date('2024-01-02').toISOString(),
    updatedAt: new Date('2024-01-02').toISOString()
  },
  {
    id: '3',
    title: 'Fem Sinnen Övning',
    content: `
      <h2>Fem Sinnen Medvetenhetsövning</h2>
      <p>En övning för att förankra dig i nuet genom dina sinnen.</p>
      <h3>Notera:</h3>
      <ul>
        <li>5 saker du kan se</li>
        <li>4 saker du kan känna</li>
        <li>3 saker du kan höra</li>
        <li>2 saker du kan lukta</li>
        <li>1 sak du kan smaka</li>
      </ul>
      <p>Använd denna övning när du känner dig överväldigad eller behöver grunda dig i nuet.</p>
    `,
    category: ExerciseCategory.NARVARO,
    userId: '1',
    mediaIds: ['5'],
    order: 3,
    createdAt: new Date('2024-01-03').toISOString(),
    updatedAt: new Date('2024-01-03').toISOString()
  },
  {
    id: '4',
    title: 'Tankar som Löv',
    content: `
      <h2>Övning: Tankar som Löv på en Ström</h2>
      <p>En metaforisk övning för att öva på att observera tankar utan att fastna i dem.</p>
      <h3>Instruktioner:</h3>
      <ol>
        <li>Föreställ dig en lugn ström med löv som flyter förbi</li>
        <li>När tankar dyker upp, placera dem på löven</li>
        <li>Observera hur löven med dina tankar flyter iväg</li>
        <li>Återvänd till strömmen när du märker att du fastnat i en tanke</li>
      </ol>
      <p>Denna övning hjälper dig att skapa distans till dina tankar och se dem som mentala händelser snarare än fakta.</p>
    `,
    category: ExerciseCategory.OPPENHET,
    userId: '1',
    mediaIds: ['6'],
    order: 1,
    createdAt: new Date('2024-01-04').toISOString(),
    updatedAt: new Date('2024-01-04').toISOString()
  },
  {
    id: '5',
    title: 'Värderingskompass',
    content: `
      <h2>Värderingskompass Övning</h2>
      <p>En övning för att utforska och förtydliga dina personliga värderingar.</p>
      <h3>Steg:</h3>
      <ol>
        <li>Identifiera viktiga livsområden (familj, arbete, hälsa, etc.)</li>
        <li>Reflektera över vad som är viktigt inom varje område</li>
        <li>Skriv ner konkreta handlingar som speglar dessa värderingar</li>
        <li>Utvärdera hur väl ditt liv stämmer överens med dina värderingar</li>
      </ol>
      <p>Använd denna kompass regelbundet för att hålla dig på rätt kurs i livet.</p>
    `,
    category: ExerciseCategory.ENGAGEMANG,
    userId: '1',
    mediaIds: ['7'],
    order: 1,
    createdAt: new Date('2024-01-05').toISOString(),
    updatedAt: new Date('2024-01-05').toISOString()
  },
  {
    id: '6',
    title: 'Medveten Promenad',
    content: `
      <h2>Övning i Medveten Promenad</h2>
      <p>En övning i att vara fullt närvarande medan du går.</p>
      <h3>Fokuspunkter:</h3>
      <ol>
        <li>Känn varje steg mot marken</li>
        <li>Notera balansen och kroppens rörelser</li>
        <li>Uppmärksamma omgivningen med alla sinnen</li>
        <li>Observera tankar som kommer och går</li>
      </ol>
      <p>Börja med 5-10 minuter och öka gradvis. Kan göras var som helst, inomhus eller utomhus.</p>
    `,
    category: ExerciseCategory.NARVARO,
    userId: '1',
    mediaIds: ['8'],
    order: 4,
    createdAt: new Date('2024-01-06').toISOString(),
    updatedAt: new Date('2024-01-06').toISOString()
  },
  {
    id: '7',
    title: 'Känslokarta',
    content: `
      <h2>Känslokarta Övning</h2>
      <p>En övning för att öka din emotionella medvetenhet och acceptans.</p>
      <h3>Process:</h3>
      <ol>
        <li>Identifiera känslan du upplever</li>
        <li>Notera var i kroppen du känner den</li>
        <li>Beskriv känslan utan att döma den</li>
        <li>Observera hur känslan förändras över tid</li>
      </ol>
      <p>Använd denna övning för att bättre förstå och hantera dina känslor.</p>
    `,
    category: ExerciseCategory.OPPENHET,
    userId: '1',
    mediaIds: ['9'],
    order: 2,
    createdAt: new Date('2024-01-07').toISOString(),
    updatedAt: new Date('2024-01-07').toISOString()
  }
];

// Mock Exercise Progress
export const exerciseProgress: ExerciseProgress[] = [
  {
    id: '1',
    userId: '2',
    exerciseId: '1',
    completed: true,
    notes: 'Felt very relaxed after this session',
    startedAt: new Date('2024-01-15T10:00:00Z'),
    completedAt: new Date('2024-01-15T10:15:00Z')
  },
  {
    id: '2',
    userId: '2',
    exerciseId: '2',
    completed: false,
    startedAt: new Date('2024-01-16T14:00:00Z')
  },
  {
    id: '3',
    userId: '3',
    exerciseId: '1',
    completed: true,
    notes: 'Great introduction to mindfulness',
    startedAt: new Date('2024-02-16T09:00:00Z'),
    completedAt: new Date('2024-02-16T09:20:00Z')
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
    return mediaFiles.filter(media => exerciseId.includes(media.exerciseId));
  }
  return mediaFiles.filter(media => media.exerciseId === exerciseId);
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
    findByCategory: (category: ExerciseCategory) => Promise<Exercise[]>;
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
      const media = mediaFiles.find(m => m.id === id);
      return media ? { ...media } : null;
    },
    findByExerciseId: async (exerciseId) => {
      return mediaFiles
        .filter(m => m.exerciseId === exerciseId)
        .map(m => ({ ...m }));
    },
    create: async (mediaData) => {
      const newMedia: Media = {
        ...mediaData,
        id: String(mediaFiles.length + 1),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      mediaFiles.push(newMedia);
      return { ...newMedia };
    },
    update: async (id, data) => {
      const index = mediaFiles.findIndex(m => m.id === id);
      if (index === -1) throw new Error('Media not found');
      mediaFiles[index] = {
        ...mediaFiles[index],
        ...data,
        updatedAt: new Date().toISOString()
      };
      return { ...mediaFiles[index] };
    },
    delete: async (id) => {
      const index = mediaFiles.findIndex(m => m.id === id);
      if (index === -1) throw new Error('Media not found');
      mediaFiles.splice(index, 1);
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