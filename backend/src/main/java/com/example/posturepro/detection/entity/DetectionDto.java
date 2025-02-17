package com.example.posturepro.detection.entity;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class DetectionDto {
	private Long id;
	private Instant startedAt;
	private Instant endedAt;
	private String videoUrl;
	private boolean neckDetected;
	private boolean leftShoulderDetected;
	private boolean rightShoulderDetected;
	private boolean backDetected;
}