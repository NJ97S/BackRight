package com.example.posturepro.report.dto;

import com.example.posturepro.detection.entity.DetectionStatDto;

public record WeeklyReportDto(
	int[] dailyProperPoseMinuetsPerHours,
	DetectionStatDto detectionCountStat,
	double age_group_percentile,
	double[] age_group_posture_time_distribution
) {
}
