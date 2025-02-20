package com.example.posturepro.domain.distributionsummary.model;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Set;

import com.example.posturepro.domain.member.Gender;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "distribution_summary",
	uniqueConstraints = {
		@UniqueConstraint(
			name = "uniq_distribution",
			columnNames = {"created_at", "distribution_type", "age_range", "gender", "bin"}
		)
	}
)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class DistributionSummary {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	// 분포가 산출된 날짜
	@Column(name = "aggregation_base_time ", nullable = false, columnDefinition = "TIMESTAMP")
	private Instant aggregationBaseTime;

	// 분포 타입 : OVERALL, AGE, GENDER_AGE
	@Enumerated(EnumType.STRING)
	@Column(name = "distribution_type", nullable = false)
	private DistributionType distributionType;

	// 연령 구간 (예: "10-19", "20-29", "30-39", "40-49", "50-59", "60-")
	// 전체 분포(OVERALL)의 경우는 NULL 가능
	@Column(name = "age_range")
	private String ageRange;

	// 성별 (GENDER_AGE 타입에서 사용하며, AGE 단독 분포는 NULL)
	@Enumerated(EnumType.STRING)
	@Column(name = "gender")
	private Gender gender;

	// 분 단위 bin 번호 (예: 0~59)
	@Column(name = "bin", nullable = false)
	private int bin;

	// 해당 bin에 속하는 회원 수
	@Column(name = "count", nullable = false)
	private int count;

	public static final Set<String> ALLOWED_AGE_RANGES = Set.of("-19", "20-29", "30-39", "40-49", "50-59", "60-");

	public static DistributionSummary createOverallSummary(int bin, int lowerBound, int upperBound,
		int count) {
		validateBin(bin);

		return new DistributionSummary(DistributionType.OVERALL, null, null, bin,
			count);
	}

	// 연령별 분포 생성 (ageRange 필수, gender는 null)
	public static DistributionSummary createAgeRangeSummary(String ageRange, int bin, int count) {
		validateAgeRange(ageRange);
		validateBin(bin);
		return new DistributionSummary(DistributionType.AGE, ageRange, null, bin, count);
	}

	// 성별+연령별 분포 생성 (ageRange와 gender 모두 필수)
	public static DistributionSummary createAgeRangeGenderSummary(String ageRange, Gender gender,
		int bin,
		int lowerBound, int upperBound, int count) {
		validateAgeRange(ageRange);
		validateGender(gender);
		validateBin(bin);
		return new DistributionSummary(DistributionType.GENDER_AGE, ageRange, gender, bin, count);
	}

	private DistributionSummary(DistributionType distributionType, String ageRange, Gender gender,
		int bin, int count) {
		this.aggregationBaseTime = getBaseTime();
		this.distributionType = distributionType;
		this.ageRange = ageRange;
		this.gender = gender;
		this.bin = bin;
		this.count = count;
	}

	private static void validateBin(int bin) {
		if (bin < 0 || bin > 99) {
			throw new IllegalArgumentException("bin 값은 0과 99 사이여야 합니다.");
		}
	}

	private static void validateAgeRange(String ageRange) {
		if (ageRange == null || ageRange.trim().isEmpty()) {
			throw new IllegalArgumentException("ageRange는 null이거나 빈 문자열일 수 없습니다.");
		}
		String trimmedAgeRange = ageRange.trim();
		if (!ALLOWED_AGE_RANGES.contains(trimmedAgeRange)) {
			throw new IllegalArgumentException("유효하지 않은 ageRange 값입니다. (허용: " + ALLOWED_AGE_RANGES + ")");
		}
	}

	private static void validateGender(Gender gender) {
		if (gender == null) {
			throw new IllegalArgumentException("gender는 null일 수 없습니다.");
		}
	}

	public static Instant getBaseTime() {
		ZoneId kstZone = ZoneId.of("Asia/Seoul");
		return LocalDate.now(kstZone).atStartOfDay(kstZone).toInstant();
	}
}
