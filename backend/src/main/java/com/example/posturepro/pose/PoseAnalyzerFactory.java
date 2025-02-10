package com.example.posturepro.pose;

import org.springframework.stereotype.Component;

import com.example.posturepro.analyzingsession.service.AnalyzingSessionService;
import com.example.posturepro.detection.service.DetectionService;

@Component
public class PoseAnalyzerFactory {
	private final AnalyzingSessionService analyzingSessionService;
	private final DetectionService detectionService;

	public PoseAnalyzerFactory(AnalyzingSessionService analyzingSessionService, DetectionService detectionService) {
		this.analyzingSessionService = analyzingSessionService;
		this.detectionService = detectionService;
	}

	public PoseAnalyzer create() {
		return new PoseAnalyzer(this.analyzingSessionService, this.detectionService);
	}
}
