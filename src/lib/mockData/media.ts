import { Media, MediaType } from '../types';
import { CreateMediaSchema, MediaSchema, UpdateMediaSchema } from '../validation';
import type { CreateMedia } from '../validation';

// Mock Media Files
export const mediaFiles: Media[] = [
  {
    id: '1',
    exerciseId: '1',
    type: MediaType.IMAGE,
    url: '/images/peaceful-meditation.jpg',
    name: 'Peaceful Meditation at Sunrise',
    createdAt: '2024-01-01T00:00:00Z',
    updatedAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    exerciseId: '1',
    type: MediaType.AUDIO,
    url: '/audio/calm-meditation.mp3',
    name: 'Calming Meditation Music',
    createdAt: '2024-01-15T00:00:00Z',
    updatedAt: '2024-01-15T00:00:00Z'
  }
].map(media => MediaSchema.parse(media));

// Media Database Functions
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

// Define the input type explicitly
type CreateMediaInput = {
  exerciseId: string;
  type: MediaType;
  url: string;
  name: string;
};

export const createMedia = (data: CreateMediaInput): Media => {
  // First validate the input data
  const validatedInput = CreateMediaSchema.parse(data);
  
  // Then create the full media object with system-added fields
  const now = new Date().toISOString();
  const newMedia: Media = {
    ...validatedInput,
    id: String(mediaFiles.length + 1),
    createdAt: now,
    updatedAt: now
  };

  // Validate the complete media object
  const validatedMedia = MediaSchema.parse(newMedia);
  mediaFiles.push(validatedMedia);
  return validatedMedia;
};

export const updateMedia = (id: string, data: Partial<Media>): Media | null => {
  const validatedData = UpdateMediaSchema.parse(data);
  const index = mediaFiles.findIndex(media => media.id === id);
  if (index !== -1) {
    const updatedMedia = {
      ...mediaFiles[index],
      ...validatedData,
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