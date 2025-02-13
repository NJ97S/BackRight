import styled from "styled-components";

export const PageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--navy-100);
  padding: 2rem;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 84.5rem;
  height: 100%;
  max-height: 51.5rem;
`;

export const MainContent = styled.div`
  flex: 1;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-template-rows: auto auto;
  gap: 1.5rem;
  padding: 2.75rem;

  background: var(--cream);
  box-shadow: 0 0 0.25rem rgba(0, 0, 0, 0.25);
  border-radius: 0.75rem;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 1rem;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: var(--gray-200);
    border-radius: 0.75rem;
  }
`;
