/* eslint-disable no-undef */

import { useEffect, useRef, useState } from "react";

import {
  DrawingUtils,
  PoseLandmarker,
  PoseLandmarkerResult,
} from "@mediapipe/tasks-vision";

import RealtimeMessage from "../RealtimeMessage/RealtimeMessage";
import PostureAlert from "../PostureAlert/PostureAlert";
import StandardPoseGuide from "../StandardPoseGuide/StandardPoseGuide";
import VideoModal from "../VideoModal/VideoModal";

import useMeasurementStore from "../../store/useMeasurementStore";
import useSelectedPostureAlertStore from "../../store/useSelectedPostureAlertStore";
import formatRunningTime from "../../utils/formatRunningTime";
import {
  ERROR_CONNECTIONS,
  ERROR_POINTS,
} from "../../constants/errorConnections";

import * as S from "./WebCamStyle";

import recordingIcon from "../../assets/icons/recording.svg";
import recordingStopIcon from "../../assets/icons/recording-stop.svg";

const WebCam = () => {
  const [isGuideOpened, setIsGuideOpened] = useState(false);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const {
    startMeasurement,
    stopMeasurement,
    stream,
    elapsedTime,
    receivedData,
    landmarkResult,
  } = useMeasurementStore();
  const { selectedDetectionId } = useSelectedPostureAlertStore();

  const handleGuideOpenButtonClick = () => {
    setIsGuideOpened(true);
  };

  const handleGuideCloseButtonClick = () => {
    setIsGuideOpened(false);
  };

  const displayVideo = () => {
    const video = videoRef.current;

    if (!video) return;

    video.srcObject = stream;

    video.onloadedmetadata = () => {
      video.play();
    };
  };

  const drawLandmarkers = (poses: PoseLandmarkerResult) => {
    if (!canvasRef.current || !videoRef.current) return;

    const canvas = canvasRef.current;
    const canvasContext = canvas.getContext("2d");

    if (!canvasContext) return;

    const { clientWidth, clientHeight } = videoRef.current;

    canvas.width = clientWidth;
    canvas.height = clientHeight;

    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    canvasContext.save();

    canvasContext.translate(canvas.width, 0);
    canvasContext.scale(-1, 1);

    const drawingUtils = new DrawingUtils(canvasContext);

    for (const landmark of poses.landmarks) {
      drawingUtils.drawLandmarks(landmark, {
        radius: 4,
        color: "#00FF09",
      });

      drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS, {
        color: "#00FF09",
        lineWidth: 2,
      });

      if (!receivedData?.problemPart) return;

      Object.entries(receivedData.problemPart).forEach(([key, hasIssue]) => {
        if (!hasIssue) return;

        const part = key as keyof typeof ERROR_POINTS;

        ERROR_POINTS[part]?.forEach((point) => {
          drawingUtils.drawLandmarks([landmark[point]], {
            radius: 4,
            color: "#FF0000",
          });
        });

        drawingUtils.drawConnectors(landmark, ERROR_CONNECTIONS[part] || [], {
          color: "#FF0000",
          lineWidth: 2,
        });
      });
    }

    canvasContext.restore();
  };

  const removeDiaplay = () => {
    if (!videoRef.current) return;
    videoRef.current.srcObject = null;

    if (!canvasRef.current) return;
    const canvasContext = canvasRef.current.getContext("2d");

    if (!canvasContext) return;
    canvasContext.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };

  useEffect(() => {
    if (stream) displayVideo();
    else removeDiaplay();
  }, [stream]);

  useEffect(() => {
    if (!landmarkResult) return;

    drawLandmarkers(landmarkResult);
  }, [landmarkResult]);

  return (
    <S.WebCamContainer>
      <S.VideoContainer>
        {isGuideOpened ? (
          <StandardPoseGuide onClick={handleGuideCloseButtonClick} />
        ) : (
          <>
            <S.Blur $isBlur={!!selectedDetectionId}>
              <S.Video ref={videoRef} />
              <S.Canvas ref={canvasRef} />

              <S.RecordingStartContainer isStreaming={stream !== null}>
                <S.GuideButton
                  type="button"
                  onClick={handleGuideOpenButtonClick}
                >
                  바른 자세 가이드
                </S.GuideButton>
                <S.RecordingStartButton
                  type="button"
                  onClick={startMeasurement}
                >
                  분석 시작
                </S.RecordingStartButton>
              </S.RecordingStartContainer>

              <S.ElapsedTimeContainer isStreaming={stream !== null}>
                <S.RecordingIcon src={recordingIcon} alt="녹화중" />
                {formatRunningTime(elapsedTime)}
              </S.ElapsedTimeContainer>

              <RealtimeMessage
                type="setting"
                isDisplayed={!!receivedData && !receivedData.referenceSet}
              >
                초기 자세를 설정중입니다. 바른 자세를 유지해주세요.
              </RealtimeMessage>

              <RealtimeMessage
                type="alert"
                isDisplayed={!!receivedData?.poseCollapsed}
              >
                자세 경고가 감지되었습니다. 바른 자세를 취해주세요.
              </RealtimeMessage>
            </S.Blur>

            <VideoModal />

            <PostureAlert />
          </>
        )}
      </S.VideoContainer>

      <S.RecordingStopButton
        onClick={stopMeasurement}
        isStreaming={stream !== null}
      >
        <S.RecordingStopIcon src={recordingStopIcon} alt="분석 중지" />
        분석 종료
      </S.RecordingStopButton>
    </S.WebCamContainer>
  );
};

export default WebCam;
