package com.example.posturepro.report.dto;

import com.example.posturepro.detection.entity.DetectionCountStatDto;

public record MonthlyReportDto(
	int[] weeklyProperPoseMinutesPerHours,
	DetectionCountStatDto detectionCountStat
) {
}
