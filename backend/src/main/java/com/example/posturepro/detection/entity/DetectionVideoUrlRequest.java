package com.example.posturepro.detection.entity;

import lombok.Data;

@Data
public class DetectionVideoUrlRequest {
	private Long detectionId;
	private String videoUrl;
}