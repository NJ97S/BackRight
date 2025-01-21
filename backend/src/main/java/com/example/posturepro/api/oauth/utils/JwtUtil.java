package com.example.posturepro.api.oauth.utils;

import java.security.Key;
import java.util.Date;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

public class JwtUtil {
	private static final String SECRET_KEY = "yourSuperSecretKeyyourSuperSecretKeyyourSuperSecretKey";  // 보안 강화 필요
	private static final long ACCESS_TOKEN_EXPIRATION = 1000 * 60 * 60;  // 1시간
	private static final long REFRESH_TOKEN_EXPIRATION = 1000 * 60 * 60 * 24 * 7;  // 7일

	private static final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

	// JWT 액세스 토큰 생성
	public static String generateAccessToken(String userId) {
		return Jwts.builder()
			.setSubject(userId)
			.setIssuedAt(new Date())
			.setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION))
			.signWith(key, SignatureAlgorithm.HS256)
			.compact();
	}

	// JWT 리프레시 토큰 생성
	public static String generateRefreshToken(String userId) {
		return Jwts.builder()
			.setSubject(userId)
			.setIssuedAt(new Date())
			.setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION))
			.signWith(key, SignatureAlgorithm.HS256)
			.compact();
	}

	// 토큰 검증 및 파싱
	public static Claims parseToken(String token) {
		return Jwts.parserBuilder()
			.setSigningKey(key)
			.build()
			.parseClaimsJws(token)
			.getBody();
	}
}
