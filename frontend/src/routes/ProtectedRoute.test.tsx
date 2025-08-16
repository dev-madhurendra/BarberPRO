import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import ProtectedRoute from "./protectedRoutes";
import { To } from "react-router-dom";
// Mock react-router-dom's Navigate
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal<typeof import("react-router-dom")>();
  return {
    ...actual,
        Navigate: ({ to }: { to: To }) => <div data-testid="navigate">{typeof to === "string" ? to : JSON.stringify(to)}</div>,
  };
});

describe("ProtectedRoute", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("renders children if token exists and no role restriction", () => {
    localStorage.setItem("token", "abc123");

    render(
      <ProtectedRoute>
        <div data-testid="child">Protected Content</div>
      </ProtectedRoute>
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("redirects to / if no token", () => {
    render(
      <ProtectedRoute>
        <div>Should not render</div>
      </ProtectedRoute>
    );

    expect(screen.getByTestId("navigate")).toHaveTextContent("/");
  });

  it("renders children if token exists and role matches", () => {
    localStorage.setItem("token", "abc123");
    localStorage.setItem("role", "barber");

    render(
      <ProtectedRoute role="barber">
        <div data-testid="child">Barber Content</div>
      </ProtectedRoute>
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  it("redirects to / if role does not match", () => {
    localStorage.setItem("token", "abc123");
    localStorage.setItem("role", "customer");

    render(
      <ProtectedRoute role="barber">
        <div>Should not render</div>
      </ProtectedRoute>
    );

    expect(screen.getByTestId("navigate")).toHaveTextContent("/");
  });
});
