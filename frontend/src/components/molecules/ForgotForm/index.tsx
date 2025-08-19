import React from "react";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import { ForgotPasswordWrapper, BackButton } from "./index.styles";
import { FORGOT_PASSWORD_FORM } from "../../../utils/constants";

export interface ForgotPasswordFormProps {
  email: string;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  onBack: () => void; // NEW
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  email,
  isLoading,
  onChange,
  onSubmit,
  onBack,
}) => (
  <ForgotPasswordWrapper onSubmit={onSubmit}  aria-label={FORGOT_PASSWORD_FORM}>
    <Input
      type="email"
      name="email"
      value={email}
      onChange={onChange}
      placeholder="Enter your email"
      required
    />
    <Button text={isLoading ? "Sending OTP..." : "Send OTP"} disabled={isLoading} />

    <BackButton type="button" onClick={onBack}>
      ← Back to Login
    </BackButton>
  </ForgotPasswordWrapper>
);

export default ForgotPasswordForm;
