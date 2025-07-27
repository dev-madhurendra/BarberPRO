import React, { JSX } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: JSX.Element;
  role?: "customer" | "barber";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, role }) => {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  console.log("USer Role ", userRole, role)

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (role && userRole?.toLowerCase() !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
