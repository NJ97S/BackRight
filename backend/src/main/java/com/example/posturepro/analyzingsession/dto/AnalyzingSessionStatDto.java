package com.example.posturepro.analyzingsession.dto;

import java.time.Duration;
import java.util.List;

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

	public AnalyzingSessionStatDto(List<AnalyzingSessionDto> sessionDtoList) {
		this.detectionCountStat = new DetectionCountStatDto();
		for (AnalyzingSessionDto sessionDto : sessionDtoList) {
			AnalyzingSessionStatDto sessionStat = sessionDto.getSessionStat();
			this.sessionDuration += sessionStat.getSessionDuration();
			this.properPoseDuration += sessionStat.getProperPoseDuration();
			this.detectionCountStat.addDetectionStat(sessionStat.getDetectionCountStat());
		}
		this.averagePoseDuration = (int)(((double)properPoseDuration / sessionDuration) * 60);
	}

	public AnalyzingSessionStatDto(List<AnalyzingSessionStatDto> sessionStatDtoList, boolean validtion) {
		this.detectionCountStat = new DetectionCountStatDto();
		for (AnalyzingSessionStatDto sessionStat : sessionStatDtoList) {
			this.sessionDuration += sessionStat.getSessionDuration();
			this.properPoseDuration += sessionStat.getProperPoseDuration();
			this.detectionCountStat.addDetectionStat(sessionStat.getDetectionCountStat());
		}
		this.averagePoseDuration = (int)(((double)properPoseDuration / sessionDuration) * 60);
	}
}
