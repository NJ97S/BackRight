import { Link } from "react-router-dom";
import styled from "styled-components";

export const ReportTabsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  margin-left: 1rem;
`;

export const ReportTab = styled(Link)<{ $isActive: boolean }>`
  padding: 0.75rem 3rem;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-color: ${({ $isActive }) =>
    $isActive ? "var(--cream)" : "var(--mint)"};

  box-shadow: ${({ $isActive }) =>
    $isActive ? "none" : "0px -4px 8px 0px rgba(0, 0, 0, 0.5) inset"};

  color: ${({ $isActive }) => ($isActive ? "var(--mint)" : "var(--cream)")};
  font-weight: ${({ $isActive }) => ($isActive ? "700" : "400")};
  text-align: center;
  text-decoration: none;
`;
