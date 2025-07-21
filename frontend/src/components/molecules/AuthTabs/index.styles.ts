import styled, { css } from "styled-components";

export const AuthWrapper = styled.div`
  width: 420px;
  background: #fff;
`;

export const TabContainer = styled.div`
  display: flex;
  justify-content: space-between;
  background: #f3f4f6;
  border-radius: 8px;
  overflow: hidden;
`;

export const Tab = styled.button<{ active?: boolean }>`
  flex: 1;
  padding: 12px;
  font-size: 16px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  background: transparent;
  color: #111;

  ${({ active, theme }) =>
    active &&
    css`
      background: ${theme.colors.accent};
      color: #fff;
    `}
`;

