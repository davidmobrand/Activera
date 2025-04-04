import { Exercise, ExerciseCategoryEnum } from '@/lib/types';
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
          <h2>Introduction</h2>
          <p>Mindful breathing is a fundamental meditation practice that helps you stay present and focused.</p>
          
          <h2>Instructions</h2>
          <ol>
            <li>Find a comfortable position</li>
            <li>Close your eyes or maintain a soft gaze</li>
            <li>Focus on your natural breath</li>
            <li>Notice the sensations of breathing</li>
            <li>When your mind wanders, gently return to the breath</li>
          </ol>
          
          <h2>Duration</h2>
          <p>Start with 5 minutes and gradually increase to 15-20 minutes.</p>
          
          <h2>Benefits</h2>
          <ul>
            <li>Reduces stress and anxiety</li>
            <li>Improves focus and concentration</li>
            <li>Enhances emotional regulation</li>
            <li>Promotes relaxation</li>
          </ul>
        `
      },
      sv: {
        title: 'Medveten Andning',
        content: `
          <h2>Introduktion</h2>
          <p>Medveten andning är en grundläggande meditationsövning som hjälper dig att vara närvarande och fokuserad.</p>
          
          <h2>Instruktioner</h2>
          <ol>
            <li>Hitta en bekväm position</li>
            <li>Blunda eller behåll en mjuk blick</li>
            <li>Fokusera på din naturliga andning</li>
            <li>Uppmärksamma andningens förnimmelser</li>
            <li>När dina tankar vandrar, återgå varsamt till andningen</li>
          </ol>
          
          <h2>Varaktighet</h2>
          <p>Börja med 5 minuter och öka gradvis till 15-20 minuter.</p>
          
          <h2>Fördelar</h2>
          <ul>
            <li>Minskar stress och ångest</li>
            <li>Förbättrar fokus och koncentration</li>
            <li>Förbättrar emotionell reglering</li>
            <li>Främjar avslappning</li>
          </ul>
        `
      }
    },
    category: ExerciseCategoryEnum.NARVARO,
    userId: '1',
    createdAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z',
    mediaIds: [],
    order: 1
  },
  {
    id: '2',
    translations: {
      en: {
        title: 'Body Scan',
        content: `
          <h2>Introduction</h2>
          <p>The body scan is a practice that helps you develop awareness of physical sensations and release tension.</p>
          
          <h2>Instructions</h2>
          <ol>
            <li>Lie down in a comfortable position</li>
            <li>Close your eyes</li>
            <li>Bring attention to your toes</li>
            <li>Gradually move attention up through your body</li>
            <li>Notice any sensations without judgment</li>
          </ol>
          
          <h2>Duration</h2>
          <p>15-30 minutes is recommended.</p>
          
          <h2>Benefits</h2>
          <ul>
            <li>Improves body awareness</li>
            <li>Reduces physical tension</li>
            <li>Enhances relaxation</li>
            <li>Helps with sleep</li>
          </ul>
        `
      },
      sv: {
        title: 'Kroppsskanning',
        content: `
          <h2>Introduktion</h2>
          <p>Kroppsskanningen är en övning som hjälper dig att utveckla medvetenhet om fysiska förnimmelser och släppa spänningar.</p>
          
          <h2>Instruktioner</h2>
          <ol>
            <li>Lägg dig i en bekväm position</li>
            <li>Blunda</li>
            <li>Rikta uppmärksamheten mot dina tår</li>
            <li>Flytta gradvis uppmärksamheten uppåt genom kroppen</li>
            <li>Notera alla förnimmelser utan att döma</li>
          </ol>
          
          <h2>Varaktighet</h2>
          <p>15-30 minuter rekommenderas.</p>
          
          <h2>Fördelar</h2>
          <ul>
            <li>Förbättrar kroppsmedvetenhet</li>
            <li>Minskar fysiska spänningar</li>
            <li>Ökar avslappning</li>
            <li>Hjälper till med sömn</li>
          </ul>
        `
      }
    },
    category: ExerciseCategoryEnum.NARVARO,
    userId: '1',
    createdAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z',
    mediaIds: [],
    order: 2
  },
  {
    id: '3',
    translations: {
      en: {
        title: 'Five Senses Exercise',
        content: `
          <h2>Introduction</h2>
          <p>This exercise helps ground you in the present moment by engaging all your senses.</p>
          
          <h2>Instructions</h2>
          <ol>
            <li>Notice 5 things you can see</li>
            <li>Notice 4 things you can touch</li>
            <li>Notice 3 things you can hear</li>
            <li>Notice 2 things you can smell</li>
            <li>Notice 1 thing you can taste</li>
          </ol>
          
          <h2>Duration</h2>
          <p>5-10 minutes is typical.</p>
          
          <h2>Benefits</h2>
          <ul>
            <li>Grounds you in the present</li>
            <li>Reduces anxiety</li>
            <li>Improves mindfulness</li>
            <li>Can be done anywhere</li>
          </ul>
        `
      },
      sv: {
        title: 'Fem Sinnen Övning',
        content: `
          <h2>Introduktion</h2>
          <p>Denna övning hjälper dig att förankra dig i nuet genom att engagera alla dina sinnen.</p>
          
          <h2>Instruktioner</h2>
          <ol>
            <li>Notera 5 saker du kan se</li>
            <li>Notera 4 saker du kan känna</li>
            <li>Notera 3 saker du kan höra</li>
            <li>Notera 2 saker du kan lukta</li>
            <li>Notera 1 sak du kan smaka</li>
          </ol>
          
          <h2>Varaktighet</h2>
          <p>5-10 minuter är vanligt.</p>
          
          <h2>Fördelar</h2>
          <ul>
            <li>Förankrar dig i nuet</li>
            <li>Minskar ångest</li>
            <li>Förbättrar mindfulness</li>
            <li>Kan göras var som helst</li>
          </ul>
        `
      }
    },
    category: ExerciseCategoryEnum.NARVARO,
    userId: '1',
    createdAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z',
    mediaIds: [],
    order: 3
  },
  {
    id: '4',
    translations: {
      en: {
        title: 'Thoughts as Leaves',
        content: `
          <h2>Introduction</h2>
          <p>This exercise helps you practice observing your thoughts without getting caught up in them.</p>
          
          <h2>Instructions</h2>
          <ol>
            <li>Imagine sitting by a stream</li>
            <li>Picture leaves floating by</li>
            <li>Place each thought on a leaf</li>
            <li>Watch the thoughts float away</li>
            <li>Return to watching the stream</li>
          </ol>
          
          <h2>Duration</h2>
          <p>10-15 minutes is recommended.</p>
          
          <h2>Benefits</h2>
          <ul>
            <li>Develops cognitive defusion</li>
            <li>Reduces thought attachment</li>
            <li>Increases psychological flexibility</li>
            <li>Enhances mindfulness</li>
          </ul>
        `
      },
      sv: {
        title: 'Tankar som Löv',
        content: `
          <h2>Introduktion</h2>
          <p>Denna övning hjälper dig att öva på att observera dina tankar utan att fastna i dem.</p>
          
          <h2>Instruktioner</h2>
          <ol>
            <li>Föreställ dig att du sitter vid en bäck</li>
            <li>Visualisera löv som flyter förbi</li>
            <li>Placera varje tanke på ett löv</li>
            <li>Se tankarna flyta iväg</li>
            <li>Återgå till att titta på strömmen</li>
          </ol>
          
          <h2>Varaktighet</h2>
          <p>10-15 minuter rekommenderas.</p>
          
          <h2>Fördelar</h2>
          <ul>
            <li>Utvecklar kognitiv defusion</li>
            <li>Minskar tankefixering</li>
            <li>Ökar psykologisk flexibilitet</li>
            <li>Förbättrar mindfulness</li>
          </ul>
        `
      }
    },
    category: ExerciseCategoryEnum.OPPENHET,
    userId: '1',
    createdAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z',
    mediaIds: [],
    order: 4
  },
  {
    id: '5',
    translations: {
      en: {
        title: 'Values Compass',
        content: `
          <h2>Introduction</h2>
          <p>The Values Compass helps you identify and clarify your personal values to guide meaningful action.</p>
          
          <h2>Instructions</h2>
          <ol>
            <li>List important life areas</li>
            <li>Reflect on what matters most</li>
            <li>Rate current alignment</li>
            <li>Identify action steps</li>
            <li>Commit to small changes</li>
          </ol>
          
          <h2>Duration</h2>
          <p>30-45 minutes for initial exercise.</p>
          
          <h2>Benefits</h2>
          <ul>
            <li>Clarifies personal values</li>
            <li>Guides decision-making</li>
            <li>Increases life satisfaction</li>
            <li>Motivates meaningful action</li>
          </ul>
        `
      },
      sv: {
        title: 'Värdekompass',
        content: `
          <h2>Introduktion</h2>
          <p>Värdekompassen hjälper dig att identifiera och förtydliga dina personliga värderingar för att vägleda meningsfull handling.</p>
          
          <h2>Instruktioner</h2>
          <ol>
            <li>Lista viktiga livsområden</li>
            <li>Reflektera över vad som betyder mest</li>
            <li>Bedöm nuvarande överensstämmelse</li>
            <li>Identifiera handlingssteg</li>
            <li>Förbind dig till små förändringar</li>
          </ol>
          
          <h2>Varaktighet</h2>
          <p>30-45 minuter för initial övning.</p>
          
          <h2>Fördelar</h2>
          <ul>
            <li>Förtydligar personliga värderingar</li>
            <li>Vägleder beslutsfattande</li>
            <li>Ökar livstillfredsställelse</li>
            <li>Motiverar meningsfull handling</li>
          </ul>
        `
      }
    },
    category: ExerciseCategoryEnum.ENGAGEMANG,
    userId: '1',
    createdAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z',
    mediaIds: [],
    order: 5
  },
  {
    id: '6',
    translations: {
      en: {
        title: 'Mindful Walking',
        content: `
          <h2>Introduction</h2>
          <p>Mindful walking combines physical movement with present-moment awareness.</p>
          
          <h2>Instructions</h2>
          <ol>
            <li>Choose a quiet path</li>
            <li>Walk at a natural pace</li>
            <li>Notice the sensation of walking</li>
            <li>Feel each step fully</li>
            <li>Return attention when it wanders</li>
          </ol>
          
          <h2>Duration</h2>
          <p>10-20 minutes is recommended.</p>
          
          <h2>Benefits</h2>
          <ul>
            <li>Combines exercise with mindfulness</li>
            <li>Improves body awareness</li>
            <li>Reduces stress</li>
            <li>Can be done anywhere</li>
          </ul>
        `
      },
      sv: {
        title: 'Medveten Promenad',
        content: `
          <h2>Introduktion</h2>
          <p>Medveten promenad kombinerar fysisk rörelse med närvaro i nuet.</p>
          
          <h2>Instruktioner</h2>
          <ol>
            <li>Välj en lugn sträcka</li>
            <li>Gå i naturlig takt</li>
            <li>Uppmärksamma känslan av att gå</li>
            <li>Känn varje steg fullt ut</li>
            <li>Återför uppmärksamheten när den vandrar</li>
          </ol>
          
          <h2>Varaktighet</h2>
          <p>10-20 minuter rekommenderas.</p>
          
          <h2>Fördelar</h2>
          <ul>
            <li>Kombinerar motion med mindfulness</li>
            <li>Förbättrar kroppsmedvetenhet</li>
            <li>Minskar stress</li>
            <li>Kan göras var som helst</li>
          </ul>
        `
      }
    },
    category: ExerciseCategoryEnum.NARVARO,
    userId: '1',
    createdAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z',
    mediaIds: [],
    order: 6
  },
  {
    id: '7',
    translations: {
      en: {
        title: 'Acceptance of Emotions',
        content: `
          <h2>Introduction</h2>
          <p>This exercise helps you practice accepting emotions without trying to change them.</p>
          
          <h2>Instructions</h2>
          <ol>
            <li>Notice current emotions</li>
            <li>Label the emotion</li>
            <li>Observe physical sensations</li>
            <li>Allow the emotion to be present</li>
            <li>Practice self-compassion</li>
          </ol>
          
          <h2>Duration</h2>
          <p>15-20 minutes is recommended.</p>
          
          <h2>Benefits</h2>
          <ul>
            <li>Increases emotional awareness</li>
            <li>Reduces emotional avoidance</li>
            <li>Builds emotional resilience</li>
            <li>Improves self-understanding</li>
          </ul>
        `
      },
      sv: {
        title: 'Acceptans av Känslor',
        content: `
          <h2>Introduktion</h2>
          <p>Denna övning hjälper dig att öva på att acceptera känslor utan att försöka förändra dem.</p>
          
          <h2>Instruktioner</h2>
          <ol>
            <li>Uppmärksamma nuvarande känslor</li>
            <li>Sätt namn på känslan</li>
            <li>Observera fysiska förnimmelser</li>
            <li>Låt känslan vara närvarande</li>
            <li>Öva självmedkänsla</li>
          </ol>
          
          <h2>Varaktighet</h2>
          <p>15-20 minuter rekommenderas.</p>
          
          <h2>Fördelar</h2>
          <ul>
            <li>Ökar känslomässig medvetenhet</li>
            <li>Minskar känslomässigt undvikande</li>
            <li>Bygger känslomässig motståndskraft</li>
            <li>Förbättrar självförståelse</li>
          </ul>
        `
      }
    },
    category: ExerciseCategoryEnum.OPPENHET,
    userId: '1',
    createdAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z',
    mediaIds: [],
    order: 7
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