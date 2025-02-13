package com.example.posturepro.detection.entity;

import java.time.Instant;

import com.example.posturepro.analyzingsession.entity.AnalyzingSession;
import com.example.posturepro.pose.PartProblemStatus;

import lombok.Data;

@Data
public class CreateDetectionDto {
	private Instant startedAt;
	private boolean neckDetected;
	private boolean leftShoulderDetected;
	private boolean rightShoulderDetected;
	private boolean backDetected;
	private AnalyzingSession session;

	public void setProblemParts(PartProblemStatus problemPart) {
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

