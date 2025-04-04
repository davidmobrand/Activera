import { Media, MediaType, MediaInput } from '../types';
import { MediaSchema, MediaInputSchema } from '../validation';

// Default to localhost in development
const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://localhost:3000'

// Mock Media Files with realistic URLs and consistent timestamps
export const mediaFiles: Media[] = [
  {
    id: '1',
    exerciseId: '1',
    type: MediaType.IMAGE,
    url: `${STORAGE_URL}/exercises/1/images/peaceful-meditation.jpg`,
    name: 'Peaceful Meditation at Sunrise',
    createdAt: new Date('2024-01-01T00:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-01T00:00:00Z').toISOString()
  },
  {
    id: '2',
    exerciseId: '1',
    type: MediaType.AUDIO,
    url: `${STORAGE_URL}/exercises/1/audio/calm-meditation.mp3`,
    name: 'Calming Meditation Music',
    createdAt: new Date('2024-01-15T00:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-15T00:00:00Z').toISOString()
  }
].map(media => MediaSchema.parse(media));

export const findMediaByExerciseId = (exerciseId: string | string[]): Media[] => {
  if (Array.isArray(exerciseId)) {
    return mediaFiles
      .filter(media => exerciseId.includes(media.exerciseId))
      .map(media => MediaSchema.parse(media));
  }
  return mediaFiles
    .filter(media => media.exerciseId === exerciseId)
    .map(media => MediaSchema.parse(media));
};

export const createMedia = (input: Omit<Media, "id" | "createdAt">): Media => {
  // Validate input first
  const validatedInput = MediaInputSchema.parse(input);
  
  const urlPath = validatedInput.type === MediaType.IMAGE ? 'images' : 'audio';
  const fileName = validatedInput.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const url = `${STORAGE_URL}/exercises/${validatedInput.exerciseId}/${urlPath}/${fileName}`;
  
  const now = new Date().toISOString();
  const newMedia: Media = {
    ...validatedInput,
    url,
    id: String(mediaFiles.length + 1),
    createdAt: now,
    updatedAt: now
  };
  
  const validatedMedia = MediaSchema.parse(newMedia);
  mediaFiles.push(validatedMedia);
  return validatedMedia;
};

export const updateMedia = (id: string, data: Partial<Media>): Media | null => {
  const index = mediaFiles.findIndex(media => media.id === id);
  if (index !== -1) {
    const updatedMedia = {
      ...mediaFiles[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    const validatedMedia = MediaSchema.parse(updatedMedia);
    mediaFiles[index] = validatedMedia;
    return validatedMedia;
  }
  return null;
};

export const deleteMedia = (id: string): boolean => {
  const index = mediaFiles.findIndex(media => media.id === id);
  if (index !== -1) {
    mediaFiles.splice(index, 1);
    return true;
  }
  return false;
};

export const getExerciseMedia = (exerciseId: string | string[]): Media[] => {
  return findMediaByExerciseId(exerciseId);
}; 