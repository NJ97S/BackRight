package com.example.posturepro.detection.entity;

import java.time.Duration;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;

import com.example.posturepro.report.entity.DailyStat;

import lombok.Data;

@Data
public class DetectionStatAggregator {
	private int totalDetection;
	private Map<DetectionType, Integer> counts;
	private long detectionDuration;

	public DetectionStatAggregator() {
		this.totalDetection = 0;
		this.detectionDuration = 0;
		this.counts = new EnumMap<>(DetectionType.class);
		for (DetectionType type : DetectionType.values()) {
			counts.put(type, 0);
		}
	}

	public DetectionStatAggregator(List<Detection> detections) {
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

	public DetectionStatAggregator(DailyStat dailyStat) {
		this();
		totalDetection = dailyStat.getTotalDetection();
		counts.put(DetectionType.NECK, dailyStat.getNeckDetectionCount());
		counts.put(DetectionType.LEFT_SHOULDER, dailyStat.getLeftShoulderDetectionCount());
		counts.put(DetectionType.RIGHT_SHOULDER, dailyStat.getRightShoulderDetectionCount());
		counts.put(DetectionType.BACK, dailyStat.getBackDetectionCount());
		detectionDuration = dailyStat.getTotalDuration() - dailyStat.getProperPoseDuration();
	}

	public void addDetectionStat(Detection detection) {
		totalDetection += 1;
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
