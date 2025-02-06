package com.example.posturepro.detection.service;

import org.springframework.stereotype.Service;

import com.example.posturepro.analyzingsession.entity.AnalyzingSession;
import com.example.posturepro.detection.entity.DetectionDto;

@Service
public interface DetectionService {
	void insertDetection(DetectionDto detectionData, AnalyzingSession session);
}