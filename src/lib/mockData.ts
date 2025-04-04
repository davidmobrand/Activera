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
export const mediaFiles = [
  {
    id: '1',
    exerciseId: '1',
    type: MediaType.IMAGE,
    url: '/images/peaceful-meditation.jpg',
    name: 'Peaceful Meditation at Sunrise',
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString()
  },
  {
    id: '2',
    exerciseId: '1',
    type: MediaType.AUDIO,
    url: '/audio/calm-meditation.mp3',
    name: 'Calming Meditation Music',
    createdAt: new Date('2024-01-15').toISOString(),
    updatedAt: new Date('2024-01-15').toISOString()
  },
  {
    id: '3',
    exerciseId: '2',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/mindful-yoga.jpg',
    name: 'Mindful Yoga Pose',
    createdAt: new Date('2024-01-16').toISOString(),
    updatedAt: new Date('2024-01-16').toISOString()
  },
  {
    id: '4',
    exerciseId: '2',
    type: MediaType.AUDIO,
    url: '/assets/exercises/audio/zen-meditation.mp3',
    name: 'Zen Meditation Sounds',
    createdAt: new Date('2024-01-16').toISOString(),
    updatedAt: new Date('2024-01-16').toISOString()
  },
  {
    id: '5',
    exerciseId: '3',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/five-senses.jpg',
    name: 'Five Senses Mindfulness Illustration',
    createdAt: new Date('2024-01-17').toISOString(),
    updatedAt: new Date('2024-01-17').toISOString()
  },
  {
    id: '6',
    exerciseId: '4',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/stream-leaves.jpg',
    name: 'Peaceful Stream with Floating Leaves',
    createdAt: new Date('2024-01-18').toISOString(),
    updatedAt: new Date('2024-01-18').toISOString()
  },
  {
    id: '7',
    exerciseId: '5',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/compass-values.jpg',
    name: 'Compass with Core Values',
    createdAt: new Date('2024-01-19').toISOString(),
    updatedAt: new Date('2024-01-19').toISOString()
  },
  {
    id: '8',
    exerciseId: '6',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/mindful-walking.jpg',
    name: 'Person Walking Mindfully in Nature',
    createdAt: new Date('2024-01-20').toISOString(),
    updatedAt: new Date('2024-01-20').toISOString()
  },
  {
    id: '9',
    exerciseId: '7',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/emotional-awareness.jpg',
    name: 'Emotional Awareness Illustration',
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
    type: "IMAGE",
    url: "/images/mindful-breathing-practice.jpg",
    name: "Mindful Breathing Practice",
    createdAt: "2024-03-20T10:00:00Z",
    updatedAt: "2024-03-20T10:00:00Z"
  },
  {
    id: "30",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/values-compass.jpg",
    name: "Values Compass Exercise",
    createdAt: "2024-03-20T10:01:00Z",
    updatedAt: "2024-03-20T10:01:00Z"
  },
  {
    id: "31",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/acceptance-mountain.jpg",
    name: "Acceptance Mountain",
    createdAt: "2024-03-20T10:02:00Z",
    updatedAt: "2024-03-20T10:02:00Z"
  },
  {
    id: "32",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/mindful-walking.jpg",
    name: "Mindful Walking Practice",
    createdAt: "2024-03-20T10:03:00Z",
    updatedAt: "2024-03-20T10:03:00Z"
  },
  {
    id: "33",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/values-action-plan.jpg",
    name: "Values Action Plan",
    createdAt: "2024-03-20T10:04:00Z",
    updatedAt: "2024-03-20T10:04:00Z"
  },
  {
    id: "34",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/defusion-exercise.jpg",
    name: "Defusion Exercise",
    createdAt: "2024-03-20T11:00:00Z",
    updatedAt: "2024-03-20T11:00:00Z"
  },
  {
    id: "35",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/self-compassion-meditation.jpg",
    name: "Self-Compassion Meditation",
    createdAt: "2024-03-20T11:01:00Z",
    updatedAt: "2024-03-20T11:01:00Z"
  },
  {
    id: "36",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/values-exploration.jpg",
    name: "Values Exploration",
    createdAt: "2024-03-20T11:02:00Z",
    updatedAt: "2024-03-20T11:02:00Z"
  },
  {
    id: "37",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/mindful-emotions.jpg",
    name: "Mindful Emotions",
    createdAt: "2024-03-20T11:03:00Z",
    updatedAt: "2024-03-20T11:03:00Z"
  },
  {
    id: "38",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/acceptance-practice.jpg",
    name: "Acceptance Practice",
    createdAt: "2024-03-20T11:04:00Z",
    updatedAt: "2024-03-20T11:04:00Z"
  },
  {
    id: "39",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/values-clarification.jpg",
    name: "Values Clarification Exercise",
    createdAt: "2024-03-20T12:00:00Z",
    updatedAt: "2024-03-20T12:00:00Z"
  },
  {
    id: "40",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/committed-action.jpg",
    name: "Committed Action Practice",
    createdAt: "2024-03-20T12:01:00Z",
    updatedAt: "2024-03-20T12:01:00Z"
  },
  {
    id: "41",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/mindful-goals.jpg",
    name: "Mindful Goals Setting",
    createdAt: "2024-03-20T12:02:00Z",
    updatedAt: "2024-03-20T12:02:00Z"
  },
  {
    id: "42",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/values-obstacles.jpg",
    name: "Values Obstacles Exercise",
    createdAt: "2024-03-20T12:03:00Z",
    updatedAt: "2024-03-20T12:03:00Z"
  },
  {
    id: "43",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/life-compass.jpg",
    name: "Life Compass Exercise",
    createdAt: "2024-03-20T12:04:00Z",
    updatedAt: "2024-03-20T12:04:00Z"
  },
  {
    id: "44",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/body-scan.jpg",
    name: "Body Scan Meditation",
    createdAt: "2024-03-20T13:00:00Z",
    updatedAt: "2024-03-20T13:00:00Z"
  },
  {
    id: "45",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/mindful-eating.jpg",
    name: "Mindful Eating Exercise",
    createdAt: "2024-03-20T13:01:00Z",
    updatedAt: "2024-03-20T13:01:00Z"
  },
  {
    id: "46",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/sound-awareness.jpg",
    name: "Sound Awareness Practice",
    createdAt: "2024-03-20T13:02:00Z",
    updatedAt: "2024-03-20T13:02:00Z"
  },
  {
    id: "47",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/mindful-movement.jpg",
    name: "Mindful Movement Exercise",
    createdAt: "2024-03-20T13:03:00Z",
    updatedAt: "2024-03-20T13:03:00Z"
  },
  {
    id: "48",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/present-moment.jpg",
    name: "Present Moment Exercise",
    createdAt: "2024-03-20T13:04:00Z",
    updatedAt: "2024-03-20T13:04:00Z"
  },
  {
    id: "49",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/thought-train.jpg",
    name: "Thought Train Exercise",
    createdAt: "2024-03-20T14:00:00Z",
    updatedAt: "2024-03-20T14:00:00Z"
  },
  {
    id: "50",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/radio-metaphor.jpg",
    name: "Radio Metaphor Exercise",
    createdAt: "2024-03-20T14:01:00Z",
    updatedAt: "2024-03-20T14:01:00Z"
  },
  {
    id: "51",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/values-diary.jpg",
    name: "Values Diary Exercise",
    createdAt: "2024-03-20T14:02:00Z",
    updatedAt: "2024-03-20T14:02:00Z"
  },
  {
    id: "52",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/life-roles.jpg",
    name: "Life Roles Exercise",
    createdAt: "2024-03-20T14:03:00Z",
    updatedAt: "2024-03-20T14:03:00Z"
  },
  {
    id: "53",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/thought-defusion.jpg",
    name: "Thought Defusion Exercise",
    createdAt: "2024-03-20T14:04:00Z",
    updatedAt: "2024-03-20T14:04:00Z"
  },
  {
    id: "54",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/breathing-space.jpg",
    name: "Three-Minute Breathing Space",
    createdAt: "2024-03-21T10:00:00Z",
    updatedAt: "2024-03-21T10:00:00Z"
  },
  {
    id: "55",
    exerciseId: "",
    type: "AUDIO",
    url: "/audio/breathing-space-guide.mp3",
    name: "Breathing Space Guidance",
    createdAt: "2024-03-21T10:00:00Z",
    updatedAt: "2024-03-21T10:00:00Z"
  },
  {
    id: "56",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/loving-kindness.jpg",
    name: "Loving-Kindness Meditation",
    createdAt: "2024-03-21T10:01:00Z",
    updatedAt: "2024-03-21T10:01:00Z"
  },
  {
    id: "57",
    exerciseId: "",
    type: "AUDIO",
    url: "/audio/loving-kindness-guide.mp3",
    name: "Loving-Kindness Guidance",
    createdAt: "2024-03-21T10:01:00Z",
    updatedAt: "2024-03-21T10:01:00Z"
  },
  {
    id: "58",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/values-exploration.jpg",
    name: "Values Life Areas",
    createdAt: "2024-03-21T10:02:00Z",
    updatedAt: "2024-03-21T10:02:00Z"
  },
  {
    id: "59",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/defusion-clouds.jpg",
    name: "Clouds in the Sky Exercise",
    createdAt: "2024-03-21T10:03:00Z",
    updatedAt: "2024-03-21T10:03:00Z"
  },
  {
    id: "60",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/mindful-stretching.jpg",
    name: "Mindful Stretching",
    createdAt: "2024-03-21T10:04:00Z",
    updatedAt: "2024-03-21T10:04:00Z"
  },
  {
    id: "61",
    exerciseId: "",
    type: "AUDIO",
    url: "/audio/mindful-stretching-guide.mp3",
    name: "Stretching Guidance",
    createdAt: "2024-03-21T10:04:00Z",
    updatedAt: "2024-03-21T10:04:00Z"
  },
  {
    id: "62",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/values-vision.jpg",
    name: "Values Vision Board",
    createdAt: "2024-03-21T10:05:00Z",
    updatedAt: "2024-03-21T10:05:00Z"
  },
  {
    id: "63",
    exerciseId: "",
    type: "IMAGE",
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
  createdAt: new Date(e.createdAt),
  updatedAt: new Date(e.updatedAt)
})) as Media[];

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
    mediaIds: ['5'],
    order: 2
  },
  {
    id: '4',
    title: 'Leaves on a Stream',
    content: `
# Leaves on a Stream - Defusion Exercise

A gentle practice to create distance from difficult thoughts.

## Instructions

1. Sit comfortably and visualize a gentle stream with leaves floating by
2. As thoughts arise:
   - Place each thought on a leaf
   - Watch it float down the stream
   - Let it drift away naturally

## Key Points

- Don't try to push thoughts away
- Notice thoughts without getting caught up in them
- Return to watching the stream when distracted

## Practice Tips

- Start with 5 minutes
- Use any thoughts that arise
- No need to judge or analyze thoughts
- Regular practice builds skill

Remember: The goal is to observe thoughts, not eliminate them.`,
    category: ExerciseCategory.OPPENHET,
    userId: "admin",
    createdAt: "2024-03-20T11:00:00Z",
    updatedAt: "2024-03-20T11:00:00Z",
    mediaIds: ["34"],
    order: 31
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
    mediaIds: ['7'],
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
    mediaIds: ['8'],
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
    mediaIds: ['9'],
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
    mediaIds: ['10'],
    order: 2
  },
  {
    id: '9',
    title: 'Mountain Meditation',
    content: `
      <h2>Mountain Meditation</h2>
      <p>A powerful meditation practice using the metaphor of a mountain to cultivate stability and presence.</p>
      <img src="/assets/exercises/images/mountain-meditation.jpg" alt="Mountain Meditation Scene" class="w-full rounded-lg shadow-lg mb-6" />
      <h3>Instructions:</h3>
      <ol>
        <li>Find a comfortable seated position</li>
        <li>Visualize a majestic mountain, solid and unmoving</li>
        <li>Feel your body becoming as stable as the mountain</li>
        <li>Notice how the mountain remains still through all weather and seasons</li>
        <li>Connect with the mountain's qualities of stability and strength</li>
      </ol>
      <p>Listen to the guided mountain meditation:</p>
      <audio controls src="/assets/exercises/audio/mountain-meditation.mp3" class="w-full mb-4"></audio>
      <p class="text-gray-600 italic">Just as the mountain remains stable through changing weather, you can remain centered through changing experiences.</p>
    `,
    category: ExerciseCategory.NARVARO,
    userId: '1',
    createdAt: new Date('2024-01-23'),
    updatedAt: new Date('2024-01-23'),
    mediaIds: ['11', '12'],
    order: 4
  },
  {
    id: '10',
    title: 'Thought Defusion',
    content: `
      <h2>Thought Defusion Exercise</h2>
      <p>Learn to create distance from unhelpful thoughts and see them for what they are - just thoughts.</p>
      <img src="/assets/exercises/images/defusion.jpg" alt="Thought Defusion Exercise" class="w-full rounded-lg shadow-lg mb-6" />
      <h3>Instructions:</h3>
      <ol>
        <li>Notice a challenging thought</li>
        <li>Add the phrase "I'm having the thought that..." before it</li>
        <li>Now add "I notice I'm having the thought that..."</li>
        <li>Observe how this creates space between you and the thought</li>
        <li>Try other defusion techniques:
          <ul>
            <li>Sing the thought to a familiar tune</li>
            <li>Say it in a cartoon character's voice</li>
            <li>Watch thoughts like cars passing by</li>
          </ul>
        </li>
      </ol>
      <p class="text-gray-600 italic">Remember: The goal is not to get rid of thoughts, but to change your relationship with them.</p>
    `,
    category: ExerciseCategory.OPPENHET,
    userId: '1',
    createdAt: new Date('2024-01-24'),
    updatedAt: new Date('2024-01-24'),
    mediaIds: ['13'],
    order: 4
  },
  {
    id: '11',
    title: 'Values in Action',
    content: `
      <h2>Values in Action Exercise</h2>
      <p>Transform your values into concrete daily actions and build a meaningful life.</p>
      <img src="/assets/exercises/images/values-in-action.jpg" alt="Values in Action" class="w-full rounded-lg shadow-lg mb-6" />
      <h3>Instructions:</h3>
      <ol>
        <li>Choose one of your core values</li>
        <li>Create a "Values Menu":
          <ul>
            <li>Tiny actions (1-2 minutes)</li>
            <li>Small actions (5-10 minutes)</li>
            <li>Medium actions (30 minutes)</li>
            <li>Large actions (1 hour or more)</li>
          </ul>
        </li>
        <li>Select one action from each category</li>
        <li>Schedule these actions in your calendar</li>
        <li>Track your progress and celebrate small wins</li>
      </ol>
      <p class="bg-gray-50 p-4 rounded-lg">Pro tip: Start with tiny actions and build up gradually. Success breeds success!</p>
    `,
    category: ExerciseCategory.ENGAGEMANG,
    userId: '1',
    createdAt: new Date('2024-01-25'),
    updatedAt: new Date('2024-01-25'),
    mediaIds: ['14'],
    order: 3
  },
  {
    id: '12',
    title: 'Self-Compassion Break',
    content: `
# Self-Compassion Break

Learn to respond to difficulties with kindness and understanding.

## Practice Steps

1. Acknowledge Suffering
   - Notice your pain or struggle
   - Say: "This is a moment of suffering"
   - Validate your experience

2. Common Humanity
   - Recognize you're not alone
   - Others face similar challenges
   - Say: "Suffering is part of life"

3. Self-Kindness
   - Offer yourself comfort
   - Use gentle touch if helpful
   - Say kind words to yourself

## Daily Integration

- Use during stressful moments
- Practice regularly
- Adapt words to fit your style

Remember: Self-compassion is a skill that grows with practice.`,
    category: ExerciseCategory.OPPENHET,
    userId: "admin",
    createdAt: "2024-03-20T11:01:00Z",
    updatedAt: "2024-03-20T11:01:00Z",
    mediaIds: ["35"],
    order: 32
  },
  {
    id: '13',
    title: 'Gratitude Journal',
    content: `
      <h2>Gratitude Journaling Practice</h2>
      <p>Develop appreciation and presence through daily gratitude practice.</p>
      <img src="/assets/exercises/images/gratitude-journal.jpg" alt="Gratitude Journaling" class="w-full rounded-lg shadow-lg mb-6" />
      <h3>Instructions:</h3>
      <ol>
        <li>Find a quiet moment at the start or end of your day</li>
        <li>Write down three things you're grateful for:
          <ul>
            <li>One thing about yourself</li>
            <li>One thing about someone else</li>
            <li>One thing about your environment</li>
          </ul>
        </li>
        <li>For each item, write why it matters to you</li>
        <li>Notice any feelings that arise as you write</li>
      </ol>
      <p class="text-gray-600 italic">Tip: Focus on specific experiences rather than general statements.</p>
    `,
    category: ExerciseCategory.NARVARO,
    userId: '1',
    createdAt: new Date('2024-01-27'),
    updatedAt: new Date('2024-01-27'),
    mediaIds: ['16'],
    order: 5
  },
  {
    id: '14',
    title: 'Mindful Eating',
    content: `
      <h2>Mindful Eating Exercise</h2>
      <p>Transform a daily activity into a mindfulness practice.</p>
      <img src="/assets/exercises/images/mindful-eating.jpg" alt="Mindful Eating Practice" class="w-full rounded-lg shadow-lg mb-6" />
      <h3>Instructions:</h3>
      <ol>
        <li>Choose a small piece of food (e.g., a raisin or nut)</li>
        <li>Examine it as if you've never seen it before:
          <ul>
            <li>Notice its color, texture, and shape</li>
            <li>Feel its weight in your hand</li>
            <li>Observe any scents or aromas</li>
          </ul>
        </li>
        <li>Place it in your mouth without chewing:
          <ul>
            <li>Notice the sensation on your tongue</li>
            <li>Observe any taste or texture changes</li>
          </ul>
        </li>
        <li>Chew slowly and mindfully</li>
        <li>Notice the entire experience of eating and swallowing</li>
      </ol>
      <p class="bg-gray-50 p-4 rounded-lg">Practice this with one bite at the start of each meal to develop mindful eating habits.</p>
    `,
    category: ExerciseCategory.NARVARO,
    userId: '1',
    createdAt: new Date('2024-01-28'),
    updatedAt: new Date('2024-01-28'),
    mediaIds: ['17'],
    order: 6
  },
  {
    id: '15',
    title: 'Values Tree',
    content: `
      <h2>Values Tree Visualization</h2>
      <p>Visualize your values as a growing, living system.</p>
      <img src="/assets/exercises/images/values-tree.jpg" alt="Values Tree Visualization" class="w-full rounded-lg shadow-lg mb-6" />
      <h3>Instructions:</h3>
      <ol>
        <li>Draw or imagine a large tree:
          <ul>
            <li>Roots represent your core values</li>
            <li>Trunk represents your strengths</li>
            <li>Branches represent life areas</li>
            <li>Leaves represent specific actions</li>
          </ul>
        </li>
        <li>For each root (value), write why it matters</li>
        <li>Connect branches to relevant values</li>
        <li>Add new leaves (actions) regularly</li>
      </ol>
      <p class="text-gray-600 italic">Your values tree is always growing and changing, just like you.</p>
    `,
    category: ExerciseCategory.ENGAGEMANG,
    userId: '1',
    createdAt: new Date('2024-01-29'),
    updatedAt: new Date('2024-01-29'),
    mediaIds: ['18'],
    order: 4
  },
  {
    id: '16',
    title: 'Observer Self',
    content: `
      <h2>Observer Self Exercise</h2>
      <p>Connect with your observing self - the part that notices all experience.</p>
      <img src="/assets/exercises/images/observer-self.jpg" alt="Observer Self Exercise" class="w-full rounded-lg shadow-lg mb-6" />
      <h3>Instructions:</h3>
      <ol>
        <li>Find a comfortable position and close your eyes</li>
        <li>Notice your thoughts passing by</li>
        <li>Ask yourself:
          <ul>
            <li>Who is doing the noticing?</li>
            <li>Can you observe the observer?</li>
            <li>Notice that you are not your thoughts</li>
          </ul>
        </li>
        <li>Expand awareness to include:
          <ul>
            <li>Physical sensations</li>
            <li>Emotions</li>
            <li>Sounds in the environment</li>
          </ul>
        </li>
      </ol>
      <p class="bg-gray-50 p-4 rounded-lg">You are not your thoughts, emotions, or sensations - you are the one who observes them.</p>
    `,
    category: ExerciseCategory.OPPENHET,
    userId: '1',
    createdAt: new Date('2024-01-30'),
    updatedAt: new Date('2024-01-30'),
    mediaIds: ['19'],
    order: 6
  },
  {
    id: '17',
    title: 'Willingness Gauge',
    content: `
      <h2>Willingness Gauge Exercise</h2>
      <p>Develop psychological flexibility through willingness practice.</p>
      <img src="/assets/exercises/images/willingness.jpg" alt="Willingness Practice" class="w-full rounded-lg shadow-lg mb-6" />
      <h3>Instructions:</h3>
      <ol>
        <li>Identify a challenging situation</li>
        <li>Rate your willingness (0-10) to:
          <ul>
            <li>Experience difficult emotions</li>
            <li>Have uncomfortable thoughts</li>
            <li>Feel physical sensations</li>
          </ul>
        </li>
        <li>Notice what affects your willingness</li>
        <li>Practice increasing willingness by:
          <ul>
            <li>Taking small steps</li>
            <li>Acknowledging resistance</li>
            <li>Connecting with values</li>
          </ul>
        </li>
      </ol>
      <p class="text-gray-600 italic">Willingness is not about wanting - it's about being open to experience.</p>
    `,
    category: ExerciseCategory.OPPENHET,
    userId: '1',
    createdAt: new Date('2024-01-31'),
    updatedAt: new Date('2024-01-31'),
    mediaIds: ['20'],
    order: 7
  },
  {
    id: '18',
    title: 'Values Bullseye',
    content: `
      <h2>Values Bullseye Exercise</h2>
      <p>Assess and improve alignment between your actions and values.</p>
      <img src="/assets/exercises/images/values-bullseye.jpg" alt="Values Bullseye" class="w-full rounded-lg shadow-lg mb-6" />
      <h3>Instructions:</h3>
      <ol>
        <li>Draw a bullseye with four rings</li>
        <li>Choose four life domains:
          <ul>
            <li>Work/Education</li>
            <li>Relationships</li>
            <li>Personal Growth</li>
            <li>Health/Self-Care</li>
          </ul>
        </li>
        <li>For each domain, mark where your actions fall:
          <ul>
            <li>Center: Perfect alignment with values</li>
            <li>Outer rings: Less alignment</li>
          </ul>
        </li>
        <li>Create action plans to move closer to center</li>
      </ol>
      <p class="bg-gray-50 p-4 rounded-lg">Regular practice helps track progress and maintain value-aligned living.</p>
    `,
    category: ExerciseCategory.ENGAGEMANG,
    userId: '1',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
    mediaIds: ['21'],
    order: 5
  },
  {
    id: '19',
    title: 'Mindful Movement',
    content: `
      <h2>Mindful Movement Practice</h2>
      <p>Bring awareness to everyday movements and physical sensations.</p>
      <img src="/assets/exercises/images/mindful-movement.jpg" alt="Mindful Movement" class="w-full rounded-lg shadow-lg mb-6" />
      <h3>Instructions:</h3>
      <ol>
        <li>Choose a simple movement (e.g., arm raise)</li>
        <li>Move extremely slowly, noticing:
          <ul>
            <li>Muscle tension and release</li>
            <li>Balance shifts</li>
            <li>Joint sensations</li>
          </ul>
        </li>
        <li>Explore different movements:
          <ul>
            <li>Stretching</li>
            <li>Walking</li>
            <li>Hand gestures</li>
          </ul>
        </li>
        <li>Notice the space between movements</li>
      </ol>
      <p class="text-gray-600 italic">Every movement is an opportunity for mindfulness practice.</p>
    `,
    category: ExerciseCategory.NARVARO,
    userId: '1',
    createdAt: new Date('2024-02-02'),
    updatedAt: new Date('2024-02-02'),
    mediaIds: ['22'],
    order: 7
  },
  {
    id: '20',
    title: 'Acceptance Diary',
    content: `
      <h2>Acceptance Diary Practice</h2>
      <p>Track and develop your acceptance skills over time.</p>
      <img src="/assets/exercises/images/acceptance-diary.jpg" alt="Acceptance Diary" class="w-full rounded-lg shadow-lg mb-6" />
      <h3>Instructions:</h3>
      <ol>
        <li>Each day, record:
          <ul>
            <li>Challenging situations</li>
            <li>Your initial reaction</li>
            <li>Attempts to control/avoid</li>
            <li>Moments of acceptance</li>
          </ul>
        </li>
        <li>Notice patterns in:
          <ul>
            <li>What you tend to resist</li>
            <li>What helps you accept</li>
            <li>Effects of acceptance vs. control</li>
          </ul>
        </li>
        <li>Practice expanding acceptance</li>
      </ol>
      <p class="bg-gray-50 p-4 rounded-lg">Acceptance doesn't mean liking or wanting - it means acknowledging what is.</p>
    `,
    category: ExerciseCategory.OPPENHET,
    userId: '1',
    createdAt: new Date('2024-02-03'),
    updatedAt: new Date('2024-02-03'),
    mediaIds: ['23'],
    order: 8
  },
  {
    id: '21',
    title: 'Body Awareness Scan',
    content: `
      <h2>Body Awareness Scan Exercise</h2>
      <p>Develop deeper connection with physical sensations and body awareness.</p>
      <img src="/assets/exercises/images/body-awareness.jpg" alt="Body Awareness Exercise" class="w-full rounded-lg shadow-lg mb-6" />
      <h3>Instructions:</h3>
      <ol>
        <li>Lie down or sit comfortably</li>
        <li>Systematically scan your body:
          <ul>
            <li>Start with your toes</li>
            <li>Move up through each body part</li>
            <li>End at the top of your head</li>
          </ul>
        </li>
        <li>For each area:
          <ul>
            <li>Notice any sensations present</li>
            <li>Observe without trying to change anything</li>
            <li>Include temperature, pressure, movement</li>
          </ul>
        </li>
        <li>If you notice tension, simply acknowledge it</li>
      </ol>
      <p class="bg-gray-50 p-4 rounded-lg">This practice helps develop body awareness and presence in daily life.</p>
    `,
    category: ExerciseCategory.NARVARO,
    userId: '1',
    createdAt: new Date('2024-02-04'),
    updatedAt: new Date('2024-02-04'),
    mediaIds: ['24'],
    order: 8
  },
  {
    id: '22',
    title: 'Values Letter',
    content: `
      <h2>Values Letter Writing Exercise</h2>
      <p>Write a letter to yourself about your values and aspirations.</p>
      <img src="/assets/exercises/images/values-letter.jpg" alt="Values Letter Writing" class="w-full rounded-lg shadow-lg mb-6" />
      <h3>Instructions:</h3>
      <ol>
        <li>Choose a future date (e.g., 1 year from now)</li>
        <li>Write a letter to yourself describing:
          <ul>
            <li>The values you want to embody</li>
            <li>How you've lived these values</li>
            <li>Challenges you've overcome</li>
          </ul>
        </li>
        <li>Include specific examples of:
          <ul>
            <li>Actions you've taken</li>
            <li>Changes you've made</li>
            <li>Growth you've experienced</li>
          </ul>
        </li>
        <li>Seal and date the letter</li>
      </ol>
      <p class="text-gray-600 italic">This letter serves as both inspiration and accountability.</p>
    `,
    category: ExerciseCategory.ENGAGEMANG,
    userId: '1',
    createdAt: new Date('2024-02-05'),
    updatedAt: new Date('2024-02-05'),
    mediaIds: ['25'],
    order: 6
  },
  {
    id: '23',
    title: 'Mindful Listening',
    content: `
      <h2>Mindful Listening Practice</h2>
      <p>Transform ordinary sounds into opportunities for presence.</p>
      <img src="/assets/exercises/images/mindful-listening.jpg" alt="Mindful Listening Practice" class="w-full rounded-lg shadow-lg mb-6" />
      <h3>Instructions:</h3>
      <ol>
        <li>Find a comfortable position</li>
        <li>Close your eyes and listen:
          <ul>
            <li>Notice the closest sounds</li>
            <li>Expand to middle-distance sounds</li>
            <li>Include the farthest sounds you can hear</li>
          </ul>
        </li>
        <li>For each sound:
          <ul>
            <li>Notice its quality (pitch, volume, duration)</li>
            <li>Observe without labeling or judging</li>
            <li>Notice the spaces between sounds</li>
          </ul>
        </li>
        <li>Include all sounds in your awareness</li>
      </ol>
      <p class="bg-gray-50 p-4 rounded-lg">Every sound becomes an invitation to presence.</p>
    `,
    category: ExerciseCategory.NARVARO,
    userId: '1',
    createdAt: new Date('2024-02-06'),
    updatedAt: new Date('2024-02-06'),
    mediaIds: ['26'],
    order: 9
  },
  {
    id: '24',
    title: 'Self-as-Story',
    content: `
      <h2>Self-as-Story Exercise</h2>
      <p>Explore and gain perspective on the stories we tell about ourselves.</p>
      <img src="/assets/exercises/images/self-story.jpg" alt="Self-as-Story Exercise" class="w-full rounded-lg shadow-lg mb-6" />
      <h3>Instructions:</h3>
      <ol>
        <li>Write down a challenging self-story:
          <ul>
            <li>"I am [limitation/belief]"</li>
            <li>"I always/never [behavior]"</li>
            <li>"I can't [action/goal]"</li>
          </ul>
        </li>
        <li>Examine the story:
          <ul>
            <li>When did this story start?</li>
            <li>Who taught you this story?</li>
            <li>How has it served/limited you?</li>
          </ul>
        </li>
        <li>Create distance by adding:
          <ul>
            <li>"I'm having the thought that..."</li>
            <li>"My mind is telling me..."</li>
            <li>"I notice I'm believing..."</li>
          </ul>
        </li>
      </ol>
      <p class="text-gray-600 italic">You are not your stories - you are the storyteller.</p>
    `,
    category: ExerciseCategory.OPPENHET,
    userId: '1',
    createdAt: new Date('2024-02-07'),
    updatedAt: new Date('2024-02-07'),
    mediaIds: ['27'],
    order: 9
  },
  {
    id: '25',
    title: 'Values Mirror',
    content: `
      <h2>Values Mirror Exercise</h2>
      <p>Reflect on how your daily actions mirror your core values.</p>
      <img src="/assets/exercises/images/values-mirror.jpg" alt="Values Mirror Exercise" class="w-full rounded-lg shadow-lg mb-6" />
      <h3>Instructions:</h3>
      <ol>
        <li>Choose one core value</li>
        <li>Throughout the day, notice:
          <ul>
            <li>Actions that reflect this value</li>
            <li>Opportunities to express it</li>
            <li>Moments you moved away from it</li>
          </ul>
        </li>
        <li>Evening reflection:
          <ul>
            <li>How did you embody this value?</li>
            <li>What made it easier/harder?</li>
            <li>What will you do differently tomorrow?</li>
          </ul>
        </li>
      </ol>
      <p class="bg-gray-50 p-4 rounded-lg">Your values are like a mirror - they reflect who you want to be.</p>
    `,
    category: ExerciseCategory.ENGAGEMANG,
    userId: '1',
    createdAt: new Date('2024-02-08'),
    updatedAt: new Date('2024-02-08'),
    mediaIds: ['28'],
    order: 7
  },
  {
    id: 26,
    title: "Mindful Breathing Anchor",
    content: `
# Mindful Breathing Anchor Exercise

This exercise helps you develop a strong foundation in mindfulness by using the breath as an anchor point.

## Instructions

1. Find a comfortable position and close your eyes or maintain a soft gaze.
2. Bring your attention to your breathing, noticing where you feel it most prominently in your body.
3. Observe the natural rhythm of your breath without trying to change it:
   - Notice the sensation of air moving in and out
   - Feel the rise and fall of your chest or belly
   - Pay attention to the temperature of the air

## Key Points

- When your mind wanders (which is natural), gently return your focus to the breath
- Practice this for 5-10 minutes daily
- Use this as a quick centering technique throughout the day

Remember: The goal isn't to clear your mind, but to practice returning to the present moment using your breath as an anchor.`,
    category: ExerciseCategory.NARVARO,
    userId: "admin",
    createdAt: "2024-03-20T10:00:00Z",
    updatedAt: "2024-03-20T10:00:00Z",
    mediaIds: ["29"],
    order: 26
  },
  {
    id: 27,
    title: "Values Compass",
    content: `
# Values Compass Exercise

Use this exercise to explore and clarify your personal values in different life domains.

## Instructions

1. Draw or imagine a compass with four directions representing different life areas:
   - North: Work/Education
   - South: Relationships
   - East: Personal Growth
   - West: Health/Well-being

2. For each direction, reflect on:
   - What matters most to you in this area?
   - What kind of person do you want to be?
   - What qualities do you want to embody?

3. Write down specific values for each area
4. Consider how your current actions align with these values

## Action Steps

1. Choose one area to focus on this week
2. Identify small steps you can take to live more in line with your values
3. Track your progress and adjust as needed

Remember: Values are like a compass that guides your journey, not a destination to reach.`,
    category: ExerciseCategory.ENGAGEMANG,
    userId: "admin",
    createdAt: "2024-03-20T10:01:00Z",
    updatedAt: "2024-03-20T10:01:00Z",
    mediaIds: ["30"],
    order: 27
  },
  {
    id: 28,
    title: "Acceptance Mountain",
    content: `
# Acceptance Mountain Exercise

This exercise uses the metaphor of climbing a mountain to understand and practice acceptance.

## The Exercise

Imagine you're climbing a mountain called "Acceptance Mountain." Each step represents moving toward accepting something challenging in your life.

### Steps to Practice

1. Identify Your Mountain
   - What situation are you struggling to accept?
   - What emotions or thoughts feel difficult?

2. Notice Your Resistance
   - Where do you feel tension in your body?
   - What thoughts come up when facing this challenge?

3. Take Small Steps
   - Start with accepting small discomforts
   - Gradually work up to bigger challenges
   - Celebrate each step forward

## Key Principles

- Acceptance doesn't mean liking or wanting something
- It's about reducing the struggle with what is
- Progress isn't always linear - that's okay

Remember: Like climbing a mountain, acceptance is a journey that requires patience and persistence.`,
    category: ExerciseCategory.OPPENHET,
    userId: "admin",
    createdAt: "2024-03-20T10:02:00Z",
    updatedAt: "2024-03-20T10:02:00Z",
    mediaIds: ["31"],
    order: 28
  },
  {
    id: 29,
    title: "Mindful Walking",
    content: `
# Mindful Walking Practice

Transform a simple walk into a powerful mindfulness exercise.

## Instructions

1. Choose Your Space
   - Find a quiet path or space
   - You can practice indoors or outdoors
   - No destination needed - walking for awareness

2. Begin Walking Slowly
   - Notice the sensation in your feet
   - Feel the movement of your legs
   - Observe your balance and posture

3. Expand Your Awareness
   - Notice sounds around you
   - Feel the air on your skin
   - Observe your surroundings without judgment

## Tips for Practice

- Start with 5-10 minutes
- Use natural walking pace
- When mind wanders, return to physical sensations
- Practice regularly to build the habit

Remember: Every step is an opportunity to return to the present moment.`,
    category: ExerciseCategory.NARVARO,
    userId: "admin",
    createdAt: "2024-03-20T10:03:00Z",
    updatedAt: "2024-03-20T10:03:00Z",
    mediaIds: ["32"],
    order: 29
  },
  {
    id: 30,
    title: "Values Action Plan",
    content: `
# Values Action Plan

Create a concrete plan to align your daily actions with your core values.

## Exercise Steps

1. Value Selection
   - Choose one core value to focus on
   - Write why this value matters to you
   - Describe how living this value looks

2. Current Assessment
   - Rate current alignment (1-10)
   - List current actions supporting this value
   - Identify barriers to living this value

3. Action Planning
   - Set 3 small, achievable goals
   - Create weekly action items
   - Plan for potential obstacles

## Implementation Tips

- Start small and build gradually
- Track your progress daily
- Celebrate small wins
- Adjust plan as needed

Remember: Values are like a compass - they guide our actions but aren't a destination.`,
    category: ExerciseCategory.ENGAGEMANG,
    userId: "admin",
    createdAt: "2024-03-20T10:04:00Z",
    updatedAt: "2024-03-20T10:04:00Z",
    mediaIds: ["33"],
    order: 30
  },
  {
    id: "41",
    title: "Body Scan Meditation",
    content: `
# Body Scan Meditation

A systematic practice of bringing attention to physical sensations.

## Practice Guide

1. Getting Started
   - Lie down or sit comfortably
   - Close your eyes or maintain soft gaze
   - Take a few deep breaths

2. Systematic Scan
   - Start with your toes
   - Move up through each body part
   - Notice sensations without judgment
   - Include all areas of your body

3. Common Experiences
   - Temperature
   - Pressure
   - Tingling
   - Tension/Relaxation
   - Numbness

## Tips for Practice

- Start with 10-15 minutes
- Be patient with wandering mind
- No need to change anything
- Regular practice builds awareness

Remember: Every sensation is an opportunity for mindfulness.`,
    category: ExerciseCategory.NARVARO,
    userId: "admin",
    createdAt: "2024-03-20T13:00:00Z",
    updatedAt: "2024-03-20T13:00:00Z",
    mediaIds: ["44"],
    order: 41
  },
  {
    id: "42",
    title: "Mindful Eating",
    content: `
# Mindful Eating Practice

Transform an everyday activity into a mindfulness practice.

## Exercise Steps

1. Choose Your Food
   - Select a small portion
   - Something simple is fine
   - Notice initial reactions

2. Explore with Senses
   - Look: colors, shapes, textures
   - Touch: temperature, texture
   - Smell: all the aromas
   - Listen: any sounds
   - Taste: flavors and changes

3. Eat Mindfully
   - Take small bites
   - Chew slowly
   - Notice flavors change
   - Feel the swallowing

## Practice Tips

- Start with 5 minutes
- One bite at a time
- Notice judgments
- Stay curious

Remember: Every meal is an opportunity for mindfulness.`,
    category: ExerciseCategory.NARVARO,
    userId: "admin",
    createdAt: "2024-03-20T13:01:00Z",
    updatedAt: "2024-03-20T13:01:00Z",
    mediaIds: ["45"],
    order: 42
  },
  {
    id: "43",
    title: "Sound Awareness",
    content: `
# Sound Awareness Practice

Use sounds as anchors for present moment awareness.

## Practice Guide

1. Setup
   - Find a comfortable position
   - Close eyes or soft gaze
   - No need for silence

2. Listen Mindfully
   - Notice near sounds
   - Notice far sounds
   - Notice silence between sounds
   - Don't label, just listen

3. Common Experiences
   - Sounds come and go
   - Some pleasant, some not
   - Mind wants to name sounds
   - Attention may wander

## Key Points

- All sounds are welcome
- No need to search for sounds
- Notice reactions without judgment
- Return to listening when distracted

Remember: Sounds are natural anchors for presence.`,
    category: ExerciseCategory.NARVARO,
    userId: "admin",
    createdAt: "2024-03-20T13:02:00Z",
    updatedAt: "2024-03-20T13:02:00Z",
    mediaIds: ["46"],
    order: 43
  },
  {
    id: "44",
    title: "Mindful Movement",
    content: `
# Mindful Movement Practice

Bring awareness to simple movements and stretches.

## Exercise Steps

1. Standing Awareness
   - Feel feet on ground
   - Notice body's balance
   - Sense your posture
   - Feel the air on skin

2. Simple Movements
   - Raise arms slowly
   - Gentle neck rolls
   - Shoulder circles
   - Knee bends
   - Ankle rotations

3. Movement Exploration
   - Notice initiation
   - Feel the process
   - Observe completion
   - Rest between movements

## Practice Tips

- Move at 25% speed
- Notice subtle sensations
- Stay within comfort zone
- Breathe naturally

Remember: Movement is a gateway to presence.`,
    category: ExerciseCategory.NARVARO,
    userId: "admin",
    createdAt: "2024-03-20T13:03:00Z",
    updatedAt: "2024-03-20T13:03:00Z",
    mediaIds: ["47"],
    order: 44
  },
  {
    id: "45",
    title: "Present Moment Awareness",
    content: `
# Present Moment Awareness

A simple practice to connect with the here and now.

## Practice Guide

1. Pause and Connect
   - Stop current activity
   - Take three breaths
   - Feel your body
   - Notice your surroundings

2. STOP Technique
   - Stop what you're doing
   - Take a breath
   - Observe present moment
   - Proceed mindfully

3. Five Senses Check-in
   - See: 5 things
   - Hear: 4 sounds
   - Feel: 3 sensations
   - Smell: 2 scents
   - Taste: 1 taste

## Daily Integration

- Use at transitions
- Set reminder bells
- Practice in lines
- During routine tasks

Remember: The present moment is always available.`,
    category: ExerciseCategory.NARVARO,
    userId: "admin",
    createdAt: "2024-03-20T13:04:00Z",
    updatedAt: "2024-03-20T13:04:00Z",
    mediaIds: ["48"],
    order: 45
  },
  {
    id: "46",
    title: "Thought Train",
    content: `
# Thought Train Exercise

A defusion exercise using the metaphor of a train to create distance from thoughts.

## Practice Guide

1. Initial Setup
   - Find a comfortable position
   - Close eyes or maintain soft gaze
   - Take a few grounding breaths

2. Visualization
   - Imagine sitting at a train station
   - Each thought is a train car passing by
   - Notice thoughts without boarding the train
   - Let each thought-train pass through

3. Common Thought Types
   - Worries about the future
   - Memories from the past
   - Self-judgments
   - Plans and to-do lists

## Key Points

- You are the observer at the station
- Thoughts are just passing trains
- No need to jump aboard
- Return to the platform when caught up

Remember: You can watch your thoughts without becoming them.`,
    category: ExerciseCategory.OPPENHET,
    userId: "admin",
    createdAt: "2024-03-20T14:00:00Z",
    updatedAt: "2024-03-20T14:00:00Z",
    mediaIds: ["49"],
    order: 46
  },
  {
    id: "47",
    title: "Radio Metaphor",
    content: `
# Radio Metaphor Exercise

Use the metaphor of a radio to understand and work with difficult thoughts.

## Exercise Steps

1. The Radio Setup
   - Imagine your mind as a radio
   - Thoughts are like radio stations
   - You are the listener, not the radio
   - Notice different "channels" playing

2. Working with Channels
   - Notice the "doom and gloom" channel
   - Observe the "worry news" station
   - Listen to the "self-critic" broadcast
   - Be aware of "future fears" programming

3. Practice Options
   - Notice without changing channels
   - Adjust the volume
   - Step back from the radio
   - Remember you're not the radio

Remember: You can notice the radio without believing everything it broadcasts.`,
    category: ExerciseCategory.OPPENHET,
    userId: "admin",
    createdAt: "2024-03-20T14:01:00Z",
    updatedAt: "2024-03-20T14:01:00Z",
    mediaIds: ["50"],
    order: 47
  },
  {
    id: "48",
    title: "Values Diary",
    content: `
# Values Diary Exercise

Track and reflect on your values in daily life.

## Practice Guide

1. Daily Check-in
   - Morning values intention
   - Evening values reflection
   - Note specific situations
   - Record your responses

2. Areas to Track
   - Value-aligned actions
   - Challenging moments
   - Missed opportunities
   - New insights gained

3. Weekly Review
   - Notice patterns
   - Celebrate successes
   - Plan adjustments
   - Set new intentions

## Integration Tips

- Keep entries brief
- Focus on specific examples
- Include both successes and struggles
- Use for future planning

Remember: Your values diary is a tool for growth, not judgment.`,
    category: ExerciseCategory.ENGAGEMANG,
    userId: "admin",
    createdAt: "2024-03-20T14:02:00Z",
    updatedAt: "2024-03-20T14:02:00Z",
    mediaIds: ["51"],
    order: 48
  },
  {
    id: "49",
    title: "Life Roles",
    content: `
# Life Roles Exercise

Explore your values through different life roles.

## Exercise Steps

1. Identify Your Roles
   - Family member
   - Professional
   - Friend
   - Community member
   - Personal growth
   - Health/wellness

2. For Each Role
   - What matters most?
   - How do you want to show up?
   - What qualities matter?
   - What actions align?

3. Integration
   - Find common themes
   - Notice conflicts
   - Plan balanced action
   - Review regularly

## Practice Tips

- Start with 3-4 key roles
- Be specific about values
- Consider priorities
- Plan small actions

Remember: Your roles are opportunities to live your values.`,
    category: ExerciseCategory.ENGAGEMANG,
    userId: "admin",
    createdAt: "2024-03-20T14:03:00Z",
    updatedAt: "2024-03-20T14:03:00Z",
    mediaIds: ["52"],
    order: 49
  },
  {
    id: "50",
    title: "Thought Defusion",
    content: `
# Thought Defusion Techniques

A collection of practices to create space between you and your thoughts.

## Techniques

1. Thought Labeling
   - "I'm having the thought that..."
   - "My mind is telling me..."
   - "I notice I'm thinking..."
   - Watch thoughts like weather

2. Playful Approaches
   - Sing thoughts to a tune
   - Use silly voices
   - Thank your mind
   - Give thoughts names

3. Visualization
   - Thoughts on leaves
   - Clouds passing by
   - Words on a screen
   - Bubbles floating away

## Implementation

- Practice regularly
- Use variety
- Start with easier thoughts
- Build up gradually

Remember: Thoughts are just thoughts, not facts or commands.`,
    category: ExerciseCategory.OPPENHET,
    userId: "admin",
    createdAt: "2024-03-20T14:04:00Z",
    updatedAt: "2024-03-20T14:04:00Z",
    mediaIds: ["53"],
    order: 50
  },
  {
    id: "51",
    title: "Three-Minute Breathing Space",
    content: `
# Three-Minute Breathing Space

A brief mindfulness practice for busy moments.

## Practice Steps

1. First Minute - Awareness
   - Notice thoughts, feelings, sensations
   - Take a bird's eye view of experience
   - Simply observe what's present

2. Second Minute - Gathering
   - Bring attention to the breath
   - Feel the sensations of breathing
   - Use breath as an anchor

3. Third Minute - Expanding
   - Expand awareness to whole body
   - Include sounds and surroundings
   - Hold everything in awareness

## Key Points

- Brief but powerful practice
- Can be done anywhere
- Perfect for transitions
- Use multiple times daily

Remember: This is your portable mindfulness practice.`,
    category: ExerciseCategory.NARVARO,
    userId: "admin",
    createdAt: "2024-03-21T10:00:00Z",
    updatedAt: "2024-03-21T10:00:00Z",
    mediaIds: ["54", "55"],
    order: 51
  },
  {
    id: "52",
    title: "Loving-Kindness Practice",
    content: `
# Loving-Kindness Meditation

Develop compassion for yourself and others.

## Practice Guide

1. Setting Up
   - Find a comfortable position
   - Take a few calming breaths
   - Set your intention

2. Phrases
   - "May I be happy"
   - "May I be healthy"
   - "May I be safe"
   - "May I live with ease"

3. Expanding Circle
   - Start with yourself
   - Include a loved one
   - Add a neutral person
   - Include a difficult person
   - Extend to all beings

## Integration Tips

- Start with short sessions
- Use gentle, sincere tone
- Adapt phrases as needed
- Notice any resistance

Remember: Self-compassion strengthens resilience.`,
    category: ExerciseCategory.NARVARO,
    userId: "admin",
    createdAt: "2024-03-21T10:01:00Z",
    updatedAt: "2024-03-21T10:01:00Z",
    mediaIds: ["56", "57"],
    order: 52
  },
  {
    id: "53",
    title: "Life Areas Values",
    content: `
# Life Areas Values Exercise

Explore your values across different life domains.

## Areas to Explore

1. Relationships
   - Family connections
   - Friendships
   - Romantic relationships
   - Community involvement

2. Personal Growth
   - Learning and education
   - Spiritual development
   - Creative expression
   - Skills development

3. Health & Wellbeing
   - Physical health
   - Mental wellbeing
   - Self-care practices
   - Lifestyle choices

4. Work & Career
   - Professional goals
   - Work environment
   - Career development
   - Work-life balance

## Integration Steps

- Rate importance (1-10)
- Assess current living
- Plan specific actions
- Review regularly

Remember: Values guide meaningful life choices.`,
    category: ExerciseCategory.ENGAGEMANG,
    userId: "admin",
    createdAt: "2024-03-21T10:02:00Z",
    updatedAt: "2024-03-21T10:02:00Z",
    mediaIds: ["58"],
    order: 53
  },
  {
    id: "54",
    title: "Clouds in the Sky",
    content: `
# Clouds in the Sky Defusion Exercise

Use this metaphor to create distance from thoughts.

## Practice Steps

1. Setup
   - Find quiet space
   - Comfortable position
   - Eyes closed or soft gaze

2. Visualization
   - Imagine clear blue sky
   - Thoughts as clouds passing
   - No need to push or pull
   - Watch them drift by

3. Common Experiences
   - Some clouds dark/stormy
   - Some light and fluffy
   - Different speeds
   - Changing shapes

## Key Points

- Sky always present
- Clouds temporary
- No cloud changes sky
- You are the sky

Remember: Thoughts come and go like clouds.`,
    category: ExerciseCategory.OPPENHET,
    userId: "admin",
    createdAt: "2024-03-21T10:03:00Z",
    updatedAt: "2024-03-21T10:03:00Z",
    mediaIds: ["59"],
    order: 54
  },
  {
    id: "55",
    title: "Mindful Stretching",
    content: `
# Mindful Stretching Practice

Combine gentle movement with mindfulness.

## Exercise Flow

1. Standing Mountain
   - Feet hip-width apart
   - Feel ground contact
   - Lengthen spine
   - Relax shoulders

2. Gentle Movements
   - Side stretches
   - Forward folds
   - Shoulder rolls
   - Neck rotations

3. Mindful Attention
   - Notice sensations
   - Follow movement
   - Feel the stretch
   - Honor limits

## Practice Tips

- Move slowly
- Breathe naturally
- Stay within comfort
- Regular practice

Remember: Movement can be meditation.`,
    category: ExerciseCategory.NARVARO,
    userId: "admin",
    createdAt: "2024-03-21T10:04:00Z",
    updatedAt: "2024-03-21T10:04:00Z",
    mediaIds: ["60", "61"],
    order: 55
  },
  {
    id: "56",
    title: "Values Vision Board",
    content: `
# Values Vision Board Exercise

Create a visual representation of your values.

## Creation Steps

1. Preparation
   - Gather materials
   - Find quiet space
   - Set aside time
   - Clear workspace

2. Vision Areas
   - Personal growth
   - Relationships
   - Career/Work
   - Health/Wellbeing
   - Community
   - Leisure

3. Implementation
   - Select images
   - Add key words
   - Include quotes
   - Create layout

## Usage Guide

- Display prominently
- Review daily
- Update quarterly
- Share with others

Remember: Visual reminders strengthen values connection.`,
    category: ExerciseCategory.ENGAGEMANG,
    userId: "admin",
    createdAt: "2024-03-21T10:05:00Z",
    updatedAt: "2024-03-21T10:05:00Z",
    mediaIds: ["62"],
    order: 56
  },
  {
    id: "57",
    title: "Acceptance Waves",
    content: `
# Acceptance Waves Exercise

Use the metaphor of waves to work with difficult experiences.

## Practice Guide

1. Initial Setup
   - Comfortable position
   - Eyes closed/soft gaze
   - Connect with breath
   - Notice present moment

2. Wave Awareness
   - Notice challenging experience
   - Feel it like a wave
   - Watch it rise and fall
   - Stay with the process

3. Common Waves
   - Emotional waves
   - Physical sensations
   - Thought patterns
   - Urges/Impulses

## Key Points

- Waves naturally come and go
- No wave lasts forever
- Resistance creates struggle
- Acceptance surfs the wave

Remember: Like waves, experiences naturally flow.`,
    category: ExerciseCategory.OPPENHET,
    userId: "admin",
    createdAt: "2024-03-21T10:06:00Z",
    updatedAt: "2024-03-21T10:06:00Z",
    mediaIds: ["63"],
    order: 57
  },
  {
    id: "58",
    title: "Daily Gratitude",
    content: `
# Daily Gratitude Practice

Cultivate appreciation and presence through gratitude.

## Practice Guide

1. Morning Practice
   - Notice three simple gifts
   - Feel the appreciation
   - Express thanks silently
   - Set grateful intention

2. Throughout Day
   - Notice small pleasures
   - Acknowledge helpers
   - Appreciate body/health
   - Find beauty in ordinary

3. Evening Reflection
   - Review day's gifts
   - Write three gratitudes
   - Feel the contentment
   - Rest in appreciation

## Benefits

- Increases happiness
- Builds resilience
- Enhances relationships
- Deepens presence

Remember: Gratitude turns what we have into enough.`,
    category: ExerciseCategory.NARVARO,
    userId: "admin",
    createdAt: "2024-03-21T11:00:00Z",
    updatedAt: "2024-03-21T11:00:00Z",
    mediaIds: ["64"],
    order: 58
  },
  {
    id: "59",
    title: "Self-Story Exploration",
    content: `
# Self-Story Exploration Exercise

Examine and gain perspective on personal narratives.

## Practice Steps

1. Story Awareness
   - Notice self-stories
   - Write them down
   - Observe their impact
   - Notice their origin

2. Story Investigation
   - Is it always true?
   - Who taught this story?
   - Does it serve now?
   - What's another view?

3. Story Flexibility
   - Try new perspectives
   - Write alternate stories
   - Hold them lightly
   - Notice freedom

## Key Points

- Stories are not facts
- We can hold them lightly
- New stories possible
- Freedom in flexibility

Remember: You are the author, not the story.`,
    category: ExerciseCategory.OPPENHET,
    userId: "admin",
    createdAt: "2024-03-21T11:01:00Z",
    updatedAt: "2024-03-21T11:01:00Z",
    mediaIds: ["65"],
    order: 59
  },
  {
    id: "60",
    title: "Values Obstacles",
    content: `
# Values Obstacles Exercise

Work skillfully with barriers to valued living.

## Practice Guide

1. Identify Obstacles
   - Internal barriers
   - External challenges
   - Limiting beliefs
   - Resource constraints

2. Explore Impact
   - How they block values
   - Emotional effects
   - Behavioral impact
   - Cost assessment

3. Workable Responses
   - Accept what's present
   - Focus on influence
   - Take small steps
   - Build resources

## Implementation

- Start with one area
- Be specific
- Track progress
- Celebrate steps

Remember: Obstacles are part of the journey, not roadblocks.`,
    category: ExerciseCategory.ENGAGEMANG,
    userId: "admin",
    createdAt: "2024-03-21T11:02:00Z",
    updatedAt: "2024-03-21T11:02:00Z",
    mediaIds: ["66"],
    order: 60
  },
  {
    id: "61",
    title: "Mindful Touch",
    content: `
# Mindful Touch Exercise

Develop presence through tactile awareness.

## Practice Steps

1. Object Exploration
   - Choose small object
   - Feel texture/temperature
   - Notice details
   - Explore with curiosity

2. Environmental Touch
   - Notice contact points
   - Feel air on skin
   - Experience textures
   - Sense temperature

3. Movement Touch
   - Walking sensation
   - Hand movements
   - Face touching
   - Body awareness

## Integration

- Daily activities
- Different textures
- Various temperatures
- Multiple surfaces

Remember: Touch connects us directly to present experience.`,
    category: ExerciseCategory.NARVARO,
    userId: "admin",
    createdAt: "2024-03-21T11:03:00Z",
    updatedAt: "2024-03-21T11:03:00Z",
    mediaIds: ["67"],
    order: 61
  },
  {
    id: "62",
    title: "Mind Theater",
    content: `
# Mind Theater Defusion Exercise

View thoughts as a theatrical performance.

## Practice Guide

1. Setting the Stage
   - Imagine theater stage
   - You're in audience
   - Thoughts are actors
   - Mind is director

2. The Performance
   - Watch thoughts perform
   - Notice the drama
   - See costumes/props
   - Hear the dialogue

3. Audience Perspective
   - Stay in your seat
   - No need to join in
   - Just watch the show
   - Notice your response

## Key Points

- You are the audience
- Thoughts are performers
- No need to believe
- Enjoy the show

Remember: Life is the theater, thoughts are the play.`,
    category: ExerciseCategory.OPPENHET,
    userId: "admin",
    createdAt: "2024-03-21T11:04:00Z",
    updatedAt: "2024-03-21T11:04:00Z",
    mediaIds: ["68"],
    order: 62
  },
  {
    id: "63",
    title: "Values Legacy",
    content: `
# Values Legacy Exercise

Explore the lasting impact of living your values.

## Practice Steps

1. Future Vision
   - Imagine future impact
   - Consider influence
   - See ripple effects
   - Feel connection

2. Areas of Impact
   - Family/Friends
   - Community
   - Work/Career
   - Environment
   - Future generations

3. Action Planning
   - Daily choices
   - Key moments
   - Important decisions
   - Relationship building

## Integration

- Regular review
- Adjust actions
- Share with others
- Document journey

Remember: Today's values shape tomorrow's legacy.`,
    category: ExerciseCategory.ENGAGEMANG,
    userId: "admin",
    createdAt: "2024-03-21T11:05:00Z",
    updatedAt: "2024-03-21T11:05:00Z",
    mediaIds: ["69"],
    order: 63
  },
  {
    id: "64",
    title: "Acceptance Garden",
    content: `
# Acceptance Garden Exercise

Use gardening metaphor for cultivating acceptance.

## Practice Guide

1. The Garden
   - Life experiences as plants
   - Emotions as weather
   - Thoughts as seasons
   - You as the gardener

2. Cultivation
   - Notice what grows
   - Accept all weather
   - Work with seasons
   - Tend with care

3. Garden Wisdom
   - Everything cycles
   - Growth takes time
   - Weeds are normal
   - Beauty in diversity

## Key Points

- Accept all growth
- Patient attention
- Gentle tending
- Natural cycles

Remember: Like a garden, life flourishes with acceptance.`,
    category: ExerciseCategory.OPPENHET,
    userId: "admin",
    createdAt: "2024-03-21T11:06:00Z",
    updatedAt: "2024-03-21T11:06:00Z",
    mediaIds: ["70"],
    order: 64
  }
].map(e => ({
  ...e,
  id: String(e.id),
  createdAt: new Date(e.createdAt),
  updatedAt: new Date(e.updatedAt)
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