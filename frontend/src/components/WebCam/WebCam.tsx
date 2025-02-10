/* eslint-disable no-undef */

import { useEffect, useRef } from "react";

import {
  DrawingUtils,
  PoseLandmarker,
  PoseLandmarkerResult,
} from "@mediapipe/tasks-vision";

import useMeasurementStore from "../../store/useMeasurementStore";
import formatTime from "../../utils/formatTime";
import {
  ERROR_CONNECTIONS,
  ERROR_POINTS,
} from "../../constants/errorConnections";

import * as S from "./WebCamStyle";

import recordingIcon from "../../assets/icons/recording.svg";
import recordingStopIcon from "../../assets/icons/recording-stop.svg";

const WebCam = () => {
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

  // video 및 canvas 제거
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

  const haveProblem = receivedData?.problemPart
    ? Object.values(receivedData.problemPart).some(Boolean)
    : false;

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
        <S.Video ref={videoRef} />
        <S.Canvas ref={canvasRef} />

        <S.RecordingStartContainer isStreaming={stream !== null}>
          <S.RecordingStartText>
            아래 버튼을 눌러, 자세 분석을 시작해보세요.
          </S.RecordingStartText>
          <S.RecordingStartButton onClick={startMeasurement}>
            분석 시작
          </S.RecordingStartButton>
        </S.RecordingStartContainer>

        <S.ElapsedTimeContainer isStreaming={stream !== null}>
          <S.RecordingIcon src={recordingIcon} alt="녹화중" />
          {formatTime(elapsedTime)}
        </S.ElapsedTimeContainer>

        <S.RealtimeAlert haveProblem={haveProblem}>
          자세 경고가 감지되었습니다. 바른 자세를 취해주세요.
        </S.RealtimeAlert>
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
