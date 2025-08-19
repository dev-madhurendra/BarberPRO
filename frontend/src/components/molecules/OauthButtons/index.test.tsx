import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../styles/theme";
import SocialLoginButtons from ".";
import { SocialButtons } from "./index.styles";

const renderWithTheme = (ui: React.ReactNode) =>
  render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);

describe("SocialLoginButtons Component", () => {
  it("should renders the default title", () => {
    renderWithTheme(<SocialLoginButtons />);
    expect(screen.getByText("Or continue with")).toBeInTheDocument();
  });

  it("should renders custom title when provided", () => {
    renderWithTheme(<SocialLoginButtons title="Sign in using" />);
    expect(screen.getByText("Sign in using")).toBeInTheDocument();
  });

  it("should renders three social login buttons", () => {
    renderWithTheme(<SocialLoginButtons />);
    const buttons = screen.getAllByRole("button");
    // There are 3 social buttons
    expect(buttons).toHaveLength(3);
  });

  it("should calls correct click handlers for each button", () => {
    const handleGoogle = vi.fn();
    const handleGithub = vi.fn();
    const handleTwitter = vi.fn();

    renderWithTheme(
      <SocialLoginButtons
        onGoogleClick={handleGoogle}
        onGithubClick={handleGithub}
        onTwitterClick={handleTwitter}
      />
    );

    const buttons = screen.getAllByRole("button");

    fireEvent.click(buttons[0]); // Twitter
    fireEvent.click(buttons[1]); // Github
    fireEvent.click(buttons[2]); // Google

    expect(handleTwitter).toHaveBeenCalledTimes(1);
    expect(handleGithub).toHaveBeenCalledTimes(1);
    expect(handleGoogle).toHaveBeenCalledTimes(1);
  });
  it("Divider should have correct styles", () => {
       renderWithTheme(<SocialLoginButtons title="Test Divider" />);
    const divider = screen.getByText("Test Divider");

    expect(divider).toHaveStyle("display: flex");
    expect(divider).toHaveStyle("align-items: center");
    expect(divider).toHaveStyle("margin: 20px 0");
    expect(divider).toHaveStyle("color: rgb(107, 114, 128)");
    expect(divider).toHaveStyle("font-size: 14px");
  });

  it("SocialButtons container should have flex styles", () => {
    renderWithTheme(<SocialButtons><button>Btn</button></SocialButtons>);
    const container = screen.getByRole("button").parentElement;

    expect(container).toHaveStyle("display: flex");
    expect(container).toHaveStyle("justify-content: center");
    expect(container).toHaveStyle("gap: 12px");
    expect(container).toHaveStyle("margin-top: 12px");
  });

  it("SocialButtons buttons should have correct base styles", () => {
    renderWithTheme(<SocialButtons><button>Btn</button></SocialButtons>);
    const button = screen.getByRole("button");

    expect(button).toHaveStyle("border: 1px solid #ccc");
    expect(button).toHaveStyle("border-radius: 8px");
    expect(button).toHaveStyle("background: white");
    expect(button).toHaveStyle("width: 44px");
    expect(button).toHaveStyle("height: 44px");
  });
});
