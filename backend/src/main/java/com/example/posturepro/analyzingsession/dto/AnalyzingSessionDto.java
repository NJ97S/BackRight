package com.example.posturepro.analyzingsession.dto;

import java.time.Instant;
import java.util.List;

import com.example.posturepro.detection.entity.DetectionDto;
import com.example.posturepro.detection.entity.DetectionStatDto;

import lombok.Getter;

@Getter
public class AnalyzingSessionDto {
	private Instant startedAt;
	private Instant endedAt;
	private DetectionStatDto detectionStat;
	private List<DetectionDto> detections;
	private AnalyzingSessionStatDto sessionStat;

	public AnalyzingSessionDto(Instant startedAt, Instant endedAt, List<DetectionDto> detectionDtoList,
		DetectionStatDto detectionStatDto, AnalyzingSessionStatDto analyzingSessionStatDto) {
		this.startedAt = startedAt;
		this.endedAt = endedAt;
		this.detections = detectionDtoList;
		this.detectionStat = detectionStatDto;
		this.sessionStat = analyzingSessionStatDto;
	}
}
