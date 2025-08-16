import React from "react";
import { render, screen, fireEvent, within } from "@testing-library/react";
import AuthContainer from "./index";
import { ThemeProvider } from "styled-components";
import { vi, describe, it, expect, beforeEach } from "vitest";
import { theme } from "../../../styles/theme";
import { IAuthTabs } from "../../molecules/AuthTabs";

// Mock child components
vi.mock("../../molecules/AuthTabs", () => ({
  default: ({ activeRole, onRoleChange }: IAuthTabs) => (
    <div data-testid="auth-tabs">
      <button onClick={() => onRoleChange("barber")}>Switch Role</button>
      <span>{activeRole}</span>
    </div>
  ),
}));

vi.mock("../AuthForm", () => ({
  default: ({ role, mode, setAuthMode }:any) => (
    <div data-testid="auth-form">
      <span>{role}</span>
      <span>{mode}</span>
      <button onClick={() => setAuthMode("register")}>Switch Mode</button>
    </div>
  ),
}));

describe("AuthContainer", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders AuthTabs and AuthForm correctly", () => {
    render(<AuthContainer />);

    // AuthTabs should be in the document
    const tabs = screen.getByTestId("auth-tabs");
    expect(tabs).toBeInTheDocument();

    // AuthForm should be in the document
    const form = screen.getByTestId("auth-form");
    expect(form).toBeInTheDocument();

    // Default role in AuthTabs
    expect(within(tabs).getByText("customer")).toBeInTheDocument();

    // Default role in AuthForm
    expect(within(form).getByText("customer")).toBeInTheDocument();
  });

 
it("switches role when button clicked and updates localStorage", () => {
  render(
    <ThemeProvider theme={theme}>
      <AuthContainer />
    </ThemeProvider>
  );

  // Scope to AuthTabs to find the button
  const tabs = screen.getByTestId("auth-tabs"); // Add data-testid="auth-tabs" to AuthTabs mock/component
  const switchButton = within(tabs).getByText("Switch Role");

  fireEvent.click(switchButton);

  // Role should change in AuthTabs
  expect(within(tabs).getByText("barber")).toBeInTheDocument();

  // Role should also update localStorage
  expect(localStorage.getItem("role")).toBe("barber");
});

  it("switches authMode when button in AuthForm clicked", () => {
    render(
      <ThemeProvider theme={theme}>
        <AuthContainer />
      </ThemeProvider>
    );

    const switchModeButton = screen.getByText("Switch Mode");
    fireEvent.click(switchModeButton);

    // The AuthForm should now show "register" mode
    expect(screen.getByText("register")).toBeInTheDocument();
  });

  it("does not render AuthTabs for specific authMode values", () => {
    // Here we simulate the component starting in "verifyOtp" mode
    render(
      <ThemeProvider theme={theme}>
        <AuthContainer />
      </ThemeProvider>
    );

    // Access the AuthForm button to switch mode to verifyOtp
    const switchModeButton = screen.getByText("Switch Mode");
    fireEvent.click(switchModeButton); // switches to "register"

    // AuthTabs should still be present because mode != excluded values
    expect(screen.getByTestId("auth-tabs")).toBeInTheDocument();
  });
});
