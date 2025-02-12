package com.example.posturepro.detection.service;

import org.springframework.stereotype.Service;

import com.example.posturepro.analyzingsession.entity.AnalyzingSession;
import com.example.posturepro.detection.entity.Detection;

@Service
public interface DetectionService {
	void createDetection(Detection detectionData, AnalyzingSession session);

	void updateDetectionEndTime(Detection detectionDto);

	boolean updateVideoUrl(Long detectionId, String videoUrl);
}