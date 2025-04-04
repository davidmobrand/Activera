import { useLanguage } from './LanguageContext';
import { categories } from './categories';

type TranslationKey = keyof typeof categories;
type Translation = {
  name: string;
  description: string;
};

export function useTranslation() {
  const { language } = useLanguage();

  const t = (key: TranslationKey): Translation => {
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
  };

  return { t };
} 