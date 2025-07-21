import React from "react";
import { InputWrapper, StyledLabel, StyledInput, HelperText } from "./index.styles";

interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: boolean;
  success?: boolean;
  variant?: "outlined" | "filled";
}

const Input: React.FC<IInput> = ({
  label,
  helperText,
  error,
  success,
  variant = "outlined",
  ...props
}) => {
  return (
    <InputWrapper>
      {label && <StyledLabel>{label}</StyledLabel>}
      <StyledInput
        {...props}
        variant={variant}
        hasError={error}
        hasSuccess={success}
      />
      {helperText && <HelperText hasError={error}>{helperText}</HelperText>}
    </InputWrapper>
  );
};

export default Input;
