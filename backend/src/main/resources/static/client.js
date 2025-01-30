// Refactored WebRTC Code using Functional and Modular Approaches
"use strict";

// Module for logging utilities
const Logger = (() => {
  const log = (text) =>
    console.log(`[${new Date().toLocaleTimeString()}] ${text}`);
  const error = (text) =>
    console.trace(`[${new Date().toLocaleTimeString()}] ${text}`);
  return { log, error };
})();

// WebSocket and signaling logic encapsulated in a class
class WebRTCClient {
  constructor(serverUrl) {
    this.serverUrl = serverUrl;
    this.signalingServerConnection = null;
    this.peerConnection = null;
    this.dataChannel = null;
  }

  async init() {
    this.setupUI();
  }

  setupUI() {
    const connectButton = document.getElementById("start-btn");
    const sendButton = document.getElementById("send-btn");
    const localContent = document.getElementById("local-content");

    connectButton.addEventListener("click", () => this.startConnection());
    sendButton.addEventListener("click", () =>
      this.sendMessage(localContent.value)
    );
  }

  async startConnection() {
    try {
      this.peerConnection = this.createPeerConnection();
      await this.connectToServer();
    } catch (error) {
      Logger.error("Failed to start connection: " + error);
    }
  }

  createPeerConnection() {
    const peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: "stun:stun.l.google.com:19302" },
        {
          urls: "turn:localhost:3478",
          username: "user",
          credential: "password",
        },
      ],
    });
    peerConnection.onnegotiationneeded = (event) => this.sendOffer(event);
    peerConnection.onicecandidate = (event) => this.handleICECandidate(event);
    peerConnection.oniceconnectionstatechange = (event) =>
      this.handleICEConnectionStateChange(event);
    peerConnection.onsignalingstatechange = (event) =>
      this.handleSignalingStateChange(event);
    peerConnection.onicegatheringstatechange = (event) =>
      this.handleICEGatheringStateChange(event);

    this.dataChannel = peerConnection.createDataChannel("chat");
    this.setupDataChannel();
    Logger.log("PeerConnection created.");
    return peerConnection;
  }

  async connectToServer() {
    return new Promise((resolve, reject) => {
      this.signalingServerConnection = new WebSocket(this.serverUrl);

      this.signalingServerConnection.onopen = () => {
        Logger.log("Connected to signaling server.");
        resolve();
      };

      this.signalingServerConnection.onerror = (error) => {
        Logger.error("WebSocket error:");
        Logger.error(error);
        reject(error);
      };

      this.signalingServerConnection.onmessage = (event) =>
        this.handleSignalingMessage(event);
    });
  }

  handleSignalingMessage(event) {
    const message = JSON.parse(event.data);
    Logger.log(
      `Received message: ${message.type}\n ${JSON.stringify(message)}`
    );

    switch (message.type) {
      case "answer":
        this.handleAnswerMessage(message);
        break;
      case "new-ice-candidate":
        const newCandidate = {
          ...message.candidate,
          candidate: message.candidate.sdp,
        };
        this.addICECandidate(newCandidate);
        break;
      default:
        Logger.error("Unknown message type: " + message.type);
    }
  }

  async sendOffer() {
    try {
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);

      this.sendToServer({
        type: "offer",
        sdp: this.peerConnection.localDescription,
      });

      Logger.log("Offer sent.");
    } catch (error) {
      Logger.error("Error during negotiation: " + error);
    }
  }

  async handleAnswerMessage(message) {
    const desc = new RTCSessionDescription(message.sdp);
    await this.peerConnection.setRemoteDescription(desc);

    Logger.log("Answer set as remote description. ");
  }

  addICECandidate(candidate) {
    this.peerConnection
      .addIceCandidate(new RTCIceCandidate(candidate))
      .then(() => Logger.log("ICE candidate added."))
      .catch((error) => Logger.error("Error adding ICE candidate: " + error));
  }

  handleICECandidate(event) {
    if (event.candidate) {
      this.sendToServer({
        type: "new-ice-candidate",
        candidate: event.candidate,
      });
      Logger.log(`Sent ICE candidate. ${JSON.stringify(event.candidate)}`);
    }
  }

  handleICEConnectionStateChange(event) {
    Logger.log(
      `ICE connection state changed to: ${this.peerConnection.iceConnectionState}`
    );
    if (
      ["closed", "failed", "disconnected"].includes(
        this.peerConnection.iceConnectionState
      )
    ) {
      Logger.error("ICE connection state is problematic.");
    }
  }

  handleSignalingStateChange(event) {
    Logger.log(
      `Signaling state changed to: ${this.peerConnection.signalingState}`
    );
    if (this.peerConnection.signalingState === "closed") {
      Logger.error("Signaling connection is closed.");
    }
  }

  handleICEGatheringStateChange(event) {
    Logger.log(
      `ICE gathering state changed to: ${this.peerConnection.iceGatheringState}`
    );
  }

  setupDataChannel() {
    Logger.log("Data Channel Setup");
    this.dataChannel.onopen = () => {
      Logger.log("DataChannel is open.");
      this.signalingServerConnection.close();
      document.getElementById("local-content").disabled = false;
      document.getElementById("send-btn").disabled = false;
    };

    this.dataChannel.onclose = () => {
      Logger.log("DataChannel is closed.");
      document.getElementById("local-content").disabled = true;
      document.getElementById("send-btn").disabled = true;
    };

    this.dataChannel.onmessage = (event) => {
      Logger.log(`Message received: ${event.data}`);
      const remoteContent = document.getElementById("remote-content");
      remoteContent.innerHTML += `${event.data}\n`;
    };
  }

  async sendToServer(message) {
    const messageJSON = JSON.stringify(message);

    if (this.signalingServerConnection.readyState === WebSocket.OPEN) {
      Logger.log("Sending '" + message.type + "' message: " + messageJSON);
      await this.signalingServerConnection.send(messageJSON);
    } else if (
      this.signalingServerConnection.readyState === WebSocket.CONNECTING
    ) {
      Logger.log("WebSocket is still connecting. Retrying...");
      setTimeout(() => this.sendToServer(message), 500); // 재시도 로직
    } else {
      Logger.log("WebSocket is not open. Message cannot be sent.");
    }
  }

  sendMessage(message) {
    if (this.dataChannel && this.dataChannel.readyState === "open") {
      this.dataChannel.send(message);
      Logger.log("Message sent via DataChannel.");
    } else {
      Logger.error("DataChannel is not open.");
    }
  }
}

// Initialize WebRTC Client
document.addEventListener("DOMContentLoaded", () => {
  const webRTCClient = new WebRTCClient("ws://127.0.0.1:8080/helloworld");
  webRTCClient.init();
});
