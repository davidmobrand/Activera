import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { UserForm } from './UserForm'
import { UserRole } from '@/lib/types'

const mockUser = {
  id: '1',
  name: 'Test User',
  email: 'test@example.com',
  role: UserRole.CLIENT,
  password: 'hashed_password',
  createdAt: '2024-01-01T00:00:00.000Z',
  updatedAt: '2024-01-01T00:00:00.000Z'
}

const mockRouter = {
  push: jest.fn()
}

jest.mock('next/navigation', () => ({
  useRouter: () => mockRouter
}))

describe('UserForm', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    global.fetch = jest.fn()
  })

  it('renders form fields with user data', () => {
    render(<UserForm user={mockUser} />)

    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
    const roleSelect = screen.getByLabelText(/role/i) as HTMLSelectElement

    expect(nameInput.value).toBe(mockUser.name)
    expect(emailInput.value).toBe(mockUser.email)
    expect(roleSelect.value).toBe(mockUser.role)
  })

  it('updates form fields on change', () => {
    render(<UserForm user={mockUser} />)

    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
    const roleSelect = screen.getByLabelText(/role/i) as HTMLSelectElement

    fireEvent.change(nameInput, { target: { value: 'New Name' } })
    fireEvent.change(emailInput, { target: { value: 'new@example.com' } })
    fireEvent.change(roleSelect, { target: { value: UserRole.ADMIN } })

    expect(nameInput.value).toBe('New Name')
    expect(emailInput.value).toBe('new@example.com')
    expect(roleSelect.value).toBe(UserRole.ADMIN)
  })

  it('submits form with updated data', async () => {
    const mockFetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockUser)
    })
    global.fetch = mockFetch

    render(<UserForm user={mockUser} />)

    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement
    const roleSelect = screen.getByLabelText(/role/i) as HTMLSelectElement

    fireEvent.change(nameInput, { target: { value: 'New Name' } })
    fireEvent.change(emailInput, { target: { value: 'new@example.com' } })
    fireEvent.change(roleSelect, { target: { value: UserRole.ADMIN } })

    fireEvent.click(screen.getByText(/save changes/i))

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(`/api/users/${mockUser.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'New Name',
          email: 'new@example.com',
          role: UserRole.ADMIN
        }),
      })
      expect(mockRouter.push).toHaveBeenCalledWith('/admin/users')
    })
  })

  it('handles form submission error', async () => {
    const mockError = new Error('Failed to update user')
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
    global.fetch = jest.fn().mockRejectedValue(mockError)

    render(<UserForm user={mockUser} />)
    fireEvent.click(screen.getByText(/save changes/i))

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Error updating user:', mockError)
    })

    consoleSpy.mockRestore()
  })

  it('navigates back on cancel', () => {
    render(<UserForm user={mockUser} />)
    fireEvent.click(screen.getByText(/cancel/i))
    expect(mockRouter.push).toHaveBeenCalledWith('/admin/users')
  })

  it('renders user form with initial values', () => {
    render(<UserForm user={mockUser} onSubmit={() => {}} />)
    expect(screen.getByDisplayValue('Test User')).toBeInTheDocument()
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument()
  })

  it('calls onSubmit with updated values', () => {
    const mockOnSubmit = jest.fn()
    render(<UserForm user={mockUser} onSubmit={mockOnSubmit} />)

    const nameInput = screen.getByDisplayValue('Test User')
    fireEvent.change(nameInput, { target: { value: 'Updated Name' } })

    const submitButton = screen.getByRole('button', { name: /save/i })
    fireEvent.click(submitButton)

    expect(mockOnSubmit).toHaveBeenCalledWith({
      ...mockUser,
      name: 'Updated Name'
    })
  })
}) 