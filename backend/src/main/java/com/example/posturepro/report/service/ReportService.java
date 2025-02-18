package com.example.posturepro.report.service;

import java.time.DayOfWeek;
import java.time.Duration;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.posturepro.analyzingsession.dto.AnalyzingSessionDto;
import com.example.posturepro.analyzingsession.service.AnalyzingSessionService;
import com.example.posturepro.detection.entity.DetectionStatAggregator;
import com.example.posturepro.detection.entity.DetectionStatDto;
import com.example.posturepro.exception.EntityNotFoundException;
import com.example.posturepro.report.dto.DailyReportDto;
import com.example.posturepro.report.dto.DailyStatDto;
import com.example.posturepro.report.dto.MonthlyReportDto;
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

	public MonthlyReportDto getMonthlyReport(Long memberId, String monthStart) {

		ZoneId zoneId = ZoneId.of("Asia/Seoul");

		LocalDate monthStartAsLocalDate = LocalDate.parse(monthStart);
		LocalDate firstMondayAsLocalDate = monthStartAsLocalDate.with(TemporalAdjusters.nextOrSame(DayOfWeek.MONDAY));

		Instant monthStartTime = monthStartAsLocalDate.atStartOfDay(zoneId).toInstant();
		Instant monthMonday = firstMondayAsLocalDate.atStartOfDay(zoneId).toInstant();
		Instant nextMonth = monthStartAsLocalDate.plusMonths(1).atStartOfDay(zoneId).toInstant();

		List<Integer> weeklyProperPoseSecondsPerHours = new ArrayList<>();
		DetectionStatAggregator detectionStatAggregator = new DetectionStatAggregator();

		List<DailyStat> dailyStatList = dailyStatRepository
			.findAllByMemberIdAndTargetDayGreaterThanEqualAndTargetDayLessThan(
				memberId, monthStartTime, nextMonth);

		if (monthStartTime.isBefore(monthMonday)) {
			weeklyProperPoseSecondsPerHours.add(
				getWeeklyAveragePoseDurationByDailyStatList(
					filterByDateRange(dailyStatList, monthStartTime, monthMonday), detectionStatAggregator)
			);
		}

		while (monthMonday.isBefore(nextMonth)) {
			Instant toDateTime = monthMonday.plus(7, ChronoUnit.DAYS).isBefore(nextMonth)
				? monthMonday.plus(7, ChronoUnit.DAYS)
				: nextMonth;

			weeklyProperPoseSecondsPerHours.add(
				getWeeklyAveragePoseDurationByDailyStatList(
					filterByDateRange(dailyStatList, monthMonday, toDateTime), detectionStatAggregator)
			);
			monthMonday = toDateTime;
		}

		DetectionStatDto detectionStatDto = detectionStatAggregator.toDto();

		double age_group_percentile = 0.0;
		double[] age_group_posture_time_distribution = new double[] {0.0, 0.0};

		return new MonthlyReportDto(weeklyProperPoseSecondsPerHours, detectionStatDto, age_group_percentile,
			age_group_posture_time_distribution);
	}

	private List<DailyStat> filterByDateRange(List<DailyStat> dailyStats, Instant startDate, Instant endDate) {
		return dailyStats.stream()
			.filter(dailyStat -> !dailyStat.getTargetDay().isBefore(startDate) && dailyStat.getTargetDay()
				.isBefore(endDate))
			.collect(Collectors.toList());
	}

	private int getWeeklyAveragePoseDurationByDailyStatList(List<DailyStat> dailyStatList,
		DetectionStatAggregator aggregator) {
		long totalDuration = 0;
		long properPoseDuration = 0;

		for (DailyStat dailyStat : dailyStatList) {
			aggregator.addDailyStat(dailyStat);
			totalDuration += dailyStat.getTotalDuration();
			properPoseDuration += dailyStat.getProperPoseDuration();
		}

		return totalDuration == 0 ? 0 : (int)(((double)properPoseDuration / totalDuration) * 60);
	}
}
