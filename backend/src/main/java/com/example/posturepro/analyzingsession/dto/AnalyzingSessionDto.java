package com.example.posturepro.analyzingsession.dto;

import java.time.Instant;
import java.util.List;
import java.util.stream.Collectors;

import com.example.posturepro.analyzingsession.entity.AnalyzingSession;
import com.example.posturepro.detection.entity.DetectionDto;

import lombok.Getter;

@Getter
public class AnalyzingSessionDto {
	private Instant startedAt;
	private Instant endedAt;
	private List<DetectionDto> detections;
	private AnalyzingSessionStatDto sessionStat;

	public AnalyzingSessionDto(AnalyzingSession session) {
		this.startedAt = session.getStartedAt();
		this.endedAt = session.getEndedAt();
		this.sessionStat = new AnalyzingSessionStatDto(session);
		this.detections = session.getDetections().stream().map(detection -> new DetectionDto(
			detection.getId(), detection.getStartedAt(), detection.getEndedAt(), detection.getVideoUrl(),
			detection.isNeckDetected(), detection.isLeftShoulderDetected(), detection.isRightShoulderDetected(),
			detection.isBackDetected()
		)).collect(Collectors.toList());
	}
}
