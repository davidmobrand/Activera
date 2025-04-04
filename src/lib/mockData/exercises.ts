import { Exercise, ExerciseCategory } from '../types';
import { CreateExerciseSchema, ExerciseSchema, UpdateExerciseSchema } from '../validation';
import type { CreateExercise } from '../validation';

// Mock Exercises
export const exercises: Exercise[] = [
  {
    id: '1',
    title: 'Mindful Breathing',
    content: `
      <h2>Mindful Breathing Exercise</h2>
      <p>This simple but powerful mindfulness exercise will help you stay present and centered.</p>
      <h3>Instructions:</h3>
      <ol>
        <li>Find a comfortable seated position</li>
        <li>Close your eyes or maintain a soft gaze</li>
        <li>Focus your attention on your breath</li>
        <li>Notice the sensation of breathing without trying to change it</li>
        <li>When your mind wanders, gently bring it back to your breath</li>
      </ol>
      <p>Practice this exercise for 5-10 minutes daily to develop mindfulness.</p>
    `,
    category: ExerciseCategory.NARVARO,
    userId: '1',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z',
    mediaIds: ['1', '2'],
    order: 1
  }
].map(exercise => ExerciseSchema.parse(exercise));

// Exercise Database Functions
export const findExerciseById = (id: string): Exercise | undefined => {
  const exercise = exercises.find(exercise => exercise.id === id);
  return exercise ? ExerciseSchema.parse(exercise) : undefined;
};

export const findExercises = (): Exercise[] => {
  return exercises.map(exercise => ExerciseSchema.parse(exercise));
};

export const findExercisesByCategory = (category: ExerciseCategory): Exercise[] => {
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
    updatedAt: now
  };
  const validatedExercise = ExerciseSchema.parse(newExercise);
  exercises.push(validatedExercise);
  return validatedExercise;
};

export const updateExercise = (id: string, data: Partial<Exercise>): Exercise | null => {
  const validatedData = UpdateExerciseSchema.parse(data);
  const index = exercises.findIndex(exercise => exercise.id === id);
  if (index !== -1) {
    const updatedExercise = {
      ...exercises[index],
      ...validatedData,
      updatedAt: new Date().toISOString()
    };
    const validatedExercise = ExerciseSchema.parse(updatedExercise);
    exercises[index] = validatedExercise;
    return validatedExercise;
  }
  return null;
};

export const deleteExercise = (id: string): boolean => {
  const index = exercises.findIndex(exercise => exercise.id === id);
  if (index !== -1) {
    exercises.splice(index, 1);
    return true;
  }
  return false;
}; 