import React, { useState } from "react";
import { AuthWrapper } from "./index.styles";
import AuthTabs from "../../molecules/AuthTabs";
import AuthForm from "../AuthForm";

const AuthContainer = () => {
  const [role, setRole] = useState<"customer" | "barber">("customer");
  const [authMode, setAuthMode] = useState<
    | "login"
    | "register"
    | "verifyOtp"
    | "forgotPassword"
    | "resetOtp"
    | "resetPassword"
  >("login");

  return (
    <AuthWrapper>
      {authMode !== "verifyOtp" &&
        authMode !== "forgotPassword" &&
        authMode !== "resetPassword" &&
        authMode !== "resetOtp" && ( 
          <AuthTabs
            activeRole={role}
            onRoleChange={(newRole) => setRole(newRole)}
          />
        )}

      <AuthForm role={role} mode={authMode} setAuthMode={setAuthMode} />
    </AuthWrapper>
  );
};

export default AuthContainer;
