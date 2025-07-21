import axios from "axios";
import { API_BASE } from "../utils/constants";
import { BarberProfileRequest } from "../utils/requestsInterface";

export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  return await axios.post(`${API_BASE}/auth/register`, data);
};

export const loginUser = async (data: { email: string; password: string }) => {
  return await axios.post(`${API_BASE}/auth/login`, data);
};

export const sendOtp = async (email: string) => {
  return await axios.post(
    `${API_BASE}/otp/send?medium=email&destination=${email}`
  );
};

export const verifyOtp = async (email: string, otp: string) => {
  return await axios.post(
    `${API_BASE}/otp/verify?medium=email&destination=${email}&otp=${otp}`
  );
};

export const resetPassword = async (data: {
  email: string;
  isVerified: boolean;
  newPassword: string;
}) => {
  return await axios.post(`${API_BASE}/auth/reset-password`, data);
};

export const saveBarberProfile = async (data: BarberProfileRequest) => {
  const token = localStorage.getItem("token");
  return axios.post(`${API_BASE}/barbers`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
