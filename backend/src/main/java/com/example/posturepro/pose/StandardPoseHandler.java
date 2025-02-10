package com.example.posturepro.pose;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.EnumMap;
import java.util.List;

import com.example.posturepro.detection.entity.DetectionType;

import lombok.Getter;

public class StandardPoseHandler {
	private static final int MAX_HISTORY_SIZE = 50;        // 큐의 최대 크기
	private static final int[] USED_LANDMARK_INDEXES = {   // 사용할 BodyLandmarkName의 인덱스 배열
		BodyLandmarkName.NOSE.ordinal(),
		BodyLandmarkName.LEFT_EAR.ordinal(),
		BodyLandmarkName.RIGHT_EAR.ordinal(),
		BodyLandmarkName.LEFT_SHOULDER.ordinal(),
		BodyLandmarkName.RIGHT_SHOULDER.ordinal(),
		BodyLandmarkName.LEFT_HIP.ordinal(),
		BodyLandmarkName.RIGHT_HIP.ordinal()
	};

	// 축 정의 enum
	enum Axis {X, Y, Z}

	private final Deque<BodyLandmark[]> poseHistoryQueue;  // 최근 포즈 데이터를 유지하는 큐
	private final BodyLandmark[] referencePose;            // 기준 포즈

	@Getter
	private boolean isPoseSet;                             // 기준 포즈 설정 여부

	// 생성자
	public StandardPoseHandler() {
		this.poseHistoryQueue = new ArrayDeque<>();
		this.referencePose = new BodyLandmark[BodyLandmarkName.values().length];
		this.isPoseSet = false;

		resetReferencePose();
	}

	// 초기자세 초기화
	public void resetReferencePose() {
		for (int i = 0; i < referencePose.length; i++) {
			referencePose[i] = new BodyLandmark();
		}
		this.isPoseSet = false;
		this.poseHistoryQueue.clear();
	}

	// 기준 포즈를 설정하는 메서드
	public boolean setInitialPose(BodyLandmark[] pose) {
		// 포즈 히스토리에 추가하고, 최대 10개까지만 유지
		poseHistoryQueue.add(pose);
		if (poseHistoryQueue.size() > MAX_HISTORY_SIZE) {
			poseHistoryQueue.pollFirst();  // 가장 오래된 데이터 제거
		}

		// 각 노드의 중앙값 계산 및 유효성 검사
		for (int i = 0; i < referencePose.length; i++) {
			double medianX = getMedian(i, Axis.X);
			double medianY = getMedian(i, Axis.Y);
			double medianZ = getMedian(i, Axis.Z);
			if (Math.abs(pose[i].x - medianX) > 0.05) {
				poseHistoryQueue.pollFirst();  // 가장 오래된 데이터 제거
				return false;  // 중앙값에서 0.05 이상 벗어나면 유효하지 않음
			}
			if (Math.abs(pose[i].y - medianY) > 0.05) {
				poseHistoryQueue.pollFirst();  // 가장 오래된 데이터 제거
				return false;  // 중앙값에서 0.05 이상 벗어나면 유효하지 않음
			}
			// 유효한 포즈가 기준에 도달하면 기준 포즈 설정
			if (poseHistoryQueue.size() == MAX_HISTORY_SIZE) {
				referencePose[i].setX(medianX);
				referencePose[i].setY(medianY);
			}

		}

		// 유효한 포즈가 기준에 도달하면 기준 포즈 설정됨 반환
		if (poseHistoryQueue.size() >= MAX_HISTORY_SIZE) {
			isPoseSet = true;
			return true;
		}

		return false;
	}

	// 현재 포즈가 기준 포즈와 일치하는지 검사
	public EnumMap<DetectionType, Boolean> isPoseMatching(BodyLandmark[] pose) {
		EnumMap<DetectionType, Boolean> validationResults = new EnumMap<>(DetectionType.class);

		// 데이터 확인용
		// for (int i: USED_LANDMARK_INDEXES) {
		// 	System.out.println(i+"\t- x:"+pose[i].x+"\ty:"+pose[i].y+" \tz:"+pose[i].z);
		// }
		// System.out.println("============================");

		// 특정 노드의 y 값 차이가 0.03을 초과하면 포즈가 기준에서 벗어났다고 판단
		// todo 로직 완성 필요 부위마다 로직을 짜야할 것 같습니다.
		// validationResults.put(DetectionType.NECK, matchNeckCondition());
		// validationResults.put(DetectionType.LEFT_SHOULDER, matchLeftShoulderCondition());
		// validationResults.put(DetectionType.RIGHT_SHOULDER, matchRightShoulderCondition());
		// validationResults.put(DetectionType.BACK, matchBackCondition());

		for (int index : USED_LANDMARK_INDEXES) {
			BodyLandmarkName landmarkName = BodyLandmarkName.values()[index];

			switch (landmarkName) {
				case NOSE:
					// validationResults.put(DetectionType.NECK, Math.abs(pose[index].y - referencePose[index].y) < 0.03);
					break;
				case LEFT_SHOULDER:
					validationResults.put(DetectionType.LEFT_SHOULDER,
						Math.abs(pose[index].y - referencePose[index].y) < 0.03);
					break;
				case RIGHT_SHOULDER:
					validationResults.put(DetectionType.RIGHT_SHOULDER,
						Math.abs(pose[index].y - referencePose[index].y) < 0.03);
					break;

			}
			// validationResults.put(landmarkName, Math.abs(pose[index].y - referencePose[index].y) < 0.03);
		}

		return validationResults;
	}

	// 특정 노드에서 축의 중앙값을 계산하는 메서드
	private double getMedian(int nodeIndex, Axis axis) {
		List<Double> values = new ArrayList<>();
		for (BodyLandmark[] pose : poseHistoryQueue) {
			switch (axis) {
				case X -> values.add(pose[nodeIndex].x);
				case Y -> values.add(pose[nodeIndex].y);
				case Z -> values.add(pose[nodeIndex].z);
			}
		}
		return calculateMedian(values);
	}

	// 중앙값 계산 로직 메서드
	private double calculateMedian(List<Double> values) {
		values.sort(Double::compareTo);
		int size = values.size();

		if (size % 2 == 0) {
			return (values.get(size / 2 - 1) + values.get(size / 2)) / 2.0;
		} else {
			return values.get(size / 2);
		}
	}

	private boolean matchNeckCondition() {

		return false;
	}

	private boolean matchLeftShoulderCondition() {

		return false;
	}

	private boolean matchRightShoulderCondition() {

		return false;
	}

	private boolean matchBackCondition() {

		return false;
	}
}