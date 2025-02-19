package com.example.posturepro.report.dto;

import com.example.posturepro.detection.entity.DetectionStatDto;

public record WeeklyReportDto(
	int[] dailyProperPoseMinutesPerHours,
	DetectionStatDto detectionCountStat,
	DistributionDataDto overallDistribution,
	DistributionDataDto ageRangeDistribution,
	DistributionDataDto ageRangeGenderDistribution
) {
}
