import styled from "styled-components";

export const OptionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

export const LinkTextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  gap: 6px; 
  margin-top: 16px;

  .text {
    color: #111;
    font-size: 14px;
  }

  .link {
    color: ${({ theme }) => theme.colors.accent};
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.2s ease;

    &:hover {
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
