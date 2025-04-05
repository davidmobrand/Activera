'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Editor } from '@tinymce/tinymce-react'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Exercise, Media } from '@/lib/types'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { useTranslation } from '@/lib/i18n/useTranslation'
import type { Language } from '@/lib/i18n/types'
import type { Editor as TinyMCEEditor } from 'tinymce'

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

  const updateTranslation = (field: 'title' | 'content', value: string) => {
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
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display text-ocean-700 mb-6">
          {initialExercise.id ? t.common('editExercise') : t.common('createNewExercise')}
        </h1>
      </div>

      <div className="flex space-x-2 mb-6">
        <Button
          type="button"
          onClick={() => setLanguage('en')}
          variant={language === 'en' ? 'primary' : 'secondary'}
          size="sm"
        >
          English
        </Button>
        <Button
          type="button"
          onClick={() => setLanguage('sv')}
          variant={language === 'sv' ? 'primary' : 'secondary'}
          size="sm"
        >
          Swedish
        </Button>
      </div>

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
          {t.common('content')}
        </label>
        <div className="h-96">
          <Editor
            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
            onInit={(_evt: unknown, editor: TinyMCEEditor) => {
              editorRef.current = editor
            }}
            value={exercise.translations[language].content}
            onEditorChange={(content: string) => updateTranslation('content', content)}
            init={{
              height: '100%',
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'help', 'wordcount'
              ],
              toolbar: 'undo redo | blocks | ' +
                'bold italic forecolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help',
              content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, San Francisco, Segoe UI, Roboto, Helvetica Neue, sans-serif; font-size: 14px; line-height: 1.5; }',
              file_picker_callback: (callback: FilePickerCallback, value: string, meta: FilePickerMeta) => {
                if (meta.filetype === 'image') {
                  handleUpload('IMAGE').then((media) => {
                    if (media) {
                      callback(media.url, { alt: media.name })
                    }
                  })
                }
              }
            }}
          />
        </div>
      </div>

      {error && (
        <div className="text-warmth-600">{error}</div>
      )}

      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push('/admin/exercises')}
        >
          {t.common('cancel')}
        </Button>
        <Button
          type="submit"
          disabled={saving}
        >
          {saving ? t.common('saving') : t.common('save')}
        </Button>
      </div>
    </form>
  )
} 