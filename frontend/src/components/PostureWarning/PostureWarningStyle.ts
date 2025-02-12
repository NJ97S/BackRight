import styled from "styled-components";

export const Container = styled.div`
  padding: 2rem;
  background: var(--white);
  border-radius: 0.75rem;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 2.5rem;
  position: relative;
`;

export const Title = styled.h2`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);

  color: var(--black);
  font-size: 1rem;
  font-weight: 700;
`;

export const TotalWarnings = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding-right: 2rem;
  color: var(--gray-300);
  font-weight: 600;
`;

export const WarningCount = styled.span`
  color: var(--red);
`;

export const CardContainer = styled.div`
  display: flex;
  gap: 1.25rem;
  padding-left: 2rem;
  padding-right: 2rem;
`;

export const Card = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  height: 14rem;
  padding: 1.25rem 0;
  border-radius: 0.75rem;
  border: 1.5px solid var(--gray-100);
`;

export const CardImage = styled.img`
  width: 5.68rem;
  height: 5.69rem;
  object-fit: contain;
`;

interface CardCountProps {
  count: number;
}

export const CardCount = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "count",
})<CardCountProps>`
  margin-top: 1.93rem;

  color: ${({ count }) => {
    if (count >= 20) return "var(--red)";
    if (count >= 10) return "#FF893A";
    return "var(--gray-300)";
  }};
  font-size: 1.75rem;
  font-weight: 700;
  text-align: center;
`;
