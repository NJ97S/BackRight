package com.example.posturepro.report.dto;

import com.example.posturepro.domain.distributionsummary.dto.BinResponseDto;

public record DistributionDataDto(int groupPercentile, BinResponseDto[] groupProperPoseTimeDistribution) {
}
