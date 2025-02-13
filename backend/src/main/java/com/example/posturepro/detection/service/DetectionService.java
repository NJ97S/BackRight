package com.example.posturepro.detection.service;

import org.springframework.stereotype.Service;

import com.example.posturepro.detection.entity.CreateDetectionDto;
import com.example.posturepro.detection.entity.Detection;

@Service
public interface DetectionService {
	Detection createDetection(CreateDetectionDto detectionDto);

	void updateDetectionEndTime(Detection detection);

	boolean updateVideoUrl(Long detectionId, String videoUrl);
}