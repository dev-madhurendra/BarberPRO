import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import {vi,it,expect,describe} from 'vitest';
import ForgotPasswordForm from "./index";
import { theme } from "../../../styles/theme";


const renderWithTheme = (ui: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe("ForgotPasswordForm", () => {
  it("renders input with given email value", () => {
    renderWithTheme(
      <ForgotPasswordForm
        email="test@example.com"
        isLoading={false}
        onChange={vi.fn()}
        onSubmit={vi.fn()}
        onBack={vi.fn()}
      />
    );

    const input = screen.getByPlaceholderText("Enter your email") as HTMLInputElement;
    expect(input.value).toBe("test@example.com");
  });

  it("calls onChange when typing in input", () => {
    const handleChange = vi.fn();
    renderWithTheme(
      <ForgotPasswordForm
        email=""
        isLoading={false}
        onChange={handleChange}
        onSubmit={vi.fn()}
        onBack={vi.fn()}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Enter your email"), {
      target: { value: "new@example.com" },
    });
    expect(handleChange).toHaveBeenCalledTimes(1);
    
  });

  it("calls onSubmit when form is submitted", () => {
    const handleSubmit = vi.fn((e) => e.preventDefault());
    renderWithTheme(
      <ForgotPasswordForm
        email="user@example.com"
        isLoading={false}
        onChange={vi.fn()}
        onSubmit={handleSubmit}
        onBack={vi.fn()}
      />
    );

   fireEvent.submit(screen.getByRole("form", { name: /forgot password form/i }));
    expect(handleSubmit).toHaveBeenCalledTimes(1);
  });

  it("shows 'Sending OTP...' when loading", () => {
    renderWithTheme(
      <ForgotPasswordForm
        email=""
        isLoading={true}
        onChange={vi.fn()}
        onSubmit={vi.fn()}
        onBack={vi.fn()}
      />
    );

    expect(screen.getByText("Sending OTP...")).toBeInTheDocument();
  });

  it("calls onBack when back button is clicked", () => {
    const handleBack = vi.fn();
    renderWithTheme(
      <ForgotPasswordForm
        email=""
        isLoading={false}
        onChange={vi.fn()}
        onSubmit={vi.fn()}
        onBack={handleBack}
      />
    );

    fireEvent.click(screen.getByText("← Back to Login"));
    expect(handleBack).toHaveBeenCalledTimes(1);
  });
});
