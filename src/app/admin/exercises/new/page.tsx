'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import NotLoggedIn from '@/components/NotLoggedIn'
import { ExerciseCategoryEnum } from '@/lib/constants/categories'
import dynamic from 'next/dynamic'
import { RichTextEditor } from '@/components/admin/RichTextEditor'
import { useTranslation } from '@/lib/i18n/useTranslation'
import type { ExerciseFormData } from '@/lib/types/forms'

// Use dynamic import for RichTextEditor to avoid SSR issues
const DynamicRichTextEditor = dynamic(() => Promise.resolve(RichTextEditor), { ssr: false })

export default function CreateExercise() {
  const router = useRouter()
  const { data: session, status } = useSession()
  const { t } = useTranslation()
  const [formData, setFormData] = useState<ExerciseFormData>({
    title: '',
    introduction: '',
    duration: '',
    benefits: '',
    instructions: '',
    tips: '',
    accessibility: '',
    prerequisites: '',
    progressIndicators: '',
    category: ExerciseCategoryEnum.NARVARO,
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
              {t.common('title')}
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
              {t.common('category')}
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as ExerciseFormData['category'] })}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              required
            >
              <option value="NARVARO">{t.category('NARVARO').name}</option>
              <option value="OPPENHET">{t.category('OPPENHET').name}</option>
              <option value="ENGAGEMANG">{t.category('ENGAGEMANG').name}</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="order" className="block text-sm font-medium text-gray-700">
            {t.common('order')}
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

        {(['introduction', 'instructions'] as const).map((field) => (
          <div key={field} className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              {t.common(field)}
            </label>
            <div className="mt-1">
              <DynamicRichTextEditor
                value={formData[field]}
                onChange={(content: string) => setFormData({ ...formData, [field]: content })}
                exerciseId="new"
              />
            </div>
          </div>
        ))}

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {t.common('duration')}
          </label>
          <input
            type="text"
            value={formData.duration}
            onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {t.common('benefits')}
          </label>
          <textarea
            value={formData.benefits}
            onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {t.common('tips')}
          </label>
          <textarea
            value={formData.tips}
            onChange={(e) => setFormData({ ...formData, tips: e.target.value })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {t.common('accessibility')}
          </label>
          <textarea
            value={formData.accessibility}
            onChange={(e) => setFormData({ ...formData, accessibility: e.target.value })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {t.common('prerequisites')}
          </label>
          <textarea
            value={formData.prerequisites}
            onChange={(e) => setFormData({ ...formData, prerequisites: e.target.value })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            rows={4}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            {t.common('progressIndicators')}
          </label>
          <textarea
            value={formData.progressIndicators}
            onChange={(e) => setFormData({ ...formData, progressIndicators: e.target.value })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            rows={4}
          />
        </div>

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