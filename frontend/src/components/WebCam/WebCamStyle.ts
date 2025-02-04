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

export const RecordingStartContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isStreaming",
})<RecordingProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.75rem;

  visibility: ${({ isStreaming }) => (isStreaming ? "hidden" : "visible")};
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

export const ElapsedTimeContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isStreaming",
})<RecordingProps>`
  position: absolute;
  top: 1rem;
  left: 1rem;

  display: flex;
  align-items: center;
  gap: 0.5rem;

  padding: 0.5rem 0.75rem;
  border: 1px solid var(--gray-200);
  border-radius: 999px;
  background: rgba(238, 238, 238, 0.7);

  color: var(--gray-300);
  font-size: 0.875rem;

  opacity: ${({ isStreaming }) => (isStreaming ? 1 : 0)};
  visibility: ${({ isStreaming }) => (isStreaming ? "visible" : "hidden")};
  transition: opacity 1s ease-in-out;
  ${({ isStreaming }) => !isStreaming && "transition: none;"}
`;

export const RecordingIcon = styled.img`
  width: 1.25rem;
  height: 1.25rem;
`;

interface RealtimeAlertProps {
  haveProblem: boolean | null;
}

export const RealtimeAlert = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "haveProblem",
})<RealtimeAlertProps>`
  position: absolute;
  top: 2.5rem;
  left: 50%;
  transform: translate(-50%, -50%);

  padding: 1rem 2.5rem;
  border-radius: 12px;
  background: rgba(255, 68, 68, 0.6);
  color: var(--white);
  font-size: 0.875rem;
  text-align: center;

  opacity: ${({ haveProblem }) => (haveProblem ? 1 : 0)};
  visibility: ${({ haveProblem }) => (haveProblem ? "visible" : "hidden")};
  transition: opacity 0.5s ease-in-out, visibility 0.5s ease-in-out;
`;

export const RecordingStopButton = styled.button.withConfig({
  shouldForwardProp: (prop) => prop !== "isStreaming",
})<RecordingProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  background-color: var(--navy-200);
  color: var(--white);
  font-weight: 700;

  visibility: ${({ isStreaming }) => (isStreaming ? "visible" : "hidden")};
`;

export const RecordingStopIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;
