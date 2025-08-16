import React from "react";
import { render, waitFor } from "@testing-library/react";
import OAuthCallback from "./index";
import { vi ,describe,expect, beforeEach,it} from "vitest";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, updateRole } from "../../api/auth";

// Mock dependencies
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
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

describe("OAuthCallback", () => {
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useNavigate as vi.Mock).mockReturnValue(mockNavigate);
    localStorage.clear();
  });

  it("redirects to / if no token in URL", async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.location = { ...window.location, search: "" };

    render(<OAuthCallback />);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("saves token and redirects customer to dashboard", async () => {
    delete window.location;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    window.location = { search: "?token=testtoken" };

    localStorage.setItem("role", "customer");

    (getCurrentUser as vi.Mock).mockResolvedValue({
      data: { data: { role: "customer" }, isBarberProfileUpdated: false },
    });

    render(<OAuthCallback />);

    await waitFor(() => {
      expect(localStorage.getItem("token")).toBe("testtoken");
      expect(mockNavigate).toHaveBeenCalledWith("/customer/dashboard");
    });
  });

  it("updates role if backend returns not_defined and redirects barber correctly", async () => {
    delete window.location;
    // @ts-ignore
    window.location = { search: "?token=testtoken" };

    localStorage.setItem("role", "barber");

    (getCurrentUser as vi.Mock)
      .mockResolvedValueOnce({
        data: { data: { role: "not_defined" }, isBarberProfileUpdated: false },
      })
      .mockResolvedValueOnce({
        data: { data: { role: "barber" }, isBarberProfileUpdated: true },
      });

    (updateRole as vi.Mock).mockResolvedValue({});

    render(<OAuthCallback />);

    await waitFor(() => {
      expect(updateRole).toHaveBeenCalledWith("barber");
      expect(mockNavigate).toHaveBeenCalledWith("/barber/setup-profile");
    });
  });

  it("renders loader while loading", () => {
    render(<OAuthCallback />);
    expect(document.querySelector("[data-testid='loader']")?.textContent).toBe(
      "Loading..."
    );
  });

  it("redirects to / on API error", async () => {
    delete window.location;
    // @ts-ignore
    window.location = { search: "?token=testtoken" };

    (getCurrentUser as vi.Mock).mockRejectedValue(new Error("API error"));

    render(<OAuthCallback />);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("redirects to / if role is unknown", async () => {
    delete window.location;
    // @ts-ignore
    window.location = { search: "?token=testtoken" };

    localStorage.setItem("role", "unknown");

    (getCurrentUser as vi.Mock).mockResolvedValue({
      data: { data: { role: "unknown" }, isBarberProfileUpdated: false },
    });

    render(<OAuthCallback />);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/");
    });
  });

  it("redirects barber to setup-profile if profile is not updated", async () => {
    delete window.location;
    // @ts-ignore
    window.location = { search: "?token=testtoken" };

    localStorage.setItem("role", "barber");

    (getCurrentUser as vi.Mock).mockResolvedValue({
      data: { data: { role: "barber" }, isBarberProfileUpdated: false },
    });

    render(<OAuthCallback />);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/barber/setup-profile");
    });
  });
});
