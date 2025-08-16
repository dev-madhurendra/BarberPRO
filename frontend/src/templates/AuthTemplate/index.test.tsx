import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect,vi } from "vitest";
import { ThemeProvider } from "styled-components";
import AuthTemplate from "./index";
import { theme } from "../../styles/theme";

// Mock child components
vi.mock("../../components/atoms/Image", () => ({
  default: (props: { overlayContent?: React.ReactNode }) => (
    <div data-testid="image">{props.overlayContent}</div>
  ),
}));

vi.mock("../../components/molecules/HeroOverlayContent", () => ({
  default: () => <div data-testid="hero-overlay" />,
}));

vi.mock("../../components/atoms/ScissorsBackground", () => ({
  default: () => <div data-testid="scissors-bg" />,
}));

describe("AuthTemplate", () => {
  it("renders children and main components", () => {
    render(
      <ThemeProvider theme={theme}>
        <AuthTemplate>
          <div data-testid="child">Test Child</div>
        </AuthTemplate>
      </ThemeProvider>
    );

    // Check if child is rendered
    expect(screen.getByTestId("child")).toBeInTheDocument();

    // Check if Image is rendered
    expect(screen.getByTestId("image")).toBeInTheDocument();

    // Check if HeroOverlayContent inside Image is rendered
    expect(screen.getByTestId("hero-overlay")).toBeInTheDocument();

    // Check if ScissorsBackground is rendered
    expect(screen.getByTestId("scissors-bg")).toBeInTheDocument();
  });
});
