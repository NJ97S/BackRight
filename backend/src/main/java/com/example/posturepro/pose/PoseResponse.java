package com.example.posturepro.pose;

import java.time.Instant;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import lombok.Data;

@Data
public class PoseResponse {
	private static final Logger logger = LoggerFactory.getLogger(PoseResponse.class);

	private ResponseType responseType = ResponseType.POSE_RESPONSE;
	private long sessionId;
	private long detectionId;
	private boolean referenceSet;
	private boolean poseCollapsed;
	private String videoPreSignedUrl;
	private Instant startedAt;
	private PartProblemStatus problemPart;

	public PoseResponse(long sessionId) {
		this.sessionId = sessionId;
		this.referenceSet = true;
		this.poseCollapsed = false;
		this.problemPart = new PartProblemStatus();
	}

	public String JSONString() {
		ObjectMapper objectMapper = new ObjectMapper();
		objectMapper.registerModule(new JavaTimeModule());

		// ISO-8601 형식으로 변환되도록 설정
		objectMapper.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

		try {
			return objectMapper.writeValueAsString(this);
		} catch (JsonProcessingException e) {
			logger.error("Failed to convert PoseResponse to JSON string: {}", e.getMessage());
			return "{}";  // 오류 발생 시 빈 JSON 반환
		}
	}
}
