/* eslint-disable no-undef */

import {useCallback, useEffect, useRef, useState} from "react";

import {DrawingUtils, FilesetResolver, Landmark, PoseLandmarker, PoseLandmarkerResult,} from "@mediapipe/tasks-vision";

import useWebRTC from "../../hooks/useWebRTC";

import formatTime from "../../utils/formatTime";
import {ERROR_CONNECTIONS, ERROR_POINTS,} from "../../constants/errorConnections";

import * as S from "./WebCamStyle";

import recordingIcon from "../../assets/icons/recording.svg";
import recordingStopIcon from "../../assets/icons/recording-stop.svg";
import {ReceivedDataType} from "../../types/type";

const WEBSOCKET_URL = import.meta.env.VITE_WEBSOCKET_URL;

const WebCam = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const landmarkStorageRef = useRef<Landmark[][]>([]);
    const lastVideoTime = useRef(-1);
    const postureStatus = useRef<ReceivedDataType["postureStatus"] | null>(null);

    const [landmarker, setLandmarker] = useState<PoseLandmarker | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [elapsedTime, setElapsedTime] = useState(0);

    const {startConnection, sendMessage, closeConnection, receivedData} =
        useWebRTC({
            serverUrl: WEBSOCKET_URL,
        });

    const setupCamera = async () => {
        const video = videoRef.current;

        if (!video) return;

        const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: {
                width: {ideal: 1200},
                height: {ideal: 720},
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

        const {clientWidth, clientHeight} = videoRef.current;

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

            // 경고 받은 부위 빨간색으로 표시
            if (!postureStatus.current) return;

            (
                Object.keys(
                    postureStatus.current
                ) as (keyof ReceivedDataType["postureStatus"])[]
            )
                .filter((key) => postureStatus.current![key])
                .forEach((key) => {
                    ERROR_POINTS[key].forEach((point) => {
                        drawingUtils.drawLandmarks([landmark[point]], {
                            radius: 4,
                            color: "#FF0000",
                        });
                    });

                    drawingUtils.drawConnectors(landmark, ERROR_CONNECTIONS[key], {
                        color: "#FF0000",
                        lineWidth: 2,
                    });
                });
        }

        canvasContext.restore();
    };

    const pushLandmark = (landmark: Landmark[]) => {
        landmarkStorageRef.current.push(landmark);

        if (landmarkStorageRef.current.length < 10) return;

        sendMessage(landmarkStorageRef.current);

        landmarkStorageRef.current = [];
    };

    const detectPose = useCallback(() => {
        if (!landmarker) return;

        const video = videoRef.current;

        if (!video) return;

        if (
            video.currentTime === lastVideoTime.current ||
            video.videoWidth === 0 ||
            video.videoHeight === 0
        ) {
            requestAnimationFrame(detectPose);

            return;
        }

        lastVideoTime.current = video.currentTime;

        const poses = landmarker.detectForVideo(video, performance.now());

        if (poses.landmarks.length > 0) {
            pushLandmark(poses.landmarks[0]);
            drawLandmarkers(poses);
        }

        requestAnimationFrame(detectPose);
    }, [landmarker, lastVideoTime]);

    const handleRecordingStartButtonClick = async () => {
        // WebRTC 연결 및 자세분석 준비
        await startConnection();

        await setupCamera();
        await loadPoseLandmarker();

        // 타이머 준비
        if (timerRef.current) clearInterval(timerRef.current);

        timerRef.current = setInterval(() => {
            setElapsedTime((prev) => prev + 1);
        }, 1000);
    };

    const handleRecordingStopButtonClick = () => {
        if (!stream) return;

        // landmark 데이터 남아있으면 전송
        if (landmarkStorageRef.current.length > 0) {
            sendMessage(landmarkStorageRef.current);
            landmarkStorageRef.current = [];
        }

        // WebRTC 연결 종료
        closeConnection();

        stream.getTracks().forEach((track) => track.stop());
        setStream(null);

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

        // 타이머 초기화
        if (timerRef.current) clearInterval(timerRef.current);

        setElapsedTime(0);
    };

    useEffect(() => {
        if (landmarker) detectPose();
    }, [landmarker, detectPose]);

    useEffect(() => {
        if (!receivedData) return;

        postureStatus.current = receivedData.postureStatus;

        console.log(receivedData);
    }, [receivedData]);

    return (
        <S.WebCamContainer>
            <S.VideoContainer>
                <S.Video ref={videoRef}/>
                <S.Canvas ref={canvasRef}/>

                <S.RecordingStartContainer isStreaming={stream !== null}>
                    <S.RecordingStartText>
                        아래 버튼을 눌러, 자세 분석을 시작해보세요.
                    </S.RecordingStartText>
                    <S.RecordingStartButton onClick={handleRecordingStartButtonClick}>
                        분석 시작
                    </S.RecordingStartButton>
                </S.RecordingStartContainer>

                <S.ElapsedTimeContainer isStreaming={stream !== null}>
                    <S.RecordingIcon src={recordingIcon} alt="녹화중"/>
                    {formatTime(elapsedTime)}
                </S.ElapsedTimeContainer>

                <S.RealtimeAlert
                    haveProblem={receivedData && !!receivedData.postureStatus}
                >
                    자세 경고가 감지되었습니다. 바른 자세를 취해주세요.
                </S.RealtimeAlert>
            </S.VideoContainer>

            <S.RecordingStopButton
                onClick={handleRecordingStopButtonClick}
                isStreaming={stream !== null}
            >
                <S.RecordingStopIcon src={recordingStopIcon} alt="분석 중지"/>
                분석 종료
            </S.RecordingStopButton>
        </S.WebCamContainer>
    );
};

export default WebCam;
