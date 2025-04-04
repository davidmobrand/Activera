import { useLanguage } from './LanguageContext';
import { categories } from './categories';
import { exercises } from './exercises';

type CategoryKey = keyof typeof categories;
type ExerciseKey = keyof typeof exercises;

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
          content: '',
        };
      }

      return {
        title: exercise[language].title,
        content: exercise[language].content,
      };
    },
  };

  return { t };
} 