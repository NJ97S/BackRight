package com.example.posturepro.analyzingsession.dto;

import lombok.Getter;

@Getter
public class AnalyzingSessionStatDto {
	private long sessionDuration;
	private long properPoseDuration;
	private int averagePoseDuration;

	public AnalyzingSessionStatDto(long sessionDuration, long properPoseDuration, int averagePoseDuration) {
		this.sessionDuration = sessionDuration;
		this.properPoseDuration = properPoseDuration;
		this.averagePoseDuration = averagePoseDuration;
	}
}
