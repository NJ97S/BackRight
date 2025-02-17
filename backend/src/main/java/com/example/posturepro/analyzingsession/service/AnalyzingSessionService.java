package com.example.posturepro.analyzingsession.service;

import java.time.Instant;
import java.util.List;

import com.example.posturepro.analyzingsession.dto.AnalyzingSessionDto;
import com.example.posturepro.analyzingsession.entity.AnalyzingSession;

public interface AnalyzingSessionService {
	AnalyzingSession getSessionById(long sessionId);

	AnalyzingSession createSession(String providerId);

	AnalyzingSessionDto calculateSessionData(AnalyzingSession session);

	void endSession(AnalyzingSession session);

	List<AnalyzingSessionDto> getSessionByDate(Long memberId, Instant date);

	// AnalyzingSessionStatDto[] getSessionByWeekStart(Long memberId, Instant weekStart);
}
