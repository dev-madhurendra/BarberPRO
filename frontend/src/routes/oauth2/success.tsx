import { createFileRoute } from '@tanstack/react-router';
import OAuthCallback from '../../pages/OAuthCallback';

export const Route = createFileRoute('/oauth2/success')({
  component: RouteComponent,
});

function RouteComponent() {
  return <OAuthCallback />;
}
