import { styled } from "styled-components";

export const ForgotPasswordWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.sm};

  button {
    width: 100%;
  }
`;

export const BackButton = styled.button`
  background: transparent;
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  text-align: left;
  margin-top: ${({ theme }) => theme.spacing.xs};
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`;
