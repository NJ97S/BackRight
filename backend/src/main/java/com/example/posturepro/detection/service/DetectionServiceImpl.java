package com.example.posturepro.detection.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.posturepro.detection.entity.CreateDetectionDto;
import com.example.posturepro.detection.entity.Detection;
import com.example.posturepro.detection.repository.DetectionRepository;

@Service
public class DetectionServiceImpl implements DetectionService {

	private final DetectionRepository detectionRepository;

	public DetectionServiceImpl(DetectionRepository detectionRepository) {
		this.detectionRepository = detectionRepository;
	}

	@Override
	@Transactional
	public Detection createDetection(CreateDetectionDto detectionDto) {
		Detection detection = new Detection(detectionDto);
		return detectionRepository.save(detection);
	}

	@Override
	public void updateDetectionEndTime(Detection detection) {
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
