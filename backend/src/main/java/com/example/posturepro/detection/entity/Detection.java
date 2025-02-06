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
import lombok.Setter;

@Entity
@Getter
@Setter
public class Detection {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", insertable = false, updatable = false)
	private long id;

	@Column(name = "detection_start_time", columnDefinition = "TIMESTAMP")
	private Instant detectionStartTime;

	@Column(name = "detection_end_time", columnDefinition = "TIMESTAMP")
	private Instant detectionEndTime;

	@Column(name = "video_url")
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

	public static Detection fromDto(DetectionDto detectionDto, AnalyzingSession session) {
		Detection detection = new Detection();
		detection.setDetectionStartTime(detectionDto.getDetectionStartTime());
		detection.setDetectionEndTime(detectionDto.getDetectionEndTime());
		detection.setVideoUrl(detectionDto.getVideoUrl());
		detection.setNeckDetected(detectionDto.isNeckDetected());
		detection.setLeftShoulderDetected(detectionDto.isLeftShoulderDetected());
		detection.setRightShoulderDetected(detectionDto.isRightShoulderDetected());
		detection.setBackDetected(detectionDto.isBackDetected());
		detection.setSession(session);  // Session 설정
		return detection;
	}

}
