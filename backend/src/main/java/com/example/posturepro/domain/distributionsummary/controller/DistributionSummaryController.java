package com.example.posturepro.domain.distributionsummary.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.posturepro.domain.distributionsummary.model.DistributionSummary;
import com.example.posturepro.domain.distributionsummary.service.DistributionSummaryService;
import com.example.posturepro.domain.member.Gender;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
public class DistributionSummaryController {
	private final DistributionSummaryService distributionSummaryService;

	@GetMapping("/summary")
	ResponseEntity<List<DistributionSummary>> getSummaries() {
		return ResponseEntity.ok(distributionSummaryService.getLatestOverallDistribution());
	}

	@GetMapping("/age-range-summary")
	ResponseEntity<List<DistributionSummary>> getSummaries2() {
		List<DistributionSummary> summaries = distributionSummaryService.getLatestAgeRangeDistribution(15L);

		return ResponseEntity.ok(summaries);
	}

	@GetMapping("/age-range-gender-summary")
	ResponseEntity<List<DistributionSummary>> getSummaries3() {
		List<DistributionSummary> summaries = distributionSummaryService.getLatestAgeRangeGenderDistribution(15L);

		return ResponseEntity.ok(summaries);
	}

	@PostMapping("/summary")
	ResponseEntity<Void> postOverallSummary() {
		distributionSummaryService.insertOverallDistributionSummary();
		return ResponseEntity.ok().build();
	}

	@PostMapping("/age-range-summary")
	ResponseEntity<Void> postAgeRangeSummary() {
		for (String ageRange : DistributionSummary.ALLOWED_AGE_RANGES) {
			distributionSummaryService.insertAgeRangeSummary(ageRange);
		}
		return ResponseEntity.ok().build();
	}

	@PostMapping("/age-range-gender-summary")
	ResponseEntity<Void> postAgeRangeGenderSummary() {
		for (String ageRange : DistributionSummary.ALLOWED_AGE_RANGES) {
			distributionSummaryService.insertAgeRangeGenderSummary(ageRange, Gender.MALE);
			distributionSummaryService.insertAgeRangeGenderSummary(ageRange, Gender.FEMALE);
		}
		return ResponseEntity.ok().build();
	}

}
