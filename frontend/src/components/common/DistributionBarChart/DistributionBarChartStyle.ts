import styled from "styled-components";

export const ChartContainer = styled.div`
  width: 100%;
  height: 10rem;
`;

export const TooltipContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  padding: 0.5rem;
  background-color: var(--white);
  border: 1px solid var(--gray-100);
  border-radius: 0.25rem;
  font-size: 0.75rem;
  color: var(--gray-400);
`;
