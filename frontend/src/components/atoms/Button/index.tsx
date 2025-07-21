import React, { ReactNode } from "react";
import { StyledButton } from "./index.styles";
import Typography from "../Typography";

export interface IButton {
  text: ReactNode;
  buttonVariant?: "primary" | "secondary" | "outline" | "disabled";
  startIcon?: ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  typographyVariant?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  backgroundColor?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  "data-testid"?: string;
}

const Button: React.FC<IButton> = ({
  text,
  buttonVariant = "primary",
  startIcon,
  onClick,
  typographyVariant = "md",
  backgroundColor,
  disabled = false,
  style,
  ...props
}) => {
  return (
    <StyledButton
      buttonVariant={buttonVariant}
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: backgroundColor || undefined,
        ...style,
      }}
      {...props}
    >
      {startIcon && <span style={{ marginRight: "8px" }}>{startIcon}</span>}
      <Typography text={text} variant={typographyVariant} />
    </StyledButton>
  );
};

export default Button;
