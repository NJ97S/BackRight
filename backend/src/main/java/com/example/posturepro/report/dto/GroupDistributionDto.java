package com.example.posturepro.report.dto;

import java.util.List;

import com.example.posturepro.domain.distributionsummary.model.DistributionSummary;

public record GroupDistributionDto(int[] groupBinCounts, double groupPercentile) {
	public static GroupDistributionDto from(List<DistributionSummary> summaries, int averagePoseDuration) {
		int[] counts = new int[60];
		for (DistributionSummary ds : summaries) {
			int bin = ds.getBin();
			counts[bin] += ds.getCount();
		}

		int targetBin = Math.min(Math.max(averagePoseDuration, 0), 59);
		int totalCount = 0;
		int cumulative = 0;
		for (int i = 0; i <= targetBin; i++) {
			totalCount += counts[i];
			cumulative += counts[i];
		}
		// target bin까지의 누적 count 계산
		for (int i = targetBin; i <= 59; i++) {
			totalCount += counts[i];
		}
		// 누적 count를 전체 count로 나눈 백분율 계산 (전체 count가 0이면 0.0)
		double groupPercentile = totalCount == 0 ? 0.0 : ((double)cumulative / totalCount) * 100;

		return new GroupDistributionDto(counts, groupPercentile);
	}
}