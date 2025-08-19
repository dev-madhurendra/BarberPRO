import { createFileRoute } from '@tanstack/react-router';
import { BarberDashboard } from '../../../pages/Dashboard/Barber';

export const Route = createFileRoute('/__protected/barber/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  return <BarberDashboard />;
}
