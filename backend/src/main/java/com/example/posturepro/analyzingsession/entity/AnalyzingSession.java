package com.example.posturepro.analyzingsession.entity;

import java.time.Instant;

import com.example.posturepro.domain.member.Member;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Builder;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Entity
public class AnalyzingSession {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", insertable = false, updatable = false)
	private Long id;

	@Column(name = "started_at", columnDefinition = "TIMESTAMP")
	private Instant startedAt;

	@Column(name = "ended_at", columnDefinition = "TIMESTAMP")
	private Instant endedAt;

	// 외래키 관계 설정
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id", nullable = false)
	private Member member;

	@Builder
	public AnalyzingSession(Instant startedAt, Member member) {
		this.startedAt = startedAt;
		this.member = member;
	}
}