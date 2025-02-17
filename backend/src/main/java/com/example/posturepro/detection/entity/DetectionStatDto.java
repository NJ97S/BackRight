package com.example.posturepro.detection.entity;

import java.util.Map;

public record DetectionStatDto(
	int totalDetection,
	Map<DetectionType, Integer> counts
) {
}
