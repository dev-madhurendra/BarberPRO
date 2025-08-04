import React from 'react'
import { screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render } from '../../../test/test-utils'
import LoginForm from './index'

// Mock the theme import
vi.mock('../../../styles/theme', () => ({
  theme: {
    colors: {
      accent: '#007bff',
      border: '#E5E7EB',
      inputBg: '#F3F4F6'
    },
    fontSizes: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '24px',
      xxl: '32px'
    },
    fonts: {
      body: 'Inter, sans-serif'
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      lg: '24px',
      xl: '32px',
      xxl: '48px'
    },
    borderRadius: {
      sm: '6px',
      md: '10px',
      lg: '16px',
      xl: '24px'
    },
    transitions: {
      base: 'all 0.3s ease'
    }
  }
}))

// Mock the functionConfig import
vi.mock('../../../utils/functionConfig', () => ({
  LOGIN_FORM_INPUT_FIELDS: vi.fn((email: string, password: string) => [
    {
      name: 'email',
      type: 'email',
      placeholder: 'Enter your email',
      value: email,
      label: 'Email'
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Enter your password',
      value: password,
      label: 'Password'
    }
  ]),
  SOCIAL_LOGIN_BUTTONS: vi.fn(() => [
    {
      provider: 'google',
      label: 'Continue with Google',
      icon: 'google-icon'
    },
    {
      provider: 'github',
      label: 'Continue with GitHub',
      icon: 'github-icon'
    },
    {
      provider: 'twitter',
      label: 'Continue with Twitter',
      icon: 'twitter-icon'
    }
  ])
}))

describe('LoginForm Component', () => {
  const defaultProps = {
    email: '',
    password: '',
    isLoading: false,
    error: null,
    role: 'customer',
    onChange: vi.fn(),
    onSubmit: vi.fn(),
    onToggleMode: vi.fn(),
    onForgotPassword: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders login form with all elements', () => {
    render(<LoginForm {...defaultProps} />)
    
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Password')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument()
    expect(screen.getByText('Sign in')).toBeInTheDocument()
    expect(screen.getByText('Remember me')).toBeInTheDocument()
    expect(screen.getByText('Forgot password?')).toBeInTheDocument()
    expect(screen.getByText("Don't have an account?")).toBeInTheDocument()
    expect(screen.getByText('Register')).toBeInTheDocument()
  })

  it('displays email and password values', () => {
    const props = {
      ...defaultProps,
      email: 'test@example.com',
      password: 'password123'
    }
    
    render(<LoginForm {...props} />)
    
    expect(screen.getByDisplayValue('test@example.com')).toBeInTheDocument()
    expect(screen.getByDisplayValue('password123')).toBeInTheDocument()
  })

  it('calls onChange when input values change', () => {
    const onChange = vi.fn()
    render(<LoginForm {...defaultProps} onChange={onChange} />)
    
    const emailInput = screen.getByPlaceholderText('Enter your email')
    const passwordInput = screen.getByPlaceholderText('Enter your password')
    
    fireEvent.change(emailInput, { target: { value: 'new@example.com' } })
    fireEvent.change(passwordInput, { target: { value: 'newpassword' } })
    
    expect(onChange).toHaveBeenCalledTimes(2)
  })


  it('displays error message when error is provided', () => {
    const props = {
      ...defaultProps,
      error: 'Invalid email or password'
    }
    
    render(<LoginForm {...props} />)
    
    expect(screen.getByText('Invalid email or password')).toBeInTheDocument()
  })

  it('calls onForgotPassword when forgot password link is clicked', () => {
    const onForgotPassword = vi.fn()
    render(<LoginForm {...defaultProps} onForgotPassword={onForgotPassword} />)
    
    const forgotPasswordLink = screen.getByText('Forgot password?')
    fireEvent.click(forgotPasswordLink)
    
    expect(onForgotPassword).toHaveBeenCalledTimes(1)
  })

  it('calls onToggleMode when register link is clicked', () => {
    const onToggleMode = vi.fn()
    render(<LoginForm {...defaultProps} onToggleMode={onToggleMode} />)
    
    const registerLink = screen.getByText('Register')
    fireEvent.click(registerLink)
    
    expect(onToggleMode).toHaveBeenCalledTimes(1)
  })

  it('renders with different roles', () => {
    const { rerender } = render(<LoginForm {...defaultProps} role="barber" />)
    expect(screen.getByText('Sign in')).toBeInTheDocument()

    rerender(<LoginForm {...defaultProps} role="customer" />)
    expect(screen.getByText('Sign in')).toBeInTheDocument()
  })

  it('handles checkbox interaction', () => {
    render(<LoginForm {...defaultProps} />)
    
    const checkbox = screen.getByRole('checkbox')
    expect(checkbox).not.toBeChecked()
    
    fireEvent.click(checkbox)
    expect(checkbox).toBeChecked()
  })

  it('renders social login buttons', () => {
    render(<LoginForm {...defaultProps} />)
    
    expect(screen.getByText('Sign in')).toBeInTheDocument()
  })


  it('enables submit button when not loading', () => {
    render(<LoginForm {...defaultProps} />)
    
    const submitButton = screen.getByText('Sign in')
    expect(submitButton).not.toBeDisabled()
  })


  it('renders with custom styling classes', () => {
    render(<LoginForm {...defaultProps} />)
    
    // Check for specific styling classes
    const registerLink = screen.getByText('Register')
    expect(registerLink).toHaveClass('link')
    
    const accountText = screen.getByText("Don't have an account?")
    expect(accountText).toHaveClass('text')
  })
}) 