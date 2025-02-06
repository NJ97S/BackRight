package com.example.posturepro.pose;

import com.example.posturepro.detection.entity.DetectionType;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Data;

@Data
public class PoseResponse {
	private boolean initialSet;
	private boolean detected;
	private String videoUrl;
	private PostureStatus postureStatus;

	public PoseResponse() {
		initialSet = true;
		detected = false;
		this.postureStatus = new PostureStatus();
	}

	public String JSONString() {
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			return objectMapper.writeValueAsString(this);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
			return "{}";  // 오류 발생 시 빈 JSON 반환
		}
	}

	public void markDetection(DetectionType detectionEnum) {
		postureStatus.markDetection(detectionEnum);
	}

	@Data
	private static class PostureStatus {
		private boolean neck = true;
		private boolean leftShoulder = true;
		private boolean rightShoulder = true;
		private boolean back = true;

		public void markDetection(DetectionType detectionEnum) {
			switch (detectionEnum) {
				case NECK -> neck = false;
				case LEFT_SHOULDER -> leftShoulder = false;
				case RIGHT_SHOULDER -> rightShoulder = false;
				case BACK -> back = false;
			}
		}
	}
}
