import React from "react";
import Typography from "../../atoms/Typography";
import { useAuthForm } from "../../../hooks/useAuthForm";
import LoginForm from "../../molecules/LoginForm";
import RegisterForm from "../../molecules/RegisterForm";
import VerifyOtpForm from "../../molecules/VerifyOtpForm";
import ForgotPasswordForm from "../../molecules/ForgotForm";
import ResetPasswordForm from "../../molecules/ResetPasswordForm";
import { GET_AUTH_HEADING } from "../../../utils/functionConfig";

interface AuthFormProps {
  role: "customer" | "barber";
  mode:
    | "login"
    | "register"
    | "verifyOtp"
    | "forgotPassword"
    | "resetOtp"
    | "resetPassword";
  setAuthMode: (
    mode:
      | "login"
      | "register"
      | "verifyOtp"
      | "forgotPassword"
      | "resetOtp"
      | "resetPassword"
  ) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ role, mode, setAuthMode }) => {
  const {
    formData,
    isLoading,
    error,
    handleChange,
    handleSubmit,
    handleOtpChange,
  } = useAuthForm(role, mode, setAuthMode);

  return (
    <>
      <Typography
        as="h2"
        variant="xl"
        weight="bold"
        style={{ margin: "24px 0 16px" }}
        text={GET_AUTH_HEADING(role, mode)}
      />

      {mode === "login" && (
        <LoginForm
          email={formData.email}
          password={formData.password}
          isLoading={isLoading}
          error={error}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onToggleMode={() => setAuthMode("register")}
          onForgotPassword={() => setAuthMode("forgotPassword")}
        />
      )}

      {mode === "register" && (
        <RegisterForm
          formData={formData}
          isLoading={isLoading}
          error={error}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onToggleMode={() => setAuthMode("login")}
        />
      )}

      {mode === "verifyOtp" && (
        <VerifyOtpForm
          otp={formData.otp}
          isLoading={isLoading}
          error={error}
          onChange={handleOtpChange}
          onSubmit={handleSubmit}
        />
      )}

      {mode === "forgotPassword" && (
        <ForgotPasswordForm
          email={formData.email}
          isLoading={isLoading}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onBack={() => setAuthMode("login")}
        />
      )}

      {mode === "resetOtp" && (
        <VerifyOtpForm
          otp={formData.otp}
          isLoading={isLoading}
          error={error}
          onChange={handleOtpChange}
          onSubmit={handleSubmit}
        />
      )}

      {mode === "resetPassword" && (
        <ResetPasswordForm
          newPassword={formData.password}
          confirmNewPassword={formData.confirmPassword}
          isLoading={isLoading}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      )}
    </>
  );
};

export default AuthForm;
