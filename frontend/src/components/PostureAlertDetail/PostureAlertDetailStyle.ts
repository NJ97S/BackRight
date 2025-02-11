import styled from "styled-components";

export const PostureAlertDetailContainer = styled.div`
  display: flex;
  gap: 0.75rem;

  padding: 0.75rem 0 0.75rem 0.75rem;
  border-radius: 12px;

  &:hover {
    cursor: pointer;
    background: rgba(248, 173, 173, 0.8);

    span {
      color: var(--white);
    }
  }
`;

export const TimeCircle = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 999px;
  background-color: var(--gray-300);
`;

export const PostureAlertDetail = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const AlertTime = styled.span`
  font-size: 0.875rem;
  color: var(--gray-300);
`;

export const AlertPart = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
`;
