package com.example.posturepro.detection.entity;

import java.time.Instant;

import com.example.posturepro.analyzingsession.entity.AnalyzingSession;
import com.example.posturepro.pose.PartProblemStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Detection {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", insertable = false, updatable = false)
	private Long id;

	@Column(name = "started_at", columnDefinition = "TIMESTAMP")
	private Instant startedAt;

	@Column(name = "ended_at", columnDefinition = "TIMESTAMP")
	private Instant endedAt;

	@Column(name = "video_url", columnDefinition = "TEXT")
	private String videoUrl;

	@Column(name = "neck_detected")
	private boolean neckDetected;

	@Column(name = "left_shoulder_detected")
	private boolean leftShoulderDetected;

	@Column(name = "right_shoulder_detected")
	private boolean rightShoulderDetected;

	@Column(name = "back_detected")
	private boolean backDetected;

	// 외래키 관계 설정
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "analyzing_session_id", nullable = false)
	private AnalyzingSession session;

	public void setProblemParts(PartProblemStatus problemPart) {
		if (problemPart.isNeck())
			neckDetected = true;
		if (problemPart.isLeftShoulder())
			leftShoulderDetected = true;
		if (problemPart.isRightShoulder())
			rightShoulderDetected = true;
		if (problemPart.isBack())
			backDetected = true;
	}

}
