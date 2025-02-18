package com.example.posturepro.report.service;

import java.time.Duration;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.posturepro.analyzingsession.dto.AnalyzingSessionDto;
import com.example.posturepro.analyzingsession.service.AnalyzingSessionService;
import com.example.posturepro.detection.entity.DetectionStatAggregator;
import com.example.posturepro.detection.entity.DetectionStatDto;
import com.example.posturepro.exception.EntityNotFoundException;
import com.example.posturepro.report.dto.DailyReportDto;
import com.example.posturepro.report.dto.DailyStatDto;
import com.example.posturepro.report.dto.WeeklyReportDto;
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

	public WeeklyReportDto getWeeklyReport(Long memberId, String weekStart) {
		Instant weekStartAsInstant = Instant.parse(weekStart);
		List<DailyStat> dailyStatList = dailyStatRepository
			.findAllByMemberIdAndTargetDayGreaterThanEqualAndTargetDayLessThan(
				memberId,
				weekStartAsInstant,
				weekStartAsInstant.plus(7, ChronoUnit.DAYS));

		DetectionStatAggregator detectionStatAggregator = new DetectionStatAggregator();
		int[] dailyProperPoseSecondsPerHours = new int[7];

		for (DailyStat dailyStat : dailyStatList) {
			int dayIndex = (int)Duration.between(weekStartAsInstant, dailyStat.getTargetDay()).toDays();
			detectionStatAggregator.addDailyStat(dailyStat);
			dailyProperPoseSecondsPerHours[dayIndex] = dailyStat.getAveragePoseDuration();
		}

		DetectionStatDto detectionStatDto = detectionStatAggregator.toDto();

		double age_group_percentile = 0.0;
		double[] age_group_posture_time_distribution = new double[] {0.0, 0.0};

		return new WeeklyReportDto(dailyProperPoseSecondsPerHours, detectionStatDto, age_group_percentile,
			age_group_posture_time_distribution);
	}

	//
	// public MonthlyReportDto getMonthlyReport(Long memberID, Instant monthStart) {
	//
	// 	return null;
	// }
}
