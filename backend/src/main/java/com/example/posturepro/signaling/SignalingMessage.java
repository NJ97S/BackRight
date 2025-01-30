package com.example.posturepro.signaling;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

import dev.onvoid.webrtc.RTCIceCandidate;
import dev.onvoid.webrtc.RTCSessionDescription;
import lombok.Data;
import lombok.Getter;

@Data
@JsonInclude(JsonInclude.Include.NON_NULL) // null 값 필드 제외
public class SignalingMessage {
	private String type;
	private RTCSessionDescriptionWrapper sdp;
	private RTCIceCandidate candidate;

	// 생성자: sdp 메시지
	public SignalingMessage(String type, RTCSessionDescription description) {
		this.type = type;
		this.sdp = new RTCSessionDescriptionWrapper(description);
	}

	public SignalingMessage(String type, RTCIceCandidate candidate) {
		this.type = type;
		this.candidate = candidate;
	}

	@Getter
	static class RTCSessionDescriptionWrapper {
		@JsonProperty("type") // JSON 필드명을 "type"으로 매핑
		private final String type;

		private final String sdp;

		private RTCSessionDescriptionWrapper(RTCSessionDescription description) {
			this.type = description.sdpType.name().toLowerCase();
			this.sdp = description.sdp;
		}
	}

}
