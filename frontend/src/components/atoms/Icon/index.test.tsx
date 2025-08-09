import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Icon from "./index";
import { FaBeer } from "react-icons/fa";
import { ThemeProvider } from "styled-components";
import { describe, expect, it, vi } from "vitest";
import { DefaultTheme } from "styled-components/dist/types";
const mockTheme = {
  colors: {
    textPrimary: "black",
    accent: "blue",
  },
  transitions: {
    base: "all 0.3s ease",
  },
} as unknown as DefaultTheme;
// ✅ Utility to wrap components with ThemeProvider
const renderWithTheme = (iconUIComp: React.ReactNode) => {
  return render(<ThemeProvider theme={mockTheme}>{iconUIComp}</ThemeProvider>);
};

describe("Icon component", () => {
  it("should render the passed icon component", () => {
    renderWithTheme(<Icon icon={FaBeer} />);
    const svgElement = screen.getByTestId("styled-icon").querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });

  it("should apply size and color props to the SVG", () => {
    renderWithTheme(<Icon icon={FaBeer} size="32px" color="red" />);
    const svgElement = screen.getByTestId("styled-icon").querySelector("svg")!;
    expect(svgElement).toHaveStyle({
      width: "32px",
      height: "32px",
      color: "rgb(255, 0, 0)", 
    });
  });

  it("should call onClick when clicked", () => {
    const handleClick = vi.fn();
    renderWithTheme(<Icon icon={FaBeer} onClick={handleClick} />);
    fireEvent.click(screen.getByTestId("styled-icon"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should render without optional props using theme defaults", () => {
    renderWithTheme(<Icon icon={FaBeer} />);
    const svgElement = screen.getByTestId("styled-icon").querySelector("svg");
    expect(svgElement).toHaveStyle({
      width: "24px",
      height: "24px",
      color:  "rgb(0, 0, 0)",
    });
  });
});
