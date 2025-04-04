'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import NotLoggedIn from '@/components/NotLoggedIn'
import { ExerciseCategory } from '@/lib/types'
import dynamic from 'next/dynamic'

const Editor = dynamic(() => import('@/components/Editor'), { ssr: false })

type FormData = {
  title: string;
  introduction: string;
  duration: string;
  benefits: string;
  instructions: string;
  tips: string;
  accessibility: string;
  prerequisites: string;
  progressIndicators: string;
  category: 'NARVARO' | 'OPPENHET' | 'ENGAGEMANG';
  order: number;
}

export default function CreateExercise() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [formData, setFormData] = useState<FormData>({
    title: '',
    introduction: '',
    duration: '',
    benefits: '',
    instructions: '',
    tips: '',
    accessibility: '',
    prerequisites: '',
    progressIndicators: '',
    category: 'NARVARO',
    order: 1
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    try {
      const exercise = {
        translations: {
          en: {
            title: formData.title,
            introduction: formData.introduction,
            duration: formData.duration,
            benefits: formData.benefits,
            instructions: formData.instructions,
            tips: formData.tips,
            accessibility: formData.accessibility,
            prerequisites: formData.prerequisites,
            progressIndicators: formData.progressIndicators
          },
          sv: {
            title: formData.title, // You might want to add separate fields for Swedish translations
            introduction: formData.introduction,
            duration: formData.duration,
            benefits: formData.benefits,
            instructions: formData.instructions,
            tips: formData.tips,
            accessibility: formData.accessibility,
            prerequisites: formData.prerequisites,
            progressIndicators: formData.progressIndicators
          }
        },
        category: formData.category,
        order: formData.order,
        difficulty: 'BEGINNER',
        recommendedTime: ['MORNING', 'EVENING'],
        relatedExerciseIds: [],
        mediaIds: []
      }

      const response = await fetch('/api/exercises', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exercise),
      })

      if (!response.ok) throw new Error('Failed to create exercise')
      
      router.push('/admin/exercises')
    } catch (error) {
      console.error('Error creating exercise:', error)
    }
  }

  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    )
  }

  if (!session) {
    return <NotLoggedIn />
  }

  if (session.user?.role !== 'ADMIN') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-gray-600">You need admin privileges to access this page.</p>
        <Button
          className="mt-4"
          onClick={() => router.push('/dashboard')}
        >
          Go to Dashboard
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Exercise</h1>
        <Button
          variant="outline"
          onClick={() => router.push('/admin/exercises')}
        >
          Back to Exercises
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter exercise title"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as FormData['category'] })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            >
              <option value="NARVARO">Närvaro</option>
              <option value="OPPENHET">Öppenhet</option>
              <option value="ENGAGEMANG">Engagemang</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="order" className="block text-sm font-medium text-gray-700">
            Order
          </label>
          <input
            type="number"
            id="order"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
            className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
            min="1"
            placeholder="Enter order number"
          />
        </div>

        {(['introduction', 'duration', 'benefits', 'instructions', 'tips', 'accessibility', 'prerequisites', 'progressIndicators'] as const).map((field) => (
          <div key={field} className="space-y-2">
            <label htmlFor={field} className="block text-sm font-medium text-gray-700 capitalize">
              {field}
            </label>
            <div className="mt-1 rounded-md shadow-sm">
              <Editor
                value={formData[field]}
                onEditorChange={(content: string) => setFormData({ ...formData, [field]: content })}
              />
            </div>
          </div>
        ))}

        <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/admin/exercises')}
          >
            Cancel
          </Button>
          <Button type="submit">
            Create Exercise
          </Button>
        </div>
      </form>
    </div>
  )
} 