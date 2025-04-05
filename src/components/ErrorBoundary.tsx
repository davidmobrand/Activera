'use client'

import { Component, ErrorInfo, ReactNode } from 'react'
import { Button } from './ui/Button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-act-50 to-white p-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 shadow-soft border border-act-100 text-center max-w-md w-full">
            <h2 className="text-2xl font-display text-act-800 mb-4">Something went wrong</h2>
            <p className="text-act-600 mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <Button
              variant="primary"
              onClick={() => {
                this.setState({ hasError: false })
                window.location.reload()
              }}
            >
              Try again
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
} 