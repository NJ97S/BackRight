package com.example.posturepro.domain.distributionsummary.repository;

import java.time.Instant;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.example.posturepro.domain.distributionsummary.model.DistributionSummary;
import com.example.posturepro.domain.member.Gender;

import lombok.RequiredArgsConstructor;

@Repository
@RequiredArgsConstructor
public class DistributionSummaryJdbcRepository {

	private final JdbcTemplate jdbcTemplate;

	private static final String POPULATE_TEMP_BINS_SQL =
		"INSERT INTO temp_bins (bin) " +
			"SELECT t.bin FROM ( " +
			"  SELECT 0 AS bin UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL " +
			"  SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL SELECT 9 UNION ALL " +
			"  SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12 UNION ALL SELECT 13 UNION ALL SELECT 14 UNION ALL " +
			"  SELECT 15 UNION ALL SELECT 16 UNION ALL SELECT 17 UNION ALL SELECT 18 UNION ALL SELECT 19 UNION ALL " +
			"  SELECT 20 UNION ALL SELECT 21 UNION ALL SELECT 22 UNION ALL SELECT 23 UNION ALL SELECT 24 UNION ALL " +
			"  SELECT 25 UNION ALL SELECT 26 UNION ALL SELECT 27 UNION ALL SELECT 28 UNION ALL SELECT 29 UNION ALL " +
			"  SELECT 30 UNION ALL SELECT 31 UNION ALL SELECT 32 UNION ALL SELECT 33 UNION ALL SELECT 34 UNION ALL " +
			"  SELECT 35 UNION ALL SELECT 36 UNION ALL SELECT 37 UNION ALL SELECT 38 UNION ALL SELECT 39 UNION ALL " +
			"  SELECT 40 UNION ALL SELECT 41 UNION ALL SELECT 42 UNION ALL SELECT 43 UNION ALL SELECT 44 UNION ALL " +
			"  SELECT 45 UNION ALL SELECT 46 UNION ALL SELECT 47 UNION ALL SELECT 48 UNION ALL SELECT 49 UNION ALL " +
			"  SELECT 50 UNION ALL SELECT 51 UNION ALL SELECT 52 UNION ALL SELECT 53 UNION ALL SELECT 54 UNION ALL " +
			"  SELECT 55 UNION ALL SELECT 56 UNION ALL SELECT 57 UNION ALL SELECT 58 UNION ALL SELECT 59 " +
			") t";

	public void insertOverallDistributionSummary() {
		Instant aggregationBaseTime = DistributionSummary.getBaseTime();

		// 단계 1: 임시 테이블 생성 및 채우기
		// 1. 임시 테이블 생성
		jdbcTemplate.execute("CREATE TEMPORARY TABLE temp_bins (bin INT)");

		// 2. 임시 테이블에 0~59 삽입 (UNION ALL 사용)
		jdbcTemplate.execute(POPULATE_TEMP_BINS_SQL);

		String insertSql =
			"INSERT INTO distribution_summary (aggregation_base_time, distribution_type, age_range, gender, bin, count) "
				+
				"SELECT ?, 'OVERALL', NULL, NULL, t.bin, COALESCE(a.cnt, 0) " +
				"FROM temp_bins t " +
				"LEFT JOIN ( " +
				"  SELECT ds.average_pose_duration AS bin, COUNT(*) AS cnt " +
				"  FROM daily_stat ds " +
				"  WHERE ds.target_day <= ? " +
				"  GROUP BY ds.average_pose_duration " +
				") a ON t.bin = a.bin";

		jdbcTemplate.update(insertSql, aggregationBaseTime, aggregationBaseTime);

		// (선택 사항) 임시 테이블 삭제 – 임시 테이블은 세션 종료 시 자동 삭제되지만, 명시적으로 삭제할 수도 있음
		String dropTempTableSql = "DROP TEMPORARY TABLE IF EXISTS temp_bins";
		jdbcTemplate.execute(dropTempTableSql);
	}

	public void insertAgeDistributionSummary(String ageRange) {
		Instant aggregationBaseTime = DistributionSummary.getBaseTime();

		// 1. 임시 테이블 생성
		jdbcTemplate.execute("CREATE TEMPORARY TABLE temp_bins (bin INT)");

		// 2. 임시 테이블에 0~59 삽입 (UNION ALL 사용)
		jdbcTemplate.execute(POPULATE_TEMP_BINS_SQL);

		// 3. 집계 쿼리: daily_stat과 member를 JOIN하여, ageRange 조건을 CASE 구문으로 적용하고,
		//    average_pose_duration(이미 분 단위)별 count를 집계
		String insertSql =
			"INSERT INTO distribution_summary (aggregation_base_time, distribution_type, age_range, gender, bin, count) "
				+
				"SELECT ?, 'AGE', ?, NULL, t.bin, COALESCE(a.cnt, 0) " +
				"FROM temp_bins t " +
				"LEFT JOIN ( " +
				"  SELECT ds.average_pose_duration AS bin, COUNT(*) AS cnt " +
				"  FROM daily_stat ds " +
				"  JOIN member m ON ds.member_id = m.id " +
				"  WHERE ds.target_day <= ? " +
				"    AND (CASE " +
				"         WHEN TIMESTAMPDIFF(YEAR, m.birth_date, CURDATE()) < 20 THEN '-19' " +
				"         WHEN TIMESTAMPDIFF(YEAR, m.birth_date, CURDATE()) BETWEEN 20 AND 29 THEN '20-29' " +
				"         WHEN TIMESTAMPDIFF(YEAR, m.birth_date, CURDATE()) BETWEEN 30 AND 39 THEN '30-39' " +
				"         WHEN TIMESTAMPDIFF(YEAR, m.birth_date, CURDATE()) BETWEEN 40 AND 49 THEN '40-49' " +
				"         WHEN TIMESTAMPDIFF(YEAR, m.birth_date, CURDATE()) BETWEEN 50 AND 59 THEN '50-59' " +
				"         ELSE '60-' " +
				"       END) = ? " +
				"  GROUP BY ds.average_pose_duration " +
				") a ON t.bin = a.bin";

		// 파라미터 순서: aggregationBaseTime, ageRange, aggregationBaseTime, ageRange
		jdbcTemplate.update(insertSql, aggregationBaseTime, ageRange, aggregationBaseTime, ageRange);

		// 4. 임시 테이블 삭제
		jdbcTemplate.execute("DROP TEMPORARY TABLE IF EXISTS temp_bins");
	}

	/**
	 * GENDER_AGE 분포 집계: 주어진 ageRange(예: "20-29") 및 gender에 해당하는 회원들의 daily_stat 데이터를 집계하여,
	 * 0부터 59까지 모든 bin을 생성하고, 해당 bin에 대응하는 count를 INSERT합니다.
	 */
	public void insertGenderAgeDistributionSummary(String ageRange, Gender gender) {
		Instant aggregationBaseTime = DistributionSummary.getBaseTime();

		// 1. 임시 테이블 생성
		jdbcTemplate.execute("CREATE TEMPORARY TABLE temp_bins (bin INT)");

		// 2. 임시 테이블에 0~59 삽입 (UNION ALL 사용)
		jdbcTemplate.execute(POPULATE_TEMP_BINS_SQL);

		// 3. 집계 쿼리: daily_stat과 member를 JOIN하여, ageRange 조건과 gender 조건을 적용하고,
		//    average_pose_duration(분)별 count를 집계
		String insertSql =
			"INSERT INTO distribution_summary (aggregation_base_time, distribution_type, age_range, gender, bin, count) "
				+
				"SELECT ?, 'GENDER_AGE', ?, ?, t.bin, COALESCE(a.cnt, 0) " +
				"FROM temp_bins t " +
				"LEFT JOIN ( " +
				"  SELECT ds.average_pose_duration AS bin, COUNT(*) AS cnt " +
				"  FROM daily_stat ds " +
				"  JOIN member m ON ds.member_id = m.id " +
				"  WHERE ds.target_day <= ? " +
				"    AND (CASE " +
				"         WHEN TIMESTAMPDIFF(YEAR, m.birth_date, CURDATE()) < 20 THEN '-19' " +
				"         WHEN TIMESTAMPDIFF(YEAR, m.birth_date, CURDATE()) BETWEEN 20 AND 29 THEN '20-29' " +
				"         WHEN TIMESTAMPDIFF(YEAR, m.birth_date, CURDATE()) BETWEEN 30 AND 39 THEN '30-39' " +
				"         WHEN TIMESTAMPDIFF(YEAR, m.birth_date, CURDATE()) BETWEEN 40 AND 49 THEN '40-49' " +
				"         WHEN TIMESTAMPDIFF(YEAR, m.birth_date, CURDATE()) BETWEEN 50 AND 59 THEN '50-59' " +
				"         ELSE '60-' " +
				"       END) = ? " +
				"    AND m.gender = ? " +
				"  GROUP BY ds.average_pose_duration " +
				") a ON t.bin = a.bin";

		// 파라미터 순서: aggregationBaseTime, ageRange, gender, aggregationBaseTime, ageRange, gender
		jdbcTemplate.update(insertSql, aggregationBaseTime, ageRange, gender.name(), aggregationBaseTime, ageRange,
			gender.name());

		// 4. 임시 테이블 삭제
		jdbcTemplate.execute("DROP TEMPORARY TABLE IF EXISTS temp_bins");
	}

}