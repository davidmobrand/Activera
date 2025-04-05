import { Exercise, ExerciseCategoryEnum, DifficultyLevel, TimeOfDay } from '@/lib/types'
import type { CreateExercise } from '../validation'

export const exercises: Exercise[] = Array.from({ length: 100 }, (_, i) => {
  const order = i + 1
  let category: Exercise['category']
  if (order <= 33) {
    category = ExerciseCategoryEnum.NARVARO
  } else if (order <= 66) {
    category = ExerciseCategoryEnum.OPPENHET
  } else {
    category = ExerciseCategoryEnum.ENGAGEMANG
  }
  
  return {
    id: `ex_${order}`,
    order,
    category,
    translations: {
      en: {
        title: category === ExerciseCategoryEnum.NARVARO
          ? `Mindful ${['Breathing', 'Body Scan', 'Walking', 'Eating', 'Listening', 'Observation', 'Movement', 'Rest', 'Gratitude', 'Nature Connection'][order % 10]}`
          : category === ExerciseCategoryEnum.OPPENHET
          ? `Open ${['Awareness', 'Heart', 'Mind', 'Acceptance', 'Curiosity', 'Perspective', 'Reflection', 'Understanding', 'Compassion', 'Presence'][order % 10]}`
          : `Engaged ${['Action', 'Purpose', 'Connection', 'Learning', 'Growth', 'Service', 'Creativity', 'Expression', 'Collaboration', 'Leadership'][order % 10]}`,
        introduction: category === ExerciseCategoryEnum.NARVARO
          ? `<p>Welcome to a mindfulness exercise focusing on ${['conscious breathing techniques', 'deep body awareness', 'mindful movement', 'conscious eating practices', 'active listening skills', 'detailed observation', 'gentle movement awareness', 'restorative rest', 'gratitude practice', 'nature connection'][order % 10]}.</p>`
          : category === ExerciseCategoryEnum.OPPENHET
          ? `<p>Welcome to an openness exercise exploring ${['present moment awareness', 'heart-centered practice', 'mind expansion techniques', 'radical acceptance', 'cultivating curiosity', 'shifting perspectives', 'deep reflection', 'building understanding', 'developing compassion', 'deepening presence'][order % 10]}.</p>`
          : `<p>Welcome to an engagement exercise developing ${['purposeful action', 'life purpose exploration', 'meaningful connections', 'continuous learning', 'personal growth', 'service to others', 'creative expression', 'authentic expression', 'effective collaboration', 'mindful leadership'][order % 10]}.</p>`,
        duration: '<p>10-15 minutes</p>',
        benefits: '<ul><li>Reduced stress</li><li>Improved focus</li><li>Better emotional regulation</li></ul>',
        instructions: `<p>Follow these steps:</p><ol><li>Find a comfortable position</li><li>Close your eyes</li><li>Focus on your breath</li></ol>`,
        tips: '<p>Remember to be gentle with yourself and maintain a non-judgmental attitude.</p>',
        accessibility: '<p>This exercise can be done sitting, lying down, or standing.</p>',
        prerequisites: '<p>No special equipment or prior experience needed.</p>',
        progressIndicators: '<p>You may notice improved concentration and reduced stress over time.</p>'
      },
      sv: {
        title: category === ExerciseCategoryEnum.NARVARO
          ? `Medveten ${['Andning', 'Kroppsskanning', 'Promenad', 'Ätande', 'Lyssnande', 'Observation', 'Rörelse', 'Vila', 'Tacksamhet', 'Naturkontakt'][order % 10]}`
          : category === ExerciseCategoryEnum.OPPENHET
          ? `Öppen ${['Medvetenhet', 'Hjärta', 'Sinne', 'Acceptans', 'Nyfikenhet', 'Perspektiv', 'Reflektion', 'Förståelse', 'Medkänsla', 'Närvaro'][order % 10]}`
          : `Engagerad ${['Handling', 'Syfte', 'Kontakt', 'Lärande', 'Utveckling', 'Tjänst', 'Kreativitet', 'Uttryck', 'Samarbete', 'Ledarskap'][order % 10]}`,
        introduction: `<p>Välkommen till ${category === ExerciseCategoryEnum.NARVARO ? 'en mindfulness' : category === ExerciseCategoryEnum.OPPENHET ? 'en öppenhets' : 'en engagemangs'}övning som hjälper dig att utveckla din praktik.</p>`,
        duration: '<p>10-15 minuter</p>',
        benefits: '<ul><li>Minskad stress</li><li>Förbättrat fokus</li><li>Bättre emotionell reglering</li></ul>',
        instructions: `<p>Följ dessa steg:</p><ol><li>Hitta en bekväm position</li><li>Blunda</li><li>Fokusera på din andning</li></ol>`,
        tips: '<p>Kom ihåg att vara snäll mot dig själv och behåll en icke-dömande attityd.</p>',
        accessibility: '<p>Denna övning kan göras sittande, liggande eller stående.</p>',
        prerequisites: '<p>Ingen särskild utrustning eller tidigare erfarenhet krävs.</p>',
        progressIndicators: '<p>Du kan märka förbättrad koncentration och minskad stress över tid.</p>'
      }
    },
    difficulty: DifficultyLevel.BEGINNER,
    recommendedTime: [TimeOfDay.MORNING, TimeOfDay.EVENING],
    relatedExerciseIds: [
      ...Array.from({ length: 3 }, (_, j) => {
        const relatedOrder = ((order - 1 + j + 1) % 33) + 1 + (order <= 33 ? 0 : order <= 66 ? 33 : 66)
        return `ex_${relatedOrder}`
      })
    ],
    userId: '1',
    createdAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z',
    mediaIds: order === 1 ? ['media_1']  // Breathing meditation audio
          : order === 2 ? ['media_2']    // Body scan audio
          : order === 3 ? ['media_3']    // Walking meditation image
          : order === 35 ? ['media_4']   // Loving-kindness meditation audio
          : order === 36 ? ['media_5']   // Mind visualization image
          : order === 67 ? ['media_6']   // Mindful action image
          : []
  }
})

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