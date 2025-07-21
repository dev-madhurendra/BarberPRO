import { styled } from "styled-components";

export const StyledIcon = styled.span<{ size?: string; color?: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  svg {
    width: ${({ size }) => size || "24px"};
    height: ${({ size }) => size || "24px"};
    color: ${({ color, theme }) => color || theme.colors.textPrimary};
    transition: ${({ theme }) => theme.transitions.base};
  }
  &:hover svg {
    color: ${({ theme }) => theme.colors.accent};
  }
`;
