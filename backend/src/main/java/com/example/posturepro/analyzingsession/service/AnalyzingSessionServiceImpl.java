package com.example.posturepro.analyzingsession.service;

import org.springframework.stereotype.Service;

import com.example.posturepro.analyzingsession.entity.AnalyzingSession;
import com.example.posturepro.analyzingsession.repository.AnalyzingSessionRepository;

@Service
public class AnalyzingSessionServiceImpl implements AnalyzingSessionService {

	private final AnalyzingSessionRepository analyzingSessionRepository;

	public AnalyzingSessionServiceImpl(AnalyzingSessionRepository analyzingSessionRepository) {
		this.analyzingSessionRepository = analyzingSessionRepository;
	}

	@Override
	public AnalyzingSession getSessionById(long sessionId) {
		return analyzingSessionRepository.findById(sessionId).orElse(null);
	}

	@Override
	public AnalyzingSession createSession() {
		AnalyzingSession session = new AnalyzingSession();
		return analyzingSessionRepository.save(session);
	}
}
