import { Toaster } from "react-hot-toast";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import AuthContainer from "./components/organisms/AuthContainer";
import AuthTemplate from "./templates/AuthTemplate";
import { theme } from "./styles/theme";
import ProtectedRoute from "./routes/protectedRoutes";
import NotFoundPage from "./pages/NotFound";
import BarberProfileForm from "./components/molecules/BarberProfileForm";
import OAuthCallback from "./pages/OAuthCallback";
import { CustomerDashboard } from "./pages/Dashboard/Customer";
import { BarberDashboard } from "./pages/Dashboard/Barber";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthTemplate>
        <AuthContainer />
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
      </AuthTemplate>
    ),
  },
  {
    path: "/customer/dashboard",
    element: (
      <ProtectedRoute role="customer">
        <CustomerDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/barber/dashboard",
    element: (
      <ProtectedRoute role="barber">
        <BarberDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/barber/setup-profile",
    element: (
      <ProtectedRoute role="barber">
        <BarberProfileForm />
      </ProtectedRoute>
    ),
  },
  {
    path: "/oauth2/success/*",
    element: <OAuthCallback />
  },
  {
    path: "*",
    element: <NotFoundPage />,
  }
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
