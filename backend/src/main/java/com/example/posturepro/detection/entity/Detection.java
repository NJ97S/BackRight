package com.example.posturepro.detection.entity;

import java.time.Instant;

import com.example.posturepro.analyzingsession.entity.AnalyzingSession;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Entity
public class Detection {

	@Getter
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", insertable = false, updatable = false)
	private Long id;

	@Getter
	@Column(name = "started_at", columnDefinition = "TIMESTAMP")
	private Instant startedAt;

	@Setter
	@Column(name = "ended_at", columnDefinition = "TIMESTAMP")
	private Instant endedAt;

	@Setter
	@Getter
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
	@Getter
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "analyzing_session_id", nullable = false)
	private AnalyzingSession session;

	public Detection(CreateDetectionDto detectionDto) {
		this.startedAt = detectionDto.getStartedAt();
		this.session = detectionDto.getSession();
		this.neckDetected = detectionDto.isNeckDetected();
		this.leftShoulderDetected = detectionDto.isLeftShoulderDetected();
		this.rightShoulderDetected = detectionDto.isRightShoulderDetected();
		this.backDetected = detectionDto.isBackDetected();
		this.videoUrl = detectionDto.getVideoUrl();
	}

}
