package com.example.posturepro.detection.service;

import org.springframework.stereotype.Service;

import com.example.posturepro.detection.entity.CreateDetectionDto;
import com.example.posturepro.detection.entity.Detection;

@Service
public interface DetectionService {
	Detection getDetectionById(long detectionId);

	Detection createDetection(CreateDetectionDto detectionDto);

	void endDetection(long detectionId);

	boolean updateVideoUrl(Long detectionId, String videoUrl);
}