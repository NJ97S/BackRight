package com.example.posturepro.analyzingsession.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.posturepro.analyzingsession.service.AnalyzingSessionService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/sessions")
public class AnalyzingSessionController {
	private final AnalyzingSessionService analyzingSessionService;

	@PatchMapping("/{sessionId}")
	public ResponseEntity<Map<String, String>> patchSessionStateToAbsent(@PathVariable Long sessionId) {
		analyzingSessionService.patchSessionStateToAbsent(sessionId);

		Map<String, String> response = new HashMap<>();
		response.put("message", "Session status updated to ABSENT");

		return ResponseEntity.ok(response);
	}
}
