package com.example.posturepro.detection.entity;

import java.time.Instant;

import com.example.posturepro.pose.PartProblemStatus;

import lombok.Data;

@Data
public class DetectionDto {
	private long detectionId;
	private Instant startedAt;
	private Instant endedAt;
	private String videoPreSignedUrl;
	private boolean neckDetected;
	private boolean leftShoulderDetected;
	private boolean rightShoulderDetected;
	private boolean backDetected;

	public void setDetected(PartProblemStatus problemPart) {
		if (problemPart.isNeck())
			neckDetected = true;
		if (problemPart.isLeftShoulder())
			leftShoulderDetected = true;
		if (problemPart.isRightShoulder())
			rightShoulderDetected = true;
		if (problemPart.isBack())
			backDetected = true;
	}
}

