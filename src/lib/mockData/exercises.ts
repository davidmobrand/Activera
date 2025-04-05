import { Exercise, ExerciseCategoryEnum, DifficultyLevel, TimeOfDay } from '@/lib/types'
import type { CreateExercise } from '../validation'

export const exercises: Exercise[] = [
  {
    id: 'ex_1',
    translations: {
      en: {
        title: 'Mindful Breathing',
        introduction: 'A foundational mindfulness practice focusing on breath awareness. <audio controls src="/assets/exercises/audio/zen-meditation.mp3"></audio><br/><img src="/assets/exercises/images/peaceful-meditation.jpg" alt="Peaceful Meditation Posture" />',
        duration: '10-15 minutes',
        benefits: 'Reduces stress and anxiety, improves focus and emotional regulation',
        instructions: 'Find a comfortable position, close your eyes, and bring your attention to your breath...',
        tips: 'Start with short sessions and gradually increase duration',
        accessibility: 'Can be practiced sitting, lying down, or standing',
        prerequisites: 'None',
        progressIndicators: 'Increased ability to maintain focus on breath, reduced mind wandering'
      },
      sv: {
        title: 'Medveten Andning',
        introduction: 'En grundläggande mindfulnessövning med fokus på andningsmedvetenhet. <audio controls src="/assets/exercises/audio/zen-meditation.mp3"></audio><br/><img src="/assets/exercises/images/peaceful-meditation.jpg" alt="Fridfull Meditationshållning" />',
        duration: '10-15 minuter',
        benefits: 'Minskar stress och ångest, förbättrar fokus och känsloreglering',
        instructions: 'Hitta en bekväm position, blunda och rikta uppmärksamheten mot din andning...',
        tips: 'Börja med korta sessioner och öka gradvis längden',
        accessibility: 'Kan utövas sittande, liggande eller stående',
        prerequisites: 'Inga',
        progressIndicators: 'Ökad förmåga att behålla fokus på andningen, minskat tankevandrande'
      }
    },
    category: ExerciseCategoryEnum.NARVARO,
    difficulty: DifficultyLevel.BEGINNER,
    recommendedTime: [TimeOfDay.MORNING, TimeOfDay.EVENING],
    relatedExerciseIds: ['ex_2', 'ex_3'],
    userId: 'admin',
    createdAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z',
    mediaIds: ['media_1'],
    order: 1
  },
  {
    id: 'ex_2',
    translations: {
      en: {
        title: 'Body Scan Meditation',
        introduction: 'A systematic practice of bringing attention to different parts of your body. <audio controls src="/assets/exercises/audio/calm-meditation.mp3"></audio><br/><img src="/assets/exercises/images/mindful-yoga.jpg" alt="Relaxed Body Position" />',
        duration: '20-30 minutes',
        benefits: 'Improves body awareness, reduces physical tension, promotes relaxation',
        instructions: 'Lie down comfortably, close your eyes, and systematically bring attention to each part of your body...',
        tips: 'Use a mat or blanket for comfort',
        accessibility: 'Best practiced lying down, but can be adapted for sitting',
        prerequisites: 'None',
        progressIndicators: 'Increased body awareness, ability to release tension'
      },
      sv: {
        title: 'Kroppsskanning',
        introduction: 'En systematisk övning i att uppmärksamma olika delar av din kropp. <audio controls src="/assets/exercises/audio/calm-meditation.mp3"></audio><br/><img src="/assets/exercises/images/mindful-yoga.jpg" alt="Avslappnad Kroppsposition" />',
        duration: '20-30 minuter',
        benefits: 'Förbättrar kroppsmedvetenhet, minskar fysisk spänning, främjar avslappning',
        instructions: 'Lägg dig bekvämt, blunda och för systematiskt uppmärksamheten till varje del av din kropp...',
        tips: 'Använd en matta eller filt för bekvämlighet',
        accessibility: 'Bäst att utöva liggande, men kan anpassas för sittande',
        prerequisites: 'Inga',
        progressIndicators: 'Ökad kroppsmedvetenhet, förmåga att släppa spänningar'
      }
    },
    category: ExerciseCategoryEnum.NARVARO,
    difficulty: DifficultyLevel.BEGINNER,
    recommendedTime: [TimeOfDay.MORNING, TimeOfDay.EVENING],
    relatedExerciseIds: ['ex_1', 'ex_3'],
    userId: 'admin',
    createdAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z',
    mediaIds: ['media_2'],
    order: 2
  },
  {
    id: 'ex_3',
    translations: {
      en: {
        title: 'Mindful Walking',
        introduction: 'Practice mindfulness while walking. <img src="/assets/exercises/images/mindful-yoga.jpg" alt="Walking Meditation Posture" /><br/><audio controls src="/assets/exercises/audio/calm-meditation.mp3"></audio>',
        duration: '15-20 minutes',
        benefits: 'Combines physical activity with mindfulness, improves balance and coordination',
        instructions: 'Find a quiet path or space, walk slowly and deliberately...',
        tips: 'Focus on the sensation of each step',
        accessibility: 'Requires ability to walk, can be modified for different mobility levels',
        prerequisites: 'None',
        progressIndicators: 'Increased awareness of walking movements, better balance'
      },
      sv: {
        title: 'Medveten Gång',
        introduction: 'Öva mindfulness medan du går. <img src="/assets/exercises/images/mindful-yoga.jpg" alt="Gångmeditation Hållning" /><br/><audio controls src="/assets/exercises/audio/calm-meditation.mp3"></audio>',
        duration: '15-20 minuter',
        benefits: 'Kombinerar fysisk aktivitet med mindfulness, förbättrar balans och koordination',
        instructions: 'Hitta en lugn stig eller plats, gå långsamt och medvetet...',
        tips: 'Fokusera på känslan av varje steg',
        accessibility: 'Kräver förmåga att gå, kan modifieras för olika mobilitetsnivåer',
        prerequisites: 'Inga',
        progressIndicators: 'Ökad medvetenhet om gångrörelser, bättre balans'
      }
    },
    category: ExerciseCategoryEnum.NARVARO,
    difficulty: DifficultyLevel.BEGINNER,
    recommendedTime: [TimeOfDay.ANY],
    relatedExerciseIds: ['ex_1', 'ex_2'],
    userId: 'admin',
    createdAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z',
    mediaIds: ['media_3'],
    order: 3
  },
  {
    id: 'ex_35',
    translations: {
      en: {
        title: 'Loving-Kindness Meditation',
        introduction: 'Develop compassion and kindness towards yourself and others. <audio controls src="/assets/exercises/audio/zen-meditation.mp3"></audio><br/><img src="/assets/exercises/images/peaceful-meditation.jpg" alt="Peaceful Meditation Practice" />',
        duration: '15-20 minutes',
        benefits: 'Increases empathy, reduces negative self-talk, improves relationships',
        instructions: 'Sit comfortably, bring to mind someone you care about...',
        tips: 'Start with yourself, then extend to others',
        accessibility: 'Can be practiced in any position',
        prerequisites: 'Basic mindfulness experience helpful',
        progressIndicators: 'Increased feelings of warmth and connection'
      },
      sv: {
        title: 'Kärleksfull Vänlighet Meditation',
        introduction: 'Utveckla medkänsla och vänlighet mot dig själv och andra. <audio controls src="/assets/exercises/audio/zen-meditation.mp3"></audio><br/><img src="/assets/exercises/images/peaceful-meditation.jpg" alt="Fridfull Meditationsövning" />',
        duration: '15-20 minuter',
        benefits: 'Ökar empati, minskar negativt självprat, förbättrar relationer',
        instructions: 'Sitt bekvämt, tänk på någon du bryr dig om...',
        tips: 'Börja med dig själv, utvidga sedan till andra',
        accessibility: 'Kan utövas i valfri position',
        prerequisites: 'Grundläggande mindfulnesserfarenhet hjälpsam',
        progressIndicators: 'Ökade känslor av värme och samhörighet'
      }
    },
    category: ExerciseCategoryEnum.OPPENHET,
    difficulty: DifficultyLevel.INTERMEDIATE,
    recommendedTime: [TimeOfDay.MORNING, TimeOfDay.EVENING],
    relatedExerciseIds: ['ex_36'],
    userId: 'admin',
    createdAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z',
    mediaIds: ['media_4'],
    order: 35
  },
  {
    id: 'ex_36',
    translations: {
      en: {
        title: 'Open Mind Visualization',
        introduction: 'Visualize your mind as an open, expansive space. <img src="/assets/exercises/images/peaceful-meditation.jpg" alt="Mind Visualization Aid" /><br/><audio controls src="/assets/exercises/audio/zen-meditation.mp3"></audio>',
        duration: '10-15 minutes',
        benefits: 'Reduces thought fixation, increases mental flexibility',
        instructions: 'Find a quiet space, close your eyes...',
        tips: 'Use imagery that resonates with you',
        accessibility: 'Suitable for all levels',
        prerequisites: 'None',
        progressIndicators: 'Greater ease in letting go of thoughts'
      },
      sv: {
        title: 'Öppet Sinne Visualisering',
        introduction: 'Visualisera ditt sinne som ett öppet, vidsträckt rum. <img src="/assets/exercises/images/peaceful-meditation.jpg" alt="Sinnesvisualisering Hjälpmedel" /><br/><audio controls src="/assets/exercises/audio/zen-meditation.mp3"></audio>',
        duration: '10-15 minuter',
        benefits: 'Minskar tankefixering, ökar mental flexibilitet',
        instructions: 'Hitta en lugn plats, blunda...',
        tips: 'Använd bilder som resonerar med dig',
        accessibility: 'Lämplig för alla nivåer',
        prerequisites: 'Inga',
        progressIndicators: 'Större lätthet i att släppa taget om tankar'
      }
    },
    category: ExerciseCategoryEnum.OPPENHET,
    difficulty: DifficultyLevel.INTERMEDIATE,
    recommendedTime: [TimeOfDay.ANY],
    relatedExerciseIds: ['ex_35'],
    userId: 'admin',
    createdAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z',
    mediaIds: ['media_5'],
    order: 36
  },
  {
    id: 'ex_67',
    translations: {
      en: {
        title: 'Mindful Action Planning',
        introduction: 'Learn to align your actions with your values. <img src="/assets/exercises/images/mindful-yoga.jpg" alt="Mindful Action Example" /><br/><audio controls src="/assets/exercises/audio/calm-meditation.mp3"></audio>',
        duration: '20-30 minutes',
        benefits: 'Increases goal clarity, improves decision-making',
        instructions: 'Identify a value-aligned goal...',
        tips: 'Start with small, achievable actions',
        accessibility: 'Can be adapted for any situation',
        prerequisites: 'Basic understanding of personal values',
        progressIndicators: 'More consistent value-aligned actions'
      },
      sv: {
        title: 'Medveten Handlingsplanering',
        introduction: 'Lär dig att anpassa dina handlingar efter dina värderingar. <img src="/assets/exercises/images/mindful-yoga.jpg" alt="Medveten Handling Exempel" /><br/><audio controls src="/assets/exercises/audio/calm-meditation.mp3"></audio>',
        duration: '20-30 minuter',
        benefits: 'Ökar målklarhet, förbättrar beslutsfattande',
        instructions: 'Identifiera ett värderingsanpassat mål...',
        tips: 'Börja med små, uppnåbara handlingar',
        accessibility: 'Kan anpassas för alla situationer',
        prerequisites: 'Grundläggande förståelse för personliga värderingar',
        progressIndicators: 'Mer konsekventa värderingsanpassade handlingar'
      }
    },
    category: ExerciseCategoryEnum.ENGAGEMANG,
    difficulty: DifficultyLevel.ADVANCED,
    recommendedTime: [TimeOfDay.MORNING],
    relatedExerciseIds: [],
    userId: 'admin',
    createdAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z',
    mediaIds: ['media_6'],
    order: 67
  }
];

export const findExerciseById = (id: string) => {
  return exercises.find(exercise => exercise.id === id)
}

export const findExercises = () => {
  return exercises
}

export const findExercisesByCategory = (category: ExerciseCategoryEnum) => {
  return exercises.filter(exercise => exercise.category === category)
}

export const createExercise = (exercise: CreateExercise): Exercise => {
  const newExercise: Exercise = {
    ...exercise,
    id: `ex_${exercises.length + 1}`,
    translations: {
      en: {
        ...exercise.translations.en,
        accessibility: exercise.translations.en.accessibility || '',
        prerequisites: exercise.translations.en.prerequisites || '',
        progressIndicators: exercise.translations.en.progressIndicators || ''
      },
      sv: {
        ...exercise.translations.sv,
        accessibility: exercise.translations.sv.accessibility || '',
        prerequisites: exercise.translations.sv.prerequisites || '',
        progressIndicators: exercise.translations.sv.progressIndicators || ''
      }
    },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  exercises.push(newExercise)
  return newExercise
}

export const updateExercise = (id: string, data: Partial<Exercise>): Exercise => {
  const index = exercises.findIndex(exercise => exercise.id === id)
  if (index === -1) throw new Error('Exercise not found')
  
  exercises[index] = {
    ...exercises[index],
    ...data,
    updatedAt: new Date().toISOString()
  }
  return exercises[index]
}

export const deleteExercise = (id: string): boolean => {
  const index = exercises.findIndex(exercise => exercise.id === id)
  if (index === -1) return false
  
  exercises.splice(index, 1)
  return true
}

export const mockDb = {
  exercises,
  findExerciseById,
  findExercises,
  findExercisesByCategory,
  createExercise,
  updateExercise,
  deleteExercise
} 