/** biome-ignore-all lint/correctness/noInvalidUseBeforeDeclaration: <explanation> */
import {
  createFileRoute,
  Outlet,
  redirect,
  useNavigate,
} from '@tanstack/react-router';
import { useEffect } from 'react';
import useAuthStore from '../store/AuthStore';

export const Route = createFileRoute('/__protected')({
  beforeLoad: ({ context }) => {
    // const token = localStorage.getItem('token');
    if (context.auth.token == null) {
      throw redirect({
        to: '/',
      });
    }
  },
  component: () => {
    const navigate = useNavigate();
    const { token } = useAuthStore();
    useEffect(() => {
      if (token == null) {
        navigate({
          to: '/',
        });
      }
    }, [token, navigate]);
    return <Outlet />;
  },
});
