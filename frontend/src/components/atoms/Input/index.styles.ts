import styled, { css } from "styled-components";

interface StyledInputProps {
  variant?: "outlined" | "filled";
  hasError?: boolean;
  hasSuccess?: boolean;
}

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
`;

export const StyledLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.textPrimary};
  font-weight: 500;
`;

export const StyledInput = styled.input<StyledInputProps>`
  padding: ${({ theme }) => theme.spacing.sm} ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.inputBg};
  color: ${({ theme }) => theme.colors.textPrimary};
  outline: none;
  transition: ${({ theme }) => theme.transitions.base};

  ${({ variant }) =>
    variant === "filled" &&
    css`
      background: #fff;
      border: none;
      box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
    `}

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 2px rgba(245, 158, 11, 0.3);
  }

  ${({ hasError, theme }) =>
    hasError &&
    css`
      border-color: ${theme.colors.error};
      &:focus {
        box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.3);
      }
    `}

  ${({ hasSuccess, theme }) =>
    hasSuccess &&
    css`
      border-color: ${theme.colors.success};
      &:focus {
        box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.3);
      }
    `}
`;

export const HelperText = styled.span<{ hasError?: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ hasError, theme }) =>
    hasError ? theme.colors.error : theme.colors.textSecondary};
`;
