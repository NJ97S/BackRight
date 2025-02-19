package com.example.posturepro.domain.distributionsummary.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.example.posturepro.domain.distributionsummary.dto.PercentileBinDto;
import com.example.posturepro.domain.distributionsummary.model.DistributionSummary;
import com.example.posturepro.domain.distributionsummary.repository.DistributionSummaryJdbcRepository;
import com.example.posturepro.domain.distributionsummary.repository.DistributionSummaryRepository;
import com.example.posturepro.domain.distributionsummary.util.AgeUtil;
import com.example.posturepro.domain.member.Gender;
import com.example.posturepro.domain.member.service.MemberService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DistributionSummaryService {
	private final DistributionSummaryJdbcRepository jdbcRepository;
	private final DistributionSummaryRepository distributionSummaryRepository;
	private final MemberService memberService;

	@Transactional
	public void insertOverallDistributionSummary() {
		List<PercentileBinDto> dtos = jdbcRepository.findOverallDistribution();

		List<DistributionSummary> summaries = new ArrayList<>();
		for (PercentileBinDto dto : dtos) {
			var summary = DistributionSummary.createOverallSummary(dto.bin(),
				dto.lowerBound(), dto.upperBound(), dto.memberCount());
			summaries.add(summary);
		}

		jdbcRepository.bulkInsertDistribution(summaries);
	}

	@Transactional
	public void insertAgeRangeSummary(String ageRange) {
		List<PercentileBinDto> dtos = jdbcRepository.findAgeDistribution(ageRange);
		List<DistributionSummary> summaries = new ArrayList<>();
		for (PercentileBinDto dto : dtos) {
			var summary = DistributionSummary.createAgeRangeSummary(ageRange, dto.bin(),
				dto.lowerBound(), dto.upperBound(), dto.memberCount());
			summaries.add(summary);
		}
		jdbcRepository.bulkInsertDistribution(summaries);
	}

	@Transactional
	public void insertAgeRangeGenderSummary(String ageRange, Gender gender) {
		List<PercentileBinDto> dtos = jdbcRepository.findAgeRangeGenderDistribution(ageRange, gender);
		List<DistributionSummary> summaries = new ArrayList<>();
		for (PercentileBinDto dto : dtos) {
			var summary = DistributionSummary.createAgeRangeGenderSummary(ageRange, gender, dto.bin(),
				dto.lowerBound(), dto.upperBound(), dto.memberCount());
			summaries.add(summary);
		}
		jdbcRepository.bulkInsertDistribution(summaries);
	}

	public List<DistributionSummary> getLatestOverallDistribution() {
		return distributionSummaryRepository.findLatestOverallDistribution();
	}

	public List<DistributionSummary> getLatestAgeRangeDistribution(Long memberId) {
		var member = memberService.getMember(memberId);
		var ageRange = AgeUtil.getAgeRange(member.getBirthDate());
		return distributionSummaryRepository.findLatestAgeDistribution(ageRange);
	}

	public List<DistributionSummary> getLatestAgeRangeGenderDistribution(Long memberId) {
		var member = memberService.getMember(memberId);
		var ageRange = AgeUtil.getAgeRange(member.getBirthDate());
		var gender = member.getGender();
		return distributionSummaryRepository.findLatestGenderAgeDistribution(ageRange, gender);
	}
}
