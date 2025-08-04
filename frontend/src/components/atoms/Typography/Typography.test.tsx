import React from 'react'
import { screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { render } from '../../../test/test-utils'
import Typography from './index'

describe('Typography Component', () => {
  it('renders with default props', () => {
    render(<Typography text="Hello World" />)
    const element = screen.getByText('Hello World')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toBe('P')
  })

  it('renders with different variants', () => {
    const { rerender } = render(<Typography text="Small text" variant="xs" />)
    expect(screen.getByText('Small text')).toBeInTheDocument()

    rerender(<Typography text="Large text" variant="xl" />)
    expect(screen.getByText('Large text')).toBeInTheDocument()

    rerender(<Typography text="Extra large text" variant="xxl" />)
    expect(screen.getByText('Extra large text')).toBeInTheDocument()
  })

  it('renders with different HTML elements', () => {
    const { rerender } = render(<Typography text="Heading 1" as="h1" />)
    expect(screen.getByText('Heading 1').tagName).toBe('H1')

    rerender(<Typography text="Heading 2" as="h2" />)
    expect(screen.getByText('Heading 2').tagName).toBe('H2')

    rerender(<Typography text="Span text" as="span" />)
    expect(screen.getByText('Span text').tagName).toBe('SPAN')

    rerender(<Typography text="Div text" as="div" />)
    expect(screen.getByText('Div text').tagName).toBe('DIV')
  })

  it('renders with different text alignments', () => {
    const { rerender } = render(<Typography text="Left aligned" align="left" />)
    expect(screen.getByText('Left aligned')).toBeInTheDocument()

    rerender(<Typography text="Center aligned" align="center" />)
    expect(screen.getByText('Center aligned')).toBeInTheDocument()

    rerender(<Typography text="Right aligned" align="right" />)
    expect(screen.getByText('Right aligned')).toBeInTheDocument()
  })

  it('renders with different font weights', () => {
    const { rerender } = render(<Typography text="Light text" weight="light" />)
    expect(screen.getByText('Light text')).toBeInTheDocument()

    rerender(<Typography text="Bold text" weight="bold" />)
    expect(screen.getByText('Bold text')).toBeInTheDocument()

    rerender(<Typography text="Medium text" weight="medium" />)
    expect(screen.getByText('Medium text')).toBeInTheDocument()
  })

  it('renders with custom color', () => {
    render(<Typography text="Colored text" color="#ff0000" />)
    expect(screen.getByText('Colored text')).toBeInTheDocument()
  })

  it('renders with custom styles', () => {
    const customStyle = { backgroundColor: 'blue', padding: '10px' }
    render(<Typography text="Styled text" style={customStyle} />)
    
    const element = screen.getByText('Styled text')
    expect(element).toBeInTheDocument()
  })

  it('handles click events', () => {
    const handleClick = vi.fn()
    render(<Typography text="Clickable text" onClick={handleClick} />)
    
    const element = screen.getByText('Clickable text')
    fireEvent.click(element)
    
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('passes data-testid prop', () => {
    render(<Typography text="Test text" data-testid="custom-typography" />)
    expect(screen.getByTestId('custom-typography')).toBeInTheDocument()
  })



  it('renders with className prop', () => {
    render(<Typography text="Classed text" className="custom-class" />)
    expect(screen.getByText('Classed text')).toHaveClass('custom-class')
  })

  it('applies multiple props correctly', () => {
    const handleClick = vi.fn()
    
    render(
      <Typography
        text="Complete Typography"
        variant="lg"
        as="h3"
        align="center"
        weight="bold"
        color="#00ff00"
        style={{ border: '1px solid black' }}
        onClick={handleClick}
        data-testid="complete-typography"
        className="complete-class"
      />
    )
    
    const element = screen.getByTestId('complete-typography')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toBe('H3')
    expect(element).toHaveTextContent('Complete Typography')
    expect(element).toHaveClass('complete-class')
    
    fireEvent.click(element)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders with different text content types', () => {
    const { rerender } = render(<Typography text="String text" />)
    expect(screen.getByText('String text')).toBeInTheDocument()

    rerender(<Typography text={123} />)
    expect(screen.getByText('123')).toBeInTheDocument()
  })

  it('renders with mixed content', () => {
    const mixedContent = (
      <div>
        <span>Part 1</span>
        <strong>Part 2</strong>
        <em>Part 3</em>
      </div>
    )
    
    render(<Typography text={mixedContent} />)
    
    expect(screen.getByText('Part 1')).toBeInTheDocument()
    expect(screen.getByText('Part 2')).toBeInTheDocument()
    expect(screen.getByText('Part 3')).toBeInTheDocument()
  })
}) 