import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router';
import AuthTemplate from '../templates/AuthTemplate';
import AuthContainer from '../components/organisms/AuthContainer';
import useAuthStore from '../store/AuthStore';
import { useEffect } from 'react';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  const { token } = useAuthStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate({
        to: `/${useAuthStore.getState().role}/dashboard`,
      });
    }
  }, [token, navigate]);
  return (
    <AuthTemplate>
      <AuthContainer />
    </AuthTemplate>
  );
}
