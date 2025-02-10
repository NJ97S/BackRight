// src/components/report/ReportContentStyle.ts
import styled from "styled-components";

export const ReportContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%; //애넬 꼭 넣어야하더라
  height: 100%; //애넬 꼭 넣어야하더라
  overflow: hidden;
`;

export const MainContent = styled.div`
  flex: 1;
  /* min-height: 0; // 주석처리 가능 - flex: 1이 있으면 불필요 */
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  grid-template-rows: auto auto;
  gap: 2.88rem;
  padding: 2.88rem 2.88rem;
  background: var(--cream);
  box-shadow: 0px 0px 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 12px;
  overflow: auto;
`;
