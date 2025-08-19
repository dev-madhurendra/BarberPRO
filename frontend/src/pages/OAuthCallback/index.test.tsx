import React from "react";
import { render, waitFor } from "@testing-library/react";
import OAuthCallback from "./index";
import { vi, describe, expect, beforeEach, it, MockedFunction } from "vitest";
import { getCurrentUser, updateRole } from "../../api/auth";
import { AxiosResponse } from "axios";
import * as ReactRouterDom from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "../../styles/theme";
// Mock dependencies
const mockNavigate = vi.fn();

// inside your vi.mock
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof ReactRouterDom>(
    "react-router-dom"
  );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../../api/auth", () => ({
  getCurrentUser: vi.fn(),
  updateRole: vi.fn(),
}));

vi.mock("../../components/atoms/Loader", () => ({
  default: ({ loading }: { loading: boolean }) => (
    <div data-testid="loader">{loading ? "Loading..." : "Done"}</div>
  ),
}));
const mockResponse: AxiosResponse = {
  data: { data: { role: "barber" }, barberProfileUpdated: false },
  status: 200,
  statusText: "OK",
  headers: {},
  config: {} as AxiosResponse["config"],
};
const mockResponseCustomer: AxiosResponse = {
  data: { data: { role: "customer" }, barberProfileUpdated: false },
  status: 200,
  statusText: "OK",
  headers: {},
  config: {} as AxiosResponse["config"],
};


const renderWithProviders = (ui: React.ReactNode) =>
  render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>{ui}</ThemeProvider>
    </BrowserRouter>
  );
describe("OAuthCallback", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
    localStorage.clear();
  });
  it("redirects to / if no token in URL", async () => {
    Object.defineProperty(window, "location", {
      value: { search: "" },
      writable: true,
    });

    renderWithProviders(<OAuthCallback />);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("saves token and redirects customer to dashboard", async () => {
    Object.defineProperty(window, "location", {
      value: { search: "?token=testtoken" },
      writable: true,
    });

    localStorage.setItem("role", "customer");

    (
      getCurrentUser as MockedFunction<typeof getCurrentUser>
    ).mockResolvedValueOnce(mockResponseCustomer);

    renderWithProviders(<OAuthCallback />);

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBe("testtoken");
      expect(mockNavigate).toHaveBeenCalledWith("/customer/dashboard");
    });
  });

  it("updates role if backend returns not_defined and redirects barber correctly", async () => {
    Object.defineProperty(window, "location", {
      value: { search: "?token=testtoken" },
      writable: true,
    });

    localStorage.setItem("role", "barber");

    (getCurrentUser as MockedFunction<typeof getCurrentUser>)
      .mockResolvedValueOnce({
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as AxiosResponse["config"],
        data: { data: { role: "not_defined" }, isBarberProfileUpdated: false },
      })
      .mockResolvedValueOnce({
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as AxiosResponse["config"],
        data: { data: { role: "barber" }, isBarberProfileUpdated: true },
      });

    (updateRole as MockedFunction<typeof updateRole>).mockResolvedValue({
      data: { role: "barber" },
      status: 200,
      statusText: "OK",
      headers: {},
      config: {} as AxiosResponse["config"],
    });

    renderWithProviders(<OAuthCallback />);

    await waitFor(() => {
      expect(updateRole).toHaveBeenCalledWith("barber");
      expect(mockNavigate).toHaveBeenCalledWith("/barber/setup-profile");
    });
  });

  it("renders loader while loading", () => {
    // 🟢 Make getCurrentUser return a pending Promise so it never resolves
    (
      getCurrentUser as MockedFunction<typeof getCurrentUser>
    ).mockImplementation(() => new Promise(() => {}));

    renderWithProviders(<OAuthCallback />);

    expect(document.querySelector("[data-testid='loader']")?.textContent).toBe(
      "Loading..."
    );
  });

  it("redirects to / on API error", async () => {
    Object.defineProperty(window, "location", {
      value: { search: "?token=testtoken" },
      writable: true,
    });
    (getCurrentUser as MockedFunction<typeof getCurrentUser>).mockRejectedValue(
      new Error("API error")
    );

    renderWithProviders(<OAuthCallback />);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("redirects to / if role is unknown", async () => {
    Object.defineProperty(window, "location", {
      value: { search: "?token=testtoken" },
      writable: true,
    });

    localStorage.setItem("role", "unknown");
    (
      getCurrentUser as MockedFunction<typeof getCurrentUser>
    ).mockResolvedValueOnce({
      status: 200,
      statusText: "OK",
      headers: {},
      config: {} as AxiosResponse["config"],
      data: { data: { role: "unknown" }, isBarberProfileUpdated: false },
    });

    // (getCurrentUser as vi.Mock)
    // .mockResolvedValue({
    //   data: { data: { role: "unknown" }, isBarberProfileUpdated: false },
    // });

    renderWithProviders(<OAuthCallback />);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("redirects barber to setup-profile if profile is not updated", async () => {
    Object.defineProperty(window, "location", {
      value: { search: "?token=testtoken" },
      writable: true,
    });

    localStorage.setItem("role", "barber");

    (
      getCurrentUser as MockedFunction<typeof getCurrentUser>
    ).mockResolvedValueOnce(mockResponse);
    renderWithProviders(<OAuthCallback />);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/barber/setup-profile");
    });
  });
  it("redirects barber to dashboard if profile is updated", async () => {
    Object.defineProperty(window, "location", {
      value: { search: "?token=testtoken" },
      writable: true,
    });

    localStorage.setItem("role", "barber");

    const mockResponseBarber: AxiosResponse = {
      data: {
        data: {
          role: "barber",
          barberProfileUpdated: true,
        },
      },
      status: 200,
      statusText: "OK",
      headers: {},
      config: {} as AxiosResponse["config"],
    };

    (
      getCurrentUser as MockedFunction<typeof getCurrentUser>
    ).mockResolvedValueOnce(mockResponseBarber);

    renderWithProviders(<OAuthCallback />);

    await waitFor(() =>
      expect(mockNavigate).toHaveBeenCalledWith("/barber/dashboard")
    );
  });
});
