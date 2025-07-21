import { styled } from "styled-components";

export const OtpContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin: 16px 0;
`;

export const OtpInput = styled.input`
  width: 52px;
  height: 50px;
  text-align: center;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #007bff;
  }
`;
