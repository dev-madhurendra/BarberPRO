import React, { useEffect, useState } from 'react';
import { updateRole, getCurrentUser } from '../../api/auth';
import OAuthLoader from '../../components/atoms/Loader';
import { useNavigate } from '@tanstack/react-router';
import useAuthStore from '../../store/AuthStore';

const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { setAuthState } = useAuthStore();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get('token');
    const preSelectedRole = localStorage.getItem('role')?.toLowerCase();

    if (!token) {
      navigate({
        to: '/',
      });
      setLoading(false);
      return;
    }

    setAuthState({
      token,
      role: preSelectedRole === 'customer' ? 'customer' : 'barber',
    });

    const handleRedirect = (role: string, isUpdated: boolean) => {
      if (role === 'customer') {
        navigate({
          to: '/customer/dashboard',
        });
      } else if (role === 'barber') {
        if (isUpdated) {
          navigate({
            to: '/barbar/dashboard',
          });
        } else {
          navigate({
            to: '/barbar/setup-profile',
          });
        }
      } else {
        navigate({
          to: '/',
        });
      }
    };

    getCurrentUser()
      .then(async (res) => {
        let role = res.data.data.role?.toLowerCase();
        let isUpdated = res.data.data.barberProfileUpdated;

        if (role === 'not_defined' && preSelectedRole) {
          await updateRole(preSelectedRole);

          const res2 = await getCurrentUser();

          role = res2.data.data.role?.toLowerCase();
          isUpdated = res2.data.data.barberProfileUpdated;
        }

        handleRedirect(role, isUpdated);
      })
      .catch((err) => {
        console.error('[OAuthCallback] OAuth error:', err);
        navigate({
          to: '/',
        });
      })
      .finally(() => setLoading(false));
  }, [navigate, setAuthState]);

  return <OAuthLoader loading={loading} />;
};

export default OAuthCallback;
