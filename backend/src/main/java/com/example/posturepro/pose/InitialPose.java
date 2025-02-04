package com.example.posturepro.pose;

import java.util.ArrayList;
import java.util.List;

public class InitialPose {
	private final List<BodyLandmark[]> poseHistory;  // 최근 포즈 데이터를 유지하는 리스트( 큐로 사용)
	private final BodyLandmark[] rightPose;          // 기준 포즈
	private static final int MAX_SIZE = 50;
	private boolean set;                // 기준 포즈 설정 여부

	static private final String[] names = {
		"nose",
		"left eye (inner)",
		"left eye",
		"left eye (outer)",
		"right eye (inner)",
		"right eye",
		"right eye (outer)",
		"left ear",
		"right ear",
		"mouth (left)",
		"mouth (right)",
		"left shoulder",
		"right shoulder"
	};

	// 생성자
	public InitialPose() {
		poseHistory = new ArrayList<>();
		rightPose = new BodyLandmark[13];
		set = false;

		for (int i = 0; i < 13; i++) {
			rightPose[i] = new BodyLandmark();
			rightPose[i].setName(names[i]);
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

		// 중앙값 계산을 위해 정렬
		xValues.sort(Double::compareTo);

		int size = xValues.size();
		if (size % 2 == 0) {
			return (xValues.get(size / 2 - 1) + xValues.get(size / 2)) / 2.0;
		} else {
			return xValues.get(size / 2);
		}
	}

	// 특정 노드의 y 값 중앙값을 계산하는 메서드
	private double calculateMedianY(int nodeIndex) {
		List<Double> yValues = new ArrayList<>();
		for (BodyLandmark[] pose : poseHistory) {
			yValues.add(pose[nodeIndex].y);
		}

		// 중앙값 계산을 위해 정렬
		yValues.sort(Double::compareTo);

		int size = yValues.size();
		if (size % 2 == 0) {
			return (yValues.get(size / 2 - 1) + yValues.get(size / 2)) / 2.0;
		} else {
			return yValues.get(size / 2);
		}
	}
}