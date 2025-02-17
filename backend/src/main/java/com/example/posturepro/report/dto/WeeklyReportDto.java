package com.example.posturepro.report.dto;

import com.example.posturepro.detection.entity.DetectionCountStatDto;

public record WeeklyReportDto(
	int[] dailyProperPoseMinutesPerHours,
	DetectionCountStatDto detectionCountStat
) {
}
