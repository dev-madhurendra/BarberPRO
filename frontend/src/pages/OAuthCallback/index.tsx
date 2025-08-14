import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { updateRole, getCurrentUser } from "../../api/auth";
import OAuthLoader from "../../components/atoms/Loader";

const OAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    const preSelectedRole = localStorage.getItem("role")?.toLowerCase();

    if (!token) {
      navigate("/");
      setLoading(false);
      return;
    }

    localStorage.setItem("token", token);

    const handleRedirect = (role: string, isBarberProfileUpdated: boolean = false) => {
      if (role === "customer") {
        navigate("/customer/dashboard");
      } else if (role === "barber") {
        if (isBarberProfileUpdated) {
          navigate("/barber/dashboard");
        } else {
          navigate("/barber/setup-profile");
        }
      } else {
        navigate("/");
      }
    };

    getCurrentUser()
      .then((res) => {
        const backendRole = res.data.data.role?.toLowerCase();

        if (backendRole === "not_defined" && preSelectedRole) {
          updateRole(preSelectedRole)
            .then(() => getCurrentUser())
            .then((res2) => {
              handleRedirect(preSelectedRole, res2.data.isBarberProfileUpdated);
            });
        } else {
          handleRedirect(backendRole, res.data.isBarberProfileUpdated);
        }
      })
      .catch((err) => {
        console.error("OAuth error:", err);
        navigate("/");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  return <OAuthLoader loading={loading} />;
};

export default OAuthCallback;
