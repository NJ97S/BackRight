import styled from "styled-components";

export const LoadingContainer = styled.div<{ $backgroundColor: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  background-color: ${({ $backgroundColor }) =>
    $backgroundColor && `var(--${$backgroundColor})`};
  color: var(--gray-500);
  font-weight: 700;
`;
export const empty = styled.div``;
