import styled from "styled-components";

export const PostureAlertListContainer = styled.div`
  z-index: 10;
  position: relative;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  border-radius: 12px;
  padding: 1.25rem;
  width: 18rem;
  background: rgba(238, 238, 238, 0.8);
`;

export const Title = styled.div`
  font-weight: 700;
  text-align: center;
`;

export const CloseIcon = styled.img`
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;

  width: 1.25rem;
  height: 1.25rem;

  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: rotate(90deg);
  }
`;

export const PostureAlertContainer = styled.div`
  position: relative;
  flex: 1;

  display: flex;

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

export const PostureAlertList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  width: 100%;

  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;
