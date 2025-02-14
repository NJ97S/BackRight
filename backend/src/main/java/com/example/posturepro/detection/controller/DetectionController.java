package com.example.posturepro.detection.controller;

import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.posturepro.detection.service.DetectionService;

@RestController
@RequestMapping("/detections")
public class DetectionController {

	private final DetectionService detectionService;

	public DetectionController(DetectionService detectionService) {
		this.detectionService = detectionService;
	}

	@GetMapping("/{detectionId}/video")
	public ResponseEntity<Map<String, String>> getPreSignedVideoUrl(@PathVariable Long detectionId) {
		try {
			String preSignedUrl = detectionService.getPreSignedVideoUrl(detectionId);
			return ResponseEntity.ok(Map.of("preSignedUrl", preSignedUrl));
		} catch (NoSuchElementException e) {
			return ResponseEntity.notFound().build();
		} catch (IllegalArgumentException e) {
			return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
		}
	}
}
