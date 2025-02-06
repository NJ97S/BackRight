package com.example.posturepro.signaling;

import java.io.IOException;

import dev.onvoid.webrtc.RTCIceCandidate;
import dev.onvoid.webrtc.RTCIceConnectionState;

public interface IceCandidateListener {
	void onIceCandidate(String sessionId, RTCIceCandidate candidate);

	void onIceConnectionChange(String sessionId, RTCIceConnectionState state) throws IOException;
}