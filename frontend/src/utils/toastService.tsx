import toast from "react-hot-toast";
import { theme } from "../styles/theme";

const baseStyle = {
  borderRadius: "8px",
  padding: "12px 16px",
  color: theme.colors.textPrimary,
  background: theme.colors.background,
  fontFamily: "Poppins, sans-serif",
  fontSize: "14px",
};


export const ToastService = {
  success: (message: string) =>
    toast.success(message, {
      style: {
        ...baseStyle,
        border: `1px solid ${theme.colors.primary}`,
      },
      iconTheme: {
        primary: theme.colors.primary,
        secondary: theme.colors.background,
      },
    }),

  error: (message: string) =>
    toast.error(message, {
      style: {
        ...baseStyle,
        border: `1px solid red`,
        color: "red",
      },
      iconTheme: {
        primary: "red",
        secondary: theme.colors.background,
      },
    }),

  info: (message: string) =>
    toast(message, {
      style: {
        ...baseStyle,
        border: `1px solid ${theme.colors.accent}`,
      },
      iconTheme: {
        primary: theme.colors.accent,
        secondary: theme.colors.background,
      },
    }),
};
