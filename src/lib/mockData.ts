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
  },
  {
    id: '5',
    exerciseId: '3',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/five-senses.jpg',
    name: 'Five Senses Mindfulness Illustration',
    createdAt: new Date('2024-01-17').toISOString()
  },
  {
    id: '6',
    exerciseId: '4',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/stream-leaves.jpg',
    name: 'Peaceful Stream with Floating Leaves',
    createdAt: new Date('2024-01-18').toISOString()
  },
  {
    id: '7',
    exerciseId: '5',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/compass-values.jpg',
    name: 'Compass with Core Values',
    createdAt: new Date('2024-01-19').toISOString()
  },
  {
    id: '8',
    exerciseId: '6',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/mindful-walking.jpg',
    name: 'Person Walking Mindfully in Nature',
    createdAt: new Date('2024-01-20').toISOString()
  },
  {
    id: '9',
    exerciseId: '7',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/emotional-awareness.jpg',
    name: 'Emotional Awareness Illustration',
    createdAt: new Date('2024-01-21').toISOString()
  },
  {
    id: '10',
    exerciseId: '8',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/action-plan.jpg',
    name: 'Action Planning and Goal Setting',
    createdAt: new Date('2024-01-22').toISOString()
  },
  {
    id: '11',
    exerciseId: '9',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/mountain-meditation.jpg',
    name: 'Mountain Meditation Scene',
    createdAt: new Date('2024-01-23').toISOString()
  },
  {
    id: '12',
    exerciseId: '9',
    type: MediaType.AUDIO,
    url: '/assets/exercises/audio/mountain-meditation.mp3',
    name: 'Mountain Meditation Guidance',
    createdAt: new Date('2024-01-23').toISOString()
  },
  {
    id: '13',
    exerciseId: '10',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/defusion.jpg',
    name: 'Thought Defusion Exercise',
    createdAt: new Date('2024-01-24').toISOString()
  },
  {
    id: '14',
    exerciseId: '11',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/values-in-action.jpg',
    name: 'Values in Action',
    createdAt: new Date('2024-01-25').toISOString()
  },
  {
    id: '15',
    exerciseId: '12',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/self-compassion.jpg',
    name: 'Self-Compassion Practice',
    createdAt: new Date('2024-01-26').toISOString()
  },
  {
    id: '16',
    exerciseId: '13',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/gratitude-journal.jpg',
    name: 'Gratitude Journaling',
    createdAt: new Date('2024-01-27').toISOString()
  },
  {
    id: '17',
    exerciseId: '14',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/mindful-eating.jpg',
    name: 'Mindful Eating Practice',
    createdAt: new Date('2024-01-28').toISOString()
  },
  {
    id: '18',
    exerciseId: '15',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/values-tree.jpg',
    name: 'Values Tree Visualization',
    createdAt: new Date('2024-01-29').toISOString()
  },
  {
    id: '19',
    exerciseId: '16',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/observer-self.jpg',
    name: 'Observer Self Exercise',
    createdAt: new Date('2024-01-30').toISOString()
  },
  {
    id: '20',
    exerciseId: '17',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/willingness.jpg',
    name: 'Willingness Practice',
    createdAt: new Date('2024-01-31').toISOString()
  },
  {
    id: '21',
    exerciseId: '18',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/values-bullseye.jpg',
    name: 'Values Bullseye',
    createdAt: new Date('2024-02-01').toISOString()
  },
  {
    id: '22',
    exerciseId: '19',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/mindful-movement.jpg',
    name: 'Mindful Movement',
    createdAt: new Date('2024-02-02').toISOString()
  },
  {
    id: '23',
    exerciseId: '20',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/acceptance-diary.jpg',
    name: 'Acceptance Diary',
    createdAt: new Date('2024-02-03').toISOString()
  },
  {
    id: '24',
    exerciseId: '21',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/body-awareness.jpg',
    name: 'Body Awareness Exercise',
    createdAt: new Date('2024-02-04').toISOString()
  },
  {
    id: '25',
    exerciseId: '22',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/values-letter.jpg',
    name: 'Values Letter Writing',
    createdAt: new Date('2024-02-05').toISOString()
  },
  {
    id: '26',
    exerciseId: '23',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/mindful-listening.jpg',
    name: 'Mindful Listening Practice',
    createdAt: new Date('2024-02-06').toISOString()
  },
  {
    id: '27',
    exerciseId: '24',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/self-story.jpg',
    name: 'Self-as-Story Exercise',
    createdAt: new Date('2024-02-07').toISOString()
  },
  {
    id: '28',
    exerciseId: '25',
    type: MediaType.IMAGE,
    url: '/assets/exercises/images/values-mirror.jpg',
    name: 'Values Mirror Exercise',
    createdAt: new Date('2024-02-08').toISOString()
  },
  {
    id: "29",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/mindful-breathing-practice.jpg",
    name: "Mindful Breathing Practice",
    createdAt: "2024-03-20T10:00:00Z"
  },
  {
    id: "30",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/values-compass.jpg",
    name: "Values Compass Exercise",
    createdAt: "2024-03-20T10:01:00Z"
  },
  {
    id: "31",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/acceptance-mountain.jpg",
    name: "Acceptance Mountain",
    createdAt: "2024-03-20T10:02:00Z"
  },
  {
    id: "32",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/mindful-walking.jpg",
    name: "Mindful Walking Practice",
    createdAt: "2024-03-20T10:03:00Z"
  },
  {
    id: "33",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/values-action-plan.jpg",
    name: "Values Action Plan",
    createdAt: "2024-03-20T10:04:00Z"
  },
  {
    id: "34",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/defusion-exercise.jpg",
    name: "Defusion Exercise",
    createdAt: "2024-03-20T11:00:00Z"
  },
  {
    id: "35",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/self-compassion-meditation.jpg",
    name: "Self-Compassion Meditation",
    createdAt: "2024-03-20T11:01:00Z"
  },
  {
    id: "36",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/values-exploration.jpg",
    name: "Values Exploration",
    createdAt: "2024-03-20T11:02:00Z"
  },
  {
    id: "37",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/mindful-emotions.jpg",
    name: "Mindful Emotions",
    createdAt: "2024-03-20T11:03:00Z"
  },
  {
    id: "38",
    exerciseId: "",
    type: "IMAGE",
    url: "/images/acceptance-practice.jpg",
    name: "Acceptance Practice",
    createdAt: "2024-03-20T11:04:00Z"
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
    id: "31",
    title: "Leaves on a Stream",
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
    id: "32",
    title: "Self-Compassion Break",
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
    id: "33",
    title: "Values Discovery Journey",
    content: `
# Values Discovery Journey

Explore and clarify your personal values through guided reflection.

## Exercise Steps

1. Life Areas Exploration
   - Relationships
   - Career/Work
   - Personal Growth
   - Health/Wellbeing
   - Community/Society

2. For Each Area:
   - What matters most?
   - What brings meaning?
   - What inspires you?

3. Values Identification
   - List key themes
   - Rate importance
   - Consider current alignment

## Implementation

- Choose one value to focus on
- Set small, actionable goals
- Track progress daily

Remember: Values guide us but aren't destinations to reach.`,
    category: ExerciseCategory.ENGAGEMANG,
    userId: "admin",
    createdAt: "2024-03-20T11:02:00Z",
    updatedAt: "2024-03-20T11:02:00Z",
    mediaIds: ["36"],
    order: 33
  },
  {
    id: "34",
    title: "Mindful Emotions",
    content: `
# Mindful Emotions Practice

Learn to observe and work with emotions mindfully.

## Practice Guide

1. Notice the Emotion
   - Where do you feel it?
   - What sensations arise?
   - How intense is it?

2. Name the Emotion
   - Label it simply
   - Use "I notice" language
   - Avoid judgment

3. Allow the Experience
   - Make space for the feeling
   - Don't try to change it
   - Watch how it changes

## Key Reminders

- Emotions are temporary
- You are not your emotions
- Practice with both pleasant and unpleasant emotions

Remember: The goal is awareness, not control.`,
    category: ExerciseCategory.NARVARO,
    userId: "admin",
    createdAt: "2024-03-20T11:03:00Z",
    updatedAt: "2024-03-20T11:03:00Z",
    mediaIds: ["37"],
    order: 34
  },
  {
    id: "35",
    title: "Acceptance Practice",
    content: `
# Acceptance Practice

Learn to open up to difficult experiences with acceptance.

## Exercise Steps

1. Choose a Challenge
   - Select a current difficulty
   - Start with something manageable
   - Notice your resistance

2. Explore Your Experience
   - Physical sensations
   - Thoughts and images
   - Emotions and urges

3. Practice Opening Up
   - Make room for the experience
   - Drop the struggle
   - Notice what changes

## Practice Tips

- Start small
- Be patient
- Notice results without forcing them

Remember: Acceptance doesn't mean liking or wanting something.`,
    category: ExerciseCategory.OPPENHET,
    userId: "admin",
    createdAt: "2024-03-20T11:04:00Z",
    updatedAt: "2024-03-20T11:04:00Z",
    mediaIds: ["38"],
    order: 35
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