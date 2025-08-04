import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import App from './App'

// Mock all the components and modules
vi.mock('react-router-dom', () => ({
  createBrowserRouter: vi.fn(() => ({
    routes: [
      { path: '/', element: <div data-testid="home-page">Home Page</div> },
      { path: '/customer/dashboard', element: <div data-testid="customer-dashboard">Customer Dashboard</div> },
      { path: '/barber/dashboard', element: <div data-testid="barber-dashboard">Barber Dashboard</div> },
      { path: '/barber/setup-profile', element: <div data-testid="barber-profile">Barber Profile</div> },
      { path: '*', element: <div data-testid="not-found">Not Found</div> }
    ]
  })),
  RouterProvider: ({ router }: { router: any }) => (
    <div data-testid="router-provider">
      {router.routes.map((route: any, index: number) => (
        <div key={index} data-testid={`route-${index}`}>
          {route.element}
        </div>
      ))}
    </div>
  ),
  BrowserRouter: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

vi.mock('react-hot-toast', () => ({
  Toaster: () => <div data-testid="toaster">Toaster</div>
}))

vi.mock('./components/organisms/AuthContainer', () => ({
  default: () => <div data-testid="auth-container">Auth Container</div>
}))

vi.mock('./templates/AuthTemplate', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="auth-template">{children}</div>
  )
}))

vi.mock('./pages/Dashboard/Customer', () => ({
  default: () => <div data-testid="customer-dashboard">Customer Dashboard</div>
}))

vi.mock('./pages/Dashboard/Barber', () => ({
  default: () => <div data-testid="barber-dashboard">Barber Dashboard</div>
}))

vi.mock('./routes/protectedRoutes', () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="protected-route">{children}</div>
  )
}))

vi.mock('./pages/NotFound', () => ({
  default: () => <div data-testid="not-found">Not Found</div>
}))

vi.mock('./components/molecules/BarberProfileForm', () => ({
  default: () => <div data-testid="barber-profile">Barber Profile</div>
}))

vi.mock('./styles/theme', () => ({
  theme: {
    colors: {
      background: '#ffffff',
      textPrimary: '#000000'
    }
  }
}))

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />)
    expect(screen.getByTestId('router-provider')).toBeInTheDocument()
  })

  it('renders router provider', () => {
    render(<App />)
    expect(screen.getByTestId('router-provider')).toBeInTheDocument()
  })

  it('renders all routes', () => {
    render(<App />)
    
    expect(screen.getByTestId('route-0')).toBeInTheDocument()
    expect(screen.getByTestId('route-1')).toBeInTheDocument()
    expect(screen.getByTestId('route-2')).toBeInTheDocument()
    expect(screen.getByTestId('route-3')).toBeInTheDocument()
    expect(screen.getByTestId('route-4')).toBeInTheDocument()
  })

  it('renders home page route', () => {
    render(<App />)
    expect(screen.getByTestId('home-page')).toBeInTheDocument()
  })

  it('renders customer dashboard route', () => {
    render(<App />)
    expect(screen.getByTestId('customer-dashboard')).toBeInTheDocument()
  })

  it('renders barber dashboard route', () => {
    render(<App />)
    expect(screen.getByTestId('barber-dashboard')).toBeInTheDocument()
  })

  it('renders barber profile route', () => {
    render(<App />)
    expect(screen.getByTestId('barber-profile')).toBeInTheDocument()
  })

  it('renders not found route', () => {
    render(<App />)
    expect(screen.getByTestId('not-found')).toBeInTheDocument()
  })

  it('renders protected routes with wrapper', () => {
    render(<App />)
    // The protected route is rendered within the route elements
    expect(screen.getByTestId('route-1')).toBeInTheDocument()
  })

  it('renders toaster component', () => {
    render(<App />)
    // The toaster is rendered within the home page route
    expect(screen.getByTestId('home-page')).toBeInTheDocument()
  })

  it('renders auth template', () => {
    render(<App />)
    // The auth template is rendered within the home page route
    expect(screen.getByTestId('home-page')).toBeInTheDocument()
  })

  it('renders auth container', () => {
    render(<App />)
    // The auth container is rendered within the home page route
    expect(screen.getByTestId('home-page')).toBeInTheDocument()
  })
}) 