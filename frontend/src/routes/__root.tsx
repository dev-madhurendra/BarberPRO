import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { Toaster } from 'react-hot-toast';
import type { AuthState } from '../store/AuthStore';
import { theme } from '../styles/theme';
import type { QueryClient } from '@tanstack/react-query';

type MyRouterContext = {
  auth: AuthState;
  queryClient: QueryClient;
};

export const Route = createRootRouteWithContext<MyRouterContext>()({
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
