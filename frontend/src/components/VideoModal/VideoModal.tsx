import { useEffect, useRef } from "react";

import useSelectedPostureAlertStore from "../../store/useSelectedPostureAlertStore";

import * as S from "./VideoModalStyle";

import closeIcon from "../../assets/icons/close.svg";
import { getDetectionVideo } from "../../apis/api";

const VideoModal = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const { setSelectedDetectionId, selectedDetectionId } =
    useSelectedPostureAlertStore();

  const handleCloseButtonClick = () => {
    setSelectedDetectionId(null);
  };

  const requestDetectionVideo = async (detectionId: number) => {
    if (!videoRef.current) return;

    const { preSignedUrl } = await getDetectionVideo(detectionId);

    videoRef.current.src = preSignedUrl;
    videoRef.current.play();
  };

  useEffect(() => {
    if (!selectedDetectionId) return;

    requestDetectionVideo(selectedDetectionId);
  }, [selectedDetectionId]);

  return (
    <S.VideoModalContainer $isOpened={!!selectedDetectionId}>
      <S.Video ref={videoRef} controls />
      <S.CloseIcon
        onClick={handleCloseButtonClick}
        src={closeIcon}
        alt="닫기"
      />
    </S.VideoModalContainer>
  );
};

export default VideoModal;
