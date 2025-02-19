package com.example.posturepro.analyzingsession.entity;

import java.time.Duration;
import java.time.Instant;
import java.util.List;

import com.example.posturepro.detection.entity.Detection;
import com.example.posturepro.domain.member.Member;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@Entity
public class AnalyzingSession {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", insertable = false, updatable = false)
	private Long id;

	@Column(name = "started_at", columnDefinition = "TIMESTAMP")
	private Instant startedAt;

	@Setter
	@Column(name = "ended_at", columnDefinition = "TIMESTAMP")
	private Instant endedAt;

	@Enumerated(EnumType.STRING)
	@Setter
	@Column(nullable = false)
	private AnalyzingSessionStatus status;

	// 외래키 관계 설정
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id", nullable = false)
	private Member member;

	@OneToMany(mappedBy = "session", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Detection> detections;

	@Builder
	public AnalyzingSession(Instant startedAt, Member member) {
		this.startedAt = startedAt;
		this.member = member;
		this.setStatus(AnalyzingSessionStatus.RUNNING);
	}

	public long getSessionDuration() {
		return Duration.between(this.getStartedAt(), this.getEndedAt()).toSeconds();
	}
}