'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Editor } from '@tinymce/tinymce-react'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Exercise, Media } from '@/lib/mockData'
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

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          value={exercise.title}
          onChange={(e) => setExercise({ ...exercise, title: e.target.value })}
          className="w-full rounded-md border border-gray-300 px-4 py-2"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          value={exercise.category}
          onChange={(e) => setExercise({ ...exercise, category: e.target.value as Exercise['category'] })}
          className="w-full rounded-md border border-gray-300 px-4 py-2"
          required
        >
          <option value="NARVARO">Närvaro</option>
          <option value="OPPENHET">Öppenhet</option>
          <option value="ENGAGEMANG">Engagemang</option>
        </select>
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
            value={exercise.content}
            onEditorChange={(content: string) => setExercise({ ...exercise, content })}
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

      <div className="flex gap-4 pt-6">
        <Button type="submit" disabled={saving}>
          {saving ? (
            <>
              <LoadingSpinner className="mr-2 h-4 w-4" />
              Saving...
            </>
          ) : (
            'Save Exercise'
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push('/admin/exercises')}
        >
          Cancel
        </Button>
      </div>

      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </form>
  )
} 