import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import axios from 'axios'
import {
  registerUser,
  loginUser,
  sendOtp,
  verifyOtp,
  resetPassword,
  saveBarberProfile,
  updateRole,
  getCurrentUser,
  findUserByEmail
} from './auth'

// Mock axios
vi.mock('axios')
const mockedAxios = axios as any

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
})

describe('Auth API Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    localStorageMock.getItem.mockReturnValue('mock-token')
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  describe('registerUser', () => {
    it('should register a user successfully', async () => {
      const mockResponse = {
        data: {
          success: true,
          message: 'User registered successfully',
          data: { id: '1', email: 'test@example.com' }
        }
      }
      mockedAxios.post.mockResolvedValue(mockResponse)

      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'customer'
      }

      const result = await registerUser(userData)

      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/auth/register'),
        userData
      )
      expect(result).toEqual(mockResponse)
    })

    it('should handle registration error', async () => {
      const mockError = new Error('Registration failed')
      mockedAxios.post.mockRejectedValue(mockError)

      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'customer'
      }

      await expect(registerUser(userData)).rejects.toThrow('Registration failed')
    })
  })

  describe('loginUser', () => {
    it('should login a user successfully', async () => {
      const mockResponse = {
        data: {
          success: true,
          message: 'Login successful',
          data: { token: 'jwt-token', user: { id: '1', email: 'test@example.com' } }
        }
      }
      mockedAxios.post.mockResolvedValue(mockResponse)

      const loginData = {
        email: 'test@example.com',
        password: 'password123'
      }

      const result = await loginUser(loginData)

      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/auth/login'),
        loginData
      )
      expect(result).toEqual(mockResponse)
    })

    it('should handle login error', async () => {
      const mockError = new Error('Invalid credentials')
      mockedAxios.post.mockRejectedValue(mockError)

      const loginData = {
        email: 'test@example.com',
        password: 'wrongpassword'
      }

      await expect(loginUser(loginData)).rejects.toThrow('Invalid credentials')
    })
  })

  describe('sendOtp', () => {
    it('should send OTP successfully', async () => {
      const mockResponse = {
        data: {
          success: true,
          message: 'OTP sent successfully'
        }
      }
      mockedAxios.post.mockResolvedValue(mockResponse)

      const email = 'test@example.com'
      const result = await sendOtp(email)

      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/otp/send?medium=email&destination=test@example.com')
      )
      expect(result).toEqual(mockResponse)
    })

    it('should handle OTP send error', async () => {
      const mockError = new Error('Failed to send OTP')
      mockedAxios.post.mockRejectedValue(mockError)

      await expect(sendOtp('test@example.com')).rejects.toThrow('Failed to send OTP')
    })
  })

  describe('verifyOtp', () => {
    it('should verify OTP successfully', async () => {
      const mockResponse = {
        data: {
          success: true,
          message: 'OTP verified successfully'
        }
      }
      mockedAxios.post.mockResolvedValue(mockResponse)

      const email = 'test@example.com'
      const otp = '123456'
      const result = await verifyOtp(email, otp)

      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/otp/verify?medium=email&destination=test@example.com&otp=123456')
      )
      expect(result).toEqual(mockResponse)
    })

    it('should handle OTP verification error', async () => {
      const mockError = new Error('Invalid OTP')
      mockedAxios.post.mockRejectedValue(mockError)

      await expect(verifyOtp('test@example.com', '123456')).rejects.toThrow('Invalid OTP')
    })
  })

  describe('resetPassword', () => {
    it('should reset password successfully', async () => {
      const mockResponse = {
        data: {
          success: true,
          message: 'Password reset successfully'
        }
      }
      mockedAxios.post.mockResolvedValue(mockResponse)

      const resetData = {
        email: 'test@example.com',
        isVerified: true,
        newPassword: 'newpassword123'
      }

      const result = await resetPassword(resetData)

      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/auth/reset-password'),
        resetData
      )
      expect(result).toEqual(mockResponse)
    })

    it('should handle password reset error', async () => {
      const mockError = new Error('Password reset failed')
      mockedAxios.post.mockRejectedValue(mockError)

      const resetData = {
        email: 'test@example.com',
        isVerified: true,
        newPassword: 'newpassword123'
      }

      await expect(resetPassword(resetData)).rejects.toThrow('Password reset failed')
    })
  })

  describe('saveBarberProfile', () => {
    it('should save barber profile successfully', async () => {
      const mockResponse = {
        data: {
          success: true,
          message: 'Barber profile saved successfully'
        }
      }
      mockedAxios.post.mockResolvedValue(mockResponse)

      const profileData = {
        shopName: 'John\'s Barber Shop',
        phoneNumber: '1234567890',
        address: '123 Barber St',
        city: 'New York',
        pinCode: '10001',
        servicesOffered: 'Haircut, Shave',
        startingPrice: 25
      }

      const result = await saveBarberProfile(profileData)

      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/barbers'),
        profileData,
        {
          headers: {
            Authorization: 'Bearer mock-token'
          }
        }
      )
      expect(result).toEqual(mockResponse)
    })

    it('should handle barber profile save error', async () => {
      const mockError = new Error('Failed to save profile')
      mockedAxios.post.mockRejectedValue(mockError)

      const profileData = {
        shopName: 'John\'s Barber Shop',
        phoneNumber: '1234567890',
        address: '123 Barber St',
        city: 'New York',
        pinCode: '10001',
        servicesOffered: 'Haircut, Shave',
        startingPrice: 25
      }

      await expect(saveBarberProfile(profileData)).rejects.toThrow('Failed to save profile')
    })
  })

  describe('updateRole', () => {
    it('should update role successfully', async () => {
      const mockResponse = {
        data: {
          success: true,
          message: 'Role updated successfully'
        }
      }
      mockedAxios.post.mockResolvedValue(mockResponse)

      const newRole = 'barber'
      const result = await updateRole(newRole)

      expect(mockedAxios.post).toHaveBeenCalledWith(
        expect.stringContaining('/auth/change-role'),
        { role: 'BARBER' },
        {
          headers: {
            Authorization: 'Bearer mock-token'
          }
        }
      )
      expect(result).toEqual(mockResponse)
    })

    it('should handle role update error', async () => {
      const mockError = new Error('Failed to update role')
      mockedAxios.post.mockRejectedValue(mockError)

      await expect(updateRole('barber')).rejects.toThrow('Failed to update role')
    })
  })

  describe('getCurrentUser', () => {
    it('should get current user successfully', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {
            id: '1',
            email: 'test@example.com',
            name: 'Test User',
            role: 'customer'
          }
        }
      }
      mockedAxios.get.mockResolvedValue(mockResponse)

      const result = await getCurrentUser()

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('/auth/me'),
        {
          headers: {
            Authorization: 'Bearer mock-token'
          }
        }
      )
      expect(result).toEqual(mockResponse)
    })

    it('should handle get current user error', async () => {
      const mockError = new Error('Failed to get user')
      mockedAxios.get.mockRejectedValue(mockError)

      await expect(getCurrentUser()).rejects.toThrow('Failed to get user')
    })
  })

  describe('findUserByEmail', () => {
    it('should find user by email successfully', async () => {
      const mockResponse = {
        data: {
          success: true,
          data: {
            id: '1',
            email: 'test@example.com',
            name: 'Test User'
          }
        }
      }
      mockedAxios.get.mockResolvedValue(mockResponse)

      const email = 'test@example.com'
      const result = await findUserByEmail(email)

      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining('/user?email=test@example.com')
      )
      expect(result).toEqual(mockResponse)
    })

    it('should handle find user error', async () => {
      const mockError = new Error('User not found')
      mockedAxios.get.mockRejectedValue(mockError)

      await expect(findUserByEmail('test@example.com')).rejects.toThrow('User not found')
    })
  })

  describe('Error handling with different HTTP status codes', () => {
    it('should handle 400 Bad Request', async () => {
      const mockError = {
        response: {
          status: 400,
          data: { message: 'Bad Request' }
        }
      }
      mockedAxios.post.mockRejectedValue(mockError)

      await expect(loginUser({ email: 'test@example.com', password: 'password' }))
        .rejects.toEqual(mockError)
    })

    it('should handle 401 Unauthorized', async () => {
      const mockError = {
        response: {
          status: 401,
          data: { message: 'Unauthorized' }
        }
      }
      mockedAxios.get.mockRejectedValue(mockError)

      await expect(getCurrentUser()).rejects.toEqual(mockError)
    })

    it('should handle 500 Internal Server Error', async () => {
      const mockError = {
        response: {
          status: 500,
          data: { message: 'Internal Server Error' }
        }
      }
      mockedAxios.post.mockRejectedValue(mockError)

      await expect(registerUser({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        role: 'customer'
      })).rejects.toEqual(mockError)
    })
  })
}) 