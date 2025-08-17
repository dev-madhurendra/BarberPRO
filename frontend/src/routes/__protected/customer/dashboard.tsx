import { createFileRoute } from '@tanstack/react-router';
import { CustomerDashboard } from '../../../pages/Dashboard/Customer';

export const Route = createFileRoute('/__protected/customer/dashboard')({
  component: RouteComponent,
});

function RouteComponent() {
  return <CustomerDashboard />;
}
