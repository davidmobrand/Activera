import { Exercise, ExerciseCategoryEnum } from '@/lib/types';
import { CreateExerciseSchema, ExerciseSchema, UpdateExerciseSchema } from '../validation';
import type { CreateExercise } from '../validation';

function generateExercises(count: number): Exercise[] {
  const categories = [
    ExerciseCategoryEnum.NARVARO,
    ExerciseCategoryEnum.OPPENHET,
    ExerciseCategoryEnum.ENGAGEMANG,
  ];

  const baseExercises = [
    {
      en: {
        title: 'Mindful Breathing',
        content: `<h2>Introduction</h2><p>Practice mindful breathing.</p><h2>Instructions</h2><ol><li>Find a comfortable position</li><li>Focus on your breath</li></ol>`,
      },
      sv: {
        title: 'Medveten Andning',
        content: `<h2>Introduktion</h2><p>Öva medveten andning.</p><h2>Instruktioner</h2><ol><li>Hitta en bekväm position</li><li>Fokusera på din andning</li></ol>`,
      },
    },
    {
      en: {
        title: 'Body Scan',
        content: `<h2>Introduction</h2><p>Practice body awareness.</p><h2>Instructions</h2><ol><li>Lie down comfortably</li><li>Scan your body</li></ol>`,
      },
      sv: {
        title: 'Kroppsskanning',
        content: `<h2>Introduktion</h2><p>Öva kroppsmedvetenhet.</p><h2>Instruktioner</h2><ol><li>Ligg bekvämt</li><li>Skanna din kropp</li></ol>`,
      },
    },
    {
      en: {
        title: 'Thought Observation',
        content: `<h2>Introduction</h2><p>Observe your thoughts.</p><h2>Instructions</h2><ol><li>Sit quietly</li><li>Watch your thoughts</li></ol>`,
      },
      sv: {
        title: 'Tankeobservation',
        content: `<h2>Introduktion</h2><p>Observera dina tankar.</p><h2>Instruktioner</h2><ol><li>Sitt tyst</li><li>Iaktta dina tankar</li></ol>`,
      },
    },
  ];

  return Array.from({ length: count }, (_, i) => {
    const baseExercise = baseExercises[i % baseExercises.length];
    const category = categories[i % categories.length];
    const number = i + 1;

    return {
      id: String(number),
      translations: {
        en: {
          title: `${baseExercise.en.title} ${number}`,
          content: baseExercise.en.content,
        },
        sv: {
          title: `${baseExercise.sv.title} ${number}`,
          content: baseExercise.sv.content,
        },
      },
      category,
      userId: '1',
      createdAt: '2024-01-01T12:00:00Z',
      updatedAt: '2024-01-01T12:00:00Z',
      mediaIds: [],
      order: number,
    };
  });
}

// Generate 100 exercises
export const exercises: Exercise[] = generateExercises(100).map(exercise => ExerciseSchema.parse(exercise));

// Exercise Database Functions
export const findExerciseById = (id: string): Exercise | undefined => {
  const exercise = exercises.find(exercise => exercise.id === id);
  return exercise ? ExerciseSchema.parse(exercise) : undefined;
};

export const findExercises = (): Exercise[] => {
  return exercises.map(exercise => ExerciseSchema.parse(exercise));
};

export const findExercisesByCategory = (category: ExerciseCategoryEnum): Exercise[] => {
  return exercises
    .filter(exercise => exercise.category === category)
    .map(exercise => ExerciseSchema.parse(exercise));
};

export const createExercise = (exercise: CreateExercise): Exercise => {
  const validatedData = CreateExerciseSchema.parse(exercise);
  const now = new Date().toISOString();
  const newExercise = {
    ...validatedData,
    id: String(exercises.length + 1),
    createdAt: now,
    updatedAt: now,
  };
  const validatedExercise = ExerciseSchema.parse(newExercise);
  exercises.push(validatedExercise);
  return validatedExercise;
};

export const updateExercise = (id: string, data: Partial<Exercise>): Exercise => {
  const index = exercises.findIndex(e => e.id === id);
  if (index === -1) {
    throw new Error('Exercise not found');
  }

  const validatedData = UpdateExerciseSchema.parse(data);
  const updatedExercise = {
    ...exercises[index],
    ...validatedData,
    updatedAt: new Date().toISOString(),
  };

  const validatedExercise = ExerciseSchema.parse(updatedExercise);
  exercises[index] = validatedExercise;
  return validatedExercise;
};

export const deleteExercise = (id: string): boolean => {
  const index = exercises.findIndex(exercise => exercise.id === id);
  if (index !== -1) {
    exercises.splice(index, 1);
    return true;
  }
  return false;
}; 