import React, { useState } from 'react';
import { AuthWrapper } from './index.styles';
import AuthTabs from '../../molecules/AuthTabs';
import AuthForm from '../AuthForm';
import useAuthStore from '../../../store/AuthStore';

const AuthContainer = () => {
  const [authMode, setAuthMode] = useState<
    | 'login'
    | 'register'
    | 'verifyOtp'
    | 'forgotPassword'
    | 'resetOtp'
    | 'resetPassword'
  >('login');

  const { role, setRole } = useAuthStore();

  const handleSetRole = (newRole: 'customer' | 'barber') => {
    setRole(newRole);
  };

  return (
    <AuthWrapper>
      {authMode !== 'verifyOtp' &&
        authMode !== 'forgotPassword' &&
        authMode !== 'resetPassword' &&
        authMode !== 'resetOtp' && (
          <AuthTabs
            activeRole={role}
            onRoleChange={(newRole) => handleSetRole(newRole)}
          />
        )}

      <AuthForm mode={authMode} role={role} setAuthMode={setAuthMode} />
    </AuthWrapper>
  );
};

export default AuthContainer;
