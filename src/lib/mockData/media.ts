import { Media, MediaType } from '../types';
import { MediaSchema, CreateMedia } from '../validation';

// Mock Media Files with realistic URLs and consistent timestamps
export const mediaFiles: Media[] = [
  {
    id: '1',
    exerciseId: '1',
    type: MediaType.IMAGE,
    url: 'https://storage.activera.com/exercises/1/images/peaceful-meditation.jpg',
    name: 'Peaceful Meditation at Sunrise',
    createdAt: new Date('2024-01-01T00:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-01T00:00:00Z').toISOString()
  },
  {
    id: '2',
    exerciseId: '1',
    type: MediaType.AUDIO,
    url: 'https://storage.activera.com/exercises/1/audio/calm-meditation.mp3',
    name: 'Calming Meditation Music',
    createdAt: new Date('2024-01-15T00:00:00Z').toISOString(),
    updatedAt: new Date('2024-01-15T00:00:00Z').toISOString()
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

export const createMedia = (data: CreateMedia): Media => {
  const now = new Date().toISOString();
  
  // Create a URL that matches our mock data pattern
  const urlPath = data.type === MediaType.IMAGE ? 'images' : 'audio';
  const fileName = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const url = `https://storage.activera.com/exercises/${data.exerciseId}/${urlPath}/${fileName}`;
  
  const newMedia: Media = {
    ...data,
    url, // Use our generated URL instead of the passed one
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