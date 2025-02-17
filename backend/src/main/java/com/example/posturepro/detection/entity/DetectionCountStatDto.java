package com.example.posturepro.detection.entity;

import java.time.Duration;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

import lombok.Data;

@Data
public class DetectionCountStatDto {
	private int totalDetection = 0;
	private Map<DetectionType, Integer> counts;
	private long detectionDuration = 0;

	public DetectionCountStatDto() {
		this.totalDetection = 0;
		this.counts = new EnumMap<>(DetectionType.class);
		for (DetectionType type : DetectionType.values()) {
			counts.put(type, 0);
		}
	}

	public DetectionCountStatDto(List<Detection> detections) {
		this();
		if (detections == null || detections.isEmpty()) {
			return;
		}
		this.totalDetection = detections.size();
		for (Detection detection : detections) {
			if (detection.isNeckDetected())
				counts.compute(DetectionType.NECK, (k, v) -> v + 1);
			if (detection.isLeftShoulderDetected())
				counts.compute(DetectionType.LEFT_SHOULDER, (k, v) -> v + 1);
			if (detection.isRightShoulderDetected())
				counts.compute(DetectionType.RIGHT_SHOULDER, (k, v) -> v + 1);
			if (detection.isBackDetected())
				counts.compute(DetectionType.BACK, (k, v) -> v + 1);
			detectionDuration += Duration.between(detection.getStartedAt(), detection.getEndedAt()).toMinutes();
		}
	}

	public void addDetectionStat(DetectionCountStatDto detectionStat) {
		this.totalDetection += detectionStat.getTotalDetection();
		for (DetectionType type : DetectionType.values()) {
			this.counts.compute(type, (k, v) -> v + detectionStat.getCounts().get(type));
		}
		this.detectionDuration += detectionStat.getDetectionDuration();
	}
}
