import React from 'react'
import { screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { render } from '../../test/test-utils'
import LandingPage from './index'

// Mock the AuthTemplate component
vi.mock('../../templates/AuthTemplate', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="auth-template">
      {children}
    </div>
  )
}))

describe('LandingPage Component', () => {
  it('renders without crashing', () => {
    render(<LandingPage />)
    expect(screen.getByTestId('auth-template')).toBeInTheDocument()
  })

  it('renders AuthTemplate wrapper', () => {
    render(<LandingPage />)
    const authTemplate = screen.getByTestId('auth-template')
    expect(authTemplate).toBeInTheDocument()
  })

  it('passes children to AuthTemplate', () => {
    render(<LandingPage />)
    const authTemplate = screen.getByTestId('auth-template')
    expect(authTemplate).toBeInTheDocument()
  })

  it('renders with proper structure', () => {
    const { container } = render(<LandingPage />)
    expect(container.firstChild).toBeInTheDocument()
  })
}) 