package com.example.posturepro.api.oauth.service;

import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import java.util.concurrent.TimeUnit;

@Service
public class TokenBlacklistService {
	private final StringRedisTemplate redisTemplate;

	public TokenBlacklistService(StringRedisTemplate redisTemplate) {
		this.redisTemplate = redisTemplate;
	}

	// refreshToken을 블랙리스트에 추가 (로그아웃 시)
	public void addToBlacklist(String refreshToken, long remainingTimeMs) {
		redisTemplate.opsForValue().set(refreshToken, "BLACKLISTED", remainingTimeMs, TimeUnit.MILLISECONDS);
	}

	// refreshToken이 블랙리스트에 있는지 확인
	public boolean isBlacklisted(String refreshToken) {
		return Boolean.TRUE.equals(redisTemplate.hasKey(refreshToken));
	}
}
