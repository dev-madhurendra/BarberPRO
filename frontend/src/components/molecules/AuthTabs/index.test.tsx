// AuthTabs/index.test.tsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import AuthTabs from "./index";
import { ThemeProvider } from "styled-components";
import { describe, it, expect, vi } from "vitest";
import { DefaultTheme } from "styled-components/dist/types";

// Mock theme similar to your Icon test
const mockTheme = {
  colors: {
    accent: "blue",
    textPrimary: "black",
  },
} as unknown as DefaultTheme;

const renderWithTheme = (ui: React.ReactNode) => {
  return render(<ThemeProvider theme={mockTheme}>{ui}</ThemeProvider>);
};

describe("AuthTabs component", () => {
  it("should render both tabs", () => {
    renderWithTheme(
      <AuthTabs activeRole="customer" onRoleChange={() => {}} />
    );
    expect(screen.getByText("Customer")).toBeInTheDocument();
    expect(screen.getByText("Barber")).toBeInTheDocument();
  });

  it("should highlight the active tab", () => {
    renderWithTheme(
      <AuthTabs activeRole="barber" onRoleChange={() => {}} />
    );
    const barberTab = screen.getByText("Barber");
    expect(barberTab).toHaveStyle(`background: ${mockTheme.colors.accent}`);
    expect(barberTab).toHaveStyle("color: #fff");
  });

  it("should call onRoleChange when clicking Customer", () => {
    const handleRoleChange = vi.fn();
    renderWithTheme(
      <AuthTabs activeRole="barber" onRoleChange={handleRoleChange} />
    );

    fireEvent.click(screen.getByText("Customer"));
    expect(handleRoleChange).toHaveBeenCalledWith("customer");
    expect(handleRoleChange).toHaveBeenCalledTimes(1);
  });

  it("should call onRoleChange when clicking Barber", () => {
    const handleRoleChange = vi.fn();
    renderWithTheme(
      <AuthTabs activeRole="customer" onRoleChange={handleRoleChange} />
    );

    fireEvent.click(screen.getByText("Barber"));
    expect(handleRoleChange).toHaveBeenCalledWith("barber");
    expect(handleRoleChange).toHaveBeenCalledTimes(1);
  });
});
