// SessionLogSection.styles.ts

import styled from "styled-components";

interface StatusBadgeProps {
  status: "정상 종료" | "강제 종료";
}

export const Container = styled.div.withConfig({
  shouldForwardProp: (prop) => !["isExpanded"].includes(prop),
})`
  padding: 1.5rem 2rem;
  background: var(--white);
  border-radius: 0.75rem;
`;

export const Title = styled.h2`
  margin-bottom: 1.5rem;
  font-size: 1rem;
  font-weight: 700;
  text-align: center;
`;

export const SessionList = styled.div`
  position: relative;
  height: calc(100% - 3.5rem);
  overflow-y: auto;
`;

export const Timeline = styled.div`
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
  bottom: 0.5rem;
  width: 0.25rem;
  background-color: var(--gray-300);
`;

export const SessionItem = styled.div`
  position: relative;
  display: flex;
  align-items: flex-start;
  padding: 0.5rem 0;
  margin-bottom: 1.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const TimelineDot = styled.div`
  width: 1rem;
  height: 1rem;
  margin: 0.125rem 0.375rem 0 0;
  background-color: var(--gray-300);
  border-radius: 50%;
`;

export const SessionContent = styled.div`
  flex: 1;
`;

export const SessionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
`;

export const SessionTime = styled.span`
  color: var(--gray-300);
  font-size: 0.875rem;
`;

export const StatusBadge = styled.div.withConfig({
  shouldForwardProp: (prop) => !["status"].includes(prop),
})<StatusBadgeProps>`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.125rem 0.5rem;
  background-color: var(--cream);
  border-radius: 999px;

  span {
    font-size: 0.75rem;
    color: var(--gray-300);
  }
`;

export const WarningCount = styled.div`
  font-size: 0.875rem;
  color: var(--black);
`;
