import styled from "styled-components";

export const ImageWrapper = styled.div<{
  width?: string;
  height?: string;
  rounded?: boolean;
  circle?: boolean;
}>`
  position: relative;
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "300px"};
  overflow: hidden;
  border-radius: ${({ circle, rounded }) =>
    circle ? "50%" : rounded ? "12px" : "0"};
`;

export const StyledImage = styled.img<{ cover?: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: ${({ cover }) => (cover ? "cover" : "contain")};
  display: block;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4); /* Dark filter */
`;

export const OverlayContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  text-align: center;
  z-index: 2;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 1.5rem;
  }

  button {
    padding: 10px 20px;
    font-size: 1rem;
    border: none;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.accent};
    color: #fff;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      background: ${({ theme }) => theme.colors.primary};
    }
  }
`;
