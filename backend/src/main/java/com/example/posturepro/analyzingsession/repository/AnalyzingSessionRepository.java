package com.example.posturepro.analyzingsession.repository;

import java.time.Instant;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.posturepro.analyzingsession.entity.AnalyzingSession;

@Repository
public interface AnalyzingSessionRepository extends JpaRepository<AnalyzingSession, Long> {
	@Query(value = """
		SELECT * FROM analyzing_session
		WHERE member_id = :memberId
		AND started_at BETWEEN CAST(:date AS DATETIME)
		AND DATE_ADD(CAST(:date AS DATETIME), INTERVAL 1 DAY)
		AND ended_at IS NOT NULL
		""", nativeQuery = true)
	List<AnalyzingSession> findAllByMemberAndDate(@Param("memberId") Long memberId, @Param("date") Instant date);
}
