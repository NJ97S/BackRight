package com.example.posturepro.pose;

import java.util.ArrayList;
import java.util.List;

public class InitialPose {
	private final List<BodyLandmark[]> poseHistory;  // 최근 포즈 데이터를 유지하는 리스트( 큐로 사용)
	private final BodyLandmark[] rightPose;          // 기준 포즈
	private static final int MAX_SIZE = 50;
	private boolean set;                // 기준 포즈 설정 여부

	public enum BodyLandmarkName {
		NOSE,
		LEFT_EYE_INNER,
		LEFT_EYE,
		LEFT_EYE_OUTER,
		RIGHT_EYE_INNER,
		RIGHT_EYE,
		RIGHT_EYE_OUTER,
		LEFT_EAR,
		RIGHT_EAR,
		MOUTH_LEFT,
		MOUTH_RIGHT,
		LEFT_SHOULDER,
		RIGHT_SHOULDER
	}

	// 생성자
	public InitialPose() {
		poseHistory = new ArrayList<>();
		rightPose = new BodyLandmark[BodyLandmarkName.values().length];  // Enum 개수만큼 배열 생성
		set = false;

		// 각 BodyLandmark에 이름 설정
		int index = 0;
		for (BodyLandmarkName landmarkName : BodyLandmarkName.values()) {
			rightPose[index] = new BodyLandmark();
			rightPose[index].setName(landmarkName.name());
			index++;
		}
	}

	// 초기자세 초기화
	public void clearInitialPose() {
		this.set = false;
		poseHistory.clear();
	}

	// 초기자세 존재 여부 확인
	public boolean getSet() {
		return set;
	}

	// 기준 포즈를 설정하는 메서드
	public boolean setInitialPose(BodyLandmark[] pose) {
		// 포즈 히스토리에 추가하고, 최대 10개까지만 유지
		poseHistory.add(pose);
		if (poseHistory.size() > MAX_SIZE) {
			poseHistory.remove(0);  // 가장 오래된 데이터 제거
		}

		// 각 노드의 중앙값 계산 및 유효성 검사
		for (int i = 0; i < 13; i++) {
			double medianX = calculateMedianX(i);
			double medianY = calculateMedianY(i);
			if (Math.abs(pose[i].x - medianX) > 0.05) {
				poseHistory.remove(0);  // 가장 오래된 데이터 제거
				return false;  // 중앙값에서 0.05 이상 벗어나면 유효하지 않음
			}
			if (Math.abs(pose[i].y - medianY) > 0.05) {
				poseHistory.remove(0);  // 가장 오래된 데이터 제거
				return false;  // 중앙값에서 0.05 이상 벗어나면 유효하지 않음
			}
			// 유효한 포즈가 기준에 도달하면 기준 포즈 설정
			if (poseHistory.size() == MAX_SIZE) {
				rightPose[i].setX(medianX);
				rightPose[i].setY(medianY);
			}

		}

		// 유효한 포즈가 기준에 도달하면 기준 포즈 설정됨 반환
		if (poseHistory.size() == MAX_SIZE) {
			set = true;
			return true;
		}

		return false;
	}

	// 현재 포즈가 기준 포즈와 일치하는지 검사
	public boolean[] checkPose(BodyLandmark[] pose) {
		boolean[] result = new boolean[pose.length];

		// 각 노드의 y 값 차이가 0.03을 초과하면 포즈가 기준에서 벗어났다고 판단
		for (int i = 0; i < 13; i++) {
			if (Math.abs(pose[i].y - rightPose[i].y) < 0.03) {
				result[i] = true;
			}
		}

		return result;
	}

	// 특정 노드의 x 값 중앙값을 계산하는 메서드
	private double calculateMedianX(int nodeIndex) {
		List<Double> xValues = new ArrayList<>();
		for (BodyLandmark[] pose : poseHistory) {
			xValues.add(pose[nodeIndex].x);
		}

		return calculateMedian(xValues);
	}

	// 특정 노드의 y 값 중앙값을 계산하는 메서드
	private double calculateMedianY(int nodeIndex) {
		List<Double> yValues = new ArrayList<>();
		for (BodyLandmark[] pose : poseHistory) {
			yValues.add(pose[nodeIndex].y);
		}

		return calculateMedian(yValues);
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
}