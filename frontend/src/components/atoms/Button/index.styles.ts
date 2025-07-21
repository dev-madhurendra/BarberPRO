import styled, { css } from "styled-components";

interface IButtonVariant {
  buttonVariant: "primary" | "secondary" | "outline" | "disabled";
}

export const StyledButton = styled.button<IButtonVariant>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.base};
  border: none;
  color: #fff;

  ${({ buttonVariant, theme }) =>
    buttonVariant === "primary" &&
    css`
      background: ${theme.colors.primary};
      color: #fff;

      &:hover {
        background: ${theme.colors.accent};
        color: #fff;
      }
    `}

  ${({ buttonVariant, theme }) =>
    buttonVariant === "secondary" &&
    css`
      background: ${theme.colors.secondary};
      color: #fff;

      &:hover {
        background: ${theme.colors.primary};
        color: #fff;
      }
    `}

  ${({ buttonVariant, theme }) =>
    buttonVariant === "outline" &&
    css`
      background: transparent;
      border: 2px solid ${theme.colors.primary};
      color: ${theme.colors.primary};

      &:hover {
        background: ${theme.colors.primary};
        color: #fff;
      }
    `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
