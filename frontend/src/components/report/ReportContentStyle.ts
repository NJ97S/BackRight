// src/components/report/ReportContentStyle.ts
import styled from "styled-components";

export const ReportContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const MainContent = styled.div`
  flex: 1;
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
