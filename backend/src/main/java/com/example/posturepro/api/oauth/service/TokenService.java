package com.example.posturepro.api.oauth.service;

import org.springframework.stereotype.Service;

import com.example.posturepro.api.oauth.utils.JwtUtil;

@Service
public class TokenService {

	private final JwtUtil jwtUtil;

	public TokenService(JwtUtil jwtUtil) {
		this.jwtUtil = jwtUtil;
	}

	public String createAccessToken(String userId) {
		return jwtUtil.generateAccessToken(userId);
	}

	public String createRefreshToken(String userId) {
		return jwtUtil.generateRefreshToken(userId);
	}

	public boolean validateToken(String token) {
		return jwtUtil.validateToken(token);
	}

	public String getUserIdFromToken(String token) {
		return jwtUtil.getUserIdFromToken(token);
	}

	public boolean validateTempToken(String token) {
		return jwtUtil.validateToken(token);
	}
}