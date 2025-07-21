import { DefaultTheme } from "styled-components/dist/types";

export const theme: DefaultTheme = {
  colors: {
    primary: "#F7C948",       // Vibrant Gold (Buttons, highlights)
    secondary: "#1F2937",     // Dark Gray (Text headings)
    background: "#FFFFFF",    // Main background
    backgroundAlt: "#F9FAFB", // Light background sections\
    highlight: "#F2C76E",
    textPrimary: "#111827",   // Dark text
    textSecondary: "#6B7280", // Muted text
    accent: "#F59E0B",        // Orange accent (CTA hover)
    success: "#10B981",       // Green for success
    error: "#EF4444",         // Red for errors
    border: "#E5E7EB",        // Border color for inputs
    inputBg: "#F3F4F6",       // Input background
    disable: "#C9C6C1",   
  },

  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Inter', sans-serif",
  },

  fontSizes: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "24px",
    xxl: "32px",
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
  },

  borderRadius: {
    sm: "6px",
    md: "10px",
    lg: "16px",
    xl: "24px",
  },

  shadows: {
    sm: "0px 1px 3px rgba(0,0,0,0.12)",
    md: "0px 4px 6px rgba(0,0,0,0.1)",
    lg: "0px 10px 20px rgba(0,0,0,0.15)",
  },

  transitions: {
    base: "all 0.3s ease",
  },
};

