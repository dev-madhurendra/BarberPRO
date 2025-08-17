import { Outlet, createRootRoute, redirect } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Toaster } from 'react-hot-toast';
import { theme } from '../styles/theme';

export const Route = createRootRoute({
  beforeLoad: ({ context }) => {
    // if (context.auth.token != null) {
    //   throw redirect({
    //     to: `/${context.auth.role}/dashboard`,
    //   });
    // }
  },
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools />
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: theme.colors.background,
            color: theme.colors.textPrimary,
          },
        }}
      />
    </>
  );
}
