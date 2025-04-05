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
  introduction: string;
  duration: string;
  benefits: string;
  instructions: string;
  tips: string;
  accessibility?: string;
  prerequisites?: string;
  progressIndicators?: string;
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