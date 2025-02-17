package com.example.posturepro.report.entity;

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
import lombok.Getter;

@Entity
@Getter
public class DailyStat {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", insertable = false, updatable = false)
	private Long id;

	@Column(name = "target_day", columnDefinition = "TIMESTAMP")
	Instant targetDay;

	@Column(name = "average_pose_duration")
	int averagePoseDuration;

	// 외래키 관계 설정
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id", nullable = false)
	Member member;
}
