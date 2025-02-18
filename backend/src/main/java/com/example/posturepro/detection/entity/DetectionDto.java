package com.example.posturepro.detection.entity;

import java.time.Instant;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DetectionDto {
	private Long id;
	private Instant startedAt;
	private Instant endedAt;
	private boolean neckDetected;
	private boolean leftShoulderDetected;
	private boolean rightShoulderDetected;
	private boolean backDetected;

	private DetectionDto(Detection detection) {
		this.id = detection.getId();
		this.startedAt = detection.getStartedAt();
		this.neckDetected = detection.isNeckDetected();
		this.leftShoulderDetected = detection.isLeftShoulderDetected();
		this.rightShoulderDetected = detection.isRightShoulderDetected();
		this.backDetected = detection.isBackDetected();
	}

	public static DetectionDto fromDetection(Detection detection) {
		return new DetectionDto(detection);
	}
}