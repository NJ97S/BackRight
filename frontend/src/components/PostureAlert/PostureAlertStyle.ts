import styled from "styled-components";

interface PostureAlertProps {
  isStreaming: boolean;
}

export const PostureAlert = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isStreaming",
})<PostureAlertProps>`
  position: absolute;
  top: 1rem;
  right: 1rem;

  display: flex;

  height: calc(100% - 2rem);

  opacity: ${({ isStreaming }) => (isStreaming ? 1 : 0)};
  visibility: ${({ isStreaming }) => (isStreaming ? "visible" : "hidden")};
  transition: opacity 1s ease-in-out;
  ${({ isStreaming }) => !isStreaming && "transition: none;"}
`;

export const empty = styled.div``;
