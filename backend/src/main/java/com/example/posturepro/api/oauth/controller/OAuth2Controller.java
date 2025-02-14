package com.example.posturepro.api.oauth.controller;

import com.example.posturepro.api.oauth.dto.RefreshTokenResponse;
import com.example.posturepro.api.oauth.utils.CookieUtil;
import com.example.posturepro.domain.member.Member;
import com.example.posturepro.domain.member.service.MemberService;
import com.example.posturepro.api.oauth.service.TokenService;
import com.example.posturepro.api.oauth.service.TokenBlacklistService;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
public class OAuth2Controller {

	private final MemberService memberService;
	private final TokenService tokenService;
	private final TokenBlacklistService blacklistService;
	private static final Logger logger = LoggerFactory.getLogger(OAuth2Controller.class);

	public OAuth2Controller(MemberService memberService, TokenService tokenService, TokenBlacklistService blacklistService) {
		this.memberService = memberService;
		this.tokenService = tokenService;
		this.blacklistService = blacklistService;
	}

	@PostMapping("/refresh-token")
	public ResponseEntity<RefreshTokenResponse> refreshToken(@CookieValue Map<String, String> tokens,
		HttpServletResponse response, Authentication authentication) {
		String refreshToken = tokens.get("refresh-token");
		OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
		String registrationId = oauthToken.getAuthorizedClientRegistrationId();

		if (refreshToken == null || refreshToken.isEmpty()) {
			return ResponseEntity.badRequest().body(new RefreshTokenResponse("Refresh token is missing", null, null));
		}
		if (!tokenService.validateToken(refreshToken)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new RefreshTokenResponse("Invalid refresh token", null, null));
		}

		String providerId = tokenService.getProviderIdFromToken(refreshToken);
		Optional<Member> memberOpt = memberService.findByProviderId(providerId);

		if (!memberOpt.isPresent()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new RefreshTokenResponse("User not found", null, null));
		}

		Member member = memberOpt.get();
		String newAccessToken = tokenService.createAccessToken(member.getProviderId(), registrationId);
		String newRefreshToken = tokenService.createRefreshToken(providerId, registrationId);

		logger.info("New access token: " + newAccessToken);
		logger.info("New refresh token: " + newRefreshToken);

		Cookie accessCookie = CookieUtil.createAccessCookie(newAccessToken, false);
		response.addCookie(accessCookie);

		Cookie refreshCookie = CookieUtil.createRefreshCookie(newRefreshToken, false);
		response.addCookie(refreshCookie);

		return ResponseEntity.ok(new RefreshTokenResponse("Token refreshed", newAccessToken, newRefreshToken));
	}

	@PostMapping("/logout")
	public ResponseEntity<String> logout(@CookieValue(name = "refresh-token", required = false) String refreshToken,
		HttpServletResponse response) {
		if (refreshToken != null) {
			long remainingTime = tokenService.getExpirationTime(refreshToken); // 현재 시점에서 남은 만료 시간 가져오기

			blacklistService.addToBlacklist(refreshToken, remainingTime);

			// 쿠키 삭제 (로그아웃 처리)
			response.addCookie(CookieUtil.deleteCookie("access-token", true, "/", "Strict"));
			response.addCookie(CookieUtil.deleteCookie("refresh-token", true, "/", "Strict"));
		}
		return ResponseEntity.ok("Logout successful");
	}
}
