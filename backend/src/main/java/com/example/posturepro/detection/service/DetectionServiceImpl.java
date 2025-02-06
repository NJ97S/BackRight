package com.example.posturepro.detection.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.posturepro.analyzingsession.entity.AnalyzingSession;
import com.example.posturepro.detection.entity.Detection;
import com.example.posturepro.detection.entity.DetectionDto;
import com.example.posturepro.detection.repository.DetectionRepository;

@Service
public class DetectionServiceImpl implements DetectionService {

	private final DetectionRepository detectionRepository;

	public DetectionServiceImpl(DetectionRepository detectionRepository) {
		this.detectionRepository = detectionRepository;
	}

	@Override
	@Transactional
	public void insertDetection(DetectionDto detectionData, AnalyzingSession session) {
		Detection detection = Detection.fromDto(detectionData, session);
		detectionRepository.save(detection);
	}
}
