package com.example.posturepro.report.dto;

import java.util.List;

import com.example.posturepro.detection.entity.DetectionStatDto;

public record MonthlyReportDto(
	List<Integer> weeklyProperPoseMinutesPerHours,
	DetectionStatDto detectionCountStat,
	DistributionDataDto overallDistribution,
	DistributionDataDto ageRangeDistribution,
	DistributionDataDto ageRangeGenderDistribution
) {
}
