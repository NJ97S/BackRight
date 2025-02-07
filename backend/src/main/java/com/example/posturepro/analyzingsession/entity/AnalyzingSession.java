package com.example.posturepro.analyzingsession.entity;

import java.time.Instant;
import java.util.List;

import com.example.posturepro.detection.entity.Detection;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class AnalyzingSession {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", insertable = false, updatable = false)
	private Long id;

	@Column(name = "analyzing_session_start_at", columnDefinition = "TIMESTAMP")
	private Instant sessionStartTime;

	@Column(name = "analyzing_session_end_at", columnDefinition = "TIMESTAMP")
	private Instant sessionEndTime;

	@OneToMany(mappedBy = "session", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Detection> detections;

}