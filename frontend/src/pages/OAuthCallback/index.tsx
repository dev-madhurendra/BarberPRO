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

    const handleRedirect = (role: string, isUpdated: boolean) => {

      if (role === "customer") {
        navigate("/customer/dashboard");
      } else if (role === "barber") {
        if (isUpdated) {
          navigate("/barber/dashboard");
        } else {
          navigate("/barber/setup-profile");
        }
      } else {
        navigate("/");
      }
    };

    getCurrentUser()
      .then(async (res) => {

        let role = res.data.data.role?.toLowerCase();
        let isUpdated = res.data.data.barberProfileUpdated;


        if (role === "not_defined" && preSelectedRole) {
          await updateRole(preSelectedRole);

          const res2 = await getCurrentUser();

          role = res2.data.data.role?.toLowerCase();
          isUpdated = res2.data.data.barberProfileUpdated;

        }

        handleRedirect(role, isUpdated);
      })
      .catch((err) => {
        console.error("[OAuthCallback] OAuth error:", err);
        navigate("/");
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  return <OAuthLoader loading={loading} />;
};

export default OAuthCallback;
