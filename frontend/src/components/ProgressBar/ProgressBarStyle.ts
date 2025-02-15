import styled from "styled-components";

export const ProgressBarContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0.5rem;
  border-radius: 999px;
  background-color: var(--gray-100);
  overflow: hidden;
`;

export const ProgressBar = styled.div<{ $progress: number }>`
  width: ${({ $progress }) => `${$progress}%`};
  height: 100%;
  border-radius: 999px;
  background-color: var(--mint);
  transition: width 0.3s ease-in-out;
`;
