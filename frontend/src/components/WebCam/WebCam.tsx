import { useCallback, useEffect, useRef, useState } from "react";

import { FilesetResolver, PoseLandmarker, PoseLandmarkerResult } from "@mediapipe/tasks-vision";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";

import useWebRTC from "../../hooks/useWebRTC";

import * as S from "./WebCamStyle";

import recordingStopButton from "../../assets/icons/recording-stop.svg";

const WebCam = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [landmarker, setLandmarker] = useState<PoseLandmarker | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [lastVideoTime, setLastVideoTime] = useState(-1);

  const { startConnection, sendMessage } = useWebRTC({ serverUrl: "ws://127.0.0.1:8080/helloworld" }); // TODO: serverURL 환경 변수 설정

  const setupCamera = async () => {
    const video = videoRef.current;

    if (!video) return;

    const mediaStream = await navigator.mediaDevices.getUserMedia({
      video: {
        width: { ideal: 1200 },
        height: { ideal: 720 },
      },
    });

    video.srcObject = mediaStream;
    setStream(mediaStream);

    video.onloadedmetadata = () => {
      video.play();
    };
  };

  const loadPoseLandmarker = async () => {
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

    setLandmarker(poseLandmarker);
  };

  const drawLandmarkers = (poses: PoseLandmarkerResult) => {
    if (!canvasRef.current || !videoRef.current) return;

    const canvas = canvasRef.current;
    const canvasContext = canvas.getContext("2d");

    if (!canvasContext) return;

    const { offsetWidth, offsetHeight } = videoRef.current;

    canvas.width = offsetWidth;
    canvas.height = offsetHeight;

    canvasContext.clearRect(0, 0, canvas.width, canvas.height);

    canvasContext.save();

    canvasContext.translate(canvas.width, 0);
    canvasContext.scale(-1, 1);

    for (const landmark of poses.landmarks) {
      drawLandmarks(canvasContext, landmark, {
        radius: 4,
        color: "#00FF09",
      });

      drawConnectors(
        canvasContext,
        landmark,
        PoseLandmarker.POSE_CONNECTIONS.map(({ start, end }) => [start, end]),
        {
          color: "#00FF09",
          lineWidth: 2,
        }
      );
    }

    canvasContext.restore();
  };

  const detectPose = useCallback(() => {
    if (!landmarker) return;

    const video = videoRef.current;

    if (!video) return;

    if (video.currentTime === lastVideoTime || video.videoWidth === 0 || video.videoHeight === 0) {
      requestAnimationFrame(detectPose);

      return;
    }

    setLastVideoTime(video.currentTime);

    const poses = landmarker.detectForVideo(video, performance.now());

    if (poses.landmarks.length > 0) {
      drawLandmarkers(poses);
    }

    requestAnimationFrame(detectPose);
  }, [landmarker, lastVideoTime]);

  const handleRecordingStartButtonClick = async () => {
    await startConnection();

    await setupCamera();
    await loadPoseLandmarker();

    sendMessage(); // TEST
  };

  const handleRecordingStopButtonClick = () => {
    if (!stream) return;

    stream.getTracks().forEach((track) => track.stop());
    setStream(null);

    if (!videoRef.current) return;
    videoRef.current.srcObject = null;

    if (!canvasRef.current) return;
    const canvasContext = canvasRef.current.getContext("2d");

    if (!canvasContext) return;
    canvasContext.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  useEffect(() => {
    if (landmarker) detectPose();
  }, [landmarker, detectPose]);

  return (
    <S.WebCamContainer>
      <S.VideoContainer>
        <S.Video ref={videoRef} />
        <S.Canvas ref={canvasRef} />

        <S.RecordingStartButton onClick={handleRecordingStartButtonClick} isVisible={stream === null}>
          분석 시작
        </S.RecordingStartButton>
      </S.VideoContainer>

      <S.RecordingStopButton onClick={handleRecordingStopButtonClick}>
        <S.RecordingStopIcon src={recordingStopButton} alt="분석 중지" />
        분석 종료
      </S.RecordingStopButton>
    </S.WebCamContainer>
  );
};

export default WebCam;
