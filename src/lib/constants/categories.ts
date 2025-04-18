export enum ExerciseCategoryEnum {
  NARVARO = 'NARVARO',
  OPPENHET = 'OPPENHET',
  ENGAGEMANG = 'ENGAGEMANG',
}

export const ExerciseCategoryDisplay = {
  [ExerciseCategoryEnum.NARVARO]: 'Närvaro',
  [ExerciseCategoryEnum.OPPENHET]: 'Öppenhet',
  [ExerciseCategoryEnum.ENGAGEMANG]: 'Engagemang',
} as const;

export const ExerciseCategoryDescription = {
  [ExerciseCategoryEnum.OPPENHET]: 'Övningar för att utveckla din förmåga att vara öppen för nya erfarenheter och acceptera dina tankar och känslor som de är. Här tränar du på att möta livets utmaningar med nyfikenhet och flexibilitet.',
  [ExerciseCategoryEnum.NARVARO]: 'Övningar som hjälper dig att vara närvarande i nuet och uppmärksamma dina upplevelser utan att döma. Här lär du dig mindfulness och att hantera stress genom medveten närvaro.',
  [ExerciseCategoryEnum.ENGAGEMANG]: 'Övningar som stödjer dig i att leva ett rikt och meningsfullt liv i linje med dina värderingar. Här utforskar du vad som är viktigt för dig och tar steg mot dina mål.'
} as const; 