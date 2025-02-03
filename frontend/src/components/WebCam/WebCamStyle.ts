import styled from "styled-components";

export const WebCamContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  gap: 0.75rem;
  height: 100%;
  max-width: 100%;
`;

export const VideoContainer = styled.div`
  position: relative;
  height: 90%;
`;

export const Video = styled.video`
  height: 100%;
  aspect-ratio: 1.8;
  border-radius: 12px;
  background-color: var(--cream);
  transform: scaleX(-1);
`;

export const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
`;

interface RecordingProps {
  isStreaming: boolean;
}

export const RecordingStartGuide = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isStreaming",
})<RecordingProps>`
  visibility: ${({ isStreaming }) => (isStreaming ? "hidden" : "visible")};

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;
`;

export const RecordingStartText = styled.span`
  font-size: 0.875rem;
  font-weight: 600;
`;

export const RecordingStartButton = styled.button`
  border-radius: 12px;
  padding: 1rem 2rem;
  background-color: var(--mint);
  color: var(--white);
  font-weight: 700;
`;

export const RecordingStopButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isStreaming",
})<RecordingProps>`
  visibility: ${({ isStreaming }) => (isStreaming ? "visible" : "hidden")};

  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  background-color: var(--navy-200);
  color: var(--white);
  font-weight: 700;
`;

export const RecordingStopIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;
