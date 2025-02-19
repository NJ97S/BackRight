package com.example.posturepro.domain.distributionsummary.dto;

import java.util.List;

import com.example.posturepro.domain.distributionsummary.model.DistributionSummary;

public record BinResponseDto(int lowerBound, int upperBound) {
	public static BinResponseDto from(DistributionSummary summary) {
		return new BinResponseDto(summary.getLowerBound(), summary.getUpperBound());
	}

	public static BinResponseDto[] fromDistribution(List<DistributionSummary> summaries) {
		return summaries.stream()
			.map(BinResponseDto::from)
			.toArray(BinResponseDto[]::new);
	}
}
