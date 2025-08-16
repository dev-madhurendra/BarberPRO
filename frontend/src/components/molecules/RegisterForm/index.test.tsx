import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RegisterForm from "./index";
import { vi, it, expect, describe } from "vitest";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../styles/theme";

const renderWithTheme = (ui: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

const googleClick = vi.fn();
const githubClick = vi.fn();
const twitterClick = vi.fn();

vi.mock("../../../utils/functionConfig", () => ({
  REGISTER_FORM_INPUT_FIELDS: (formData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => [
    {
      name: "name",
      label: "Name",
      type: "text",
      placeholder: "Enter name",
      value: formData.name,
    },
    {
      name: "email",
      label: "Email",
      type: "email",
      placeholder: "Enter email",
      value: formData.email,
    },
    {
      name: "password",
      label: "Password",
      type: "password",
      placeholder: "Enter password",
      value: formData.password,
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "Confirm password",
      value: formData.confirmPassword,
    },
  ],
  SOCIAL_LOGIN_BUTTONS: vi.fn(() => [
    {
      provider: "google",
      label: "Google Login",
      icon: "google-icon",
      onClick: googleClick,
    },
    {
      provider: "github",
      label: "GitHub Login",
      icon: "github-icon",
      onClick: githubClick,
    },
    {
      provider: "twitter",
      label: "Twitter Login",
      icon: "twitter-icon",
      onClick: twitterClick,
    },
  ]),
}));

describe("RegisterForm Component", () => {
  const defaultProps = {
    formData: { name: "", email: "", password: "", confirmPassword: "" },
    isLoading: false,
    error: null,
    onChange: vi.fn(),
    onSubmit: vi.fn((e) => e.preventDefault()),
    onToggleMode: vi.fn(),
  };

  it("renders all form fields", () => {
    renderWithTheme(<RegisterForm {...defaultProps} />);
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Password")).toBeInTheDocument();
    expect(screen.getByText("Confirm Password")).toBeInTheDocument();
  });

  it("calls onChange when typing in fields", () => {
    renderWithTheme(<RegisterForm {...defaultProps} />);
    const nameInput = screen.getByPlaceholderText(/enter name/i);
    fireEvent.change(nameInput, { target: { value: "John" } });
    expect(defaultProps.onChange).toHaveBeenCalled();
  });

  it("calls onSubmit when submitting form", () => {
    renderWithTheme(<RegisterForm {...defaultProps} />);
    const form = screen.getByRole("form");
    fireEvent.submit(form);
    expect(defaultProps.onSubmit).toHaveBeenCalled();
  });

  it("shows error message when error prop is passed", () => {
    renderWithTheme(
      <RegisterForm {...defaultProps} error="Something went wrong" />
    );
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("calls social login click handlers", () => {
    renderWithTheme(<RegisterForm {...defaultProps} />);
    fireEvent.click(screen.getByText("google-icon"));
    fireEvent.click(screen.getByText("github-icon"));
    fireEvent.click(screen.getByText("twitter-icon"));
    expect(googleClick).toHaveBeenCalledTimes(1);
    expect(githubClick).toHaveBeenCalledTimes(1);
    expect(twitterClick).toHaveBeenCalledTimes(1);
  });

  it("calls onToggleMode when login link is clicked", () => {
    renderWithTheme(<RegisterForm {...defaultProps} />);
    fireEvent.click(screen.getByText(/login/i));
    expect(defaultProps.onToggleMode).toHaveBeenCalled();
  });

  it("disables register button and shows loading text when isLoading is true", () => {
    renderWithTheme(<RegisterForm {...defaultProps} isLoading />);
    const button = screen.getByRole("button", { name: /please wait/i });
    expect(button).toBeDisabled();
  });

  it("applies no margin to first input field", () => {
    renderWithTheme(<RegisterForm {...defaultProps} />);
    const firstLabel = screen.getByText("Name").parentElement;
    expect(firstLabel).toHaveStyle({ marginTop: "0" });
  });
   it("renders with custom styling classes", () => {
      renderWithTheme(<RegisterForm {...defaultProps} />);
      const registerLink = screen.getByText("Login");
      expect(registerLink).toHaveClass("link");
  
      const accountText = screen.getByText("Already have an account?");
      expect(accountText).toHaveClass("text");
    });


});
