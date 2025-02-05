package com.example.posturepro.peer;

import static java.util.Objects.*;

import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;

import com.example.posturepro.peer.observer.CreateDescriptionObserver;
import com.example.posturepro.peer.observer.SetDescriptionObserver;
import com.example.posturepro.pose.PoseDataProcessor;
import com.example.posturepro.signaling.IceCandidateListener;

import dev.onvoid.webrtc.PeerConnectionFactory;
import dev.onvoid.webrtc.PeerConnectionObserver;
import dev.onvoid.webrtc.RTCAnswerOptions;
import dev.onvoid.webrtc.RTCConfiguration;
import dev.onvoid.webrtc.RTCDataChannel;
import dev.onvoid.webrtc.RTCDataChannelBuffer;
import dev.onvoid.webrtc.RTCDataChannelObserver;
import dev.onvoid.webrtc.RTCIceCandidate;
import dev.onvoid.webrtc.RTCIceConnectionState;
import dev.onvoid.webrtc.RTCIceServer;
import dev.onvoid.webrtc.RTCIceTransportPolicy;
import dev.onvoid.webrtc.RTCPeerConnection;
import dev.onvoid.webrtc.RTCSessionDescription;

public class RTCPeerConnectionHandler implements PeerConnectionObserver {
	private final List<String> receivedTexts;

	private RTCPeerConnection localPeerConnection;

	private RTCDataChannel localDataChannel;

	private final String sessionId;
	private final IceCandidateListener listener;

	private final Logger logger;
	private final PoseDataProcessor poseDataProcessor;

	public RTCPeerConnectionHandler(PeerConnectionFactory factory, String sessionId, IceCandidateListener listener,
		Logger logger) {
		this.sessionId = sessionId;
		this.listener = listener;
		this.logger = logger;
		RTCConfiguration config = new RTCConfiguration();
		RTCIceServer iceServer = new RTCIceServer();
		// iceServer.urls.add("stun:stun.l.google.com:19302");
		iceServer.urls.add("turn:i12a601.p.ssafy.io:3478");
		iceServer.username = "username";
		iceServer.password = "password";
		config.iceTransportPolicy = RTCIceTransportPolicy.RELAY;

		config.iceServers.add(iceServer);

		localPeerConnection = factory.createPeerConnection(config, this);

		poseDataProcessor = new PoseDataProcessor();
		receivedTexts = new ArrayList<>();
	}

	public void addIceCandidate(RTCIceCandidate candidate) {
		logger.info("[Handler::addIceCandidate] candidate added");
		localPeerConnection.addIceCandidate(candidate);
	}

	@Override
	public void onIceCandidate(RTCIceCandidate candidate) {
		if (listener != null) {
			listener.onIceCandidate(sessionId, candidate);
		}
	}

	@Override
	public void onIceConnectionChange(RTCIceConnectionState state) {
		if (listener != null) {
			try {
				listener.onIceConnectionChange(sessionId, state);
			} catch (IOException e) {
				throw new RuntimeException(e);
			}
		}
	}

	@Override
	public void onDataChannel(RTCDataChannel dataChannel) {
		logger.info("Data Channel");
		localDataChannel = dataChannel;
		localDataChannel.registerObserver(new RTCDataChannelObserver() {

			@Override
			public void onBufferedAmountChange(long previousAmount) {
			}

			@Override
			public void onStateChange() {
				logger.info("Data Channel State is changed into {}", localDataChannel.getState());
			}

			@Override
			public void onMessage(RTCDataChannelBuffer buffer) {
				try {
					String receivedText = decodeMessage(buffer);
					// String sendingText = "Received Message" + receivedText;
					// logger.info(sendingText);

					String sendingText = poseDataProcessor.processPoseData(receivedText);

					sendTextMessage(sendingText);
				} catch (Exception e) {
					throw new RuntimeException("Decode Failed.");
				}
			}
		});
	}

	public RTCSessionDescription createAnswer() throws Exception {
		CreateDescriptionObserver createObserver = new CreateDescriptionObserver();
		SetDescriptionObserver setObserver = new SetDescriptionObserver();

		localPeerConnection.createAnswer(new RTCAnswerOptions(), createObserver);

		RTCSessionDescription answerDesc = createObserver.get();

		localPeerConnection.setLocalDescription(answerDesc, setObserver);
		setObserver.get();

		return answerDesc;
	}

	public void setRemoteDescription(RTCSessionDescription description) throws Exception {
		SetDescriptionObserver setObserver = new SetDescriptionObserver();

		localPeerConnection.setRemoteDescription(description, setObserver);
		setObserver.get();
	}

	void sendTextMessage(String message) throws Exception {
		ByteBuffer data = ByteBuffer.wrap(message.getBytes(StandardCharsets.UTF_8));
		RTCDataChannelBuffer buffer = new RTCDataChannelBuffer(data, false);

		localDataChannel.send(buffer);
	}

	List<String> getReceivedTexts() {
		return receivedTexts;
	}

	void close() {
		if (nonNull(localDataChannel)) {
			localDataChannel.unregisterObserver();
			localDataChannel.close();
			localDataChannel.dispose();
			localDataChannel = null;
		}

		if (nonNull(localPeerConnection)) {
			localPeerConnection.close();
			localPeerConnection = null;
		}
	}

	private String decodeMessage(RTCDataChannelBuffer buffer) {
		ByteBuffer byteBuffer = buffer.data;
		byte[] payload;

		if (byteBuffer.hasArray()) {
			payload = byteBuffer.array();
		} else {
			payload = new byte[byteBuffer.limit()];

			byteBuffer.get(payload);
		}

		String text = new String(payload, StandardCharsets.UTF_8);

		receivedTexts.add(text);
		return text;
	}

	RTCSessionDescription getRemoteDescription() {
		return localPeerConnection.getRemoteDescription();
	}
}
