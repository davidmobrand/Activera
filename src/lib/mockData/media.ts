import { Media, MediaType, MediaInput } from '../types';
import { MediaSchema, MediaInputSchema } from '../validation';

// Default to localhost in development
const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://localhost:3000'

export const media: Media[] = [
  // Mindful Breathing - audio and image
  {
    id: 'media_1',
    exerciseId: 'ex_1',
    type: MediaType.AUDIO,
    name: 'Guided Breathing Meditation',
    url: '/assets/exercises/audio/zen-meditation.mp3',
    createdAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z'
  },
  {
    id: 'media_1b',
    exerciseId: 'ex_1',
    type: MediaType.IMAGE,
    name: 'Peaceful Meditation Posture',
    url: '/assets/exercises/images/peaceful-meditation.jpg',
    createdAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z'
  },
  // Body Scan - audio and image
  {
    id: 'media_2',
    exerciseId: 'ex_2',
    type: MediaType.AUDIO,
    name: 'Body Scan Meditation',
    url: '/assets/exercises/audio/calm-meditation.mp3',
    createdAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z'
  },
  {
    id: 'media_2b',
    exerciseId: 'ex_2',
    type: MediaType.IMAGE,
    name: 'Relaxed Body Position',
    url: '/assets/exercises/images/mindful-yoga.jpg',
    createdAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z'
  },
  // Mindful Walking - image and audio
  {
    id: 'media_3',
    exerciseId: 'ex_3',
    type: MediaType.IMAGE,
    name: 'Walking Meditation Posture',
    url: '/assets/exercises/images/mindful-yoga.jpg',
    createdAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z'
  },
  {
    id: 'media_3b',
    exerciseId: 'ex_3',
    type: MediaType.AUDIO,
    name: 'Walking Meditation Guide',
    url: '/assets/exercises/audio/calm-meditation.mp3',
    createdAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z'
  },
  // Loving-Kindness - audio and image
  {
    id: 'media_4',
    exerciseId: 'ex_35',
    type: MediaType.AUDIO,
    name: 'Loving-Kindness Meditation',
    url: '/assets/exercises/audio/zen-meditation.mp3',
    createdAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z'
  },
  {
    id: 'media_4b',
    exerciseId: 'ex_35',
    type: MediaType.IMAGE,
    name: 'Peaceful Meditation Practice',
    url: '/assets/exercises/images/peaceful-meditation.jpg',
    createdAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z'
  },
  // Open Mind - image and audio
  {
    id: 'media_5',
    exerciseId: 'ex_36',
    type: MediaType.IMAGE,
    name: 'Mind Visualization Aid',
    url: '/assets/exercises/images/peaceful-meditation.jpg',
    createdAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z'
  },
  {
    id: 'media_5b',
    exerciseId: 'ex_36',
    type: MediaType.AUDIO,
    name: 'Visualization Guidance',
    url: '/assets/exercises/audio/zen-meditation.mp3',
    createdAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z'
  },
  // Mindful Action - image and audio
  {
    id: 'media_6',
    exerciseId: 'ex_67',
    type: MediaType.IMAGE,
    name: 'Mindful Action Example',
    url: '/assets/exercises/images/mindful-yoga.jpg',
    createdAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z'
  },
  {
    id: 'media_6b',
    exerciseId: 'ex_67',
    type: MediaType.AUDIO,
    name: 'Action Planning Guide',
    url: '/assets/exercises/audio/calm-meditation.mp3',
    createdAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z'
  }
]

export const findMediaByExerciseId = (exerciseId: string) => {
  return media.filter(item => item.exerciseId === exerciseId)
}

export const createMedia = (data: Omit<Media, 'id' | 'createdAt' | 'updatedAt'>): Media => {
  const newMedia: Media = {
    ...data,
    id: `media_${media.length + 1}`,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  media.push(newMedia)
  return newMedia
}

export const updateMedia = (id: string, data: Partial<Media>): Media => {
  const index = media.findIndex(item => item.id === id)
  if (index === -1) throw new Error('Media not found')
  
  media[index] = {
    ...media[index],
    ...data,
    updatedAt: new Date().toISOString()
  }
  return media[index]
}

export const deleteMedia = (id: string): boolean => {
  const index = media.findIndex(item => item.id === id)
  if (index === -1) return false
  
  media.splice(index, 1)
  return true
}

export const getExerciseMedia = (exerciseId: string): Media[] => {
  return media.filter(item => item.exerciseId === exerciseId)
} 