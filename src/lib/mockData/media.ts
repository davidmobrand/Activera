import { Media, MediaType, MediaInput } from '../types';
import { MediaSchema, MediaInputSchema } from '../validation';

// Default to localhost in development
const STORAGE_URL = process.env.NEXT_PUBLIC_STORAGE_URL || 'http://localhost:3000'

export const media: Media[] = [
  // Mindful Breathing audio
  {
    id: 'media_1',
    exerciseId: 'ex_1',
    type: MediaType.AUDIO,
    name: 'Guided Breathing Meditation',
    url: '/media/audio/guided-breathing.mp3',
    createdAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z'
  },
  // Body Scan audio
  {
    id: 'media_2',
    exerciseId: 'ex_2',
    type: MediaType.AUDIO,
    name: 'Body Scan Meditation',
    url: '/media/audio/body-scan.mp3',
    createdAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z'
  },
  // Mindful Walking image
  {
    id: 'media_3',
    exerciseId: 'ex_3',
    type: MediaType.IMAGE,
    name: 'Walking Meditation Posture',
    url: '/media/images/mindful-walking.jpg',
    createdAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z'
  },
  // Open Heart meditation audio
  {
    id: 'media_4',
    exerciseId: 'ex_35',
    type: MediaType.AUDIO,
    name: 'Loving-Kindness Meditation',
    url: '/media/audio/loving-kindness.mp3',
    createdAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z'
  },
  // Open Mind visualization image
  {
    id: 'media_5',
    exerciseId: 'ex_36',
    type: MediaType.IMAGE,
    name: 'Mind Visualization Aid',
    url: '/media/images/mind-visualization.jpg',
    createdAt: '2024-01-01T12:00:00Z',
    updatedAt: '2024-01-01T12:00:00Z'
  },
  // Engaged Action image
  {
    id: 'media_6',
    exerciseId: 'ex_67',
    type: MediaType.IMAGE,
    name: 'Mindful Action Example',
    url: '/media/images/mindful-action.jpg',
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