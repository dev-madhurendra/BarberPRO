import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      primary: string;       // Vibrant Gold (Buttons, highlights)
      secondary: string;     // Dark Gray (Text headings)
      background: string;    // Main background
      backgroundAlt: string; // Light background sections
      highlight: string;
      textPrimary: string;   // Dark text
      textSecondary: string; // Muted text
      accent: string;        // Orange accent (CTA hover)
      success: string;       // Green for success
      error: string;         // Red for errors
      border: string;        // Border color for inputs
      inputBg: string;       // Input background
      disable: string;
    };

    fonts: {
      heading: string;
      body: string;
    };

    fontSizes: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };

    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };

    borderRadius: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };

    shadows: {
      sm: string;
      md: string;
      lg: string;
    };

    transitions: {
      base: string;
    };
  }
}
