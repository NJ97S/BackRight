package com.example.posturepro.api.oauth.controller;

import com.example.posturepro.api.oauth.utils.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class OAuth2Controller {

	private final JwtUtil jwtUtil;

	public OAuth2Controller(JwtUtil jwtUtil) {
		this.jwtUtil = jwtUtil;
	}

	// 리프레시 토큰 엔드포인트
	@PostMapping("/refresh-token")
	public ResponseEntity<?> refreshToken(@RequestBody Map<String, String> tokens, HttpServletResponse response) {
		String refreshToken = tokens.get("refresh_token");
		if (refreshToken == null || refreshToken.isEmpty()) {
			return ResponseEntity.badRequest().body("Refresh token is missing");
		}

		if (!jwtUtil.validateToken(refreshToken)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
		}

		String userId = jwtUtil.getUserIdFromToken(refreshToken);
		String newAccessToken = jwtUtil.generateAccessToken(userId, null, null);
		String newRefreshToken = jwtUtil.generateRefreshToken(userId);

		// HttpOnly 쿠키로 새 토큰 전송
		Cookie accessCookie = new Cookie("access_token", newAccessToken);
		accessCookie.setHttpOnly(true);
		accessCookie.setSecure(true);
		accessCookie.setPath("/");
		accessCookie.setMaxAge(3600); // 1시간
		accessCookie.setAttribute("SameSite", "Strict");
		response.addCookie(accessCookie);

		Cookie refreshCookie = new Cookie("refresh_token", newRefreshToken);
		refreshCookie.setHttpOnly(true);
		refreshCookie.setSecure(true);
		refreshCookie.setPath("/");
		refreshCookie.setMaxAge(604800); // 7일
		refreshCookie.setAttribute("SameSite", "Strict");
		response.addCookie(refreshCookie);

		return ResponseEntity.ok(Map.of("message", "Token refreshed"));
	}
}
