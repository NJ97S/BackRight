package com.example.posturepro.report.dto;

import com.example.posturepro.detection.entity.DetectionStatDto;

public record WeeklyReportDto(
	int[] dailyProperPoseMinutesPerHours,
	DetectionStatDto detectionCountStat,
	int weeklyAveragePoseDuration,
	int[] overallDistribution,
	int[] ageRangeDistribution,
	int[] ageRangeGenderDistribution
) {
}
