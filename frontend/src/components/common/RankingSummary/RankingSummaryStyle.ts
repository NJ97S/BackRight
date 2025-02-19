import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  padding: 2rem 1.5rem;
  border-radius: 12px;
  background-color: var(--white);
`;

export const Title = styled.div`
  font-weight: 700;
  text-align: center;
  font-size: 1.25rem;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

export const StatisticsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const CategorySelector = styled.div`
  display: flex;
  gap: 0.75rem;
  padding: 0.25rem;
  background-color: var(--gray-50);
  border-radius: 6px;
  width: fit-content;
`;

export const CategoryButton = styled.button<{ $isSelected: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-size: 0.875rem;
  color: ${(props) => (props.$isSelected ? "var(--white)" : "var(--gray-400)")};
  background-color: ${(props) =>
    props.$isSelected ? "var(--mint)" : "transparent"};
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: ${(props) =>
      props.$isSelected ? "var(--mint)" : "var(--gray-100)"};
  }
`;

export const RankContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1rem;
  background-color: var(--gray-50);
  border-radius: 8px;
`;

export const StatisticsText = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
`;

export const MessageText = styled.p`
  color: var(--gray-400);
  font-size: 1rem;
  line-height: 1.5;
  margin: 0;
`;

export const BoldText = styled.span`
  font-weight: 700;
`;

export const HighlightText = styled.span`
  color: var(--mint);
  font-weight: 700;
  margin: 0 0.25rem;
`;

export const SubText = styled.div`
  color: var(--gray-400);
  font-size: 1rem;
  line-height: 1.5;
  text-align: center;
`;
