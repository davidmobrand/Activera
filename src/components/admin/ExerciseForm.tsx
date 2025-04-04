'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Editor } from '@tinymce/tinymce-react'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Exercise, Media } from '@/lib/mockData'
import type { Editor as TinyMCEEditor } from 'tinymce'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { Language } from '@/lib/i18n/types'

interface ExerciseFormProps {
  exercise?: Exercise
  onSubmit: (data: Partial<Exercise>) => void
}

interface FilePickerCallback {
  (value: string, meta?: { alt: string; source2?: string }): void;
}

interface FilePickerMeta {
  filetype: 'image' | 'media' | 'file';
}

const defaultExercise: Partial<Exercise> = {
  translations: {
    en: { title: '', content: '' },
    sv: { title: '', content: '' },
  },
  category: Exercise.category.NARVARO,
  mediaIds: [],
  order: 1,
}

export function ExerciseForm({ exercise, onSubmit }: ExerciseFormProps) {
  const router = useRouter()
  const { language } = useLanguage()
  const [editingLanguage, setEditingLanguage] = useState<Language>(language)
  const [formData, setFormData] = useState<typeof defaultExercise>(exercise || defaultExercise)
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
      const response = await fetch(`/api/exercises/${exercise?.id}/media`, {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      onSubmit(formData)
    } catch (error) {
      console.error('Error saving exercise:', error)
      setError(error instanceof Error ? error.message : 'Failed to save exercise')
    } finally {
      setSaving(false)
    }
  }

  const updateTranslation = (lang: Language, field: 'title' | 'content', value: string) => {
    setFormData(prev => ({
      ...prev,
      translations: {
        ...prev.translations,
        [lang]: {
          ...prev.translations[lang],
          [field]: value,
        },
      },
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex gap-4 mb-4">
        <Button
          type="button"
          variant={editingLanguage === 'en' ? 'primary' : 'outline'}
          onClick={() => setEditingLanguage('en')}
        >
          English
        </Button>
        <Button
          type="button"
          variant={editingLanguage === 'sv' ? 'primary' : 'outline'}
          onClick={() => setEditingLanguage('sv')}
        >
          Svenska
        </Button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Title ({editingLanguage === 'en' ? 'English' : 'Svenska'})
          </label>
          <input
            type="text"
            value={formData.translations[editingLanguage].title}
            onChange={(e) => updateTranslation(editingLanguage, 'title', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Content ({editingLanguage === 'en' ? 'English' : 'Svenska'})
          </label>
          <textarea
            value={formData.translations[editingLanguage].content}
            onChange={(e) => updateTranslation(editingLanguage, 'content', e.target.value)}
            rows={10}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as Exercise['category'] })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value={Exercise.category.NARVARO}>Närvaro</option>
            <option value={Exercise.category.OPPENHET}>Öppenhet</option>
            <option value={Exercise.category.ENGAGEMANG}>Engagemang</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Order</label>
          <input
            type="number"
            value={formData.order}
            onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <div className="h-96">
          <Editor
            apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
            onInit={(_evt: unknown, editor: TinyMCEEditor) => {
              editorRef.current = editor
            }}
            value={formData.content || ''}
            onEditorChange={(content: string) => setFormData({ ...formData, content })}
            init={{
              height: '100%',
              menubar: false,
              plugins: [
                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                'insertdatetime', 'media', 'table', 'help', 'wordcount'
              ],
              toolbar: [
                'undo redo | blocks',
                'bold italic | alignleft aligncenter alignright alignjustify',
                'bullist numlist | link image media | removeformat help'
              ].join(' | '),
              file_picker_callback: async (
                callback: FilePickerCallback,
                value: string,
                meta: FilePickerMeta
              ) => {
                try {
                  if (meta.filetype === 'image') {
                    const media = await handleUpload('IMAGE')
                    if (media) {
                      callback(media.url, { alt: media.name })
                    }
                  } else if (meta.filetype === 'media') {
                    const media = await handleUpload('AUDIO')
                    if (media) {
                      callback(media.url, { alt: media.name, source2: media.url })
                    }
                  }
                } catch (error) {
                  console.error('Error in file picker:', error)
                }
              },
              content_style: 'body { font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif; }'
            }}
          />
          {isUploading && (
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
              <LoadingSpinner className="h-4 w-4" />
              Uploading media...
            </div>
          )}
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" variant="primary">
          {exercise ? 'Update Exercise' : 'Create Exercise'}
        </Button>
      </div>
    </form>
  )
} 