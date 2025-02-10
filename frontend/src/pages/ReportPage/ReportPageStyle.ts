import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex: 1;
  background: var(--navy-100);
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 84.5rem;
  height: 100%;
  overflow: hidden;
`;

export const MainContent = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  grid-template-rows: auto auto;
  gap: 2.88rem;
  padding: 2.88rem;
  background: var(--cream);
  box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 0.75rem;
  overflow: auto;
`;
