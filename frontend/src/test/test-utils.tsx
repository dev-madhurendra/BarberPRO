import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { theme } from '../styles/theme'

// Custom render function that includes providers
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </ThemeProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

// Re-export everything
export * from '@testing-library/react'

// Override render method
export { customRender as render }

// Test data helpers
export const mockUser = {
  id: '1',
  email: 'test@example.com',
  name: 'Test User',
  role: 'customer'
}

export const mockBarber = {
  id: '2',
  email: 'barber@example.com',
  name: 'Test Barber',
  role: 'barber'
}

// Form test helpers
export const fillForm = {
  email: (email: string) => {
    const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement
    if (emailInput) {
      emailInput.value = email
      emailInput.dispatchEvent(new Event('change', { bubbles: true }))
    }
  },
  password: (password: string) => {
    const passwordInput = document.querySelector('input[type="password"]') as HTMLInputElement
    if (passwordInput) {
      passwordInput.value = password
      passwordInput.dispatchEvent(new Event('change', { bubbles: true }))
    }
  }
}

// Mock API responses
export const mockApiResponses = {
  login: {
    success: {
      success: true,
      message: 'Login successful',
      data: {
        token: 'mock-jwt-token',
        user: mockUser
      }
    },
    error: {
      success: false,
      message: 'Invalid credentials',
      data: null
    }
  },
  register: {
    success: {
      success: true,
      message: 'Registration successful',
      data: {
        token: 'mock-jwt-token',
        user: mockUser
      }
    },
    error: {
      success: false,
      message: 'Email already exists',
      data: null
    }
  }
} 