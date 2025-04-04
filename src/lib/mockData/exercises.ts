import { Exercise, ExerciseCategory } from '../types';
import { CreateExerciseSchema, ExerciseSchema, UpdateExerciseSchema } from '../validation';
import type { CreateExercise } from '../validation';

// Mock Exercises
export const exercises: Exercise[] = [
  {
    id: '1',
    translations: {
      en: {
        title: 'Mindful Breathing',
        content: `
          <h2>Mindful Breathing Exercise</h2>
          <p>This simple yet powerful mindfulness exercise helps you stay present and centered.</p>
          <h3>Instructions:</h3>
          <ol>
            <li>Find a comfortable sitting position</li>
            <li>Close your eyes or maintain a soft gaze</li>
            <li>Focus your attention on your breathing</li>
            <li>Observe the sensation of breathing without trying to change it</li>
            <li>When your mind wanders, gently bring attention back to the breath</li>
          </ol>
          <p>Practice this exercise for 5-10 minutes daily to develop mindfulness.</p>
        `,
      },
      sv: {
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
      },
    },
    category: ExerciseCategory.NARVARO,
    userId: '1',
    createdAt: new Date('2024-01-01').toISOString(),
    updatedAt: new Date('2024-01-01').toISOString(),
    mediaIds: ['1', '2'],
    order: 1,
  },
  {
    id: '2',
    translations: {
      en: {
        title: 'Body Scan',
        content: `
          <h2>Body Scan Exercise</h2>
          <p>A guided exercise to increase awareness of your body and release physical tension.</p>
          <h3>Instructions:</h3>
          <ol>
            <li>Lie on your back in a comfortable position</li>
            <li>Start by bringing attention to your toes</li>
            <li>Slowly move your attention through the entire body</li>
            <li>Observe all sensations without judgment</li>
            <li>End by feeling the body as a whole</li>
          </ol>
          <p>This exercise takes about 20 minutes and can be done before bedtime for better sleep.</p>
        `,
      },
      sv: {
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
      },
    },
    category: ExerciseCategory.NARVARO,
    userId: '1',
    createdAt: new Date('2024-01-02').toISOString(),
    updatedAt: new Date('2024-01-02').toISOString(),
    mediaIds: ['3', '4'],
    order: 2,
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
    createdAt: '2024-01-03T00:00:00Z',
    updatedAt: '2024-01-03T00:00:00Z',
    mediaIds: ['5'],
    order: 3
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
    createdAt: '2024-01-04T00:00:00Z',
    updatedAt: '2024-01-04T00:00:00Z',
    mediaIds: ['6'],
    order: 1
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
    createdAt: '2024-01-05T00:00:00Z',
    updatedAt: '2024-01-05T00:00:00Z',
    mediaIds: ['7'],
    order: 1
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
    createdAt: '2024-01-06T00:00:00Z',
    updatedAt: '2024-01-06T00:00:00Z',
    mediaIds: ['8'],
    order: 4
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
    createdAt: '2024-01-07T00:00:00Z',
    updatedAt: '2024-01-07T00:00:00Z',
    mediaIds: ['9'],
    order: 2
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