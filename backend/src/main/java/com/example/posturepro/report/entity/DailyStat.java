package com.example.posturepro.report.entity;

import java.time.Instant;

import com.example.posturepro.analyzingsession.entity.AnalyzingSession;
import com.example.posturepro.detection.entity.DetectionCountStatDto;
import com.example.posturepro.detection.entity.DetectionType;
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
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class DailyStat {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", insertable = false, updatable = false)
	private Long id;

	@Column(name = "target_day", columnDefinition = "TIMESTAMP")
	Instant targetDay;

	@Column(name = "average_pose_duration")
	int averagePoseDuration;

	@Column(name = "total_duration")
	long totalDuration;

	@Column(name = "proper_pose_duration")
	long properPoseDuration;

	@Column(name = "total_detection")
	int totalDetection;

	@Column(name = "neck_detection_count")
	int neckDetectionCount;

	@Column(name = "left_shoulder_detection_count")
	int leftShoulderDetectionCount;

	@Column(name = "right_shoulder_detection_count")
	int rightShoulderDetectionCount;

	@Column(name = "back_detection_count")
	int backDetectionCount;

	// 외래키 관계 설정
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id", nullable = false)
	Member member;

	private DailyStat(AnalyzingSession session, Instant startOfDay) {
		this.targetDay = startOfDay;
		this.totalDuration = session.getSessionDuration();
		DetectionCountStatDto detectionCountStat = new DetectionCountStatDto(session.getDetections());
		this.properPoseDuration = totalDuration - detectionCountStat.getDetectionDuration();
		this.averagePoseDuration = (int)(((double)properPoseDuration / totalDuration) * 60);
		this.totalDetection = detectionCountStat.getTotalDetection();
		this.neckDetectionCount = detectionCountStat.getCounts().get(DetectionType.NECK);
		this.leftShoulderDetectionCount = detectionCountStat.getCounts().get(DetectionType.LEFT_SHOULDER);
		this.rightShoulderDetectionCount = detectionCountStat.getCounts().get(DetectionType.RIGHT_SHOULDER);
		this.backDetectionCount = detectionCountStat.getCounts().get(DetectionType.BACK);
		this.member = session.getMember();
	}

	public static DailyStat createDailyStat(AnalyzingSession session, Instant startOfDay) {
		return new DailyStat(session, startOfDay);
	}

	public void renew(AnalyzingSession session) {
		this.totalDuration += session.getSessionDuration();
		DetectionCountStatDto detectionCountStat = new DetectionCountStatDto(session.getDetections());
		this.properPoseDuration += totalDuration - detectionCountStat.getDetectionDuration();
		this.averagePoseDuration = (int)(((double)properPoseDuration / totalDuration) * 60);
		this.totalDetection += detectionCountStat.getTotalDetection();
		this.neckDetectionCount += detectionCountStat.getCounts().get(DetectionType.NECK);
		this.leftShoulderDetectionCount += detectionCountStat.getCounts().get(DetectionType.LEFT_SHOULDER);
		this.rightShoulderDetectionCount += detectionCountStat.getCounts().get(DetectionType.RIGHT_SHOULDER);
		this.backDetectionCount += detectionCountStat.getCounts().get(DetectionType.BACK);
	}

}
