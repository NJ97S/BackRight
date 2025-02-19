package com.example.posturepro.domain.distributionsummary.repository;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.posturepro.domain.distributionsummary.dto.PercentileBinDto;
import com.example.posturepro.domain.distributionsummary.model.DistributionSummary;
import com.example.posturepro.domain.member.Gender;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class DistributionSummaryJdbcRepository {

	private final JdbcTemplate jdbcTemplate;

	public List<PercentileBinDto> findOverallDistribution() {
		String sql = "WITH ranked AS ( " +
			"  SELECT ds.member_id, ds.average_pose_duration, " +
			"         NTILE(100) OVER (ORDER BY ds.average_pose_duration) - 1 AS percentile_bucket " +
			"  FROM daily_stat ds " +
			"  WHERE target_day <= ? " +
			") " +
			"SELECT percentile_bucket AS bin, " +
			"       MIN(average_pose_duration) AS lower_bound, " +
			"       MAX(average_pose_duration) AS upper_bound, " +
			"       COUNT(*) AS member_count " +
			"FROM ranked " +
			"GROUP BY percentile_bucket";

		return jdbcTemplate.query(sql, PercentileBinDto::from, getCutOff());
	}

	private static final String BASE_AGE_RANGE_QUERY =
		"WITH user_data AS ( " +
			"  SELECT ds.member_id, ds.average_pose_duration AS avg_duration, " +
			"         CASE " +
			"           WHEN TIMESTAMPDIFF(YEAR, m.birth_date, CURDATE()) < 20 THEN '-19' " +
			"           WHEN TIMESTAMPDIFF(YEAR, m.birth_date, CURDATE()) BETWEEN 20 AND 29 THEN '20-29' " +
			"           WHEN TIMESTAMPDIFF(YEAR, m.birth_date, CURDATE()) BETWEEN 30 AND 39 THEN '30-39' " +
			"           WHEN TIMESTAMPDIFF(YEAR, m.birth_date, CURDATE()) BETWEEN 40 AND 49 THEN '40-49' " +
			"           WHEN TIMESTAMPDIFF(YEAR, m.birth_date, CURDATE()) BETWEEN 50 AND 59 THEN '50-59' " +
			"           ELSE '60-' " +
			"         END AS age_range, " +
			"         m.gender AS gender " +
			"  FROM daily_stat ds " +
			"  JOIN member m ON ds.member_id = m.id " +
			"  WHERE target_day <= ? " +
			"), ranked AS ( " +
			"  SELECT member_id, avg_duration, age_range, gender, " +
			"         NTILE(100) OVER (PARTITION BY %s ORDER BY avg_duration) - 1 AS percentile_bucket " +
			"  FROM user_data " +
			") ";

	public List<PercentileBinDto> findAgeDistribution(String ageRange) {
		// PARTITION BY 조건은 age_range만 사용
		String partitionBy = "age_range";
		String sql = String.format(BASE_AGE_RANGE_QUERY, partitionBy) +
			"SELECT percentile_bucket AS bin, " +
			"       MIN(avg_duration) AS lower_bound, " +
			"       MAX(avg_duration) AS upper_bound, " +
			"       COUNT(*) AS member_count " +
			"FROM ranked " +
			"WHERE age_range = ? " +
			"GROUP BY age_range, percentile_bucket";

		return jdbcTemplate.query(sql, PercentileBinDto::from, getCutOff(), ageRange);
	}

	public List<PercentileBinDto> findAgeRangeGenderDistribution(String ageRange, Gender gender) {
		// PARTITION BY 조건은 age_range와 gender 모두 사용
		String partitionBy = "age_range, gender";
		String sql = String.format(BASE_AGE_RANGE_QUERY, partitionBy) +
			"SELECT percentile_bucket AS bin, " +
			"       MIN(avg_duration) AS lower_bound, " +
			"       MAX(avg_duration) AS upper_bound, " +
			"       COUNT(*) AS member_count " +
			"FROM ranked " +
			"WHERE age_range = ? AND gender = ? " +
			"GROUP BY age_range, gender, percentile_bucket";

		return jdbcTemplate.query(sql, PercentileBinDto::from, getCutOff(), ageRange, gender.name());
	}

	public void bulkInsertDistribution(List<DistributionSummary> summaries) {
		String sql =
			"INSERT INTO distribution_summary (aggregation_base_time, distribution_type, age_range, gender, bin, lower_bound, upper_bound, count) "
				+
				"VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

		List<Object[]> batchArgs = new ArrayList<>();
		for (DistributionSummary summary : summaries) {
			batchArgs.add(new Object[] {
				summary.getAggregationBaseTime(),
				summary.getDistributionType().name(),
				summary.getAgeRange(),
				summary.getGender() != null ? summary.getGender().name() : null,
				summary.getBin(),
				summary.getLowerBound(),
				summary.getUpperBound(),
				summary.getCount()
			});
		}

		jdbcTemplate.batchUpdate(sql, batchArgs);

	}

	private Instant getCutOff() {
		ZoneId kstZone = ZoneId.of("Asia/Seoul");
		LocalDate yesterdayKst = LocalDate.now(kstZone).minusDays(1);
		return yesterdayKst.atStartOfDay(kstZone).toInstant();
	}
}