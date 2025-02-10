// src/components/report/tab/ReportTabStyle.ts
import styled from "styled-components";

export const TabContainer = styled.div`
  height: 2.75rem;
  display: flex;
  padding-left: 1rem;
`;

interface TabItemProps {
  isActive: boolean;
}

// withConfig를 사용하여 isActive prop이 DOM으로 전달되는 것을 방지
export const TabItem = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isActive",
})<TabItemProps>`
  flex: 1;
  max-width: 10.49rem;
  background: ${({ isActive }) => (isActive ? "var(--cream)" : "var(--mint)")};
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-right: 1.06rem;
  z-index: ${({ isActive }) => (isActive ? "5" : "0")};

  &:last-child {
    margin-right: 0;
  }
`;

// TabText도 마찬가지로 withConfig 적용
export const TabText = styled.span.withConfig({
  shouldForwardProp: (prop) => prop !== "isActive",
})<TabItemProps>`
  color: ${({ isActive }) => (isActive ? "var(--mint)" : "var(--cream)")};
  font-size: 1rem;
  font-weight: ${({ isActive }) => (isActive ? "800" : "400")};
`;
