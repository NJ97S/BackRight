package com.example.posturepro.api.oauth.utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class JwtUtil {
	private static final Logger logger = LoggerFactory.getLogger(JwtUtil.class);
	private final Key key;
	private final long ACCESS_TOKEN_EXPIRATION = 1000 * 60 * 60;  // 1시간
	private final long REFRESH_TOKEN_EXPIRATION = 1000 * 60 * 60 * 24 * 7;  // 7일
	private final long TEMP_TOKEN_EXPIRATION = 1000 * 60 * 5; // 5분

	public JwtUtil(@Value("${jwt.secret}") String secret) {
		if (secret == null || secret.length() < 32) {
			throw new IllegalArgumentException("JWT secret must be at least 32 characters long");
		}
		logger.info("JWT secret length: {}", secret.length());
		this.key = Keys.hmacShaKeyFor(secret.getBytes());
	}

	public String generateAccessToken(String userId, String nickname, String gender, String birthDate) {
		return Jwts.builder()
			.setSubject(userId)
			.claim("nickname", nickname)
			.claim("gender", gender)
			.claim("birthDate", birthDate)
			.setIssuedAt(new Date())
			.setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION))
			.signWith(key, SignatureAlgorithm.HS256)
			.compact();
	}

	public String generateRefreshToken(String userId) {
		return Jwts.builder()
			.setSubject(userId)
			.setIssuedAt(new Date())
			.setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION))
			.signWith(key, SignatureAlgorithm.HS256)
			.compact();
	}

	public String generateTempToken(String userId) {
		return Jwts.builder()
			.setSubject(userId)
			.setIssuedAt(new Date())
			.setExpiration(new Date(System.currentTimeMillis() + TEMP_TOKEN_EXPIRATION))
			.signWith(key, SignatureAlgorithm.HS256)
			.compact();
	}

	public Claims parseToken(String token) {
		return Jwts.parserBuilder()
			.setSigningKey(key)
			.build()
			.parseClaimsJws(token)
			.getBody();
	}

	public String getUserIdFromToken(String token) {
		return parseToken(token).getSubject();
	}

	public boolean validateToken(String token) {
		try {
			parseToken(token);
			return true;
		} catch (JwtException | IllegalArgumentException e) {
			logger.error("Invalid JWT token: {}", e.getMessage());
			return false;
		}
	}
}
