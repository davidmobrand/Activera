'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Editor } from '@tinymce/tinymce-react'
import { Button } from '@/components/ui/Button'
import { Exercise, Media, Translation } from '@/lib/types'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { useTranslation } from '@/lib/i18n/useTranslation'
import type { Language } from '@/lib/i18n/types'
import type { Editor as TinyMCEEditor } from 'tinymce'
import { RichTextEditor } from './RichTextEditor'

interface ExerciseFormProps {
  exercise: Exercise
}

interface FilePickerCallback {
  (value: string, meta?: { alt: string; source2?: string }): void;
}

interface FilePickerMeta {
  filetype: 'image' | 'media' | 'file';
}

export function ExerciseForm({ exercise: initialExercise }: ExerciseFormProps) {
  const router = useRouter()
  const { language, setLanguage } = useLanguage()
  const { t } = useTranslation()
  const [exercise, setExercise] = useState(initialExercise)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const editorRef = useRef<TinyMCEEditor | null>(null)

  const handleUpload = async (type: 'IMAGE' | 'AUDIO'): Promise<Media | null> => {
    try {
      setIsUploading(true)
      setError(null)

      // Create a file input and trigger it
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = type === 'IMAGE' ? 'image/*' : 'audio/*'
      
      // Wait for file selection
      const file = await new Promise<File>((resolve, reject) => {
        input.onchange = (e) => {
          const files = (e.target as HTMLInputElement).files
          if (files && files[0]) {
            resolve(files[0])
          } else {
            reject(new Error('No file selected'))
          }
        }
        input.click()
      })

      // Create form data
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', type)

      // Upload the file
      const response = await fetch(`/api/exercises/${exercise.id}/media`, {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Failed to upload file')
      }

      const newMedia = await response.json()
      handleInsertMedia(newMedia)
      return newMedia
    } catch (error) {
      console.error('Error uploading file:', error)
      setError(error instanceof Error ? error.message : 'Failed to upload file')
      return null
    } finally {
      setIsUploading(false)
    }
  }

  const handleInsertMedia = (media: Media) => {
    if (!editorRef.current) return

    if (media.type === 'IMAGE') {
      editorRef.current.insertContent(`<img src="${media.url}" alt="${media.name}" />`)
    } else if (media.type === 'AUDIO') {
      editorRef.current.insertContent(`<audio controls src="${media.url}"></audio>`)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const response = await fetch(`/api/exercises/${exercise.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exercise),
      })

      if (!response.ok) throw new Error('Failed to save exercise')
      
      router.push('/admin/exercises')
    } catch (error) {
      console.error('Error saving exercise:', error)
      setError(error instanceof Error ? error.message : 'Failed to save exercise')
    } finally {
      setSaving(false)
    }
  }

  const updateTranslation = (field: keyof Translation, value: string) => {
    setExercise({
      ...exercise,
      translations: {
        ...exercise.translations,
        [language]: {
          ...exercise.translations[language],
          [field]: value
        }
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-display text-ocean-700 mb-4 sm:mb-0">
          {initialExercise.id ? t.common('editExercise') : t.common('createNewExercise')}
        </h1>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <Button
          type="button"
          onClick={() => setLanguage('en')}
          variant={language === 'en' ? 'primary' : 'secondary'}
          size="sm"
          className="flex-1 sm:flex-none"
        >
          English
        </Button>
        <Button
          type="button"
          onClick={() => setLanguage('sv')}
          variant={language === 'sv' ? 'primary' : 'secondary'}
          size="sm"
          className="flex-1 sm:flex-none"
        >
          Swedish
        </Button>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-stone-700">
            {t.common('title')}
          </label>
          <input
            type="text"
            value={exercise.translations[language].title}
            onChange={(e) => updateTranslation('title', e.target.value)}
            className="w-full rounded-md border border-stone-200 px-4 py-2 bg-white focus:border-ocean-300 focus:ring focus:ring-ocean-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-stone-700">
            {t.common('category')}
          </label>
          <select
            value={exercise.category}
            onChange={(e) => setExercise({ ...exercise, category: e.target.value as Exercise['category'] })}
            className="w-full rounded-md border border-stone-200 px-4 py-2 bg-white focus:border-ocean-300 focus:ring focus:ring-ocean-200 focus:ring-opacity-50"
            required
          >
            <option value="NARVARO">{t.category('NARVARO').name}</option>
            <option value="OPPENHET">{t.category('OPPENHET').name}</option>
            <option value="ENGAGEMANG">{t.category('ENGAGEMANG').name}</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-stone-700">
            {t.common('order')}
          </label>
          <input
            type="number"
            value={exercise.order}
            onChange={(e) => setExercise({ ...exercise, order: parseInt(e.target.value) })}
            className="w-full rounded-md border border-stone-200 px-4 py-2 bg-white focus:border-ocean-300 focus:ring focus:ring-ocean-200 focus:ring-opacity-50"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-stone-700">
            {t.common('introduction')}
          </label>
          <RichTextEditor
            value={exercise.translations[language].introduction}
            onChange={(content: string) => updateTranslation('introduction', content)}
            exerciseId={exercise.id}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-mindful-600 mb-2">
            Duration
          </label>
          <input
            type="text"
            className="w-full px-4 py-2 border border-mindful-200 rounded-lg focus:ring-2 focus:ring-mindful-500 focus:border-transparent"
            value={exercise.translations[language].duration}
            onChange={(e) => {
              const newTranslations = { ...exercise.translations }
              newTranslations[language].duration = e.target.value
              updateTranslation('duration', e.target.value)
            }}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-mindful-600 mb-2">
            Benefits
          </label>
          <textarea
            className="w-full px-4 py-2 border border-mindful-200 rounded-lg focus:ring-2 focus:ring-mindful-500 focus:border-transparent min-h-[100px]"
            value={exercise.translations[language].benefits}
            onChange={(e) => {
              const newTranslations = { ...exercise.translations }
              newTranslations[language].benefits = e.target.value
              updateTranslation('benefits', e.target.value)
            }}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-stone-700">
            {t.common('instructions')}
          </label>
          <RichTextEditor
            value={exercise.translations[language].instructions}
            onChange={(content: string) => updateTranslation('instructions', content)}
            exerciseId={exercise.id}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-mindful-600 mb-2">
            Tips
          </label>
          <textarea
            className="w-full px-4 py-2 border border-mindful-200 rounded-lg focus:ring-2 focus:ring-mindful-500 focus:border-transparent min-h-[100px]"
            value={exercise.translations[language].tips}
            onChange={(e) => {
              const newTranslations = { ...exercise.translations }
              newTranslations[language].tips = e.target.value
              updateTranslation('tips', e.target.value)
            }}
          />
        </div>
      </div>

      {error && (
        <div className="text-warmth-600 text-sm">{error}</div>
      )}

      <div className="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 sm:gap-4 mt-8">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push('/admin/exercises')}
          className="w-full sm:w-auto"
        >
          {t.common('cancel')}
        </Button>
        <Button
          type="submit"
          disabled={saving}
          className="w-full sm:w-auto"
        >
          {saving ? t.common('saving') : t.common('save')}
        </Button>
      </div>
    </form>
  )
} 