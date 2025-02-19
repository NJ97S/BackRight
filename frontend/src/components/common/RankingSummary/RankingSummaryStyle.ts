import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem 1.5rem;
  border-radius: 0.75rem;
  background-color: var(--white);
`;

export const Title = styled.div`
  position: relative;
  font-weight: 700;
  text-align: center;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StatisticsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.25rem;
  background-color: var(--lightmint);
  border-radius: 0.75rem;
`;

export const StatisticsText = styled.p`
  font-size: 0.875rem;
  text-align: center;
  color: var(--gray-900);
`;

export const HighlightText = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--mint);
`;

export const SubText = styled.p`
  font-size: 0.875rem;
  line-height: 1.5;
  text-align: center;
  color: var(--gray-700);
`;

export const BoldText = styled.span`
  font-weight: 700;
`;

export const MintText = styled.span`
  color: var(--mint);
  font-weight: 700;
`;
