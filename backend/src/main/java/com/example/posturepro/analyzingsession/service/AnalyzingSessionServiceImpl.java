package com.example.posturepro.analyzingsession.service;

import java.time.Instant;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.posturepro.analyzingsession.entity.AnalyzingSession;
import com.example.posturepro.analyzingsession.repository.AnalyzingSessionRepository;
import com.example.posturepro.domain.member.Member;
import com.example.posturepro.domain.member.service.MemberService;
import com.example.posturepro.exception.EntityNotFound;

@Service
public class AnalyzingSessionServiceImpl implements AnalyzingSessionService {

	private final AnalyzingSessionRepository analyzingSessionRepository;
	private final MemberService memberService;
	private Logger logger = LoggerFactory.getLogger(AnalyzingSessionServiceImpl.class);

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
			throw new EntityNotFound("Member", "provider_id", providerId);
		}
		Member member = memberOpt.get();
		Instant startAt = Instant.now();

		AnalyzingSession session = AnalyzingSession.builder().startedAt(startAt).member(member).build();

		return analyzingSessionRepository.save(session);
	}

	@Override
	@Transactional
	public void endSession(AnalyzingSession session) {
		session = getSessionById(session.getId());
		session.setEndedAt(Instant.now());
		analyzingSessionRepository.save(session);
	}
}
