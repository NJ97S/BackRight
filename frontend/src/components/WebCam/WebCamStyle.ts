import styled from "styled-components";

export const VideoContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  gap: 0.75rem;
  height: 100%;
  max-width: 100%;
`;

export const Video = styled.video`
  height: 90%;
  aspect-ratio: 1.8;
  border-radius: 12px;
  background-color: var(--white);
  transform: scaleX(-1);
`;

export const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
`;

export const RecordingStopButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 12px;
  padding: 1rem 1.25rem;
  background-color: var(--gray-400);
  color: var(--white);
  font-weight: 700;
`;

export const RecordingStopIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;
