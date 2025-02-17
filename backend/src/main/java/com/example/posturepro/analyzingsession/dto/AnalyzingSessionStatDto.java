package com.example.posturepro.analyzingsession.dto;

import java.time.Duration;

import com.example.posturepro.analyzingsession.entity.AnalyzingSession;
import com.example.posturepro.detection.entity.DetectionCountStatDto;

import lombok.Getter;

@Getter
public class AnalyzingSessionStatDto {
	private long sessionDuration = 0;
	private long properPoseDuration = 0;
	private int averagePoseDuration = 0;
	private final DetectionCountStatDto detectionCountStat;

	public AnalyzingSessionStatDto(AnalyzingSession session) {
		this.sessionDuration = Duration.between(session.getStartedAt(), session.getEndedAt()).toMinutes();
		this.detectionCountStat = new DetectionCountStatDto(session.getDetections());
		this.properPoseDuration = sessionDuration - detectionCountStat.getDetectionDuration();
		this.averagePoseDuration = (int)(((double)properPoseDuration / sessionDuration) * 60);
	}
}
