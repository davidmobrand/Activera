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
        title: `Exercise ${order}`,
        introduction: `<p>Welcome to Exercise ${order}. This exercise will help you develop mindfulness skills.</p>`,
        duration: '<p>10-15 minutes</p>',
        benefits: '<ul><li>Reduced stress</li><li>Improved focus</li><li>Better emotional regulation</li></ul>',
        instructions: `<p>Follow these steps:</p><ol><li>Find a comfortable position</li><li>Close your eyes</li><li>Focus on your breath</li></ol>`,
        tips: '<p>Remember to be gentle with yourself and maintain a non-judgmental attitude.</p>',
        accessibility: '<p>This exercise can be done sitting, lying down, or standing.</p>',
        prerequisites: '<p>No special equipment or prior experience needed.</p>',
        progressIndicators: '<p>You may notice improved concentration and reduced stress over time.</p>'
      },
      sv: {
        title: `Övning ${order}`,
        introduction: `<p>Välkommen till Övning ${order}. Denna övning hjälper dig att utveckla mindfulness-färdigheter.</p>`,
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
    relatedExerciseIds: [],
    userId: '1',
    createdAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z',
    mediaIds: []
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