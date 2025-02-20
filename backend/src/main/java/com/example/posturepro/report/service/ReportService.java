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
import com.example.posturepro.domain.distributionsummary.model.DistributionSummary;
import com.example.posturepro.domain.distributionsummary.service.DistributionSummaryService;
import com.example.posturepro.domain.member.Member;
import com.example.posturepro.domain.member.service.MemberService;
import com.example.posturepro.exception.EntityNotFoundException;
import com.example.posturepro.report.dto.DailyReportDto;
import com.example.posturepro.report.dto.DailyStatDto;
import com.example.posturepro.report.dto.MonthlyReportDto;
import com.example.posturepro.report.dto.WeeklyReportDto;
import com.example.posturepro.report.entity.DailyStat;
import com.example.posturepro.report.repository.DailyStatRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReportService {
	private final AnalyzingSessionService analyzingSessionService;
	private final DailyStatRepository dailyStatRepository;
	private final DistributionSummaryService distributionSummaryService;
	private final MemberService memberService;

	public DailyReportDto getDailyReport(String providerId, String date) {
		var memberOpt = memberService.findByProviderId(providerId);
		if (memberOpt.isEmpty()) {
			throw new EntityNotFoundException(Member.class.getName(), "providerId", providerId);
		}
		Long memberId = memberOpt.get().getId();
		Instant dateAsInstant = Instant.parse(date);
		List<AnalyzingSessionDto> sessionList = analyzingSessionService.getSessionByDate(memberId, dateAsInstant);

		DailyStat previousDailyStat = dailyStatRepository.findFirstByMemberIdAndTargetDayBeforeOrderByTargetDayDesc(
			memberId, dateAsInstant);
		DailyStatDto previousStatDto = previousDailyStat != null ? DailyStatDto.from(previousDailyStat) : null;
		DailyStat todayStat = dailyStatRepository.findByMemberIdAndTargetDay(memberId, dateAsInstant)
			.orElseThrow(() -> new EntityNotFoundException(DailyStat.class.getName(), "date", date));

		return new DailyReportDto(sessionList, DailyStatDto.from(todayStat), previousStatDto);
	}

	public WeeklyReportDto getWeeklyReport(String providerId, String weekStart) {
		var memberOpt = memberService.findByProviderId(providerId);
		if (memberOpt.isEmpty()) {
			throw new EntityNotFoundException(Member.class.getName(), "providerId", providerId);
		}
		Long memberId = memberOpt.get().getId();
		Instant weekStartAsInstant = Instant.parse(weekStart);
		List<DailyStat> dailyStatList = dailyStatRepository
			.findAllByMemberIdAndTargetDayGreaterThanEqualAndTargetDayLessThan(
				memberId,
				weekStartAsInstant,
				weekStartAsInstant.plus(7, ChronoUnit.DAYS));

		DetectionStatAggregator detectionStatAggregator = new DetectionStatAggregator();
		int[] dailyProperPoseSecondsPerHours = new int[7];
		long properPoseDurationSum = 0;
		long totalDurationSum = 0;
		for (DailyStat dailyStat : dailyStatList) {
			int dayIndex = (int)Duration.between(weekStartAsInstant, dailyStat.getTargetDay()).toDays();
			detectionStatAggregator.addDailyStat(dailyStat);
			dailyProperPoseSecondsPerHours[dayIndex] = dailyStat.getAveragePoseDuration();
			properPoseDurationSum += dailyStat.getProperPoseDuration();
			totalDurationSum += dailyStat.getTotalDuration();
		}

		DetectionStatDto detectionStatDto = detectionStatAggregator.toDto();

		int weeklyAveragePoseDuration = (int)((double)properPoseDurationSum / totalDurationSum * 60);
		var overallDistribution = distributionSummaryService.getLatestOverallDistribution();

		var ageRangeDistribution = distributionSummaryService.getLatestAgeRangeDistribution(memberId);

		var ageRangeGenderDistribution = distributionSummaryService.getLatestAgeRangeGenderDistribution(memberId);

		return new WeeklyReportDto(dailyProperPoseSecondsPerHours, detectionStatDto, weeklyAveragePoseDuration,
			overallDistribution.stream().map(DistributionSummary::getCount).mapToInt(Integer::intValue).toArray(),
			ageRangeDistribution.stream().map(DistributionSummary::getCount).mapToInt(Integer::intValue).toArray(),
			ageRangeGenderDistribution.stream()
				.map(DistributionSummary::getCount)
				.mapToInt(Integer::intValue)
				.toArray());
	}

	public MonthlyReportDto getMonthlyReport(String providerId, String monthStart) {
		var memberOpt = memberService.findByProviderId(providerId);
		if (memberOpt.isEmpty()) {
			throw new EntityNotFoundException(Member.class.getName(), "providerId", providerId);
		}
		Long memberId = memberOpt.get().getId();
		ZoneId zoneId = ZoneId.of("Asia/Seoul");

		LocalDate monthStartDate = LocalDate.parse(monthStart);
		Instant monthStartInstant = monthStartDate.atStartOfDay(zoneId).toInstant();
		Instant nextMonthStartInstant = monthStartDate.plusMonths(1).atStartOfDay(zoneId).toInstant();

		LocalDate firstMonday = monthStartDate.with(TemporalAdjusters.nextOrSame(DayOfWeek.MONDAY));
		Instant currentMondayInstant = firstMonday.atStartOfDay(zoneId).toInstant();

		DetectionStatAggregator detectionStatAggregator = new DetectionStatAggregator();

		List<DailyStat> dailyStatList = dailyStatRepository
			.findAllByMemberIdAndTargetDayGreaterThanEqualAndTargetDayLessThan(
				memberId, monthStartInstant, nextMonthStartInstant);

		List<Integer> weeklyProperPoseMinutesPerHours = calculateAllWeeklyAverages(
			dailyStatList, monthStartInstant, nextMonthStartInstant, currentMondayInstant, detectionStatAggregator
		);

		DetectionStatDto detectionStatDto = detectionStatAggregator.toDto();
		int monthlyAveragePoseDuration = calculateMonthlyAverage(dailyStatList);
		var overallDistribution = distributionSummaryService.getLatestOverallDistribution();
		var ageRangeDistribution = distributionSummaryService.getLatestAgeRangeDistribution(memberId);
		var ageRangeGenderDistribution = distributionSummaryService.getLatestAgeRangeGenderDistribution(memberId);

		return new MonthlyReportDto(weeklyProperPoseMinutesPerHours, detectionStatDto,
			monthlyAveragePoseDuration,
			overallDistribution.stream().map(DistributionSummary::getCount).mapToInt(Integer::intValue).toArray(),
			ageRangeDistribution.stream().map(DistributionSummary::getCount).mapToInt(Integer::intValue).toArray(),
			ageRangeGenderDistribution.stream()
				.map(DistributionSummary::getCount)
				.mapToInt(Integer::intValue)
				.toArray());
	}

	private int calculateMonthlyAverage(List<DailyStat> dailyStatList) {
		long totalDuration = 0;
		long properPoseDuration = 0;

		for (DailyStat dailyStat : dailyStatList) {
			totalDuration += dailyStat.getTotalDuration();
			properPoseDuration += dailyStat.getProperPoseDuration();
		}

		return totalDuration == 0 ? 0 : (int)(((double)properPoseDuration / totalDuration) * 60);
	}

	private List<Integer> calculateAllWeeklyAverages(List<DailyStat> dailyStatList, Instant monthStartInstant,
		Instant nextMonthStartInstant, Instant currentMondayInstant, DetectionStatAggregator aggregator) {

		List<Integer> weeklyProperPoseSecondsPerHours = new ArrayList<>();

		if (monthStartInstant.isBefore(currentMondayInstant)) {
			weeklyProperPoseSecondsPerHours.add(
				calculateWeeklyAverage(monthStartInstant, currentMondayInstant, dailyStatList, aggregator));
		}

		while (currentMondayInstant.isBefore(nextMonthStartInstant)) {
			Instant nextMondayInstant = currentMondayInstant.plus(7, ChronoUnit.DAYS);
			if (nextMondayInstant.isAfter(nextMonthStartInstant)) {
				nextMondayInstant = nextMonthStartInstant;
			}

			weeklyProperPoseSecondsPerHours.add(
				calculateWeeklyAverage(currentMondayInstant, nextMondayInstant, dailyStatList, aggregator));

			currentMondayInstant = nextMondayInstant;
		}

		return weeklyProperPoseSecondsPerHours;
	}

	private int calculateWeeklyAverage(Instant from, Instant to, List<DailyStat> dailyStatList,
		DetectionStatAggregator detectionStatAggregator) {
		List<DailyStat> filteredList = filterByDateRange(dailyStatList, from, to);
		long totalDuration = 0;
		long properPoseDuration = 0;

		for (DailyStat dailyStat : filteredList) {
			detectionStatAggregator.addDailyStat(dailyStat);
			totalDuration += dailyStat.getTotalDuration();
			properPoseDuration += dailyStat.getProperPoseDuration();
		}

		return totalDuration == 0 ? 0 : (int)(((double)properPoseDuration / totalDuration) * 60);
	}

	private List<DailyStat> filterByDateRange(List<DailyStat> dailyStats, Instant startDate, Instant endDate) {
		return dailyStats.stream()
			.filter(dailyStat -> !dailyStat.getTargetDay().isBefore(startDate) && dailyStat.getTargetDay()
				.isBefore(endDate))
			.collect(Collectors.toList());
	}
}
