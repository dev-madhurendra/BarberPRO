import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import ResetPasswordForm from "./index";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../styles/theme";

describe("ResetPasswordForm Component", () => {
  const setup = (propsOverride = {}) => {
    const defaultProps = {
      newPassword: "",
      confirmNewPassword: "",
      isLoading: false,
      onChange: vi.fn(),
      onSubmit: vi.fn((e) => e.preventDefault()),
    };

    const props = { ...defaultProps, ...propsOverride };
    render(
        <ThemeProvider theme={theme}>
    <ResetPasswordForm {...props}  /></ThemeProvider>);
    return props;
  };

  it("should renders both password fields", () => {
    setup();

    expect(
      screen.getByPlaceholderText(/Enter new password/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Confirm new password/i)
    ).toBeInTheDocument();
  });

  it("should calls onChange when typing in inputs", () => {
    const props = setup();

    fireEvent.change(screen.getByPlaceholderText(/Enter new password/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByPlaceholderText(/Confirm new password/i), {
      target: { value: "password123" },
    });

    expect(props.onChange).toHaveBeenCalledTimes(2);
  });

  it("should calls onSubmit when form is submitted", () => {
    const props = setup();
    fireEvent.submit(screen.getByRole("form"));

    expect(props.onSubmit).toHaveBeenCalledTimes(1);
  });

 

  it("should disables button when loading", () => {
    setup({ isLoading: true });

    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByText("Resetting Password...")).toBeInTheDocument();

  });
});
