package com.example.posturepro.detection.service;

import java.time.Instant;
import java.util.NoSuchElementException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.posturepro.api.s3.component.S3Component;
import com.example.posturepro.detection.entity.CreateDetectionDto;
import com.example.posturepro.detection.entity.Detection;
import com.example.posturepro.detection.repository.DetectionRepository;

@Service
public class DetectionServiceImpl implements DetectionService {
	Logger logger = LoggerFactory.getLogger(DetectionServiceImpl.class);

	private final DetectionRepository detectionRepository;
	private final S3Component s3Component;

	public DetectionServiceImpl(DetectionRepository detectionRepository, S3Component s3Component) {
		this.detectionRepository = detectionRepository;
		this.s3Component = s3Component;
	}

	@Override
	public Detection getDetectionById(long detectionId) {
		return detectionRepository.getReferenceById(detectionId);
	}

	@Override
	@Transactional
	public Detection createDetection(CreateDetectionDto createDetectionDto) {
		Detection detection = new Detection(createDetectionDto);
		return detectionRepository.save(detection);
	}

	@Override
	@Transactional
	public void endDetection(long detectionId) {
		Detection detection = getDetectionById(detectionId);
		detection.setEndedAt(Instant.now());
		detectionRepository.save(detection);
	}

	@Override
	public String getPreSignedVideoUrl(long detectionId) {
		Detection detection = detectionRepository.findById(detectionId)
			.orElseThrow(() -> new NoSuchElementException("Detection 이 없습니다."));

		String videoUrl = detection.getVideoUrl();
		if (videoUrl == null || videoUrl.isEmpty()) {
			throw new NoSuchElementException("Video URL 이 없습니다.");
		}

		return s3Component.generatePreSignedGetUrl(videoUrl);
	}
}
