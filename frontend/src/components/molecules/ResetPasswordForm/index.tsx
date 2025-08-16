import React from "react";
import Button from "../../atoms/Button";
import Input from "../../atoms/Input";
import { ResetPasswordWrapper } from "./index.styles";
import { RESET_PASSWORD_FORM } from "../../../utils/constants";

interface ResetPasswordFormProps {
  newPassword: string;
  confirmNewPassword: string;
  isLoading: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({
  newPassword,
  confirmNewPassword,
  isLoading,
  onChange,
  onSubmit,
}) => (
  <ResetPasswordWrapper onSubmit={onSubmit} aria-label={RESET_PASSWORD_FORM}>
    <Input
      type="password"
      name="password"
      value={newPassword}
      onChange={onChange}
      placeholder="Enter new password"
      required
    />
    <Input
      type="password"
      name="confirmPassword"
      value={confirmNewPassword}
      onChange={onChange}
      placeholder="Confirm new password"
      required
    />
    <Button
      text={isLoading ? "Resetting Password..." : "Reset Password"}
      disabled={isLoading}
    />
  </ResetPasswordWrapper>
);

export default ResetPasswordForm;
