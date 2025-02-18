package com.example.posturepro.report.dto;

import com.example.posturepro.detection.entity.DetectionStatAggregator;
import com.example.posturepro.detection.entity.DetectionStatDto;
import com.example.posturepro.report.entity.DailyStat;

import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Getter
public class DailyStatDto {
	private long totalDuration;
	private int averagePoseDuration;
	private long properPoseDuration;
	private DetectionStatDto detectionCountStat;

	private DailyStatDto(DailyStat dailyStat) {
		this.totalDuration = dailyStat.getTotalDuration();
		this.averagePoseDuration = dailyStat.getAveragePoseDuration();
		this.properPoseDuration = dailyStat.getProperPoseDuration();
		DetectionStatAggregator detectionStatAggregator = new DetectionStatAggregator(dailyStat);
		this.detectionCountStat = detectionStatAggregator.toDto();
	}

	public static DailyStatDto from(DailyStat dailyStat) {
		return new DailyStatDto(dailyStat);
	}
}
