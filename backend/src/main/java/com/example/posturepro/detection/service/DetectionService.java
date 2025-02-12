package com.example.posturepro.detection.service;

import org.springframework.stereotype.Service;

import com.example.posturepro.analyzingsession.entity.AnalyzingSession;
import com.example.posturepro.detection.entity.DetectionDto;

@Service
public interface DetectionService {
	void createDetection(DetectionDto detectionData, AnalyzingSession session);

	void updateDetectionEndTime(DetectionDto detectionDto);

	boolean updateVideoUrl(Long detectionId, String videoUrl);
}