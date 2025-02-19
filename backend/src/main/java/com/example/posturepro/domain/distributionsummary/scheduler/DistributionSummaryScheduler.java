package com.example.posturepro.domain.distributionsummary.scheduler;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import com.example.posturepro.domain.distributionsummary.model.DistributionSummary;
import com.example.posturepro.domain.distributionsummary.service.DistributionSummaryService;
import com.example.posturepro.domain.member.Gender;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class DistributionSummaryScheduler {
	private final DistributionSummaryService distributionSummaryService;

	@Scheduled(cron = "0 10 0 * * *", zone = "Asia/Seoul")
	public void runOverallDistribution() {
		log.info("🔄 Scheduler: 전체 분포 업데이트 시작");
		distributionSummaryService.insertOverallDistributionSummary();
		log.info("✅ Scheduler: 전체 분포 업데이트 완료");
	}

	@Scheduled(cron = "0 15 0 * * *", zone = "Asia/Seoul")
	public void runAgeRangeDistribution() {
		log.info("🔄 Scheduler: 연령별 분포 업데이트 시작");
		for (String ageRange : DistributionSummary.ALLOWED_AGE_RANGES) {
			distributionSummaryService.insertAgeRangeSummary(ageRange);
		}
		log.info("✅ Scheduler: 연령별 분포 업데이트 완료");
	}

	@Scheduled(cron = "0 20 0 * * *", zone = "Asia/Seoul")
	public void runAgeRangeGenderDistribution() {
		log.info("🔄 Scheduler: 연령 + 성별 분포 업데이트 시작");
		for (String ageRange : DistributionSummary.ALLOWED_AGE_RANGES) {
			distributionSummaryService.insertAgeRangeGenderSummary(ageRange, Gender.MALE);
			distributionSummaryService.insertAgeRangeGenderSummary(ageRange, Gender.FEMALE);
		}
		log.info("✅ Scheduler: 연령 + 성별 분포 업데이트 완료");
	}

}
