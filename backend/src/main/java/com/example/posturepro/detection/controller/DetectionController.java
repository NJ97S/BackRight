package com.example.posturepro.detection.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.posturepro.detection.entity.DetectionVideoUrlRequest;
import com.example.posturepro.detection.service.DetectionService;

@RestController
@RequestMapping("/detection")
public class DetectionController {

	private final DetectionService detectionService;

	public DetectionController(DetectionService detectionService) {
		this.detectionService = detectionService;
	}

	@PutMapping("/{detectionId}/video")
	public ResponseEntity<String> updateDetectionVideoUrl(
		@PathVariable Long detectionId,
		@RequestBody DetectionVideoUrlRequest request) {
		boolean success = detectionService.updateVideoUrl(detectionId, request.getVideoUrl());
		if (success) {
			return ResponseEntity.ok("비디오 URL이 저장되었습니다.");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Detection ID를 찾을 수 없습니다.");
		}
	}
}
