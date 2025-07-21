import React, { ReactNode } from "react";
import { StyledTypography } from "./index.styles";

export interface ITypography {
  text: ReactNode;
  variant?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  color?: string;
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "span" | "div";
  align?: "left" | "center" | "right";
  weight?: "light" | "normal" | "medium" | "bold";
  style?: React.CSSProperties;
  "data-testid"?: string;
  onClick?: () => void;
  className?: string;
}

const Typography: React.FC<ITypography> = ({
  text,
  variant = "md",
  color,
  as = "p",
  align = "left",
  weight = "normal",
  style,
  ...props
}) => {
  return (
    <StyledTypography
      variant={variant}
      color={color}
      as={as}
      align={align}
      weight={weight}
      style={style}
      {...props}
    >
      {text}
    </StyledTypography>
  );
};

export default Typography;
