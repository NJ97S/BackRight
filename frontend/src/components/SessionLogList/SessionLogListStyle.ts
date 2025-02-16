import styled from "styled-components";

export const SessionLogListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 2rem;
  padding: 2rem 1.5rem;
  border-radius: 12px;
  background-color: var(--white);
`;

export const Title = styled.div`
  font-weight: 700;
  text-align: center;
`;

export const SessionListContainer = styled.div`
  flex: 1;
  position: relative;
  display: flex;

  height: 100%;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TimeLine = styled.div`
  position: absolute;
  top: 0.75rem;
  left: 1.25rem;

  width: 0.25rem;
  height: 100%;
  border-radius: 999px;
  background-color: var(--gray-300);
`;

export const SessionList = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;
