import { styled } from "styled-components";
import Input from "../../atoms/Input";
import Button from "../../atoms/Button";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: ${({ theme }) => theme.spacing.md}; /* Reduced padding */
  background: #fff;
  font-family: ${({ theme }) => theme.fonts.body};
  position: relative;
  overflow: hidden;

  .scissor {
    position: absolute;
    background: url("../../../../public/scissors.png") no-repeat center/contain;
    opacity: 0.06;
    pointer-events: none;
    z-index: 0;
    animation: float 8s ease-in-out infinite;
  }

  .scissor-1 { width: 50px; height: 50px; top: 5%; left: 3%; animation-delay: 0s; }
  .scissor-2 { width: 60px; height: 60px; top: 10%; left: 20%; animation-delay: 0.5s; }
  .scissor-3 { width: 45px; height: 45px; top: 8%; left: 40%; animation-delay: 1s; }
  .scissor-4 { width: 55px; height: 55px; top: 12%; left: 60%; animation-delay: 1.5s; }
  .scissor-5 { width: 50px; height: 50px; top: 5%; right: 5%; animation-delay: 2s; }
  .scissor-6 { width: 55px; height: 55px; top: 20%; left: 10%; animation-delay: 2.5s; }
  .scissor-7 { width: 60px; height: 60px; top: 25%; left: 30%; animation-delay: 3s; }
  .scissor-8 { width: 50px; height: 50px; top: 18%; left: 50%; animation-delay: 3.5s; }
  .scissor-9 { width: 45px; height: 45px; top: 20%; left: 70%; animation-delay: 4s; }
  .scissor-10 { width: 55px; height: 55px; top: 22%; right: 5%; animation-delay: 4.5s; }
  .scissor-11 { width: 60px; height: 60px; top: 35%; left: 5%; animation-delay: 5s; }
  .scissor-12 { width: 50px; height: 50px; top: 38%; left: 25%; animation-delay: 5.5s; }
  .scissor-13 { width: 55px; height: 55px; top: 30%; left: 45%; animation-delay: 6s; }
  .scissor-14 { width: 50px; height: 50px; top: 32%; left: 65%; animation-delay: 6.5s; }
  .scissor-15 { width: 45px; height: 45px; top: 35%; right: 8%; animation-delay: 7s; }
  .scissor-16 { width: 60px; height: 60px; bottom: 20%; left: 15%; animation-delay: 7.5s; }
  .scissor-17 { width: 55px; height: 55px; bottom: 22%; left: 35%; animation-delay: 8s; }
  .scissor-18 { width: 50px; height: 50px; bottom: 25%; left: 55%; animation-delay: 8.5s; }
  .scissor-19 { width: 45px; height: 45px; bottom: 28%; left: 75%; animation-delay: 9s; }
  .scissor-20 { width: 55px; height: 55px; bottom: 30%; right: 5%; animation-delay: 9.5s; }

  @keyframes float {
    0% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(8deg); }
    100% { transform: translateY(0) rotate(0deg); }
  }
`;

export const FormWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
  z-index: 2;
  padding: ${({ theme }) => theme.spacing.lg};

`;

export const Header = styled.div`
  text-align: center;
  background: #fff;
  padding-bottom: 10px;
  h1 {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
    font-family: ${({ theme }) => theme.fonts.heading};
  }

  p {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    color: ${({ theme }) => theme.colors.textSecondary};
    margin: 0;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.md};
  background: #fff;
`;

export const FieldsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm}; /* Reduced gap */
`;

export const FieldContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Label = styled.label<{ hasError?: boolean }>`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  font-weight: 600;
  color: ${({ hasError, theme }) =>
    hasError ? theme.colors.error : theme.colors.textPrimary};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const StyledInput = styled(Input)<{ hasError?: boolean }>`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.md};
  border: 2px solid
    ${({ hasError, theme }) =>
      hasError ? theme.colors.error : theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.fontSizes.md};
  background: #fff;
  box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: ${({ theme }) => theme.transitions.base};

  &:focus {
    border-color: ${({ hasError, theme }) =>
      hasError ? theme.colors.error : theme.colors.primary};
    box-shadow: 0 0 0 2px
      ${({ hasError, theme }) =>
        hasError ? "rgba(239, 68, 68, 0.16)" : theme.colors.accent + "33"};
    outline: none;
  }
`;

export const ErrorMessage = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 500;
  margin-top: 4px;
  min-height: 16px;
  transition: opacity 0.18s;
  opacity: 0;

  &.show {
    opacity: 1;
  }
`;

export const ButtonContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing.sm};
  display: flex;
  flex-direction: column;
  align-items: stretch;
  margin-top: 30px;
`;

export const StyledButton = styled(Button)<{ isLoading?: boolean }>`
  min-width: 180px;
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  font-size: ${({ theme }) => theme.fontSizes.md};
  font-weight: 600;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ isLoading, theme }) =>
    isLoading
      ? theme.colors.disable
      : `linear-gradient(135deg, ${theme.colors.primary}, ${theme.colors.accent})`};
  color: #fff;
  cursor: ${({ isLoading }) => (isLoading ? "not-allowed" : "pointer")};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  transition: ${({ theme }) => theme.transitions.base};
  border: none;

  &:hover:not(:disabled) {
    opacity: 0.95;
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
  }
`;

export const LoadingSpinner = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-right: 10px;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
