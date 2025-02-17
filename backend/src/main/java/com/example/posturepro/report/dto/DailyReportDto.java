package com.example.posturepro.report.dto;

import java.util.List;

import com.example.posturepro.analyzingsession.dto.AnalyzingSessionDto;
import com.example.posturepro.analyzingsession.dto.AnalyzingSessionStatDto;

public record DailyReportDto(
	List<AnalyzingSessionDto> sessions,
	AnalyzingSessionStatDto sessionStat,
	DailyStatDto previousDailyStat
) {
}
