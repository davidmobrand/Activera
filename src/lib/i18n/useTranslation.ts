import { useLanguage } from './LanguageContext';
import { categories } from './categories';
import { exercises } from './exercises';
import { translations } from './translations';
import { DifficultyLevel, TimeOfDay } from '@/lib/types';

type CategoryKey = keyof typeof categories;
type ExerciseKey = keyof typeof exercises;
type CommonKey = keyof typeof translations.en.common;
type DifficultyKey = keyof typeof translations.en.difficulty;
type TimeOfDayKey = keyof typeof translations.en.timeOfDay;

export function useTranslation() {
  const { language } = useLanguage();

  const t = {
    category: (key: CategoryKey) => {
      const category = categories[key];
      if (!category) {
        console.warn(`Translation key not found: ${String(key)}`);
        return {
          name: String(key),
          description: '',
        };
      }

      return {
        name: category[language].name,
        description: category[language].description,
      };
    },
    exercise: (key: ExerciseKey) => {
      const exercise = exercises[key];
      if (!exercise) {
        console.warn(`Translation key not found: ${String(key)}`);
        return {
          title: String(key),
          introduction: '',
          duration: '',
          benefits: '',
          instructions: '',
          tips: '',
          accessibility: '',
          prerequisites: '',
          progressIndicators: '',
        };
      }

      return exercise[language];
    },
    common: (key: CommonKey) => {
      const translation = translations[language].common[key];
      if (!translation) {
        console.warn(`Common translation key not found: ${String(key)}`);
        return String(key);
      }
      return translation;
    },
    difficulty: (key: DifficultyKey) => {
      const translation = translations[language].difficulty[key];
      if (!translation) {
        console.warn(`Difficulty translation key not found: ${String(key)}`);
        return String(key);
      }
      return translation;
    },
    timeOfDay: (key: TimeOfDayKey) => {
      const translation = translations[language].timeOfDay[key];
      if (!translation) {
        console.warn(`Time of day translation key not found: ${String(key)}`);
        return String(key);
      }
      return translation;
    },
  };

  return { t };
} 