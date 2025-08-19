import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AuthForm from "./index";
import { vi, describe, it, expect } from "vitest";
import { LoginFormProps } from "../../molecules/LoginForm";
import { RegisterFormProps } from "../../molecules/RegisterForm";
import { ForgotPasswordFormProps } from "../../molecules/ForgotForm";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../styles/theme";

// Mock all the child form components
vi.mock("../../molecules/LoginForm", () => ({
  default: ({ role, onToggleMode, onForgotPassword }: LoginFormProps) => (
    <div>
      LoginForm - Role: {role}
      <button onClick={onToggleMode}>Toggle Mode</button>
      <button onClick={onForgotPassword}>Forgot Password</button>
    </div>
  ),
}));

vi.mock("../../molecules/RegisterForm", () => ({
  default: ({ onToggleMode }: RegisterFormProps) => (
    <div>
      RegisterForm
      <button onClick={onToggleMode}>Toggle Mode</button>
    </div>
  ),
}));

vi.mock("../../molecules/VerifyOtpForm", () => ({
  default: () => <div>VerifyOtpForm</div>,
}));

vi.mock("../../molecules/ForgotForm", () => ({
  default: ({ onBack }: ForgotPasswordFormProps) => (
    <div>
      ForgotPasswordForm
      <button onClick={onBack}>Back</button>
    </div>
  ),
}));

vi.mock("../../molecules/ResetPasswordForm", () => ({
  default: () => <div>ResetPasswordForm</div>,
}));

vi.mock("../../../hooks/useAuthForm", () => ({
  useAuthForm: () => ({
    formData: { email: "", password: "", otp: "", confirmPassword: "" },
    isLoading: false,
    error: "",
    handleChange: vi.fn(),
    handleSubmit: vi.fn(),
    handleOtpChange: vi.fn(),
  }),
}));

describe("AuthForm", () => {
  it("renders LoginForm for login mode and customer role", () => {
    render(
      <ThemeProvider theme={theme}>
        <AuthForm role="customer" mode="login" setAuthMode={vi.fn()} />
      </ThemeProvider>
    );

    expect(screen.getByText("LoginForm - Role: customer")).toBeInTheDocument();
  });

  it("calls setAuthMode when toggling mode or forgot password", () => {
    const setAuthModeMock = vi.fn();

    render(
      <ThemeProvider theme={theme}>
        <AuthForm role="customer" mode="login" setAuthMode={setAuthModeMock} />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText("Toggle Mode"));
    expect(setAuthModeMock).toHaveBeenCalledWith("register");

    fireEvent.click(screen.getByText("Forgot Password"));
    expect(setAuthModeMock).toHaveBeenCalledWith("forgotPassword");
  });

  it("renders RegisterForm for register mode", () => {
    render(
      <ThemeProvider theme={theme}>
        <AuthForm role="barber" mode="register" setAuthMode={vi.fn()} />
      </ThemeProvider>
    );

    expect(screen.getByText("RegisterForm")).toBeInTheDocument();
  });

  it("renders VerifyOtpForm for verifyOtp mode", () => {
    render(
      <ThemeProvider theme={theme}>
        <AuthForm role="customer" mode="verifyOtp" setAuthMode={vi.fn()} />
      </ThemeProvider>
    );

    expect(screen.getByText("VerifyOtpForm")).toBeInTheDocument();
  });

  it("renders ForgotPasswordForm for forgotPassword mode and calls onBack", () => {
    const setAuthModeMock = vi.fn();

    render(
      <ThemeProvider theme={theme}>
        <AuthForm
          role="customer"
          mode="forgotPassword"
          setAuthMode={setAuthModeMock}
        />
      </ThemeProvider>
    );

    expect(screen.getByText("ForgotPasswordForm")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Back"));
    expect(setAuthModeMock).toHaveBeenCalledWith("login");
  });

  it("renders ResetPasswordForm for resetPassword mode", () => {
    render(
      <ThemeProvider theme={theme}>
        <AuthForm role="customer" mode="resetPassword" setAuthMode={vi.fn()} />
      </ThemeProvider>
    );

    expect(screen.getByText("ResetPasswordForm")).toBeInTheDocument();
  });
});
