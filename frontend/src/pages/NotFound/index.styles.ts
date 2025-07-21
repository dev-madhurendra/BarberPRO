import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { theme } from "../../styles/theme";
import backgroundImage from "../../assets/images/barber-404.jpg";


export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: url(${backgroundImage}) no-repeat center center/cover;
  text-align: center;
  position: relative;
  overflow: hidden;
  padding: 2rem;
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

export const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-12px); }
`;

export const ScissorIcon = styled.div`
  font-size: 4rem;
  color: ${theme.colors.accent};
  animation: ${float} 3s ease-in-out infinite;
  z-index: 2;
`;

export const BigText = styled(motion.h1)`
  font-size: 12rem;
  font-weight: bold;
  background: linear-gradient(
    90deg,
    ${theme.colors.highlight},
    ${theme.colors.accent}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  z-index: 2;
  margin: 1rem 0;
`;

export const Tagline = styled.p`
  color: ${theme.colors.inputBg};
  font-size: 1.5rem;
  max-width: 600px;
  margin: 0 auto 2rem;
  z-index: 2;
  opacity: 0.9;
  font-weight: 500;
`;