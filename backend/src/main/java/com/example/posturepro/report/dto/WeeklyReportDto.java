package com.example.posturepro.report.dto;

import com.example.posturepro.detection.entity.DetectionStatDto;

public record WeeklyReportDto(
	int[] dailyProperPoseMinutesPerHours,
	DetectionStatDto detectionCountStat,
	int weeklyAveragePoseDuration,
	GroupDistributionDto overallDistribution,
	GroupDistributionDto ageRangeDistribution,
	GroupDistributionDto ageRangeGenderDistribution
) {
}
