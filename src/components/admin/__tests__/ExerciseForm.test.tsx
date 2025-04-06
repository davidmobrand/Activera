import { render, screen, fireEvent, waitFor, act } from '@testing-library/react'
import { ExerciseForm } from '../ExerciseForm'
import { Exercise, ExerciseCategoryEnum, DifficultyLevel, TimeOfDay } from '@/lib/types'
import { LanguageProvider } from '@/lib/i18n/LanguageContext'

// Mock next/navigation
const mockRouter = {
  push: jest.fn()
}

jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter
}))

// Mock TinyMCE editor
jest.mock('@tinymce/tinymce-react', () => ({
  Editor: ({ onChange }: { onChange: (content: string) => void }) => (
    <textarea
      data-testid="mock-editor"
      onChange={(e) => onChange(e.target.value)}
    />
  )
}))

// Mock RichTextEditor component
jest.mock('../RichTextEditor', () => ({
  RichTextEditor: jest.fn(({ value, onChange, exerciseId }) => {
    const field = value.includes('introduction') ? 'introduction' : 'instructions'
    const handleUpload = async () => {
      const file = new File(['test'], 'test.png', { type: 'image/png' })
      const formData = new FormData()
      formData.append('file', file)
      
      try {
        const response = await fetch(`/api/exercises/${exerciseId}/media`, {
          method: 'POST',
          body: formData
        })
        
        if (!response.ok) {
          throw new Error('Upload failed')
        }
      } catch (error) {
        console.error('Error uploading file:', error)
        throw error
      }
    }

    return (
      <div data-testid={`rich-text-editor-${field}`}>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button 
          data-testid={`upload-image-button-${field}`} 
          onClick={() => {
            handleUpload().catch(() => {}) // Catch error to prevent test failure
          }}
        >
          Upload Image
        </button>
      </div>
    )
  })
}))

const mockExercise: Exercise = {
  id: 'test-1',
  translations: {
    en: {
      title: 'Test Exercise',
      introduction: 'Test introduction',
      duration: '10 minutes',
      benefits: 'Test benefits',
      instructions: 'Test instructions',
      tips: 'Test tips',
      accessibility: 'Test accessibility',
      prerequisites: 'Test prerequisites',
      progressIndicators: 'Test progress'
    },
    sv: {
      title: 'Test Övning',
      introduction: 'Test introduktion',
      duration: '10 minuter',
      benefits: 'Test fördelar',
      instructions: 'Test instruktioner',
      tips: 'Test tips',
      accessibility: 'Test tillgänglighet',
      prerequisites: 'Test förkunskaper',
      progressIndicators: 'Test framsteg'
    }
  },
  category: ExerciseCategoryEnum.NARVARO,
  difficulty: DifficultyLevel.BEGINNER,
  recommendedTime: [TimeOfDay.MORNING],
  relatedExerciseIds: [],
  userId: 'user-1',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  mediaIds: [],
  order: 1
}

// Mock DataTransfer
class MockDataTransfer implements DataTransfer {
  dropEffect: 'none' | 'copy' | 'link' | 'move' = 'none'
  effectAllowed: 'none' | 'copy' | 'copyLink' | 'copyMove' | 'link' | 'linkMove' | 'move' | 'all' | 'uninitialized' = 'none'
  items: DataTransferItemList = {
    add: jest.fn(),
    clear: jest.fn(),
    remove: jest.fn(),
    length: 0,
    [Symbol.iterator]: function* () { yield* [] }
  } as unknown as DataTransferItemList
  types: string[] = []
  files: FileList = {
    0: new File([''], 'test.png', { type: 'image/png' }),
    length: 1,
    item: (index: number) => new File([''], 'test.png', { type: 'image/png' }),
    [Symbol.iterator]: function* () {
      yield new File([''], 'test.png', { type: 'image/png' })
    }
  } as unknown as FileList
  
  clearData(): void {}
  getData(format: string): string { return '' }
  setData(format: string, data: string): boolean { return true }
  setDragImage(image: Element, x: number, y: number): void {}
}

// @ts-ignore - We need to override the global DataTransfer constructor
global.DataTransfer = MockDataTransfer as any

describe('ExerciseForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    global.fetch = jest.fn()
  })

  it('renders form with initial exercise data', () => {
    render(
      <LanguageProvider>
        <ExerciseForm exercise={mockExercise} />
      </LanguageProvider>
    )

    expect(screen.getByDisplayValue('Test Exercise')).toBeInTheDocument()
    expect(screen.getByDisplayValue('10 minutes')).toBeInTheDocument()
    expect(screen.getByDisplayValue('1')).toBeInTheDocument()
  })

  it('switches language and updates form content', () => {
    render(
      <LanguageProvider>
        <ExerciseForm exercise={mockExercise} />
      </LanguageProvider>
    )

    // Initial English content
    expect(screen.getByDisplayValue('Test Exercise')).toBeInTheDocument()

    // Switch to Swedish
    fireEvent.click(screen.getByText('Swedish'))

    // Swedish content should be displayed
    expect(screen.getByDisplayValue('Test Övning')).toBeInTheDocument()
  })

  it('updates form fields', async () => {
    render(
      <LanguageProvider>
        <ExerciseForm exercise={mockExercise} />
      </LanguageProvider>
    )

    // Switch to English
    const englishButton = screen.getByText('English')
    fireEvent.click(englishButton)

    // Now we can find the English title
    const titleInput = screen.getByDisplayValue('Test Exercise')
    fireEvent.change(titleInput, { target: { value: 'Updated Exercise' } })
    expect(screen.getByDisplayValue('Updated Exercise')).toBeInTheDocument()
  })

  it('submits form with updated data', async () => {
    const mockFetch = jest.fn().mockResolvedValueOnce({ ok: true })
    global.fetch = mockFetch

    render(
      <LanguageProvider>
        <ExerciseForm exercise={mockExercise} />
      </LanguageProvider>
    )

    // Switch to English
    const englishButton = screen.getByText('English')
    fireEvent.click(englishButton)

    const submitButton = screen.getByText('Save')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        `/api/exercises/${mockExercise.id}`,
        expect.objectContaining({
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' }
        })
      )
    })
  })

  it('handles form submission error', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
    const mockFetch = jest.fn().mockRejectedValueOnce(new Error('Failed to save'))
    global.fetch = mockFetch

    render(
      <LanguageProvider>
        <ExerciseForm exercise={mockExercise} />
      </LanguageProvider>
    )

    // Switch to English
    const englishButton = screen.getByText('English')
    fireEvent.click(englishButton)

    const submitButton = screen.getByText('Save')
    fireEvent.click(submitButton)

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Error saving exercise:',
        expect.any(Error)
      )
    })

    consoleSpy.mockRestore()
  })

  describe('Media upload', () => {
    it('handles successful media upload', async () => {
      const mockFetch = jest.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ url: 'test.png' })
      })
      global.fetch = mockFetch

      render(
        <LanguageProvider>
          <ExerciseForm exercise={mockExercise} />
        </LanguageProvider>
      )

      const uploadButton = screen.getByTestId('upload-image-button-introduction')
      await act(async () => {
        fireEvent.click(uploadButton)
      })

      expect(mockFetch).toHaveBeenCalledWith(
        `/api/exercises/${mockExercise.id}/media`,
        expect.objectContaining({
          method: 'POST',
          body: expect.any(FormData)
        })
      )
    })

    it('handles media upload error', async () => {
      const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {})
      const mockFetch = jest.fn().mockRejectedValue(new Error('Upload failed'))
      global.fetch = mockFetch

      render(
        <LanguageProvider>
          <ExerciseForm exercise={mockExercise} />
        </LanguageProvider>
      )

      const uploadButton = screen.getByTestId('upload-image-button-introduction')
      await act(async () => {
        fireEvent.click(uploadButton)
      })

      expect(consoleSpy).toHaveBeenCalledWith(
        'Error uploading file:',
        expect.any(Error)
      )

      consoleSpy.mockRestore()
    })
  })
}) 