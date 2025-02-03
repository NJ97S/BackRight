package com.example.posturepro.signaling;

import java.io.IOException;
import java.util.concurrent.ConcurrentHashMap;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.example.posturepro.peer.ServerConnection;
import com.example.posturepro.signaling.dto.ClientIceCandidate;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import dev.onvoid.webrtc.PeerConnectionFactory;
import dev.onvoid.webrtc.RTCConfiguration;
import dev.onvoid.webrtc.RTCIceCandidate;
import dev.onvoid.webrtc.RTCIceConnectionState;
import dev.onvoid.webrtc.RTCSdpType;
import dev.onvoid.webrtc.RTCSessionDescription;
import dev.onvoid.webrtc.media.audio.AudioDeviceModule;
import dev.onvoid.webrtc.media.audio.AudioLayer;

@Component
public class SignalingHandler extends TextWebSocketHandler implements IceCandidateListener {
	private static final Logger logger = LoggerFactory.getLogger(SignalingHandler.class);
	private static final ObjectMapper objectMapper = new ObjectMapper();

	protected PeerConnectionFactory factory;
	protected AudioDeviceModule audioDevModule;
	protected RTCConfiguration config;

	private final ConcurrentHashMap<String, ServerConnection> serverConnections =
		new ConcurrentHashMap<>();

	private final ConcurrentHashMap<String, SerializedWebSocketSender> sessionHandlers =
		new ConcurrentHashMap<>();

	SignalingHandler() {
		audioDevModule = new AudioDeviceModule(AudioLayer.kDummyAudio);
		factory = new PeerConnectionFactory(audioDevModule);
		config = new RTCConfiguration();
	}

	private ServerConnection initializeSession(final WebSocketSession session) {
		final String sessionId = session.getId();

		if (serverConnections.containsKey(sessionId)) {
			return serverConnections.get(sessionId);
		}

		logger.info("[Handler::initializeSession] Initializing session, sessionId: {}", sessionId);

		var sessionHandler = new SerializedWebSocketSender(session);
		sessionHandlers.put(sessionId, sessionHandler);

		var serverConnection = new ServerConnection(factory, sessionId, this, logger);
		serverConnections.put(sessionId, serverConnection);

		return serverConnection;
	}

	@Override
	public void afterConnectionEstablished(WebSocketSession session) {
		logger.info("[Handler::afterConnectionEstablished] New WebSocket connection, sessionId: {}",
			session.getId());
	}

	@Override
	public void afterConnectionClosed(final WebSocketSession session,
		CloseStatus status) {
		var sessionId = session.getId();
		if (!status.equalsCode(CloseStatus.NORMAL)) {
			logger.warn("[Handler::afterConnectionClosed] status: {}, sessionId: {}",
				status, sessionId);
			return;
		}
		logger.info("[Handler::afterConnectionClosed] sessionId: {}", sessionId);
		sessionHandlers.remove(sessionId);
		serverConnections.remove(sessionId);
	}

	@Override
	public void onIceCandidate(String sessionId, RTCIceCandidate candidate) {
		SignalingMessage signalingMessage = new SignalingMessage("new-ice-candidate", candidate);

		try {
			String jsonString = objectMapper.writeValueAsString(signalingMessage);

			sessionHandlers.get(sessionId).sendMessage(jsonString);
		} catch (IOException e) {
			logger.error("Failed to serialize ICE Candidate message", e);
		}
	}

	@Override
	public void onIceConnectionChange(String sessionId, RTCIceConnectionState state) {
		logger.info("[Handler::IceConnectionChange] ICE Connection state is changed into {}", state);
	}

	@Override
	protected void handleTextMessage(WebSocketSession session,
		TextMessage message) throws Exception {
		final String sessionId = session.getId();
		JsonNode rootNode = objectMapper.readTree(message.getPayload());

		logger.info("[Handler::handleTextMessage] message: {}, sessionId: {}",
			rootNode, sessionId);

		try {
			final String type = rootNode.get("type").asText();
			switch (type) {
				case "offer":
					handleProcessSdpOffer(session, rootNode);
					break;
				case "new-ice-candidate":
					handleAddIceCandidate(session, rootNode);
					break;
				default:
					logger.warn("[Handler::handleTextMessage] Skip, invalid message, id: {}",
						type);
					break;
			}
		} catch (Throwable ex) {
			logger.error("[Handler::handleTextMessage] Exception: {}, sessionId: {}",
				ex, sessionId);
		}

	}

	private void handleProcessSdpOffer(final WebSocketSession session, JsonNode rootNode) {
		final String sessionId = session.getId();
		logger.info("[Handler::handleProcessSdpOffer] Processing offer, sessionId: {}", sessionId);

		var serverConnection = initializeSession(session);
		var sdpNode = rootNode.get("sdp");

		try {
			var remoteDescription = new RTCSessionDescription(RTCSdpType.OFFER, sdpNode.get("sdp").asText());
			serverConnection.setRemoteDescription(remoteDescription);
			logger.info("[Handler::handleProcessSdpOffer] Remote description set, sessionId: {}", sessionId);

			var answerDescription = serverConnection.createAnswer();
			SignalingMessage signalingMessage = new SignalingMessage("answer", answerDescription);

			String jsonString = objectMapper.writeValueAsString(signalingMessage);
			logger.info("[Handler::sendAnswerMessage] {}", jsonString);
			sessionHandlers.get(sessionId).sendMessage(jsonString);
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
	}

	private void handleAddIceCandidate(final WebSocketSession session, JsonNode rootNode) {
		final String sessionId = session.getId();
		logger.info("[Handler::handleAddIceCandidate] Adding ICE candidate, sessionId: {}", sessionId);

		var serverConnection = initializeSession(session);
		var clientCandidate = objectMapper.convertValue(rootNode.get("candidate"), ClientIceCandidate.class);
		var rtcIceCandidate = new RTCIceCandidate(clientCandidate.sdpMid(), clientCandidate.sdpMLineIndex(),
			clientCandidate.candidate());

		serverConnection.addIceCandidate(rtcIceCandidate);
		logger.info("[Handler::handleAddIceCandidate] ICE Candidate added, sessionId: {}", sessionId);
	}

}
