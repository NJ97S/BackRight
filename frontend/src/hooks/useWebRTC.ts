/* eslint-disable no-undef */

import { useEffect, useRef } from "react";

import { Landmark } from "@mediapipe/tasks-vision";

import useMeasurementStore from "../store/useMeasurementStore";
import { ReceivedDataType } from "../types/type";

interface useWebRTCProps {
  serverUrl: string;
}

const useWebRTC = ({ serverUrl }: useWebRTCProps) => {
  const signalingServerConnectionRef = useRef<WebSocket | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);

  const { setReceivedData } = useMeasurementStore();

  const sendToServer = (message: Record<string, unknown>) => {
    const ws = signalingServerConnectionRef.current;

    if (!ws) return;

    if (ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    } else if (ws.readyState === WebSocket.CONNECTING) {
      setTimeout(() => sendToServer(message), 500);
    } else {
      console.warn("WebSocket is not open. Cannot send message.");
    }
  };

  const sendOffer = async () => {
    try {
      const offer = await peerConnectionRef.current?.createOffer();

      await peerConnectionRef.current?.setLocalDescription(offer);

      sendToServer({ type: "offer", sdp: offer });
    } catch (error) {
      console.error(`Error during negotiation: ${error}`);
    }
  };

  const handleICECandidate = (e: RTCPeerConnectionIceEvent) => {
    if (!e.candidate) return;

    sendToServer({
      type: "new-ice-candidate",
      candidate: e.candidate,
    });
  };

  const setupDataChannel = (dataChannel: RTCDataChannel) => {
    dataChannel.onopen = () => signalingServerConnectionRef.current?.close();
    dataChannel.onmessage = (e) => {
      const parsedData: ReceivedDataType = JSON.parse(e.data);

      setReceivedData(parsedData);
    };
  };

  const createPeerConnection = () => {
    const pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: "turn:i12a601.p.ssafy.io:3478",
          username: "username",
          credential: "password",
        },
      ],
    });

    pc.onnegotiationneeded = sendOffer;
    pc.onicecandidate = handleICECandidate;

    dataChannelRef.current = pc.createDataChannel("chat");
    setupDataChannel(dataChannelRef.current);

    peerConnectionRef.current = pc;
  };

  const handleAnswerMessage = async (msg: { sdp: RTCSessionDescriptionInit }) => {
    if (!peerConnectionRef.current) return;

    try {
      await peerConnectionRef.current.setRemoteDescription(new RTCSessionDescription(msg.sdp));
    } catch (error) {
      console.error("Error setting remote description:", error);
    }
  };

  const addICECandidate = async (candidate: RTCIceCandidateInit) => {
    const pc = peerConnectionRef.current;

    if (!pc) return;

    if (!pc.remoteDescription) {
      setTimeout(() => addICECandidate(candidate), 500);
      return;
    }

    try {
      await pc.addIceCandidate(new RTCIceCandidate(candidate));
    } catch (error) {
      console.error("Error adding ICE candidate:", error);
    }
  };

  const handleSignalingMessage = (e: MessageEvent) => {
    const message = JSON.parse(e.data);

    switch (message.type) {
      case "answer":
        handleAnswerMessage(message);
        break;
      case "new-ice-candidate":
        addICECandidate(message.candidate);
        break;
      default:
        console.error(`Unknown message type: ${message.type}`);
    }
  };

  const connectToServer = async () => {
    const ws = new WebSocket(serverUrl);

    signalingServerConnectionRef.current = ws;

    try {
      await new Promise<void>((resolve, reject) => {
        ws.onopen = () => resolve();
        ws.onerror = (error) => {
          console.error("WebSocket error:", error);
          reject(error);
        };
      });

      ws.onmessage = handleSignalingMessage;
    } catch (error) {
      console.error("WebSocket 연결 실패:", error);
      throw error;
    }
  };

  const startConnection = async () => {
    try {
      createPeerConnection();

      await connectToServer();
    } catch (error) {
      console.error(`Failed to start connection: ${error}`);
    }
  };

  const sendMessage = (data: Landmark[][]) => {
    const dataChannel = dataChannelRef.current;

    if (!dataChannel || dataChannel.readyState !== "open") {
      console.error("DataChannel is not open.");
      return;
    }

    dataChannel.send(JSON.stringify(data));
  };

  const closeConnection = () => {
    peerConnectionRef.current?.close();
    peerConnectionRef.current = null;

    dataChannelRef.current?.close();
    dataChannelRef.current = null;

    signalingServerConnectionRef.current?.close();
    signalingServerConnectionRef.current = null;

    setReceivedData(null);
  };

  useEffect(
    () => () => {
      peerConnectionRef.current?.close();
      signalingServerConnectionRef.current?.close();
    },
    []
  );

  return {
    startConnection,
    sendMessage,
    closeConnection,
  };
};

export default useWebRTC;
