import React from "react";
import Typography from "../../../components/atoms/Typography";
import Button from "../../../components/atoms/Button";
import { theme } from "../../../styles/theme";
import { useNavigate } from "react-router-dom";

const CustomerDashboard: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/", { replace: true });
  };

  return (
    <div
      style={{
        padding: "2rem",
        backgroundColor: theme.colors.background,
        minHeight: "100vh",
      }}
    >
      <Typography
        text="Customer Dashboard"
        variant="xl"
        weight="bold"
        color={theme.colors.primary}
      />
      <Typography
        text="Welcome back, valued customer! Here is your booking and profile information."
        variant="md"
        style={{ marginTop: "1rem" }}
      />

      <div style={{ marginTop: "2rem" }}>
        <Button
          text="View Bookings"
          buttonVariant="primary"
          style={{ marginRight: "1rem" }}
        />
        <Button text="Update Profile" buttonVariant="outline" />
      </div>

      <div style={{ marginTop: "2rem" }}>
        <Button
          text="Logout"
          buttonVariant="outline"
          style={{
            backgroundColor: theme.colors.accent,
            color: "#fff",
            marginTop: "1rem",
          }}
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default CustomerDashboard;
