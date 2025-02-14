package com.example.posturepro.analyzingsession.service;

import java.time.Instant;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.posturepro.analyzingsession.entity.AnalyzingSession;
import com.example.posturepro.analyzingsession.repository.AnalyzingSessionRepository;
import com.example.posturepro.domain.member.Member;
import com.example.posturepro.domain.member.service.MemberService;

@Service
public class AnalyzingSessionServiceImpl implements AnalyzingSessionService {

	private final AnalyzingSessionRepository analyzingSessionRepository;
	private final MemberService memberService;

	public AnalyzingSessionServiceImpl(AnalyzingSessionRepository analyzingSessionRepository,
		MemberService memberService) {
		this.analyzingSessionRepository = analyzingSessionRepository;
		this.memberService = memberService;
	}

	@Override
	public AnalyzingSession getSessionById(long sessionId) {
		return analyzingSessionRepository.findById(sessionId).orElse(null);
	}

	@Override
	@Transactional
	public AnalyzingSession createSession(String providerId) {
		Optional<Member> memberOpt = memberService.findByProviderId(providerId);
		if (memberOpt.isEmpty()) {
			// todo Exeption 던지던가 해서 ControllerAdvice로 잡을 것
			return null;
			// throw new SQLException(String.format("Provider ID %s does not exist in the database.", providerId));
		}
		Member member = memberOpt.get();
		Instant startAt = Instant.now();

		AnalyzingSession session = AnalyzingSession.builder().startedAt(startAt).member(member).build();

		return analyzingSessionRepository.save(session);
	}

	@Override
	public AnalyzingSession updateSessionEndAt() {
		AnalyzingSession session = new AnalyzingSession();
		return analyzingSessionRepository.save(session);
	}
}
