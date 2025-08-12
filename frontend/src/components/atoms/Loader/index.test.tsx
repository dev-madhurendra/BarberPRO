import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import OAuthLoader from "./index";
import { ThemeProvider } from "styled-components";
import  {theme } from "../../../styles/theme";
import { LOADER_TEST_ID } from "../../../utils/constants";

const renderWithTheme = (iconUIComp: React.ReactNode) => {
  return render(<ThemeProvider theme={theme}>{iconUIComp}</ThemeProvider>);
};

describe("OAuthLoader Component", () => {
  it("should renders loading message by default", () => {
    renderWithTheme(<OAuthLoader />);
    expect(
      screen.getByText("Authenticating with Google...")
    ).toBeInTheDocument();
  });

  it("should renders redirecting message when loading is false", () => {
    renderWithTheme(<OAuthLoader loading={false} />);
    expect(screen.getByText("Redirecting...")).toBeInTheDocument();
  });

  it("should applies theme-based styles correctly", () => {
    renderWithTheme(<OAuthLoader />);
    const wrapper = screen.getByText("Authenticating with Google...").parentElement;
    const message = screen.getByText("Authenticating with Google...")
    expect(message).toHaveStyle(
      `font-size: ${theme.fontSizes.lg}`
    )
    expect(wrapper).toHaveStyle(
      `background-color: ${theme.colors.background}`
    );
    expect(wrapper).toHaveStyle(
      `color: ${theme.colors.textPrimary}`
    );
    expect(wrapper).toHaveStyle(
      `padding: ${theme.spacing.lg}`
    );
  });

  it("should renders spinner with correct border color", () => {
    renderWithTheme(<OAuthLoader />);
    const spinner = screen.getByTestId(LOADER_TEST_ID);
    expect(spinner).toHaveStyle(
      `border: 4px solid ${theme.colors.primary}`
    );
  });
});
