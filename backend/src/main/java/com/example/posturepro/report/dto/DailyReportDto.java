package com.example.posturepro.report.dto;

import java.util.List;

import com.example.posturepro.analyzingsession.dto.AnalyzingSessionDto;

public record DailyReportDto(
	List<AnalyzingSessionDto> sessions,
	DailyStatDto dailyStat,
	DailyStatDto previousDailyStat
) {
}
