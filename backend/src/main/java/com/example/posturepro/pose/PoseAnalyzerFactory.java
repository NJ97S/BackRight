package com.example.posturepro.pose;

import org.springframework.stereotype.Component;

import com.example.posturepro.analyzingsession.service.AnalyzingSessionService;
import com.example.posturepro.api.s3.component.S3Component;
import com.example.posturepro.detection.service.DetectionService;

@Component
public class PoseAnalyzerFactory {
	private final AnalyzingSessionService analyzingSessionService;
	private final DetectionService detectionService;
	private final S3Component s3Component;

	public PoseAnalyzerFactory(AnalyzingSessionService analyzingSessionService, DetectionService detectionService,
		S3Component s3Component) {
		this.analyzingSessionService = analyzingSessionService;
		this.detectionService = detectionService;
		this.s3Component = s3Component;
	}

	public PoseAnalyzer create(String providerId) {
		return new PoseAnalyzer(this.analyzingSessionService, this.detectionService, this.s3Component, providerId);
	}
}
