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
import com.example.posturepro.analyzingsession.entity.AnalyzingSessionStatus;
import com.example.posturepro.analyzingsession.repository.AnalyzingSessionRepository;
import com.example.posturepro.detection.entity.Detection;
import com.example.posturepro.detection.entity.DetectionDto;
import com.example.posturepro.detection.entity.DetectionStatAggregator;
import com.example.posturepro.detection.entity.DetectionStatDto;
import com.example.posturepro.domain.member.Member;
import com.example.posturepro.domain.member.service.MemberService;
import com.example.posturepro.exception.EntityNotFoundException;
import com.example.posturepro.exception.InvalidSessionStateException;
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
	@Transactional
	public void endSession(AnalyzingSession session, AnalyzingSessionStatus status) {
		session = getSessionById(session.getId());
		session.setEndedAt(Instant.now());
		session.setStatus(status);
		var endedSession = analyzingSessionRepository.save(session);
		renewDailyStat(endedSession);
	}

	@Override
	@Transactional
	public void patchSessionStateToAbsent(Long sessionId) {
		AnalyzingSession session = getSessionById(sessionId);
		if (session == null)
			throw new EntityNotFoundException(AnalyzingSession.class.toString(), "sessionId", sessionId);

		if (session.getStatus() != AnalyzingSessionStatus.FINISHED
			&& session.getStatus() != AnalyzingSessionStatus.RUNNING)
			throw new InvalidSessionStateException(sessionId);

		session.setStatus(AnalyzingSessionStatus.ABSENT);
		analyzingSessionRepository.save(session);
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
			sessionDtoList.add(analyzingSessionToAnalyzingSessionDto(session));
		}
		return sessionDtoList;
	}

	@Override
	public AnalyzingSessionDto analyzingSessionToAnalyzingSessionDto(AnalyzingSession session) {
		long sessionDuration = session.getSessionDuration();
		DetectionStatAggregator detectionStatAggregator = new DetectionStatAggregator();
		List<DetectionDto> detectionDtoList = new ArrayList<>();

		for (Detection detection : session.getDetections()) {
			detectionStatAggregator.addDetectionStat(detection);
			detectionDtoList.add(DetectionDto.fromDetection(detection));
		}

		DetectionStatDto detectionStatDto = detectionStatAggregator.toDto();

		long properPoseDuration = sessionDuration - detectionStatAggregator.getDetectionDuration();
		int averagePoseDuration = (int)(((double)properPoseDuration / sessionDuration) * 60);
		AnalyzingSessionStatDto analyzingSessionStatDto = new AnalyzingSessionStatDto(sessionDuration,
			properPoseDuration, averagePoseDuration);

		return new AnalyzingSessionDto(session.getStartedAt(), session.getEndedAt(), session.getStatus(),
			detectionDtoList, detectionStatDto, analyzingSessionStatDto);

	}
}
