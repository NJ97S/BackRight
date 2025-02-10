package com.example.posturepro.analyzingsession.service;

import com.example.posturepro.analyzingsession.entity.AnalyzingSession;

public interface AnalyzingSessionService {
	AnalyzingSession getSessionById(long sessionId);

	AnalyzingSession createSession();

	AnalyzingSession updateSessionEndAt();
}
