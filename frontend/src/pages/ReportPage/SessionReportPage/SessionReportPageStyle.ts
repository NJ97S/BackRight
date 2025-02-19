import styled from "styled-components";

export const SessionReportContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.25rem;
  background-color: var(--white);
  opacity: 0;
  transform: translateY(10px);
  animation: slideIn 0.3s ease forwards;
  border-radius: 12px;

  @keyframes slideIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const Header = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem 0;
`;

export const TitleWrapper = styled.div`
  flex: 1;
  text-align: center;
`;

export const Title = styled.h2`
  font-size: 1.25rem;
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 0;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: var(--gray-300);
  cursor: pointer;
`;

export const TimeInfoCard = styled.div`
  padding: 2rem 1.5rem;
  background-color: var(--white);
  border-radius: 12px;
  border: 0.25px solid var(--gray-100);
`;

export const TimeInfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
`;

export const TimeInfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
`;

export const TimeLabel = styled.span`
  color: var(--gray-300);
  font-size: 0.875rem;
`;

export const TimeValue = styled.span`
  font-weight: 700;
  font-size: 1rem;
`;

export const GraphContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.25rem;
  width: 100%;
`;

export const GraphItem = styled.div`
  width: 400px;
  padding: 2rem 2.5rem;
  background-color: var(--white);
  border-radius: 12px;
  border: 0.25px solid var(--gray-100);
`;

export const AlertHistoryCard = styled.div`
  flex: 1;
  padding: 2rem 1.5rem;
  background-color: var(--white);
  border-radius: 12px;
  border: 0.25px solid var(--gray-100);
`;

export const SemiTitle = styled.div`
  font-weight: 700;
  text-align: center;
  margin-bottom: 1.25rem;
`;
export const BodyPartList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
`;

export const BodyPart = styled.div`
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 1rem;
  border: 0.25px solid var(--gray-100);
  border-radius: 12px;
`;

export const BodyPartImage = styled.img`
  width: 3.5rem;
  height: 3.5rem;
`;

export const BodyPartAlertCount = styled.div<{ $count: number }>`
  font-size: 1.25rem;
  font-weight: 700;
  color: ${(props) => {
    if (props.$count >= 25) return "var(--red)";
    if (props.$count >= 15) return "#FF893A";
    return "var(--gray-300)";
  }};
`;
