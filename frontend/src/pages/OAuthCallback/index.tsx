import { useNavigate } from '@tanstack/react-router';
import type React from 'react';
import { useEffect } from 'react';
import OAuthLoader from '../../components/atoms/Loader';
import useAuthStore, { ROLE } from '../../store/AuthStore';

const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { setAuthState, fetchUser, isLoading, user } = useAuthStore();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const preSelectedRole = localStorage.getItem('role')?.toLowerCase();

    if (!token) {
      navigate({
        to: '/',
      });
      return;
    }

    setAuthState({
      token,
      role: preSelectedRole === 'customer' ? 'customer' : 'barber',
      isLoading: true,
    });

    fetchUser();
  }, [navigate, setAuthState, fetchUser]);

  useEffect(() => {
    if (user != null) {
      navigate({
        to: `/${user.role.toLocaleLowerCase() === ROLE.barber ? ROLE.barber : ROLE.customer}/dashboard`,
        replace: true,
      });
    }
  }, [user, navigate]);

  return <OAuthLoader loading={isLoading} />;
};

export default OAuthCallback;
