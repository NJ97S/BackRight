package com.example.posturepro.report.repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.posturepro.report.entity.DailyStat;

@Repository
public interface DailyStatRepository extends JpaRepository<DailyStat, Long> {

	DailyStat findFirstByMemberIdAndTargetDayBeforeOrderByTargetDayDesc(Long memberId, Instant targetDay);

	Optional<DailyStat> findByMemberIdAndTargetDay(Long memberId, Instant targetDay);

	List<DailyStat> findAllByMemberIdAndTargetDayGreaterThanEqualAndTargetDayLessThan(
		Long memberID, Instant startDate, Instant endDate
	);
}
