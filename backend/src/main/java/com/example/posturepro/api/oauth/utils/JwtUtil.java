package com.example.posturepro.api.oauth.utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {
	private final Key key;
	private final long ACCESS_TOKEN_EXPIRATION = 1000 * 60 * 60;  // 1시간
	private final long REFRESH_TOKEN_EXPIRATION = 1000 * 60 * 60 * 24 * 7;  // 7일

	public JwtUtil(@Value("${jwt.secret}") String secret) {
		this.key = Keys.hmacShaKeyFor(secret.getBytes());
	}

	// 사용자 ID, Kakao 엑세스 토큰, 리프레시 토큰을 포함한 JWT 생성
	public String generateAccessToken(String userId, String kakaoAccessToken, String kakaoRefreshToken) {
		return Jwts.builder()
			.setSubject(userId)
			.claim("kakao_access_token", kakaoAccessToken)
			.claim("kakao_refresh_token", kakaoRefreshToken)
			.setIssuedAt(new Date())
			.setExpiration(new Date(System.currentTimeMillis() + ACCESS_TOKEN_EXPIRATION))
			.signWith(key, SignatureAlgorithm.HS256)
			.compact();
	}

	// 자체적으로 생성한 리프레시 토큰 (Kakao 토큰과는 별개)
	public String generateRefreshToken(String userId) {
		return Jwts.builder()
			.setSubject(userId)
			.setIssuedAt(new Date())
			.setExpiration(new Date(System.currentTimeMillis() + REFRESH_TOKEN_EXPIRATION))
			.signWith(key, SignatureAlgorithm.HS256)
			.compact();
	}

	// JWT 토큰 검증 및 파싱
	public Claims parseToken(String token) {
		return Jwts.parserBuilder()
			.setSigningKey(key)
			.build()
			.parseClaimsJws(token)
			.getBody();
	}

	// JWT에서 사용자 ID 추출
	public String getUserIdFromToken(String token) {
		return parseToken(token).getSubject();
	}

	// JWT에서 Kakao 엑세스 토큰 추출
	public String getKakaoAccessToken(String token) {
		return parseToken(token).get("kakao_access_token", String.class);
	}

	// JWT에서 Kakao 리프레시 토큰 추출
	public String getKakaoRefreshToken(String token) {
		return parseToken(token).get("kakao_refresh_token", String.class);
	}

	// 토큰 유효성 검증
	public boolean validateToken(String token) {
		try {
			parseToken(token);
			return true;
		} catch (JwtException | IllegalArgumentException e) {
			// 로그 추가 가능
			return false;
		}
	}
}
