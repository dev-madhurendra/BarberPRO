import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import VerifyOtpForm from "./index";
import { theme } from "../../../styles/theme";
import { ThemeProvider } from "styled-components";

describe("VerifyOtpForm", () => {
  const setup = (propsOverride = {}) => {
    const props = {
      otp: "",
      isLoading: false,
      error: null,
      onChange: vi.fn(),
      onSubmit: vi.fn((e) => e.preventDefault()),
      ...propsOverride,
    };

    render(
      <ThemeProvider theme={theme}>
        <VerifyOtpForm {...props} />
      </ThemeProvider>
    );
    return props;
  };

  it("should renders six OTP inputs", () => {
    setup();
    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(6);
  });

  it("should renders given OTP value split into inputs", () => {
    setup({ otp: "1234" });
    const inputs = screen.getAllByRole("textbox");
    expect(inputs[0]).toHaveValue("1");
    expect(inputs[1]).toHaveValue("2");
    expect(inputs[2]).toHaveValue("3");
    expect(inputs[3]).toHaveValue("4");
    expect(inputs[4]).toHaveValue("");
    expect(inputs[5]).toHaveValue("");
  });

  it("should calls onChange when typing in an input", () => {
    const props = setup();
    const inputs = screen.getAllByRole("textbox");
    fireEvent.change(inputs[0], { target: { value: "5" } });
    expect(props.onChange).toHaveBeenCalledWith("5");
  });

  it("should moves focus to next input on typing", () => {
    setup();
    const inputs = screen.getAllByRole("textbox");
    inputs[0].focus();
    fireEvent.change(inputs[0], { target: { value: "9" } });
    expect(document.activeElement).toBe(inputs[1]);
  });

  it("should move focus to previous input on backspace if empty", () => {
    setup({ otp: "1" }); // second input is empty initially
    const inputs = screen.getAllByRole("textbox");
    inputs[1].focus();
    fireEvent.keyDown(inputs[1], { key: "Backspace" });
    expect(document.activeElement).toBe(inputs[0]);
  });

  it("should displays error message when error prop is passed", () => {
    setup({ error: "Invalid OTP" });
    expect(screen.getByText("Invalid OTP")).toBeInTheDocument();
  });

  it("should disables button when loading", () => {
    setup({ isLoading: true });
    const button = screen.getByRole("button", { name: /please wait/i });
    expect(button).toBeDisabled();
  });

  it("should calls onSubmit when form is submitted", () => {
    const props = setup();
    fireEvent.submit(screen.getByRole("form")); // role form won't exist automatically
    // Instead, directly submit the button:
    fireEvent.submit(
      screen.getByRole("button", { name: /verify otp/i }).closest("form")!
    );
    expect(props.onSubmit).toHaveBeenCalled();
  });
});
