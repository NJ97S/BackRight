package com.example.posturepro.signaling;

import com.fasterxml.jackson.annotation.JsonInclude;

import dev.onvoid.webrtc.RTCIceCandidate;
import dev.onvoid.webrtc.RTCSessionDescription;
import lombok.Data;
import lombok.Getter;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL) // null 값 필드 제외
public class SignalingMessage {
	private String type;
	private RTCSessionDescriptionWrapper sdp;
	private RTCIceCandidateWrapper candidate;

	// 생성자: sdp 메시지
	public SignalingMessage(String type, RTCSessionDescription description) {
		this.type = type;
		this.sdp = new RTCSessionDescriptionWrapper(description);
	}

	public SignalingMessage(String type, RTCIceCandidate candidate) {
		this.type = type;
		this.candidate = new RTCIceCandidateWrapper(candidate);
	}

	@Getter
	static class RTCSessionDescriptionWrapper {
		private final String type;

		private final String sdp;

		private RTCSessionDescriptionWrapper(RTCSessionDescription description) {
			this.type = description.sdpType.name().toLowerCase();
			this.sdp = description.sdp;
		}
	}

	@Getter
	static class RTCIceCandidateWrapper {
		private final String candidate;
		private final String sdpMid;
		private final int sdpMLineIndex;
		private final String serverUrl;

		private RTCIceCandidateWrapper(RTCIceCandidate candidate) {
			this.candidate = candidate.sdp;
			this.sdpMid = candidate.sdpMid;
			this.sdpMLineIndex = candidate.sdpMLineIndex;
			this.serverUrl = candidate.serverUrl;
		}
	}

}
