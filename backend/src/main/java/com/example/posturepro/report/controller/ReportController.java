package com.example.posturepro.report.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.posturepro.api.oauth.service.TokenService;
import com.example.posturepro.report.dto.DailyReportDto;
import com.example.posturepro.report.dto.MonthlyReportDto;
import com.example.posturepro.report.dto.WeeklyReportDto;
import com.example.posturepro.report.service.ReportService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/reports")
@RequiredArgsConstructor
public class ReportController {
	private final ReportService service;
	private final TokenService tokenService;

	@GetMapping("/daily")
	public ResponseEntity<DailyReportDto> getDailyReport(@CookieValue("access-token") String accessToken,
		@RequestParam String date) {
		String providerId = tokenService.getProviderIdFromToken(accessToken);
		String dateString = date + "T00:00:00+09:00";
		DailyReportDto dailyReport = service.getDailyReport(providerId, dateString);

		return ResponseEntity.ok(dailyReport);
	}

	@GetMapping("/weekly")
	public ResponseEntity<WeeklyReportDto> getWeeklyReport(@CookieValue("access-token") String accessToken,
		@RequestParam String date) {
		String providerId = tokenService.getProviderIdFromToken(accessToken);
		String dateString = date + "T00:00:00+09:00";
		WeeklyReportDto weeklyReport = service.getWeeklyReport(providerId, dateString);

		return ResponseEntity.ok(weeklyReport);
	}

	@GetMapping("/monthly")
	public ResponseEntity<MonthlyReportDto> getMonthlyReport(@CookieValue("access-token") String accessToken,
		@RequestParam String date) {
		String providerId = tokenService.getProviderIdFromToken(accessToken);
		MonthlyReportDto monthlyReport = service.getMonthlyReport(providerId, date);

		return ResponseEntity.ok(monthlyReport);
	}

}
