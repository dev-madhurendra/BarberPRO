import { useState } from 'react';
import {
  registerUser,
  sendOtp,
  verifyOtp,
  loginUser,
  resetPassword,
  findUserByEmail,
} from '../api/auth';
import { ToastService } from '../utils/toastService';
import axios from 'axios';
import { useNavigate } from '@tanstack/react-router';
import useAuthStore from '../store/AuthStore';

type AuthMode =
  | 'login'
  | 'register'
  | 'verifyOtp'
  | 'forgotPassword'
  | 'resetOtp'
  | 'resetPassword';

type UserRole = 'customer' | 'barber';

type IFormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  otp: string;
};

export const useAuthForm = (
  role: UserRole,
  mode: AuthMode,
  setAuthMode: (mode: AuthMode) => void
) => {
  const navigate = useNavigate();

  const { isVerified, setAuthState } = useAuthStore();

  const initialFormData: IFormData = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: '',
  };

  const [formData, setFormData] = useState<IFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleOtpChange = (otp: string) =>
    setFormData((prev) => ({ ...prev, otp }));

  // Reset form with an option to keep email
  const resetForm = (keepEmail = false) =>
    setFormData((prev) => ({
      ...initialFormData,
      email: keepEmail ? prev.email : '',
    }));

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);

    try {
      // FORGOT PASSWORD
      if (mode === 'forgotPassword') {
        if (!formData.email) {
          ToastService.error('Please enter your email.');
          return;
        }
        setIsLoading(true);
        const response = await findUserByEmail(formData.email);
        const currentRoleFromLocalStoratge = localStorage.getItem('role');

        if (
          response.data.data.role?.toLowerCase() !==
          currentRoleFromLocalStoratge
        ) {
          ToastService.error('Invalid email or role is not selected correctly');
          navigate({
            to: '/',
          });
          return;
        }
        await sendOtp(formData.email);
        ToastService.success('OTP sent! Verify to reset password.');
        setAuthMode('resetOtp');
        return;
      }

      // RESET OTP
      if (mode === 'resetOtp') {
        if (!formData.otp) {
          ToastService.error('Enter the OTP.');
          return;
        }
        setIsLoading(true);
        const response = await verifyOtp(formData.email, formData.otp);
        if (response.data.success) {
          setAuthState({
            isVerified: response.data.verified as boolean,
          });
          ToastService.success('OTP verified! Set your new password.');
          setAuthMode('resetPassword');
        }
        return;
      }

      // RESET PASSWORD
      if (mode === 'resetPassword') {
        if (!(formData.password && formData.confirmPassword)) {
          ToastService.error('Fill all fields.');
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          ToastService.error('Passwords do not match.');
          return;
        }
        setIsLoading(true);
        await resetPassword({
          email: formData.email,
          isVerified,
          newPassword: formData.password,
        });
        ToastService.success('Password reset successfully!');
        setAuthMode('login');
        resetForm();
        return;
      }

      // REGISTER
      if (mode === 'register') {
        if (
          !formData.name ||
          !formData.email ||
          !formData.password ||
          !formData.confirmPassword
        ) {
          ToastService.error('Please fill in all fields.');
          return;
        }
        if (formData.password !== formData.confirmPassword) {
          ToastService.error('Passwords do not match.');
          return;
        }
        console.log(formData);
        setIsLoading(true);
        await registerUser({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: role.toUpperCase(),
        });
        ToastService.success('Register success, please verify otp.');
        await sendOtp(formData.email);
        setAuthMode('verifyOtp');
        resetForm(true);
        return;
      }

      if (mode === 'verifyOtp') {
        if (!formData.otp) {
          ToastService.error('Please enter the OTP.');
          return;
        }
        setIsLoading(true);
        const response = await verifyOtp(formData.email, formData.otp);

        if (role === 'barber' && response.data?.data?.token) {
          setAuthState({
            token: response.data.data.token,
            role: 'barber',
          });
          ToastService.success('OTP Verified! Please setup your profile.');
          navigate({
            to: '/barber/setup-profile',
          });
        } else {
          ToastService.success('OTP Verified! Please login.');
          setAuthMode('login');
        }
        resetForm();
        return;
      }

      if (mode === 'login') {
        if (!(formData.email && formData.password)) {
          ToastService.error('Please enter email and password.');
          return;
        }
        setIsLoading(true);
        const userData = await loginUser({
          email: formData.email,
          password: formData.password,
        });

        const currentLocalStorageRole = localStorage.getItem('role');

        if (
          userData.data.data.user.role?.toLowerCase() !==
          currentLocalStorageRole
        ) {
          navigate({
            to: '/',
          });
          ToastService.error(
            'Invalid login details or selected role is not correct.'
          );
        } else {
          setAuthState({
            token: userData.data.data.token,
            role: userData.data.data.user.role,
          });
          ToastService.success('Login Successful!');
        }

        resetForm();

        if (role === 'customer') {
          navigate({
            to: '/customer/dashboard',
          });
        } else if (role === 'barber') {
          navigate({
            to: '/barber/dashboard',
          });
        }
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        const message = err.response?.data?.message || 'Something went wrong.';
        console.error('Error status:', status);
        console.error('Full error:', err.response);
        ToastService.error(message);
      } else {
        console.error('Unknown error:', err);
        ToastService.error('Something went wrong.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    formData,
    isLoading,
    error,
    handleChange,
    handleOtpChange,
    handleSubmit,
    resetForm,
  };
};
