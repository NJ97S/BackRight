package com.example.posturepro.analyzingsession.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.posturepro.analyzingsession.entity.AnalyzingSession;

@Repository
public interface AnalyzingSessionRepository extends JpaRepository<AnalyzingSession, Long> {
}
