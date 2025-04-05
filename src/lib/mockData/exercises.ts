import { Exercise, ExerciseCategoryEnum, DifficultyLevel, TimeOfDay } from '@/lib/types';
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
        accessibility: `<h2>Accessibility Options</h2>
<ul>
<li>Can be practiced in any position - sitting, lying down, or even standing</li>
<li>Suitable for those with limited mobility</li>
<li>Can be done with eyes open or closed</li>
<li>No special equipment needed</li>
</ul>`,
        prerequisites: `<h2>Prerequisites</h2>
<p>No prior experience needed. This is an excellent starting point for mindfulness practice.</p>`,
        progressIndicators: `<h2>Signs of Progress</h2>
<ul>
<li>Increased ability to notice when mind wanders</li>
<li>Quicker return to breath when distracted</li>
<li>Longer periods of sustained attention</li>
<li>Greater awareness of breath throughout the day</li>
<li>Reduced reactivity to stress</li>
</ul>`,
      },
      sv: {
        title: 'Medveten Andning',
        content: `<h2>Introduktion</h2>
<p>Den här övningen i medveten andning hjälper dig utveckla en djupare medvetenhet om din andning och dess naturliga rytm. Genom att fokusera på andningen kan du förankra dig i nuet och minska stress och oro. Regelbunden övning kan förbättra din koncentrationsförmåga och känsloreglering.</p>

<h2>Längd</h2>
<p>10-15 minuter</p>

<h2>Fördelar</h2>
<ul>
<li>Minskar stress och oro</li>
<li>Förbättrar fokus och koncentration</li>
<li>Hjälper dig reglera känslor</li>
<li>Främjar avslappning</li>
<li>Stärker kopplingen mellan kropp och sinne</li>
</ul>

<h2>Instruktioner</h2>
<ol>
<li>Hitta en bekväm position, antingen sittande eller liggande</li>
<li>Slut försiktigt ögonen eller behåll en mjuk blick</li>
<li>Ta några djupa andetag för att komma till ro</li>
<li>Observera din naturliga andningsrytm utan att försöka förändra den</li>
<li>Uppmärksamma känslan av andningen i kroppen</li>
<li>När tankarna vandrar iväg, för varsamt tillbaka uppmärksamheten till andningen</li>
<li>Fortsätt under den tid du valt</li>
</ol>

<h2>Tips</h2>
<ul>
<li>Öva i en tyst miljö när det är möjligt</li>
<li>Ställ in en timer med mjuk signal för att slippa hålla koll på tiden</li>
<li>Var tålmodig med dig själv - det är helt normalt att tankarna vandrar</li>
<li>Börja med kortare pass och öka längden gradvis</li>
</ul>`,
        accessibility: `<h2>Tillgänglighet</h2>
<ul>
<li>Kan utföras i valfri position - sittande, liggande eller till och med stående</li>
<li>Passar även personer med begränsad rörlighet</li>
<li>Kan göras med öppna eller slutna ögon</li>
<li>Ingen särskild utrustning krävs</li>
</ul>`,
        prerequisites: `<h2>Förkunskaper</h2>
<p>Inga förkunskaper krävs. Detta är en utmärkt startpunkt för mindfulnessträning.</p>`,
        progressIndicators: `<h2>Tecken på framsteg</h2>
<ul>
<li>Ökad förmåga att upptäcka när tankarna vandrar</li>
<li>Snabbare återgång till andningen vid distraktion</li>
<li>Längre perioder av bibehållen uppmärksamhet</li>
<li>Större medvetenhet om andningen i vardagen</li>
<li>Minskad stressreaktivitet</li>
</ul>`,
      },
      difficulty: DifficultyLevel.BEGINNER,
      recommendedTime: [TimeOfDay.MORNING, TimeOfDay.EVENING],
      relatedExerciseIds: ['2', '3'],
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
        accessibility: `<h2>Accessibility Options</h2>
<ul>
<li>Can be practiced in any position - lying down</li>
<li>Suitable for those with limited mobility</li>
<li>No special equipment needed</li>
</ul>`,
        prerequisites: `<h2>Prerequisites</h2>
<p>No prior experience needed. This is an excellent starting point for mindfulness practice.</p>`,
        progressIndicators: `<h2>Signs of Progress</h2>
<ul>
<li>Increased ability to notice when mind wanders</li>
<li>Quicker return to breath when distracted</li>
<li>Longer periods of sustained attention</li>
<li>Greater awareness of body throughout the day</li>
<li>Reduced reactivity to stress</li>
</ul>`,
      },
      sv: {
        title: 'Kroppsskanning',
        content: `<h2>Introduktion</h2>
<p>Kroppsskanning är en kraftfull teknik för att utveckla kroppsmedvetenhet och släppa fysiska spänningar. Övningen hjälper dig att få kontakt med kroppens förnimmelser och främjar djup avslappning. Regelbunden övning kan förbättra din sömnkvalitet och minska fysiska stressymtom.</p>

<h2>Längd</h2>
<p>15-20 minuter</p>

<h2>Fördelar</h2>
<ul>
<li>Ökar kroppsmedvetenheten</li>
<li>Hjälper dig släppa fysiska spänningar</li>
<li>Förbättrar sömnkvaliteten</li>
<li>Minskar stressrelaterade symtom</li>
<li>Stärker avslappningsresponsen</li>
</ul>

<h2>Instruktioner</h2>
<ol>
<li>Lägg dig bekvämt på rygg</li>
<li>Slut ögonen och ta några djupa andetag</li>
<li>Börja med att fokusera på tårna och fötterna</li>
<li>För gradvis uppmärksamheten uppåt genom kroppen</li>
<li>Uppmärksamma alla förnimmelser, spänningar eller bekvämlighet i varje område</li>
<li>Släpp eventuella spänningar när du andas ut</li>
<li>Fortsätt tills du har skannat hela kroppen</li>
<li>Ta en stund att känna hela kroppen som en helhet</li>
</ol>

<h2>Tips</h2>
<ul>
<li>Använd en yogamatta eller annat bekvämt underlag</li>
<li>Täck dig med en lätt filt om det känns bra</li>
<li>Öva i ett varmt och tyst rum</li>
<li>Rör dig långsamt och medvetet genom varje kroppsdel</li>
</ul>`,
        accessibility: `<h2>Tillgänglighet</h2>
<ul>
<li>Kan utföras i valfri position - främst liggande</li>
<li>Passar även personer med begränsad rörlighet</li>
<li>Ingen särskild utrustning krävs</li>
</ul>`,
        prerequisites: `<h2>Förkunskaper</h2>
<p>Inga förkunskaper krävs. Detta är en utmärkt startpunkt för mindfulnessträning.</p>`,
        progressIndicators: `<h2>Tecken på framsteg</h2>
<ul>
<li>Ökad förmåga att upptäcka kroppens signaler</li>
<li>Snabbare återgång till kroppen vid distraktion</li>
<li>Längre perioder av bibehållen uppmärksamhet</li>
<li>Större kroppsmedvetenhet i vardagen</li>
<li>Minskad stressreaktivitet</li>
</ul>`,
      },
      difficulty: DifficultyLevel.BEGINNER,
      recommendedTime: [TimeOfDay.MORNING, TimeOfDay.EVENING],
      relatedExerciseIds: ['1', '3'],
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
        accessibility: `<h2>Accessibility Options</h2>
<ul>
<li>Can be practiced in any position - sitting</li>
<li>Suitable for those with limited mobility</li>
<li>No special equipment needed</li>
</ul>`,
        prerequisites: `<h2>Prerequisites</h2>
<p>No prior experience needed. This is an excellent starting point for mindfulness practice.</p>`,
        progressIndicators: `<h2>Signs of Progress</h2>
<ul>
<li>Increased ability to notice when mind wanders</li>
<li>Quicker return to breath when distracted</li>
<li>Longer periods of sustained attention</li>
<li>Greater awareness of thoughts throughout the day</li>
<li>Reduced reactivity to stress</li>
</ul>`,
      },
      sv: {
        title: 'Tankeobservation',
        content: `<h2>Introduktion</h2>
<p>Tankeobservation är en mindfulnessövning som hjälper dig utveckla en annorlunda relation till dina tankar. Istället för att fastna i tankarna lär du dig att observera dem som mentala händelser som kommer och går. Övningen kan minska oro och stärka din emotionella motståndskraft.</p>

<h2>Längd</h2>
<p>10-15 minuter</p>

<h2>Fördelar</h2>
<ul>
<li>Minskar överdrivet grubblande</li>
<li>Ökar känslomässig medvetenhet</li>
<li>Utvecklar mental klarhet</li>
<li>Förbättrar stresshantering</li>
<li>Stärker självförståelsen</li>
</ul>

<h2>Instruktioner</h2>
<ol>
<li>Hitta en bekväm sittställning</li>
<li>Slut ögonen eller behåll en mjuk blick</li>
<li>Ta några centrerande andetag</li>
<li>Uppmärksamma tankar när de dyker upp utan att fastna i dem</li>
<li>Föreställ dig tankarna som moln som passerar på himlen</li>
<li>När du fastnar i en tanke, återgå varsamt till observerandet</li>
<li>Lägg märke till eventuella mönster i ditt tänkande</li>
<li>Avsluta med några medvetna andetag</li>
</ol>

<h2>Tips</h2>
<ul>
<li>Försök inte stoppa eller förändra dina tankar</li>
<li>Öva på att acceptera det som kommer</li>
<li>Använd enkla etiketter om det hjälper (t.ex. "planerar", "minns")</li>
<li>Kom ihåg att alla tankar är normala</li>
</ul>`,
        accessibility: `<h2>Tillgänglighet</h2>
<ul>
<li>Kan utföras i valfri position - främst sittande</li>
<li>Passar även personer med begränsad rörlighet</li>
<li>Ingen särskild utrustning krävs</li>
</ul>`,
        prerequisites: `<h2>Förkunskaper</h2>
<p>Inga förkunskaper krävs. Detta är en utmärkt startpunkt för mindfulnessträning.</p>`,
        progressIndicators: `<h2>Tecken på framsteg</h2>
<ul>
<li>Ökad förmåga att upptäcka tankemönster</li>
<li>Snabbare återgång till observerande vid distraktion</li>
<li>Längre perioder av bibehållen uppmärksamhet</li>
<li>Större medvetenhet om tankar i vardagen</li>
<li>Minskad stressreaktivitet</li>
</ul>`,
      },
      difficulty: DifficultyLevel.BEGINNER,
      recommendedTime: [TimeOfDay.MORNING, TimeOfDay.EVENING],
      relatedExerciseIds: ['1', '2'],
    },
  ];

  // Remove the additional exercise templates
  const moreExercises = [];

  // Add name variations for each exercise type
  const nameVariations = {
    breathing: {
      en: [
        'Mindful Breathing',
        'Breath Awareness',
        'Calming Breath',
        'Focused Breathing',
        'Grounding Breath',
        'Centering Breath',
        'Balanced Breathing',
        'Present Moment Breath',
        'Anchoring Breath',
        'Steady Breathing',
        'Rhythmic Breathing',
        'Peaceful Breath',
        'Gentle Breathing',
        'Natural Breath',
        'Relaxed Breathing'
      ],
      sv: [
        'Medveten Andning',
        'Andningsmedvetenhet',
        'Lugnande Andning',
        'Fokuserad Andning',
        'Grundande Andning',
        'Centrerande Andning',
        'Balanserad Andning',
        'Närvarande Andning',
        'Förankrande Andning',
        'Stadig Andning',
        'Rytmisk Andning',
        'Fridfull Andning',
        'Varsam Andning',
        'Naturlig Andning',
        'Avslappnad Andning'
      ]
    },
    bodyScan: {
      en: [
        'Body Scan',
        'Body Awareness',
        'Physical Presence',
        'Somatic Awareness',
        'Body Connection',
        'Physical Check-in',
        'Body Listening',
        'Embodied Awareness',
        'Body Mindfulness',
        'Physical Grounding',
        'Body Sensing',
        'Somatic Presence',
        'Body Attunement',
        'Physical Awareness',
        'Body Observation'
      ],
      sv: [
        'Kroppsskanning',
        'Kroppsmedvetenhet',
        'Fysisk Närvaro',
        'Somatisk Medvetenhet',
        'Kroppsanknytning',
        'Kroppsgenomgång',
        'Kroppslyssnande',
        'Förkroppsligad Närvaro',
        'Kroppslig Mindfulness',
        'Fysisk Grundning',
        'Kroppskänning',
        'Somatisk Närvaro',
        'Kroppslig Avstämning',
        'Fysisk Medvetenhet',
        'Kroppsobservation'
      ]
    },
    thoughtObservation: {
      en: [
        'Thought Observation',
        'Mental Noting',
        'Mind Watching',
        'Thought Awareness',
        'Mental Space',
        'Cognitive Distance',
        'Thought Flow',
        'Mind Observation',
        'Mental Clarity',
        'Thought Perspective',
        'Mind Awareness',
        'Cognitive Space',
        'Thought Recognition',
        'Mental Presence',
        'Thought Witnessing'
      ],
      sv: [
        'Tankeobservation',
        'Mental Notering',
        'Sinnesbetraktelse',
        'Tankemedvetenhet',
        'Mentalt Utrymme',
        'Kognitiv Distans',
        'Tankeflöde',
        'Sinnesobservation',
        'Mental Klarhet',
        'Tankeperspektiv',
        'Sinnesmedvetenhet',
        'Kognitivt Utrymme',
        'Tankekänning',
        'Mental Närvaro',
        'Tankebevittnande'
      ]
    }
  };

  return Array.from({ length: count }, (_, i) => {
    const baseExercise = baseExercises[i % baseExercises.length];
    const category = categories[i % categories.length];
    const number = i + 1;

    // Determine which set of variations to use based on the base exercise type
    let variations;
    if (i % 3 === 0) {
      variations = nameVariations.breathing;
    } else if (i % 3 === 1) {
      variations = nameVariations.bodyScan;
    } else {
      variations = nameVariations.thoughtObservation;
    }

    // Calculate a unique index for each group of exercises
    const variationIndex = Math.floor(i / 3) % variations.en.length;

    const exercise: Exercise = {
      id: String(number),
      translations: {
        en: {
          title: variations.en[variationIndex],
          content: baseExercise.en.content,
          accessibility: baseExercise.en.accessibility,
          prerequisites: baseExercise.en.prerequisites,
          progressIndicators: baseExercise.en.progressIndicators,
        },
        sv: {
          title: variations.sv[variationIndex],
          content: baseExercise.sv.content,
          accessibility: baseExercise.sv.accessibility,
          prerequisites: baseExercise.sv.prerequisites,
          progressIndicators: baseExercise.sv.progressIndicators,
        },
      },
      category,
      difficulty: baseExercise.difficulty || DifficultyLevel.BEGINNER,
      recommendedTime: baseExercise.recommendedTime || [TimeOfDay.ANY],
      relatedExerciseIds: baseExercise.relatedExerciseIds?.map(id => 
        String(((parseInt(id) - 1 + i) % count) + 1)
      ) || [],
      userId: '1',
      createdAt: '2024-01-01T12:00:00Z',
      updatedAt: '2024-01-01T12:00:00Z',
      mediaIds: [],
      order: number,
    };

    return exercise;
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