package com.example.posturepro.report.service;

import java.time.Instant;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.posturepro.analyzingsession.dto.AnalyzingSessionDto;
import com.example.posturepro.analyzingsession.service.AnalyzingSessionService;
import com.example.posturepro.exception.EntityNotFoundException;
import com.example.posturepro.report.dto.DailyReportDto;
import com.example.posturepro.report.dto.DailyStatDto;
import com.example.posturepro.report.entity.DailyStat;
import com.example.posturepro.report.repository.DailyStatRepository;

@Service
public class ReportService {
	private final AnalyzingSessionService analyzingSessionService;
	private final DailyStatRepository dailyStatRepository;

	public ReportService(AnalyzingSessionService analyzingSessionService, DailyStatRepository dailyStatRepository) {
		this.analyzingSessionService = analyzingSessionService;
		this.dailyStatRepository = dailyStatRepository;
	}

	public DailyReportDto getDailyReport(Long memberId, String date) {
		Instant dateAsInstant = Instant.parse(date);
		List<AnalyzingSessionDto> sessionList = analyzingSessionService.getSessionByDate(memberId, dateAsInstant);

		DailyStat previousDailyStat = dailyStatRepository.findFirstByMemberIdAndTargetDayBeforeOrderByTargetDayDesc(
			memberId, dateAsInstant);
		DailyStatDto previousStatDto = previousDailyStat != null ? DailyStatDto.from(previousDailyStat) : null;
		DailyStat todayStat = dailyStatRepository.findByMemberIdAndTargetDay(memberId, dateAsInstant)
			.orElseThrow(() -> new EntityNotFoundException(DailyStat.class.getName(), "date", date));

		return new DailyReportDto(sessionList, DailyStatDto.from(todayStat), previousStatDto);
	}

	// public WeeklyReportDto getWeeklyReport(Long memberID, Instant weekStart) {
	// 	AnalyzingSessionStatDto[] sessionByWeekStart = analyzingSessionService.getSessionByWeekStart(memberID,
	// 		weekStart);
	// 	DetectionCountStatDto detectionCountStat = new DetectionCountStatDto();
	// 	int[] dailyProperPoseMinutesPerHours = new int[7];
	// 	for (int i = 0; i < 7; i++) {
	// 		dailyProperPoseMinutesPerHours[i] = sessionByWeekStart[i].getAveragePoseDuration();
	// 		detectionCountStat.addDetectionStat(sessionByWeekStart[i].getDetectionCountStat());
	// 	}
	// 	return new WeeklyReportDto(dailyProperPoseMinutesPerHours, detectionCountStat);
	// }
	//
	// public MonthlyReportDto getMonthlyReport(Long memberID, Instant monthStart) {
	//
	// 	return null;
	// }
}
