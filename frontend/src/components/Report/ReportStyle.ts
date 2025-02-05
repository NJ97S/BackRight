import styled from "styled-components";
import { BodyPartWarning } from "./Report";

export const ReportContainer = styled.div`
  width: 50rem;
  min-height: 18.875rem;
  background-color: var(--white);
  border-radius: 0.75rem;
  padding: 1.875rem 1.5625rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.625rem;
`;

export const Title = styled.h2`
  font-size: 1rem;
  font-weight: 700;
  font-family: "Pretendard";
`;

export const TotalWarnings = styled.div`
  font-size: 1rem;
  font-weight: 600;
  font-family: "Pretendard";

  span {
    color: var(--gray-300);
  }

  strong {
    color: var(--red);
  }
`;

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.625rem;
`;

export const Card = styled.div`
  width: 100%;
  max-width: 10.4375rem;
  min-height: 11.4375rem;
  border-radius: 0.75rem;
  border: 1.5px solid var(--gray-200);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.125rem 0;
`;

interface WarningCountProps {
  severity: BodyPartWarning["severity"];
}

export const WarningCount = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "severity",
})<WarningCountProps>`
  font-size: 1.75rem;
  font-weight: 700;
  font-family: "Pretendard";
  color: ${({ severity }) => {
    switch (severity) {
      case "danger":
        return "var(--red)";
      case "warning":
        return "var(--orange)";
      case "normal":
        return "var(--gray-300)";
      default:
        return "var(--gray-300)";
    }
  }};
`;

export const BodyPartImage = styled.img`
  width: 5.6875rem;
  height: 5.6875rem;
  margin-bottom: 1.125rem;
`;
