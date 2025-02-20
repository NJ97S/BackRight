package com.example.posturepro.domain.distributionsummary.service;

import java.util.List;

import org.springframework.stereotype.Service;

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
		jdbcRepository.insertOverallDistributionSummary();
	}

	@Transactional
	public void insertAgeRangeSummary(String ageRange) {
		jdbcRepository.insertAgeDistributionSummary(ageRange);
	}

	@Transactional
	public void insertAgeRangeGenderSummary(String ageRange, Gender gender) {
		jdbcRepository.insertGenderAgeDistributionSummary(ageRange, gender);
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
		return distributionSummaryRepository.findLatestGenderAgeDistribution(ageRange, gender.name());
	}
}
