import React, { useEffect, useState } from "react";
import Typography from "../../../components/atoms/Typography";
import Button from "../../../components/atoms/Button";
import Card from "../../../components/atoms/Card";
import { theme } from "../../../styles/theme";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../../api/auth";
import OAuthLoader from "../../../components/atoms/Loader";

const CustomerDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);

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

        const response = await getCurrentUser();
        setUser(response.data);

        if (response.data.role === "CUSTOMER") {
          // Replace this with a real API call for customer's appointments
          setAppointments([
            {
              barberName: "Amit Barber",
              date: "2025-07-30",
              time: "11:00 AM",
              service: "Haircut",
            },
            {
              barberName: "Karan Studio",
              date: "2025-08-02",
              time: "3:30 PM",
              service: "Shave + Massage",
            },
          ]);
        } else {
          navigate("/customer/dashboard", { replace: true });
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
    console.log(user)    
  }, [user])

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
        text="Hello Customer! Here are your upcoming appointments."
        variant="md"
        style={{ marginTop: "1rem" }}
      />

      <div style={{ marginTop: "2rem" }}>
        <Typography text="Your Appointments" variant="lg" />
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1rem" }}>
          {appointments.length > 0 ? (
            appointments.map((appt, index) => (
              <Card key={index}>
                <Typography text={`Barber: ${appt.barberName}`} variant="md" />
                <Typography text={`Service: ${appt.service}`} variant="sm" />
                <Typography text={`Date: ${appt.date}`} variant="sm" />
                <Typography text={`Time: ${appt.time}`} variant="sm" />
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

export default CustomerDashboard;
