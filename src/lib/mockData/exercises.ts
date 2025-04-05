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
        content: `<h2>Introduction</h2>
<p>This mindful breathing exercise helps you develop a deeper awareness of your breath and its natural rhythm. By focusing on your breath, you can anchor yourself in the present moment and reduce stress and anxiety. Regular practice can improve concentration and emotional regulation.</p>

<h2>Duration</h2>
<p>10-15 minutes</p>

<h2>Benefits</h2>
<ul>
<li>Reduces stress and anxiety</li>
<li>Improves focus and concentration</li>
<li>Helps regulate emotions</li>
<li>Promotes relaxation</li>
<li>Enhances mind-body connection</li>
</ul>

<h2>Instructions</h2>
<ol>
<li>Find a comfortable position, either sitting or lying down</li>
<li>Gently close your eyes or maintain a soft gaze</li>
<li>Take a few deep breaths to settle into the practice</li>
<li>Notice the natural rhythm of your breath without trying to change it</li>
<li>Pay attention to the sensation of breathing in your body</li>
<li>When your mind wanders, gently bring your attention back to your breath</li>
<li>Continue for the desired duration</li>
</ol>

<h2>Tips</h2>
<ul>
<li>Practice in a quiet environment when possible</li>
<li>Set a gentle timer to avoid checking the time</li>
<li>Be patient with yourself - mind wandering is normal</li>
<li>Start with shorter sessions and gradually increase duration</li>
</ul>`,
      },
      sv: {
        title: 'Medveten Andning',
        content: `<h2>Introduktion</h2>
<p>Denna övning i medveten andning hjälper dig att utveckla en djupare medvetenhet om din andning och dess naturliga rytm. Genom att fokusera på andningen kan du förankra dig i nuet och minska stress och oro. Regelbunden övning kan förbättra koncentration och känsloreglering.</p>

<h2>Längd</h2>
<p>10-15 minuter</p>

<h2>Fördelar</h2>
<ul>
<li>Minskar stress och oro</li>
<li>Förbättrar fokus och koncentration</li>
<li>Hjälper till att reglera känslor</li>
<li>Främjar avslappning</li>
<li>Förstärker kopplingen mellan kropp och sinne</li>
</ul>

<h2>Instruktioner</h2>
<ol>
<li>Hitta en bekväm position, sittande eller liggande</li>
<li>Slut försiktigt ögonen eller behåll en mjuk blick</li>
<li>Ta några djupa andetag för att komma till ro</li>
<li>Observera din naturliga andningsrytm utan att försöka ändra den</li>
<li>Uppmärksamma känslan av andningen i din kropp</li>
<li>När tankarna vandrar, för varsamt tillbaka uppmärksamheten till andningen</li>
<li>Fortsätt under önskad tid</li>
</ol>

<h2>Tips</h2>
<ul>
<li>Öva i en tyst miljö när det är möjligt</li>
<li>Ställ in en mjuk timer för att undvika att kolla tiden</li>
<li>Var tålmodig med dig själv - det är normalt att tankarna vandrar</li>
<li>Börja med kortare sessioner och öka gradvis längden</li>
</ul>`,
      },
    },
    {
      en: {
        title: 'Body Scan',
        content: `<h2>Introduction</h2>
<p>The body scan meditation is a powerful technique for developing body awareness and releasing physical tension. This practice helps you connect with your body's sensations and promotes deep relaxation. Regular practice can improve sleep quality and reduce physical stress symptoms.</p>

<h2>Duration</h2>
<p>15-20 minutes</p>

<h2>Benefits</h2>
<ul>
<li>Increases body awareness</li>
<li>Releases physical tension</li>
<li>Improves sleep quality</li>
<li>Reduces stress-related symptoms</li>
<li>Enhances relaxation response</li>
</ul>

<h2>Instructions</h2>
<ol>
<li>Lie down comfortably on your back</li>
<li>Close your eyes and take a few deep breaths</li>
<li>Begin by focusing on your toes and feet</li>
<li>Gradually move your attention up through your body</li>
<li>Notice any sensations, tension, or comfort in each area</li>
<li>Release any tension you find as you exhale</li>
<li>Continue until you've scanned your entire body</li>
<li>Take a moment to feel your body as a whole</li>
</ol>

<h2>Tips</h2>
<ul>
<li>Use a yoga mat or comfortable surface</li>
<li>Cover yourself with a light blanket</li>
<li>Practice in a warm, quiet space</li>
<li>Move slowly and deliberately through each body part</li>
</ul>`,
      },
      sv: {
        title: 'Kroppsskanning',
        content: `<h2>Introduktion</h2>
<p>Kroppsskanning är en kraftfull teknik för att utveckla kroppsmedvetenhet och släppa fysisk spänning. Denna övning hjälper dig att få kontakt med kroppens förnimmelser och främjar djup avslappning. Regelbunden övning kan förbättra sömnkvalitet och minska fysiska stressymtom.</p>

<h2>Längd</h2>
<p>15-20 minuter</p>

<h2>Fördelar</h2>
<ul>
<li>Ökar kroppsmedvetenheten</li>
<li>Släpper fysiska spänningar</li>
<li>Förbättrar sömnkvaliteten</li>
<li>Minskar stressrelaterade symtom</li>
<li>Förstärker avslappningsresponsen</li>
</ul>

<h2>Instruktioner</h2>
<ol>
<li>Lägg dig bekvämt på rygg</li>
<li>Slut ögonen och ta några djupa andetag</li>
<li>Börja med att fokusera på tårna och fötterna</li>
<li>Flytta gradvis uppmärksamheten uppåt genom kroppen</li>
<li>Notera alla förnimmelser, spänningar eller bekvämlighet i varje område</li>
<li>Släpp eventuell spänning när du andas ut</li>
<li>Fortsätt tills du har skannat hela kroppen</li>
<li>Ta en stund att känna kroppen som helhet</li>
</ol>

<h2>Tips</h2>
<ul>
<li>Använd en yogamatta eller bekvämt underlag</li>
<li>Täck dig med en lätt filt</li>
<li>Öva i ett varmt, tyst utrymme</li>
<li>Rör dig långsamt och medvetet genom varje kroppsdel</li>
</ul>`,
      },
    },
    {
      en: {
        title: 'Thought Observation',
        content: `<h2>Introduction</h2>
<p>Thought observation is a mindfulness practice that helps you develop a different relationship with your thoughts. Instead of getting caught up in them, you learn to observe thoughts as mental events that come and go. This practice can reduce anxiety and improve emotional resilience.</p>

<h2>Duration</h2>
<p>10-15 minutes</p>

<h2>Benefits</h2>
<ul>
<li>Reduces overthinking and rumination</li>
<li>Increases emotional awareness</li>
<li>Develops mental clarity</li>
<li>Improves stress management</li>
<li>Enhances self-understanding</li>
</ul>

<h2>Instructions</h2>
<ol>
<li>Find a comfortable seated position</li>
<li>Close your eyes or maintain a soft gaze</li>
<li>Take a few centering breaths</li>
<li>Notice thoughts as they arise without engaging with them</li>
<li>Imagine thoughts as clouds passing in the sky</li>
<li>When you get caught in a thought, gently return to observing</li>
<li>Notice any patterns or themes in your thinking</li>
<li>End with a few mindful breaths</li>
</ol>

<h2>Tips</h2>
<ul>
<li>Don't try to stop or change your thoughts</li>
<li>Practice acceptance of whatever arises</li>
<li>Use gentle labels if helpful (e.g., "planning," "remembering")</li>
<li>Remember that all types of thoughts are normal</li>
</ul>`,
      },
      sv: {
        title: 'Tankeobservation',
        content: `<h2>Introduktion</h2>
<p>Tankeobservation är en mindfulnessövning som hjälper dig att utveckla en annorlunda relation till dina tankar. Istället för att fastna i dem lär du dig att observera tankar som mentala händelser som kommer och går. Denna övning kan minska oro och förbättra emotionell motståndskraft.</p>

<h2>Längd</h2>
<p>10-15 minuter</p>

<h2>Fördelar</h2>
<ul>
<li>Minskar överdriven tankeverksamhet och grubblande</li>
<li>Ökar emotionell medvetenhet</li>
<li>Utvecklar mental klarhet</li>
<li>Förbättrar stresshantering</li>
<li>Förstärker självförståelse</li>
</ul>

<h2>Instruktioner</h2>
<ol>
<li>Hitta en bekväm sittande position</li>
<li>Slut ögonen eller behåll en mjuk blick</li>
<li>Ta några centrerande andetag</li>
<li>Notera tankar när de uppstår utan att engagera dig i dem</li>
<li>Föreställ dig tankar som moln som passerar på himlen</li>
<li>När du fastnar i en tanke, återgå varsamt till observerandet</li>
<li>Lägg märke till eventuella mönster eller teman i ditt tänkande</li>
<li>Avsluta med några medvetna andetag</li>
</ol>

<h2>Tips</h2>
<ul>
<li>Försök inte stoppa eller ändra dina tankar</li>
<li>Öva på att acceptera det som uppstår</li>
<li>Använd milda etiketter om det hjälper (t.ex. "planerar," "minns")</li>
<li>Kom ihåg att alla typer av tankar är normala</li>
</ul>`,
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