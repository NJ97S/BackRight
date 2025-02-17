package com.example.posturepro.detection.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.posturepro.detection.entity.Detection;

@Repository
public interface DetectionRepository extends JpaRepository<Detection, Long> {
	List<Detection> findAllBySessionId(@Param("session_id") Long sessionId);
}
