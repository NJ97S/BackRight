package com.example.posturepro.analyzingsession.service;

import java.time.Instant;
import java.util.List;

import com.example.posturepro.analyzingsession.dto.AnalyzingSessionDto;
import com.example.posturepro.analyzingsession.entity.AnalyzingSession;
import com.example.posturepro.analyzingsession.entity.AnalyzingSessionStatus;

public interface AnalyzingSessionService {
	AnalyzingSession getSessionById(long sessionId);

	AnalyzingSession createSession(String providerId);

	AnalyzingSessionDto analyzingSessionToAnalyzingSessionDto(AnalyzingSession session);

	void endSession(AnalyzingSession session, AnalyzingSessionStatus status);

	void patchSessionStateToAbsent(Long sessionId);

	List<AnalyzingSessionDto> getSessionByDate(Long memberId, Instant date);

	// AnalyzingSessionStatDto[] getSessionByWeekStart(Long memberId, Instant weekStart);
}
