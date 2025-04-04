import { CategoryTranslations } from './types';

export const categories = {
  OPPENHET: {
    en: {
      name: 'Openness',
      description: 'Exercises focused on developing psychological flexibility and openness to experience.',
    },
    sv: {
      name: 'Öppenhet',
      description: 'Övningar fokuserade på att utveckla psykologisk flexibilitet och öppenhet för upplevelser.',
    },
  },
  NARVARO: {
    en: {
      name: 'Presence',
      description: 'Mindfulness exercises to help you stay present in the moment.',
    },
    sv: {
      name: 'Närvaro',
      description: 'Mindfulnessövningar för att hjälpa dig att vara närvarande i nuet.',
    },
  },
  ENGAGEMANG: {
    en: {
      name: 'Engagement',
      description: 'Exercises to help you engage fully in your valued activities.',
    },
    sv: {
      name: 'Engagemang',
      description: 'Övningar för att hjälpa dig att engagera dig fullt ut i dina värdefulla aktiviteter.',
    },
  },
} as const; 