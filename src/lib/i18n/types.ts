export type Language = 'en' | 'sv';

export interface Translation {
  title: string;
  content: string;
  description?: string;
}

export interface CategoryTranslation {
  name: string;
  description: string;
}

export interface ExerciseTranslation {
  title: string;
  content: string;
}

export interface ExerciseTranslations {
  [key: string]: {
    [lang in Language]: ExerciseTranslation;
  };
}

export interface CategoryTranslations {
  [key: string]: {
    [lang in Language]: CategoryTranslation;
  };
}

export interface MediaTranslations {
  [key: string]: {
    [lang in Language]: {
      name: string;
    };
  };
} 