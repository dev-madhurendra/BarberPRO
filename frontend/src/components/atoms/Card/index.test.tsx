import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import Card from "./index";
import { theme } from "../../../styles/theme";
import { ThemeProvider } from "styled-components";
import { DefaultTheme } from "styled-components/dist/types";

const mockTheme = {
  colors: {
    textPrimary: "red",
    accent: "blue",
  },
  transitions: {
    base: "all 0.3s ease",
  },
} as unknown as DefaultTheme;
const renderWithTheme = (iconUIComp: React.ReactNode) => {
  return render(<ThemeProvider theme={mockTheme}>{iconUIComp}</ThemeProvider>);
};

describe("Card Component", () => {
  beforeEach(() => {
    (theme.colors.backgroundAlt ) = "#ededed";
  });

  it("should renders children correctly", () => {
    renderWithTheme(<Card>Test Content</Card>);
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("should applies default theme background color", () => {
    renderWithTheme(<Card>Test</Card>);
    const cardElement = screen.getByText("Test");
    expect(cardElement).toHaveStyle(`background-color: ${theme.colors.backgroundAlt}`);
  });

  it("should applies fallback background color when theme.colors.backgroundAlt is missing", () => {
    (theme.colors.backgroundAlt as unknown) = undefined;
    renderWithTheme(<Card>Fallback Test</Card>);
    const cardElement = screen.getByText("Fallback Test");
    expect(cardElement).toHaveStyle("background-color: #f9f9f9");
  });

  it("should applies custom style overrides", () => {
    renderWithTheme(
      <Card style={{ backgroundColor: "red", padding: "2rem" }}>
        Custom Style
      </Card>
    );
    const cardElement = screen.getByText("Custom Style");
    expect(cardElement).toHaveStyle("background-color:  rgb(255, 0, 0)");

    expect(cardElement).toHaveStyle("padding: 2rem");
  });
});
