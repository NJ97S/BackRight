package com.example.posturepro.detection.service;

import java.time.Instant;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.posturepro.detection.entity.CreateDetectionDto;
import com.example.posturepro.detection.entity.Detection;
import com.example.posturepro.detection.repository.DetectionRepository;

@Service
public class DetectionServiceImpl implements DetectionService {
	Logger logger = LoggerFactory.getLogger(DetectionServiceImpl.class);

	private final DetectionRepository detectionRepository;

	public DetectionServiceImpl(DetectionRepository detectionRepository) {
		this.detectionRepository = detectionRepository;
	}

	@Override
	public Detection getDetectionById(long detectionId) {
		return detectionRepository.getReferenceById(detectionId);
	}

	@Override
	@Transactional
	public Detection createDetection(CreateDetectionDto detectionDto) {
		Detection detection = new Detection(detectionDto);
		return detectionRepository.save(detection);
	}

	@Override
	@Transactional
	public void endDetection(long detectionId) {
		Detection detection = getDetectionById(detectionId);
		detection.setEndedAt(Instant.now());
		detectionRepository.save(detection);
	}

	@Transactional
	public boolean updateVideoUrl(Long detectionId, String videoUrl) {
		Optional<Detection> detectionOpt = detectionRepository.findById(detectionId);
		if (detectionOpt.isPresent()) {
			Detection detection = detectionOpt.get();
			detection.setVideoUrl(videoUrl);
			detectionRepository.save(detection);
			return true;
		}
		return false;
	}
}
