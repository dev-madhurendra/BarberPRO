import { FaGithub } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";

export const LOGIN_FORM_INPUT_FIELDS = (email: string, password: string) => [
  {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "your@email.com",
    value: email,
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "********",
    value: password,
  },
];

export const SOCIAL_LOGIN_BUTTONS = (
  onGithubClick?: () => void,
  onTwitterClick?: () => void,
  onGoogleClick?: (email: string, name: string) => void
) => [
  { icon: <FaGithub size={20} />, onClick: onGithubClick, className: "github" },
  {
    icon: <BsTwitterX size={20} />,
    onClick: onTwitterClick,
    className: "twitter",
  },
  {
    icon: <FcGoogle size={20} />,
    onClick: () => {
      if (onGoogleClick) {
        onGoogleClick("madhurendra.tiwari@zemosolabs.com", "Google User");
      }
    },
    className: "google",
  },
];

export const REGISTER_FORM_INPUT_FIELDS = (formData: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}) => [
  {
    label: "Name",
    name: "name",
    type: "text",
    placeholder: "e.g. John Doe",
    value: formData.name,
  },
  {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "your@email.com",
    value: formData.email,
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "********",
    value: formData.password,
  },
  {
    label: "Confirm Password",
    name: "confirmPassword",
    type: "password",
    placeholder: "********",
    value: formData.confirmPassword,
  },
];

export const VALIDATE_BARBER_INFO_FIELDS = (
  name: string,
  value: string
): string => {
  switch (name) {
    case "shopName":
      if (!value.trim()) return "Shop name is required";
      if (value.length < 3) return "Shop name must be at least 3 characters";
      return "";

    case "phoneNumber": {
      if (!value.trim()) return "Phone number is required";
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(value)) return "Enter a valid 10-digit phone number";
      return "";
    }

    case "address":
      if (!value.trim()) return "Address is required";
      if (value.length < 10) return "Please provide a complete address";
      return "";

    case "city":
      if (!value.trim()) return "City is required";
      if (value.length < 2) return "Please enter a valid city name";
      return "";

    case "pinCode": {
      if (!value.trim()) return "PIN code is required";
      const pinRegex = /^[1-9][0-9]{5}$/;
      if (!pinRegex.test(value)) return "Enter a valid 6-digit PIN code";
      return "";
    }

    case "servicesOffered":
      if (!value.trim()) return "Services offered is required";
      if (value.length < 5) return "Please describe your services briefly";
      return "";

    case "startingPrice": {
      if (!value.trim()) return "Starting price is required";
      const price = parseFloat(value);
      if (isNaN(price) || price <= 0) return "Enter a valid price";
      if (price < 10) return "Price should be at least ₹10";
      return "";
    }

    default:
      return "";
  }
};

export const GET_AUTH_HEADING = (role: string, mode: string): string => {
  const roleLabel = role === "barber" ? "Barber" : "Customer";

  switch (mode) {
    case "login":
      return `${roleLabel} Login`;
    case "register":
      return `${roleLabel} Register`;
    case "verifyOtp":
      return `${roleLabel} Verify OTP`;
    case "forgotPassword":
      return `${roleLabel} Forgot Password`;
    case "resetOtp":
      return `${roleLabel} Verify Reset OTP`;
    case "resetPassword":
      return `${roleLabel} Reset Password`;
    default:
      return `${roleLabel} Auth`;
  }
};
