import React, { useEffect, useState } from "react";
import Typography from "../../../components/atoms/Typography";
import Button from "../../../components/atoms/Button";
import Card from "../../../components/atoms/Card";
import { theme } from "../../../styles/theme";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../../api/auth"; // assumes API file exists
import OAuthLoader from "../../../components/atoms/Loader"; // Optional

const BarberDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [customers, setCustomers] = useState<any[]>([]); // Appointments/customers

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/", { replace: true });
  };
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/", { replace: true });
          return;
        }

        const res = await getCurrentUser();
        const currentUser = res.data;
        setUser(currentUser);

        if (currentUser.role === "BARBER") {
          setCustomers([
            {
              name: "Rahul Sharma",
              email: "rahul@example.com",
              phone: "9876543210",
            },
            {
              name: "Priya Verma",
              email: "priya@example.com",
              phone: "9123456789",
            },
          ]);
        } 
      } catch (err) {
        console.error(err);
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    console.log("User", user);
  }, [user]);

  if (loading) return <OAuthLoader />;

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: theme.colors.background,
        minHeight: "100vh",
      }}
    >
      <Typography
        text={`Welcome, ${user?.data.name}`}
        variant="xl"
        weight="bold"
        color={theme.colors.primary}
      />
      <Typography
        text="Hello Barber! Manage your appointments and profile here."
        variant="md"
        style={{ marginTop: "1rem" }}
      />

      <div style={{ marginTop: "2rem" }}>
        <Typography text="Customer Appointments" variant="lg" />
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
          {customers.length > 0 ? (
            customers.map((customer, index) => (
              <Card key={index}>
                <Typography text={`Name: ${customer.name}`} variant="md" />
                <Typography text={`Email: ${customer.email}`} variant="sm" />
                <Typography text={`Phone: ${customer.phone}`} variant="sm" />
              </Card>
            ))
          ) : (
            <Typography text="No appointments found." variant="sm" />
          )}
        </div>
      </div>

      <div style={{ marginTop: "3rem" }}>
        <Button
          text="Logout"
          buttonVariant="outline"
          style={{
            backgroundColor: theme.colors.accent,
            color: "#fff",
          }}
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default BarberDashboard;
