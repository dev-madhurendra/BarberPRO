import styled, { css } from "styled-components";

interface IStyledTypography {
  variant: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
  color?: string;
  align: "left" | "center" | "right";
  weight?: "light" | "normal" | "medium" | "bold";
}

export const StyledTypography = styled.p<IStyledTypography>`
  margin: 0;
  text-align: ${({ align }) => align};
  color: ${({ color, theme }) => color || theme.colors.textPrimary};

  ${({ variant, theme }) => css`
    font-size: ${theme.fontSizes[variant]};
    font-family: ${theme.fonts.body};
  `}

  ${({ weight }) => css`
    font-weight: ${weight === "bold"
      ? 700
      : weight === "medium"
      ? 500
      : weight === "light"
      ? 300
      : 400};
  `}
`;
