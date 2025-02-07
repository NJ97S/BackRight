package com.example.posturepro.pose;

import com.example.posturepro.detection.entity.DetectionType;

import lombok.Data;

@Data
public class PartProblemStatus {
	private boolean neck;
	private boolean leftShoulder;
	private boolean rightShoulder;
	private boolean back;

	public void markProblem(DetectionType detectionEnum) {
		switch (detectionEnum) {
			case NECK -> neck = true;
			case LEFT_SHOULDER -> leftShoulder = true;
			case RIGHT_SHOULDER -> rightShoulder = true;
			case BACK -> back = true;
		}
	}
}