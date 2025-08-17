import { createFileRoute } from '@tanstack/react-router';
import NotFoundPage from '../pages/NotFound';

export const Route = createFileRoute('/not-found')({
  component: RouteComponent,
});

function RouteComponent() {
  return <NotFoundPage />;
}
