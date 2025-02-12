package com.example.posturepro.detection.service;

import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.posturepro.analyzingsession.entity.AnalyzingSession;
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
	public void createDetection(Detection detection, AnalyzingSession session) {
		detectionRepository.save(detection);
	}

	// todo 일단 필요할 것 같아 만들어 놓은거라 고쳐야 합니다
	@Override
	public void updateDetectionEndTime(Detection detectionDto) {

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
