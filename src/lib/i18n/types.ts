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
  accessibility: string;
  prerequisites: string;
  progressIndicators: string;
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

export interface CommonTranslations {
  introduction: string;
  duration: string;
  benefits: string;
  instructions: string;
  tips: string;
  accessibility: string;
  prerequisites: string;
  progressIndicators: string;
  relatedExercises: string;
  difficulty: string;
  recommendedTime: string;
  uploadImage: string;
  uploadAudio: string;
  uploading: string;
  remove: string;
  title: string;
  category: string;
  order: string;
  media: string;
  editExercise: string;
  createNewExercise: string;
  cancel: string;
  saving: string;
  save: string;
  confirmDelete: string;
  accessDenied: string;
  adminPrivilegesRequired: string;
  goToDashboard: string;
  manageExercises: string;
  lastUpdated: string;
  actions: string;
  edit: string;
  delete: string;
  manageUsers: string;
  createNewUser: string;
  name: string;
  email: string;
  role: string;
  joinedDate: string;
  welcome: string;
  chooseCategoryText: string;
  adminDashboard: string;
  to: string;
  back: string;
  completed: string;
  complete: string;
  dashboard: string;
  admin: string;
  signOut: string;
  notLoggedIn: string;
  pleaseSignIn: string;
  signIn: string;
  [key: string]: string;
}

export interface DifficultyTranslations {
  BEGINNER: string;
  INTERMEDIATE: string;
  ADVANCED: string;
}

export interface TimeOfDayTranslations {
  MORNING: string;
  AFTERNOON: string;
  EVENING: string;
  ANY: string;
}

export interface Translations {
  en: {
    common: CommonTranslations;
    difficulty: DifficultyTranslations;
    timeOfDay: TimeOfDayTranslations;
  };
  sv: {
    common: CommonTranslations;
    difficulty: DifficultyTranslations;
    timeOfDay: TimeOfDayTranslations;
  };
} 