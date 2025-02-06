package com.example.posturepro.pose;

import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

import lombok.Getter;

public class StandardPoseHandler {
	private final Deque<BodyLandmark[]> poseHistoryQueue;     // 최근 포즈 데이터를 유지하는 큐
	private final BodyLandmark[] referencePose;            // 기준 포즈
	private static final int MAX_HISTORY_SIZE = 50;        // 큐의 최대 크기
	@Getter
	private boolean isPoseSet;                             // 기준 포즈 설정 여부

	// 생성자
	public StandardPoseHandler() {
		this.poseHistoryQueue = new ArrayDeque<>();
		this.referencePose = new BodyLandmark[BodyLandmarkName.values().length];
		this.isPoseSet = false;
		resetReferencePose();
		// // 각 BodyLandmark에 이름 설정
		// int index = 0;
		// for (BodyLandmarkName landmarkName : BodyLandmarkName.values()) {
		// 	referencePose[index] = new BodyLandmark();
		// 	referencePose[index].setName(landmarkName.name());
		// 	index++;
		// }
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
			double medianX = getMedianX(i);
			double medianY = getMedianY(i);
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
	public boolean[] isPoseMatching(BodyLandmark[] pose) {
		boolean[] validationResults = new boolean[pose.length];

		// 각 노드의 y 값 차이가 0.03을 초과하면 포즈가 기준에서 벗어났다고 판단
		for (int i = 0; i < referencePose.length; i++) {
			validationResults[i] = Math.abs(pose[i].y - referencePose[i].y) < 0.03;
		}

		return validationResults;
	}

	// 특정 노드의 x 값 중앙값을 계산하는 메서드
	private double getMedianX(int nodeIndex) {
		List<Double> xValues = new ArrayList<>();
		for (BodyLandmark[] pose : poseHistoryQueue) {
			xValues.add(pose[nodeIndex].x);
		}

		return calculateMedian(xValues);
	}

	// 특정 노드의 y 값 중앙값을 계산하는 메서드
	private double getMedianY(int nodeIndex) {
		List<Double> yValues = new ArrayList<>();
		for (BodyLandmark[] pose : poseHistoryQueue) {
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