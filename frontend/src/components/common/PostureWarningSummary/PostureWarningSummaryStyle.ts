import styled from "styled-components";

export const PostureWarningSummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2.5rem;
  padding: 2rem 1.5rem;
  border-radius: 12px;
  background-color: var(--white);
`;

export const Title = styled.div`
  position: relative;
  font-weight: 700;
  text-align: center;
`;

export const ToTalAlertCount = styled.p`
  position: absolute;
  top: 0;
  right: 0;
  color: var(--gray-300);
  font-weight: 500;

  span {
    color: var(--red);
  }
`;

export const BodyPartList = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1.5rem;
`;

export const BodyPart = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;

  padding: 1.5rem 2rem;
  border: 1px solid var(--gray-200);
  border-radius: 12px;
`;

export const BodyPartImage = styled.img`
  width: 5rem;
  height: 5rem;
`;

export const BodyPartAlertCount = styled.div<{ $count: number }>`
  margin-top: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: ${(props) => {
    if (props.$count >= 25) return "var(--red)";
    if (props.$count >= 15) return "#FF893A";
    return "var(--gray-300)";
  }};
`;
