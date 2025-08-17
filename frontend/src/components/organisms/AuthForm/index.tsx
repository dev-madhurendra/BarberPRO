import React from 'react';
import Typography from '../../atoms/Typography';
import { useAuthForm } from '../../../hooks/useAuthForm';
import LoginForm from '../../molecules/LoginForm';
import RegisterForm from '../../molecules/RegisterForm';
import VerifyOtpForm from '../../molecules/VerifyOtpForm';
import ForgotPasswordForm from '../../molecules/ForgotForm';
import ResetPasswordForm from '../../molecules/ResetPasswordForm';
import { GET_AUTH_HEADING } from '../../../utils/functionConfig';

type AuthFormProps = {
  role: 'customer' | 'barber';
  mode:
    | 'login'
    | 'register'
    | 'verifyOtp'
    | 'forgotPassword'
    | 'resetOtp'
    | 'resetPassword';
  setAuthMode: (
    mode:
      | 'login'
      | 'register'
      | 'verifyOtp'
      | 'forgotPassword'
      | 'resetOtp'
      | 'resetPassword'
  ) => void;
};

const AuthForm: React.FC<AuthFormProps> = ({ role, mode, setAuthMode }) => {
  const {
    formData,
    isLoading,
    error,
    handleChange,
    handleSubmit,
    handleOtpChange,
  } = useAuthForm(role, mode, setAuthMode);

  return (
    <>
      <Typography
        as="h2"
        style={{ margin: '24px 0 16px' }}
        text={GET_AUTH_HEADING(role, mode)}
        variant="xl"
        weight="bold"
      />

      {mode === 'login' && (
        <LoginForm
          email={formData.email}
          error={error}
          isLoading={isLoading}
          onChange={handleChange}
          onForgotPassword={() => setAuthMode('forgotPassword')}
          onSubmit={handleSubmit}
          onToggleMode={() => setAuthMode('register')}
          password={formData.password}
          role={role}
        />
      )}

      {mode === 'register' && (
        <RegisterForm
          error={error}
          formData={formData}
          isLoading={isLoading}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onToggleMode={() => setAuthMode('login')}
        />
      )}

      {mode === 'verifyOtp' && (
        <VerifyOtpForm
          error={error}
          isLoading={isLoading}
          onChange={handleOtpChange}
          onSubmit={handleSubmit}
          otp={formData.otp}
        />
      )}

      {mode === 'forgotPassword' && (
        <ForgotPasswordForm
          email={formData.email}
          isLoading={isLoading}
          onBack={() => setAuthMode('login')}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}

      {mode === 'resetOtp' && (
        <VerifyOtpForm
          error={error}
          isLoading={isLoading}
          onChange={handleOtpChange}
          onSubmit={handleSubmit}
          otp={formData.otp}
        />
      )}

      {mode === 'resetPassword' && (
        <ResetPasswordForm
          confirmNewPassword={formData.confirmPassword}
          isLoading={isLoading}
          newPassword={formData.password}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default AuthForm;
