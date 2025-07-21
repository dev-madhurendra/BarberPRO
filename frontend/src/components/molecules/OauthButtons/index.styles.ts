import { styled } from "styled-components";

export const Divider = styled.div`
  display: flex;
  align-items: center;
  text-align: center;
  margin: 20px 0;
  color: #999;
  font-size: 14px;

  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #ccc;
  }
  &::before {
    margin-right: 10px;
  }
  &::after {
    margin-left: 10px;
  }
`;

export const SocialButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 12px;

  button {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 8px;
    background: white;
    cursor: pointer;
    transition: all 0.2s ease;
    width: 44px;
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      border-color: #888;
      transform: translateY(-2px);
    }
  }
`;
