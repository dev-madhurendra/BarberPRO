import styled from "styled-components";

export const AuthContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
`;

export const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
`;

export const FormSection = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  overflow: hidden;

  .scissor {
    position: absolute;
    background: url("/assets/scissors.png") no-repeat center/contain;
    opacity: 0.06;
    pointer-events: none;
    animation: floatScissors 8s ease-in-out infinite;
  }

  /* Random positions and sizes for 15 scissors */
  .scissor-1 { width: 40px; height: 40px; top: 5%; left: 8%; animation-delay: 0s; }
  .scissor-2 { width: 35px; height: 35px; top: 10%; left: 40%; animation-delay: 0.5s; }
  .scissor-3 { width: 45px; height: 45px; top: 20%; left: 70%; animation-delay: 1s; }
  .scissor-4 { width: 50px; height: 50px; top: 25%; left: 20%; animation-delay: 1.5s; }
  .scissor-5 { width: 30px; height: 30px; top: 30%; left: 55%; animation-delay: 2s; }
  .scissor-6 { width: 42px; height: 42px; top: 35%; left: 10%; animation-delay: 2.5s; }
  .scissor-7 { width: 37px; height: 37px; top: 40%; left: 80%; animation-delay: 3s; }
  .scissor-8 { width: 33px; height: 33px; top: 50%; left: 15%; animation-delay: 3.5s; }
  .scissor-9 { width: 38px; height: 38px; top: 60%; left: 40%; animation-delay: 4s; }
  .scissor-10 { width: 34px; height: 34px; top: 65%; left: 70%; animation-delay: 4.5s; }
  .scissor-11 { width: 32px; height: 32px; bottom: 25%; left: 5%; animation-delay: 5s; }
  .scissor-12 { width: 36px; height: 36px; bottom: 20%; left: 30%; animation-delay: 5.5s; }
  .scissor-13 { width: 41px; height: 41px; bottom: 15%; left: 60%; animation-delay: 6s; }
  .scissor-14 { width: 39px; height: 39px; bottom: 10%; left: 80%; animation-delay: 6.5s; }
  .scissor-15 { width: 35px; height: 35px; bottom: 5%; left: 50%; animation-delay: 7s; }

  @keyframes floatScissors {
    0% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(10deg); }
    100% { transform: translateY(0) rotate(0deg); }
  }
`;


export const FormWrapper = styled.div`
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;
