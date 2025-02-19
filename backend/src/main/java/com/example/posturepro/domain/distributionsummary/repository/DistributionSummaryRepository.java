package com.example.posturepro.domain.distributionsummary.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.posturepro.domain.distributionsummary.model.DistributionSummary;
import com.example.posturepro.domain.member.Gender;

import io.lettuce.core.dynamic.annotation.Param;

public interface DistributionSummaryRepository extends JpaRepository<DistributionSummary, Long> {
	// 1. 전체(OVERALL) 분포의 최신 레코드를 가져옴
	@Query(value = "SELECT * FROM distribution_summary " +
		"WHERE distribution_type = 'OVERALL' " +
		"  AND aggregation_base_time = (SELECT MAX(aggregation_base_time) " +
		"                                 FROM distribution_summary " +
		"                                 WHERE distribution_type = 'OVERALL')",
		nativeQuery = true)
	List<DistributionSummary> findLatestOverallDistribution();

	// 2. 연령별(AGE) 분포의 최신 레코드를 가져옴 (age_range 조건 포함)
	@Query(value = "SELECT * FROM distribution_summary " +
		"WHERE distribution_type = 'AGE' " +
		"  AND age_range = :ageRange " +
		"  AND aggregation_base_time = (SELECT MAX(aggregation_base_time) " +
		"                                 FROM distribution_summary " +
		"                                 WHERE distribution_type = 'AGE' " +
		"                                   AND age_range = :ageRange)",
		nativeQuery = true)
	List<DistributionSummary> findLatestAgeDistribution(@Param("ageRange") String ageRange);

	// 3. 성별+연령별(GENDER_AGE) 분포의 최신 레코드를 가져옴 (age_range와 gender 조건 포함)
	@Query(value = "SELECT * FROM distribution_summary " +
		"WHERE distribution_type = 'GENDER_AGE' " +
		"  AND age_range = :ageRange " +
		"  AND gender = :gender " +
		"  AND aggregation_base_time = (SELECT MAX(aggregation_base_time) " +
		"                                 FROM distribution_summary " +
		"                                 WHERE distribution_type = 'GENDER_AGE' " +
		"                                   AND age_range = :ageRange " +
		"                                   AND gender = :gender)",
		nativeQuery = true)
	List<DistributionSummary> findLatestGenderAgeDistribution(@Param("ageRange") String ageRange,
		@Param("gender") Gender gender);
}
