package com.example.posturepro.api.oauth.controller;

import com.example.posturepro.api.oauth.utils.CookieUtil;
import com.example.posturepro.api.oauth.utils.JwtUtil;
import com.example.posturepro.domain.member.Member;
import com.example.posturepro.domain.member.service.MemberService;
import com.example.posturepro.api.oauth.service.TokenService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

	public OAuth2Controller(MemberService memberService, TokenService tokenService) {

		this.memberService = memberService;
		this.tokenService = tokenService;
	}

	@PostMapping("/refresh-token")
	public ResponseEntity<?> refreshToken(@CookieValue Map<String, String> tokens, HttpServletResponse response) {
		String refreshToken = tokens.get("refresh-token");
		if (refreshToken == null || refreshToken.isEmpty()) {
			return ResponseEntity.badRequest().body("Refresh token is missing");
		}
		if (!tokenService.validateToken(refreshToken)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
		}

		String providerId = tokenService.getUserIdFromToken(refreshToken);

		Optional<Member> memberOpt = memberService.findByProviderId(providerId);
		if (!memberOpt.isPresent()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
		}
		Member member = memberOpt.get();

		String newAccessToken = tokenService.createAccessToken(member.getProviderId());
		String newRefreshToken = tokenService.createRefreshToken(providerId);

		Cookie accessCookie = CookieUtil.createAccessCookie(newAccessToken, false);
		response.addCookie(accessCookie);

		Cookie refreshCookie = CookieUtil.createRefreshCookie(newRefreshToken, false);
		response.addCookie(refreshCookie);

		return ResponseEntity.ok(Map.of("message", "Token refreshed"));
	}

}
