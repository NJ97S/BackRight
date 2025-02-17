package com.example.posturepro.analyzingsession.service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.posturepro.analyzingsession.dto.AnalyzingSessionDto;
import com.example.posturepro.analyzingsession.dto.AnalyzingSessionStatDto;
import com.example.posturepro.analyzingsession.entity.AnalyzingSession;
import com.example.posturepro.analyzingsession.repository.AnalyzingSessionRepository;
import com.example.posturepro.domain.member.Member;
import com.example.posturepro.domain.member.service.MemberService;
import com.example.posturepro.exception.EntityNotFoundException;
import com.example.posturepro.report.entity.DailyStat;
import com.example.posturepro.report.repository.DailyStatRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnalyzingSessionServiceImpl implements AnalyzingSessionService {

	private final AnalyzingSessionRepository analyzingSessionRepository;
	private final MemberService memberService;
	private final DailyStatRepository dailyStatRepository;
	private Logger logger = LoggerFactory.getLogger(AnalyzingSessionServiceImpl.class);

	@Override
	public AnalyzingSession getSessionById(long sessionId) {
		return analyzingSessionRepository.findById(sessionId).orElse(null);
	}

	@Override
	@Transactional
	public AnalyzingSession createSession(String providerId) {
		Optional<Member> memberOpt = memberService.findByProviderId(providerId);
		if (memberOpt.isEmpty()) {
			throw new EntityNotFoundException("Member", "provider_id", providerId);
		}
		Member member = memberOpt.get();
		Instant startAt = Instant.now();

		AnalyzingSession session = AnalyzingSession.builder().startedAt(startAt).member(member).build();

		return analyzingSessionRepository.save(session);
	}

	@Override
	public AnalyzingSessionStatDto calculateSessionData(AnalyzingSession session) {
		return new AnalyzingSessionStatDto(session);
	}

	@Override
	@Transactional
	public void endSession(AnalyzingSession session) {
		session = getSessionById(session.getId());
		session.setEndedAt(Instant.now());
		analyzingSessionRepository.save(session);
		renewDailyStat(session);
	}

	public void renewDailyStat(AnalyzingSession session) {
		ZoneId zoneId = ZoneId.of("Asia/Seoul");

		Instant startOfDayKST = LocalDate.now(zoneId)
			.atStartOfDay(zoneId)
			.toInstant();

		this.dailyStatRepository.findByMemberIdAndTargetDay(session.getMember().getId(),
				startOfDayKST)
			.ifPresentOrElse(todayStat -> todayStat.renew(session),
				() -> dailyStatRepository.save(DailyStat.createDailyStat(session, startOfDayKST)));
	}

	@Override
	public List<AnalyzingSessionDto> getSessionByDate(Long memberId, Instant date) {
		List<AnalyzingSession> sessionList = analyzingSessionRepository.findAllByMemberAndDate(memberId, date);
		List<AnalyzingSessionDto> sessionDtoList = new ArrayList<>();
		for (AnalyzingSession session : sessionList) {
			sessionDtoList.add(new AnalyzingSessionDto(session));
		}
		return sessionDtoList;
	}

	// @Override
	// public AnalyzingSessionStatDto[] getSessionByWeekStart(Long memberId, Instant weekStart) {
	// 	AnalyzingSessionStatDto[] weeklySessionStatDto = new AnalyzingSessionStatDto[7];
	// 	List<AnalyzingSessionStatDto> sessionStatDtoList = new ArrayList<>();
	// 	for (int i = 0; i < 7; i++) {
	// 		sessionStatDtoList.clear();
	// 		List<AnalyzingSession> sessionList = analyzingSessionRepository.findAllByMemberAndDate(memberId,
	// 			weekStart.plus(i, ChronoUnit.DAYS));
	// 		for (AnalyzingSession session : sessionList) {
	// 			sessionStatDtoList.add(new AnalyzingSessionStatDto(session));
	// 		}
	// 		weeklySessionStatDto[i] = new AnalyzingSessionStatDto(sessionStatDtoList, true);
	// 	}
	// 	return weeklySessionStatDto;
	// }
}
