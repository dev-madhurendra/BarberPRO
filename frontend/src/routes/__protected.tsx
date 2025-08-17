import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/__protected')({
  beforeLoad: ({ context }) => {
    // const token = localStorage.getItem('token');
    if (context.auth.token == null) {
      throw redirect({
        to: '/',
      });
    }
  },
  component: Outlet,
});
