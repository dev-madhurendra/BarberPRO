import { styled } from "styled-components";

export const Divider = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  font-size: 14px;
  color: #6b7280;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: #e5e7eb;
    margin: 0 8px;
  }
`;

export const SocialButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;

  button {
    width: 50px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background: #fff;
    cursor: pointer;
    font-size: 18px;
    color: #111;
    transition: 0.2s ease;

    &:hover {
      background: #f9fafb;
    }
  }
`;

export const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    margin: 8px 0;
  }
`;
