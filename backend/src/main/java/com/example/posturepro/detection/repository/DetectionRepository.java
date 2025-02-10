package com.example.posturepro.detection.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.posturepro.detection.entity.Detection;

@Repository
public interface DetectionRepository extends JpaRepository<Detection, Long> {

}
