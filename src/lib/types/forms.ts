import { ExerciseCategoryEnum } from '../constants/categories'

export type ExerciseFormData = {
  title: string;
  introduction: string;
  duration: string;
  benefits: string;
  instructions: string;
  tips: string;
  accessibility: string;
  prerequisites: string;
  progressIndicators: string;
  category: ExerciseCategoryEnum;
  order: number;
} 