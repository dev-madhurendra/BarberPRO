import React from "react";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import FeatureItem from "./index";
import { describe, it, expect } from "vitest";
import { theme } from "../../../styles/theme";

const renderWithTheme = (ui: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};

describe("FeatureItem Component", () => {
  it("should render the id inside the Circle", () => {
    renderWithTheme(<FeatureItem id={1} title="Test Title" desc="Test description" />);
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("should render the title and description texts", () => {
    renderWithTheme(<FeatureItem id={2} title="My Feature" desc="Feature description" />);
    expect(screen.getByText("My Feature")).toBeInTheDocument();
    expect(screen.getByText("Feature description")).toBeInTheDocument();
  });

  it("should apply theme color to Circle background", () => {
    renderWithTheme(<FeatureItem id={3} title="Theme Test" desc="Check background color" />);
    const circleElement = screen.getByText("3");
    expect(circleElement).toHaveStyle(`background: ${theme.colors.accent}`);
  });

  it("should render correct semantic heading for title", () => {
    renderWithTheme(<FeatureItem id={4} title="Heading Test" desc="Some desc" />);
    expect(screen.getByRole("heading", { name: "Heading Test" })).toBeInTheDocument();
  });
});
