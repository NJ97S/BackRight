/* eslint-disable no-undef */

import { useEffect, useRef } from "react";

interface useWebRTCProps {
  serverUrl: string;
}

const useWebRTC = ({ serverUrl }: useWebRTCProps) => {
  const signalingServerConnectionRef = useRef<WebSocket | null>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const dataChannelRef = useRef<RTCDataChannel | null>(null);

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
    dataChannel.onmessage = (e) => console.log("Message received:", e.data);
  };

  const createPeerConnection = () => {
    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        {
          urls: "turn:localhost:3478",
          username: "user",
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
        {
          const newCandidate = {
            ...message.candidate,
            candidate: message.candidate.sdp,
          };

          addICECandidate(newCandidate);
        }
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

  // TODO: 랜드마크 좌표 데이터 받아서 넘기도록 변경
  const sendMessage = () => {
    const dataChannel = dataChannelRef.current;

    if (!dataChannel || dataChannel.readyState !== "open") {
      console.error("DataChannel is not open.");
      return;
    }

    dataChannel.send("꽃가루를 날려어어 메세지를 보내애ㅐ");
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
  };
};

export default useWebRTC;
