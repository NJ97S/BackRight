import styled from "styled-components";

export const PostureAlertButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: fit-content;
  padding: 0.75rem;
  border-radius: 12px;
  background: rgba(238, 238, 238, 0.8);
  box-shadow: rgba(0, 0, 0, 0.24) 0px 0px 4px;
`;

export const ListIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

interface AlertStatusContainerProps {
  isHovered: boolean;
}

export const AlertStatusContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isHovered",
})<AlertStatusContainerProps>`
  display: flex;
  align-items: center;
  height: fit-content;

  opacity: ${({ isHovered }) => (isHovered ? 1 : 0)};
  visibility: ${({ isHovered }) => (isHovered ? "visible" : "hidden")};
  transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;
`;

export const StatusMessage = styled.div`
  padding: 1rem 1.5rem;
  border-radius: 12px;
  background: rgba(238, 238, 238, 0.8);
  font-size: 0.875rem;
  text-align: center;
`;

export const StatusAlertMessage = styled.div`
  padding: 1rem 1.5rem;
  border-radius: 12px;
  background: rgba(238, 238, 238, 0.8);
  font-size: 0.875rem;
  text-align: center;

  span {
    color: var(--red);
    font-weight: 600;
  }
`;

export const Triangle = styled.div`
  border-style: solid;
  border-width: 0.5rem 0.75rem 0.5rem 0.75rem;
  border-color: transparent transparent transparent rgba(238, 238, 238, 0.5);
`;
