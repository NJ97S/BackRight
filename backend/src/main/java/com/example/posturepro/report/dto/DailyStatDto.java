package com.example.posturepro.report.dto;

import com.example.posturepro.detection.entity.DetectionCountStatDto;
import com.example.posturepro.report.entity.DailyStat;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class DailyStatDto {
	private long totalDuration;
	private int averagePoseDuration;
	private long properPoseDuration;
	private DetectionCountStatDto detectionCountStat;

	private DailyStatDto(DailyStat dailyStat) {
		this.totalDuration = dailyStat.getTotalDuration();
		this.averagePoseDuration = dailyStat.getAveragePoseDuration();
		this.properPoseDuration = dailyStat.getProperPoseDuration();
		this.detectionCountStat = new DetectionCountStatDto(dailyStat);
	}

	public static DailyStatDto from(DailyStat dailyStat) {
		return new DailyStatDto(dailyStat);
	}
}
