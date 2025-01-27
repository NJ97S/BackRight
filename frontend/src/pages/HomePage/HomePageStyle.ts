import styled from "styled-components";

export const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 3.25rem;
  background-color: var(--gray-300);
`;

export const VideoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;
  gap: 0.75rem;
  height: 100%;
  max-width: 100%;
`;

export const Video = styled.div`
  height: 90%;
  aspect-ratio: 1.8;
  border-radius: 12px;
  background-color: var(--white);

  /* 이 부분은 영상 연결 후 삭제 예정 - 텍스트 가운데 정렬 목적 */
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
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
