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
	private final long ACCESS_TOKEN_EXPIRATION;
	private final long REFRESH_TOKEN_EXPIRATION;
	private final long TEMP_TOKEN_EXPIRATION;

	public JwtUtil(
		@Value("${jwt.secret}") String secret,
		@Value("${jwt.access-token-expiration}") long accessTokenExpiration,
		@Value("${jwt.refresh-token-expiration}") long refreshTokenExpiration,
		@Value("${jwt.temp-token-expiration}") long tempTokenExpiration) {
		if (secret == null || secret.length() < 32) {
			throw new IllegalArgumentException("JWT secret must be at least 32 characters long");
		}
		logger.info("JWT secret length: {}", secret.length());
		this.key = Keys.hmacShaKeyFor(secret.getBytes());
		this.ACCESS_TOKEN_EXPIRATION = accessTokenExpiration;
		this.REFRESH_TOKEN_EXPIRATION = refreshTokenExpiration;
		this.TEMP_TOKEN_EXPIRATION = tempTokenExpiration;
	}

	private String generateToken(String userId, long expirationMillis) {
		long now =  System.currentTimeMillis();
		return Jwts.builder()
			.setSubject(userId)
			.setIssuedAt(new Date(now))
			.setExpiration(new Date(now+expirationMillis))
			.signWith(key, SignatureAlgorithm.HS256)
			.compact();
	}

	public String generateAccessToken(String userId) {
		return generateToken(userId, ACCESS_TOKEN_EXPIRATION);
	}

	public String generateRefreshToken(String userId) {
		return generateToken(userId, REFRESH_TOKEN_EXPIRATION);
	}

	public String generateTempToken(String userId) {
		return generateToken(userId, TEMP_TOKEN_EXPIRATION);
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
