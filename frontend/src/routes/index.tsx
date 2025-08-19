import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import AuthTemplate from '../templates/AuthTemplate';
import AuthContainer from '../components/organisms/AuthContainer';
import useAuthStore, { ROLE } from '../store/AuthStore';
import { useEffect } from 'react';
import OAuthLoader from '../components/atoms/Loader';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { user, _hasHydrated, isLoading, fetchUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (_hasHydrated && fetchUser) {
      fetchUser();
    }
  }, [_hasHydrated, fetchUser]);
  useEffect(() => {
    if (user != null) {
      navigate({
        to: `${user.role.toLocaleLowerCase() === ROLE.barber ? ROLE.barber : ROLE.customer}/dashboard`,
      });
    }
  }, [user, navigate]);

  if (!_hasHydrated || isLoading) {
    return <OAuthLoader />;
  }
  return (
    <AuthTemplate>
      <AuthContainer />
    </AuthTemplate>
  );
}
