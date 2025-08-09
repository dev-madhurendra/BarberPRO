import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { Logo } from "./index";
import { theme } from "../../../styles/theme";
import { ThemeProvider } from "styled-components";

const renderWithTheme = (iconUIComp: React.ReactNode) => {
    return render(<ThemeProvider theme={theme}>{iconUIComp}</ThemeProvider>);
};

describe("Logo component", () => {
  it("should render the scissor icon", () => {
    renderWithTheme(<Logo />);
    const svg = screen.getByTestId("scissor-icon");
    expect(svg).toBeInTheDocument();
  });

  it("should render the text 'Barber'", () => {
    renderWithTheme(<Logo />);
    expect(screen.getByText("Barber")).toBeInTheDocument();
  });

  it("should render the Typography with text 'PRO'", () => {
    renderWithTheme(<Logo />);
    expect(screen.getByText("PRO")).toBeInTheDocument();
  });

  it("should render the Typography with correct accent color", () => {
    renderWithTheme(<Logo />);
    const proElement = screen.getByText("PRO");
    expect(proElement).toHaveStyle(`color: ${theme.colors.accent}`);
  });

  it("should apply correct styles to the svg icon", () => {
    renderWithTheme(<Logo />);
    const svg = screen.getByTestId("scissor-icon");
    expect(svg).toHaveStyle(`font-size: 2rem`);
    expect(svg).toHaveStyle(`color: ${theme.colors.accent}`);
  });
});
