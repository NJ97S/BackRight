package com.example.posturepro.report.controller;

import java.time.Instant;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.posturepro.report.dto.DailyReportDto;
import com.example.posturepro.report.service.ReportService;

@RestController
@RequestMapping("/members/{memberId}/reports")
public class ReportController {
	ReportService service;

	public ReportController(ReportService service) {
		this.service = service;
	}

	@GetMapping("/daily")
	public ResponseEntity<DailyReportDto> getDailyReport(@PathVariable Long memberId, @RequestParam String date) {
		String dateString = date + "T00:00:00+09:00";
		DailyReportDto dailyReport = service.getDailyReport(memberId, Instant.parse(dateString));

		return ResponseEntity.ok(dailyReport);
	}

	// @GetMapping("/weekly")
	// public ResponseEntity<Object> getWeeklyReport(@PathVariable Long memberID, @RequestParam Instant date) {
	// 	service.getWeeklyReport(memberID, date);
	// 	return null;
	// }
}
