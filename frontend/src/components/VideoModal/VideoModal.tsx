import { useEffect, useRef } from "react";

import {
  DrawingUtils,
  FilesetResolver,
  PoseLandmarker,
  PoseLandmarkerResult,
} from "@mediapipe/tasks-vision";

import useSelectedPostureAlertStore from "../../store/useSelectedPostureAlertStore";
import { getDetectionVideo } from "../../apis/api";
import {
  ERROR_CONNECTIONS,
  ERROR_POINTS,
} from "../../constants/errorConnections";

import * as S from "./VideoModalStyle";

import closeIcon from "../../assets/icons/close.svg";

const VideoModal = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const landmarkerRef = useRef<PoseLandmarker | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const { setSelectedDetectionId, selectedDetectionId, problemPart } =
    useSelectedPostureAlertStore();

  const loadPoseLandmarker = async () => {
    if (landmarkerRef.current) return;

    try {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      const poseLandmarker = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath: "/pose_landmarker_full.task",
          delegate: "GPU",
        },
        runningMode: "VIDEO",
        numPoses: 1,
      });

      landmarkerRef.current = poseLandmarker;
    } catch (error) {
      console.error("Error loading pose landmarker:", error);
    }
  };

  const drawLandmarkers = (poses: PoseLandmarkerResult) => {
    if (!canvasRef.current || !videoRef.current) return;

    const canvas = canvasRef.current;
    const canvasContext = canvas.getContext("2d");

    if (!canvasContext) return;

    const { clientWidth, clientHeight } = videoRef.current;

    canvas.width = clientWidth;
    canvas.height = clientHeight;

    const drawingUtils = new DrawingUtils(canvasContext);

    for (const landmark of poses.landmarks) {
      drawingUtils.drawLandmarks(landmark, {
        radius: 2,
        color: "#00FF09",
      });

      drawingUtils.drawConnectors(landmark, PoseLandmarker.POSE_CONNECTIONS, {
        color: "#00FF09",
        lineWidth: 2,
      });

      if (!problemPart) return;

      Object.entries(problemPart).forEach(([key, hasIssue]) => {
        if (!hasIssue) return;

        const part = key as keyof typeof ERROR_POINTS;

        ERROR_POINTS[part]?.forEach((point) => {
          drawingUtils.drawLandmarks([landmark[point]], {
            radius: 2,
            color: "#FF0000",
          });
        });

        drawingUtils.drawConnectors(landmark, ERROR_CONNECTIONS[part] || [], {
          color: "#FF0000",
          lineWidth: 2,
        });
      });
    }
  };

  const removeCanvas = () => {
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

  const removeVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.srcObject = null;
  };

  const stopProcessing = (closeLandmarker: boolean = false) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }

    if (closeLandmarker && landmarkerRef.current) {
      landmarkerRef.current.close();
      landmarkerRef.current = null;

      removeVideo();
    }

    removeCanvas();
  };

  const detectPose = () => {
    const video = videoRef.current;
    const landmarker = landmarkerRef.current;

    if (!video || !landmarker) return;

    if (video.videoWidth === 0 || video.videoHeight === 0) {
      animationFrameRef.current = requestAnimationFrame(detectPose);
      return;
    }

    if (video.paused || video.ended) {
      stopProcessing(false);
      return;
    }

    const poses = landmarker.detectForVideo(video, performance.now());

    if (poses.landmarks.length > 0) {
      drawLandmarkers(poses);
    }

    animationFrameRef.current = requestAnimationFrame(detectPose);
  };

  const requestDetectionVideo = async (detectionId: number) => {
    const video = videoRef.current;

    if (!video) return;

    if (!landmarkerRef.current) {
      await loadPoseLandmarker();
    }

    const { preSignedUrl } = await getDetectionVideo(detectionId);

    video.crossOrigin = "anonymous";
    video.src = preSignedUrl;

    video.onplay = () => {
      if (animationFrameRef.current) return;

      detectPose();
    };

    video.onended = () => stopProcessing(false);
    video.onpause = () => stopProcessing(false);

    video.play();
  };

  const handleCloseButtonClick = () => {
    stopProcessing(true);
    setSelectedDetectionId(null);
  };

  useEffect(() => {
    if (!selectedDetectionId) return;

    requestDetectionVideo(selectedDetectionId);
  }, [selectedDetectionId]);

  return (
    <S.VideoModalContainer $isOpened={!!selectedDetectionId}>
      <S.Video ref={videoRef} controls />
      <S.Canvas ref={canvasRef} />

      <S.CloseIcon
        onClick={handleCloseButtonClick}
        src={closeIcon}
        alt="닫기"
      />
    </S.VideoModalContainer>
  );
};

export default VideoModal;
