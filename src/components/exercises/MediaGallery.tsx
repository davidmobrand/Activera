'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { Media } from '@/lib/mockData'

interface MediaGalleryProps {
  exerciseId: string
  media: Media[]
  isAdmin?: boolean
  onInsertMedia?: (media: Media) => void
}

export function MediaGallery({
  exerciseId,
  media,
  isAdmin = false,
  onInsertMedia
}: MediaGalleryProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleUpload = async (type: 'IMAGE' | 'AUDIO') => {
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
      const response = await fetch(`/api/exercises/${exerciseId}/media`, {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Failed to upload file')
      }

      const newMedia = await response.json()

      // If onInsertMedia is provided, call it with the new media
      if (onInsertMedia) {
        onInsertMedia(newMedia)
      } else {
        // Otherwise, refresh the page to show new media
        window.location.reload()
      }
    } catch (error) {
      console.error('Error uploading file:', error)
      setError(error instanceof Error ? error.message : 'Failed to upload file')
    } finally {
      setIsUploading(false)
    }
  }

  const handleDelete = async (mediaId: string) => {
    try {
      setError(null)
      const response = await fetch(
        `/api/exercises/${exerciseId}/media?mediaId=${mediaId}`,
        { method: 'DELETE' }
      )

      if (!response.ok) {
        throw new Error('Failed to delete media')
      }

      // Refresh the page to show updated media
      window.location.reload()
    } catch (error) {
      console.error('Error deleting media:', error)
      setError(error instanceof Error ? error.message : 'Failed to delete media')
    }
  }

  const handleInsert = (media: Media) => {
    if (onInsertMedia) {
      onInsertMedia(media)
    }
  }

  const images = media.filter(m => m.type === 'IMAGE')
  const audio = media.filter(m => m.type === 'AUDIO')

  return (
    <div className="space-y-6">
      {isAdmin && (
        <div className="flex gap-4 items-center">
          <Button
            onClick={() => handleUpload('IMAGE')}
            disabled={isUploading}
            variant="outline"
          >
            {isUploading ? (
              <>
                <LoadingSpinner className="mr-2" />
                Uploading...
              </>
            ) : (
              'Upload Image'
            )}
          </Button>
          <Button
            onClick={() => handleUpload('AUDIO')}
            disabled={isUploading}
            variant="outline"
          >
            {isUploading ? (
              <>
                <LoadingSpinner className="mr-2" />
                Uploading...
              </>
            ) : (
              'Upload Audio'
            )}
          </Button>
          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}
        </div>
      )}

      {images.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Images</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {images.map(image => (
              <div key={image.id} className="relative group">
                <img
                  src={image.url}
                  alt={image.name}
                  className="w-full h-48 object-cover rounded-lg cursor-pointer"
                  onClick={() => handleInsert(image)}
                />
                {isAdmin && (
                  <div className="absolute top-2 right-2 flex gap-2">
                    <button
                      onClick={() => handleInsert(image)}
                      className="bg-blue-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Insert into content"
                    >
                      Insert
                    </button>
                    <button
                      onClick={() => handleDelete(image.id)}
                      className="bg-red-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Delete media"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {audio.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Audio</h3>
          <div className="space-y-2">
            {audio.map(audio => (
              <div key={audio.id} className="flex items-center gap-4">
                <audio controls src={audio.url} className="flex-grow" />
                {isAdmin && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleInsert(audio)}
                      className="text-blue-500 hover:text-blue-700"
                      title="Insert into content"
                    >
                      Insert
                    </button>
                    <button
                      onClick={() => handleDelete(audio.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Delete media"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 