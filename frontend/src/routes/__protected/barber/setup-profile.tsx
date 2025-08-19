import { createFileRoute } from '@tanstack/react-router';
import BarberProfileForm from '../../../components/molecules/BarberProfileForm';

export const Route = createFileRoute('/__protected/barber/setup-profile')({
  component: RouteComponent,
});

function RouteComponent() {
  return <BarberProfileForm />;
}
