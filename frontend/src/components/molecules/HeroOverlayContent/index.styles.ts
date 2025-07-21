import styled from "styled-components";

export const OverlayWrapper = styled.section`
  display: flex;
  flex-direction: column;
  max-width: 400px;
  color: #fff;
`;

export const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: 50px 1fr; /* Circle and text */
  gap: 16px;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;
