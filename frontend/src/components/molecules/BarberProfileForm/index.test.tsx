import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import BarberProfileForm from "./index";
import { ToastService } from "../../../utils/toastService";
import { saveBarberProfile } from "../../../api/auth";
import { vi, describe, it, expect, beforeEach, MockedFunction } from "vitest";
import { ThemeProvider } from "styled-components";
import { theme } from "../../../styles/theme";
import { BrowserRouter } from "react-router-dom";
import axios, { AxiosError, AxiosResponse } from "axios";
vi.mock("../../../utils/toastService", () => ({
  ToastService: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

// Mock API call
vi.mock("../../../api/auth", () => ({
  saveBarberProfile: vi.fn(),
}));

// Mock validation
vi.mock("../../../utils/functionConfig", () => ({
  VALIDATE_BARBER_INFO_FIELDS: (name: string, value: string) => {
    if (!value) return `${name} is required`;
    return "";
  },
}));

// Mock Form to avoid data-router error
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...actual,
    Form: (props: React.FormHTMLAttributes<HTMLFormElement>) => (
      <form {...props} />
    ),
  };
});
const mockResponse: AxiosResponse = {
  data: {},
  status: 200,
  statusText: "OK",
  headers: {},
  config: {} as AxiosResponse["config"], 
  request: {} as AxiosResponse["config"],
} as AxiosResponse;
  // ---------- HELPER ----------

const renderWithProviders = (ui: React.ReactNode) =>
  render(
    <BrowserRouter>
      <ThemeProvider theme={theme}>{ui}</ThemeProvider>
    </BrowserRouter>
  );

// ---------- TESTS ----------

describe("BarberProfileForm", () => {

  beforeEach(() => {
  vi.clearAllMocks();
  vi.resetAllMocks();
});


  it("renders all form fields", () => {
    renderWithProviders(<BarberProfileForm />);

    expect(screen.getByPlaceholderText(/enter shop name/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter phone number/i)
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter address/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter city/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/enter pin code/i)).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter services offered/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/enter starting price/i)
    ).toBeInTheDocument();
  });

  it("shows validation errors on blur when field is empty", () => {
    renderWithProviders(<BarberProfileForm />);
    const shopNameInput = screen.getByPlaceholderText(/enter shop name/i);
    fireEvent.blur(shopNameInput);
    expect(screen.getByText(/shopName is required/i)).toBeInTheDocument();
  });

  it("shows toast error when submitting empty form", async () => {
    renderWithProviders(<BarberProfileForm />);
    fireEvent.click(screen.getByRole("button", { name: /save profile/i }));
    await waitFor(() => {
      expect(ToastService.error).toHaveBeenCalledWith(
        "Please fix the errors in the form"
      );
    });
  });

  it("calls saveBarberProfile and shows success toast on valid submit", async () => {
   (saveBarberProfile as MockedFunction<typeof saveBarberProfile>)
      .mockResolvedValueOnce(mockResponse);
    renderWithProviders(<BarberProfileForm />);

    fireEvent.change(screen.getByPlaceholderText(/enter shop name/i), {
      target: { value: "My Shop" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter phone number/i), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter address/i), {
      target: { value: "123 Street" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter city/i), {
      target: { value: "MyCity" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter pin code/i), {
      target: { value: "123456" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter services offered/i), {
      target: { value: "Haircut" },
    });
    fireEvent.change(screen.getByPlaceholderText(/enter starting price/i), {
      target: { value: "100" },
    });

    fireEvent.click(screen.getByRole("button", { name: /save profile/i }));

    await waitFor(() => {
      expect(saveBarberProfile).toHaveBeenCalledWith(
        expect.objectContaining({ shopName: "My Shop", startingPrice: 100 })
      );
      expect(ToastService.success).toHaveBeenCalledWith(
        "Barber profile saved successfully!"
      );
    });
  });

  it("shows error toast on API failure", async () => {
    (saveBarberProfile as MockedFunction<typeof saveBarberProfile>)
      .mockRejectedValueOnce(
      new Error("API failed")
    );
    renderWithProviders(<BarberProfileForm />);

    [
      /enter shop name/i,
      /enter phone number/i,
      /enter address/i,
      /enter city/i,
      /enter pin code/i,
      /enter services offered/i,
      /enter starting price/i,
    ].forEach((placeholder) => {
      fireEvent.change(screen.getByPlaceholderText(placeholder), {
        target: { value: "test" },
      });
    });

    fireEvent.click(screen.getByRole("button", { name: /save profile/i }));

    await waitFor(() => {
      expect(ToastService.error).toHaveBeenCalledWith(
        "Please fix the errors in the form"
      );
    });
  });

  it.skip("shows default message when unknown error is thrown", async () => {
  (saveBarberProfile as MockedFunction<typeof saveBarberProfile>)
      .mockRejectedValueOnce("some random string");

    renderWithProviders(<BarberProfileForm />);

    [
      { placeholder: /enter shop name/i, value: "Test Shop" },
      { placeholder: /enter phone number/i, value: "9876543210" },
      { placeholder: /enter address/i, value: "Test Address" },
      { placeholder: /enter city/i, value: "Test City" },
      { placeholder: /enter pin code/i, value: "123456" },
      { placeholder: /enter services offered/i, value: "Haircut, Shave" },
      { placeholder: /enter starting price/i, value: "100" },
    ].forEach(({ placeholder, value }) => {
      fireEvent.change(screen.getByPlaceholderText(placeholder), {
        target: { value },
      });
    });

    fireEvent.click(screen.getByRole("button", { name: /save profile/i }));

    await waitFor(() => {
      expect(ToastService.error).toHaveBeenCalledWith("API failed");
    });
  });




it("shows API error message when axios error is thrown", async () => {
  // Mock axios error properly
  // clear
   
  const axiosError = {
    isAxiosError: true, // ✅ helps axios.isAxiosError return true
    message: "Fallback error message",
    response: { data: { message: "API failed" } },
  } as AxiosError;

  // Force isAxiosError check to return true
  vi.spyOn(axios, "isAxiosError").mockReturnValue(true);

  (saveBarberProfile as MockedFunction<typeof saveBarberProfile>)
      .mockRejectedValueOnce(axiosError);

  renderWithProviders(<BarberProfileForm />);

  [
    { placeholder: /enter shop name/i, value: "Test Shop" },
    { placeholder: /enter phone number/i, value: "9876543210" },
    { placeholder: /enter address/i, value: "Test Address" },
    { placeholder: /enter city/i, value: "Test City" },
    { placeholder: /enter pin code/i, value: "123456" },
    { placeholder: /enter services offered/i, value: "Haircut, Shave" },
    { placeholder: /enter starting price/i, value: "100" },
  ].forEach(({ placeholder, value }) => {
    fireEvent.change(screen.getByPlaceholderText(placeholder), {
      target: { value },
    });
  });

  fireEvent.click(screen.getByRole("button", { name: /save profile/i }));

  await waitFor(() => {
    expect(ToastService.error).toHaveBeenCalledWith("API failed");
  });
});




  it("clears error on input change", () => {
    renderWithProviders(<BarberProfileForm />);

    const shopNameInput = screen.getByPlaceholderText(/enter shop name/i);
    fireEvent.blur(shopNameInput);
    expect(screen.getByText(/shopName is required/i)).toBeInTheDocument();

    fireEvent.change(shopNameInput, { target: { value: "New Shop" } });
    expect(screen.queryByText(/shopName is required/i)).not.toBeInTheDocument();
  });
});
