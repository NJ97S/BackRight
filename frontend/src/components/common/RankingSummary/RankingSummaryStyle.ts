import styled from "styled-components";

export const RankingSummaryContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  padding: 2rem;
  border-radius: 12px;
  background-color: var(--white);
`;

export const Title = styled.div`
  position: relative;
  font-weight: 700;
  text-align: center;
`;

export const CarouselContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  overflow: hidden;
`;

export const PrevButton = styled.button`
  position: absolute;
  top: 34%;
  transform: translateY(-50%);
  left: 0.25rem;
  color: var(--gray-100);
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
`;

export const NextButton = styled.button`
  position: absolute;
  top: 34%;
  transform: translateY(-50%);
  right: 0.25rem;
  color: var(--gray-100);
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
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
  font-size: 1.125rem;
  font-weight: 700;
`;
