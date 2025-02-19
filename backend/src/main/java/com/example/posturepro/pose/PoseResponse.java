package com.example.posturepro.pose;

import java.time.Instant;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PoseResponse extends AbstractResponse {
	private long sessionId;
	private long detectionId;
	private boolean referenceSet;
	private boolean poseCollapsed;
	private String videoPreSignedUrl;
	private Instant startedAt;
	private PartProblemStatus problemPart;

	public PoseResponse(long sessionId) {
		super(ResponseType.POSE_RESPONSE);
		this.sessionId = sessionId;
		this.referenceSet = true;
		this.poseCollapsed = false;
		this.problemPart = new PartProblemStatus();
	}
}
