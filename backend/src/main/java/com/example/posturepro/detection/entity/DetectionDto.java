package com.example.posturepro.detection.entity;

import java.time.Instant;

import lombok.Data;

@Data
public class DetectionDto {
	private Instant detectionStartTime;
	private Instant detectionEndTime;
	private String videoUrl;
	private boolean neckDetected;
	private boolean leftShoulderDetected;
	private boolean rightShoulderDetected;
	private boolean backDetected;
	private long sessionId;
}

