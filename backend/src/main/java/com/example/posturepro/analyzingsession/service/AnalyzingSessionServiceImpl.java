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

	// todo 일단 필요할 것 같아 만들어 놓은거라 고쳐야 합니다
	@Override
	public AnalyzingSession updateSessionEndAt() {
		AnalyzingSession session = new AnalyzingSession();
		return analyzingSessionRepository.save(session);
	}
}
