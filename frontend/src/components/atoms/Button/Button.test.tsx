import React from 'react'
import { screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { render } from '../../../test/test-utils'
import Button from './index'

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button text="Click me" />)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('Click me')
  })

  it('renders with different button variants', () => {
    const { rerender } = render(<Button text="Primary" buttonVariant="primary" />)
    expect(screen.getByRole('button')).toBeInTheDocument()

    rerender(<Button text="Secondary" buttonVariant="secondary" />)
    expect(screen.getByRole('button')).toBeInTheDocument()

    rerender(<Button text="Outline" buttonVariant="outline" />)
    expect(screen.getByRole('button')).toBeInTheDocument()

    rerender(<Button text="Disabled" buttonVariant="disabled" />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<Button text="Click me" onClick={handleClick} />)
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders with start icon', () => {
    const icon = <span data-testid="icon">🚀</span>
    render(<Button text="With Icon" startIcon={icon} />)
    
    expect(screen.getByTestId('icon')).toBeInTheDocument()
    expect(screen.getByRole('button')).toHaveTextContent('With Icon')
  })

  it('applies custom styles', () => {
    const customStyle = { backgroundColor: 'red', color: 'white' }
    render(<Button text="Styled" style={customStyle} />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveStyle('background-color: rgb(255, 0, 0)')
    expect(button).toHaveStyle('color: rgb(255, 255, 255)')
  })

  it('applies custom backgroundColor', () => {
    render(<Button text="Custom BG" backgroundColor="#ff0000" />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveStyle('background-color: #ff0000')
  })

  it('renders disabled state', () => {
    const handleClick = vi.fn()
    render(<Button text="Disabled" disabled={true} onClick={handleClick} />)
    
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    
    fireEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('renders with different typography variants', () => {
    const { rerender } = render(<Button text="Small" typographyVariant="sm" />)
    expect(screen.getByRole('button')).toBeInTheDocument()

    rerender(<Button text="Large" typographyVariant="lg" />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('passes data-testid prop', () => {
    render(<Button text="Test" data-testid="custom-button" />)
    expect(screen.getByTestId('custom-button')).toBeInTheDocument()
  })

  it('renders with complex text content', () => {
    const complexText = (
      <span>
        Complex <strong>Text</strong> Content
      </span>
    )
    render(<Button text={complexText} />)
    
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('Complex Text Content')
    expect(button.querySelector('strong')).toBeInTheDocument()
  })

  it('applies multiple props correctly', () => {
    const handleClick = vi.fn()
    const icon = <span data-testid="icon">⭐</span>
    
    render(
      <Button
        text="Complete Button"
        buttonVariant="secondary"
        startIcon={icon}
        onClick={handleClick}
        typographyVariant="lg"
        backgroundColor="#00ff00"
        style={{ border: '2px solid black' }}
        data-testid="complete-button"
      />
    )
    
    const button = screen.getByTestId('complete-button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveStyle('background-color: #00ff00')
    expect(button).toHaveStyle('border: 2px solid black')
    expect(screen.getByTestId('icon')).toBeInTheDocument()
    
    fireEvent.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
}) 