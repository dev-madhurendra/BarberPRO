import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, beforeEach, expect } from "vitest";
import NotFoundPage from "./index";
import { ThemeProvider } from "styled-components";
import { theme } from "../../styles/theme";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("NotFoundPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders 404 text and tagline", () => {
    render(<ThemeProvider theme={theme}><NotFoundPage /></ThemeProvider>);

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(
      screen.getByText(
        /Oops! This page got a clean shave and vanished from our barbershop./i
      )
    ).toBeInTheDocument();
    expect(screen.getByText(/✂️/)).toBeInTheDocument();
  });

  it("renders the button and triggers navigation on click", () => {
    render(<ThemeProvider theme={theme}><NotFoundPage /></ThemeProvider>);

    const button = screen.getByRole("button", { name: /return to dashboard/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
