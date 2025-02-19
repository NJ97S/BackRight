import styled from "styled-components";

export const RankingSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2.5rem;
  padding: 2rem;
  border-radius: 12px;
  background-color: var(--white);
`;

export const Title = styled.div`
  position: relative;
  font-weight: 700;
  text-align: center;
`;

export const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
`;

export const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
  border-radius: 12px;
  background: rgba(118, 171, 174, 0.15);
  font-size: 0.875rem;
`;

export const Description = styled.div`
  text-align: center;
  line-height: 1.5;

  span {
    color: var(--mint);
    font-weight: 700;
  }
`;

export const MyPercent = styled.span`
  color: var(--mint);
  font-size: 1.25rem;
  font-weight: 700;
`;
