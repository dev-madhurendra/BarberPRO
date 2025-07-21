import { styled } from "styled-components";

export const ResetPasswordWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md}; 
  margin-top: ${({ theme }) => theme.spacing.sm};

  input {
    padding: ${({ theme }) => theme.spacing.sm};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    font-size: ${({ theme }) => theme.fontSizes.md};
  }

  button {
    width: 100%;
    padding: ${({ theme }) => theme.spacing.sm};
    font-weight: 600;
  }
`;
