package com.example.posturepro.report.dto;

import java.util.List;

import com.example.posturepro.detection.entity.DetectionStatDto;

public record MonthlyReportDto(
	List<Integer> weeklyProperPoseMinuetsPerHours,
	DetectionStatDto detectionCountStat,
	double age_group_percentile,
	double[] age_group_posture_time_distribution
) {
}
