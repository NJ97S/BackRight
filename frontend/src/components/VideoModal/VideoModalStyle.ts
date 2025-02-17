import styled from "styled-components";

export const VideoModalContainer = styled.div<{ $isOpened: boolean }>`
  position: absolute;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);

  aspect-ratio: 1.8;
  width: calc(100% - 21rem);
  border-radius: 12px;

  overflow: hidden;

  display: ${({ $isOpened }) => ($isOpened ? "block" : "none")};
`;

export const Video = styled.video`
  width: 100%;
  height: 100%;
  background-color: var(--cream);
`;

export const CloseIcon = styled.img`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;

  width: 1.5rem;
  height: 1.5rem;

  cursor: pointer;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: rotate(90deg);
  }
`;
