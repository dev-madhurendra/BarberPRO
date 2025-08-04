import React from 'react'
import { screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { render } from '../../../test/test-utils'
import Input from './index'

describe('Input Component', () => {
  it('renders with default props', () => {
    render(<Input placeholder="Enter text" type="text" />)
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeInTheDocument()
    expect(input).toHaveAttribute('type', 'text')
  })

  it('renders with label', () => {
    render(<Input label="Email Address" placeholder="Enter email" />)
    expect(screen.getByText('Email Address')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument()
  })

  it('renders with helper text', () => {
    render(<Input helperText="This is a helper message" placeholder="Enter text" />)
    expect(screen.getByText('This is a helper message')).toBeInTheDocument()
  })

  it('renders with error state', () => {
    render(
      <Input
        error={true}
        helperText="This field is required"
        placeholder="Enter text"
      />
    )
    
    const input = screen.getByPlaceholderText('Enter text')
    const helperText = screen.getByText('This field is required')
    
    expect(input).toBeInTheDocument()
    expect(helperText).toBeInTheDocument()
  })

  it('renders with success state', () => {
    render(
      <Input
        success={true}
        helperText="Input is valid"
        placeholder="Enter text"
      />
    )
    
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toBeInTheDocument()
  })

  it('renders with different variants', () => {
    const { rerender } = render(<Input variant="outlined" placeholder="Outlined" />)
    expect(screen.getByPlaceholderText('Outlined')).toBeInTheDocument()

    rerender(<Input variant="filled" placeholder="Filled" />)
    expect(screen.getByPlaceholderText('Filled')).toBeInTheDocument()
  })

  it('handles input changes', () => {
    const handleChange = vi.fn()
    render(<Input onChange={handleChange} placeholder="Enter text" />)
    
    const input = screen.getByPlaceholderText('Enter text')
    fireEvent.change(input, { target: { value: 'test value' } })
    
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(input).toHaveValue('test value')
  })

  it('handles focus and blur events', () => {
    const handleFocus = vi.fn()
    const handleBlur = vi.fn()
    
    render(
      <Input
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Enter text"
      />
    )
    
    const input = screen.getByPlaceholderText('Enter text')
    
    fireEvent.focus(input)
    expect(handleFocus).toHaveBeenCalledTimes(1)
    
    fireEvent.blur(input)
    expect(handleBlur).toHaveBeenCalledTimes(1)
  })

  it('renders with different input types', () => {
    const { rerender } = render(<Input type="email" placeholder="Email" />)
    expect(screen.getByPlaceholderText('Email')).toHaveAttribute('type', 'email')

    rerender(<Input type="password" placeholder="Password" />)
    expect(screen.getByPlaceholderText('Password')).toHaveAttribute('type', 'password')

    rerender(<Input type="number" placeholder="Number" />)
    expect(screen.getByPlaceholderText('Number')).toHaveAttribute('type', 'number')
  })

  it('renders with disabled state', () => {
    render(<Input disabled placeholder="Disabled input" />)
    const input = screen.getByPlaceholderText('Disabled input')
    expect(input).toBeDisabled()
  })

  it('renders with required attribute', () => {
    render(<Input required placeholder="Required input" />)
    const input = screen.getByPlaceholderText('Required input')
    expect(input).toBeRequired()
  })

  it('renders with custom value', () => {
    render(<Input value="pre-filled value" placeholder="Enter text" />)
    const input = screen.getByPlaceholderText('Enter text')
    expect(input).toHaveValue('pre-filled value')
  })

  it('passes through HTML input attributes', () => {
    render(
      <Input
        name="username"
        id="username-input"
        maxLength={50}
        placeholder="Enter username"
      />
    )
    
    const input = screen.getByPlaceholderText('Enter username')
    expect(input).toHaveAttribute('name', 'username')
    expect(input).toHaveAttribute('id', 'username-input')
    expect(input).toHaveAttribute('maxLength', '50')
  })

  it('renders with complex label and helper text', () => {
    render(
      <Input
        label="Email Address *"
        helperText="We'll never share your email with anyone else."
        placeholder="Enter your email"
        type="email"
      />
    )
    
    expect(screen.getByText('Email Address *')).toBeInTheDocument()
    expect(screen.getByText("We'll never share your email with anyone else.")).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your email')).toHaveAttribute('type', 'email')
  })

  it('handles controlled input correctly', () => {
    const TestComponent = () => {
      const [value, setValue] = React.useState('')
      return (
        <Input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Controlled input"
        />
      )
    }
    
    render(<TestComponent />)
    const input = screen.getByPlaceholderText('Controlled input')
    
    fireEvent.change(input, { target: { value: 'new value' } })
    expect(input).toHaveValue('new value')
  })
}) 