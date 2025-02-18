package com.example.posturepro.report.dto;

import com.example.posturepro.detection.entity.DetectionStatDto;

public record MonthlyReportDto(
	int[] weeklyProperPoseMinutesPerHours,
	DetectionStatDto detectionCountStat
) {
}
