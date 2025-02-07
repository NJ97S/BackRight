package com.example.posturepro.pose;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.example.posturepro.detection.entity.DetectionType;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Data;

@Data
public class PoseResponse {
	private static final Logger logger = LoggerFactory.getLogger(PoseResponse.class);

	private boolean initialSet;
	private boolean detected;
	private String videoUrl;
	private PartProblemStatus problemPart;

	public PoseResponse() {
		initialSet = true;
		detected = false;
		this.problemPart = new PartProblemStatus();
	}

	public String JSONString() {
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			return objectMapper.writeValueAsString(this);
		} catch (JsonProcessingException e) {
			logger.error("Failed to convert PoseResponse to JSON string: {}", e.getMessage());
			return "{}";  // 오류 발생 시 빈 JSON 반환
		}
	}

	public void markProblem(DetectionType detectionEnum) {
		problemPart.markProblem(detectionEnum);
	}
}
