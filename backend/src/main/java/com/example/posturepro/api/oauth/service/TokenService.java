package com.example.posturepro.api.oauth.service;

import org.springframework.stereotype.Service;

import com.example.posturepro.api.oauth.utils.JwtUtil;

@Service
public class TokenService {

	private final JwtUtil jwtUtil;

	public TokenService(JwtUtil jwtUtil) {
		this.jwtUtil = jwtUtil;
	}

	public String createAccessToken(String userId, String registrationId) {
		return jwtUtil.generateAccessToken(userId, registrationId);
	}

	public String createRefreshToken(String userId, String registrationId) {
		return jwtUtil.generateRefreshToken(userId, registrationId);
	}

	public boolean validateToken(String token) {
		return jwtUtil.validateToken(token);
	}

	public String getProviderIdFromToken(String token) {
		return jwtUtil.getProviderIdFromToken(token);
	}

	public boolean validateTempToken(String token) {
		return jwtUtil.validateToken(token);
	}

	public long getExpirationTime(String token) {return jwtUtil.getRemainingExpirationTime(token);}
}