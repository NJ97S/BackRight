package com.example.posturepro.api.oauth.controller;

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
	public ResponseEntity<?> refreshToken(@RequestBody Map<String, String> tokens, HttpServletResponse response) {
		String refreshToken = tokens.get("refresh_token");
		if (refreshToken == null || refreshToken.isEmpty()) {
			return ResponseEntity.badRequest().body("Refresh token is missing");
		}

		if (!tokenService.validateToken(refreshToken)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
		}

		String userId = tokenService.getUserIdFromToken(refreshToken);
		Long kakaoId = Long.parseLong(userId);

		// UserService를 통해 사용자 정보 조회
		Optional<Member> memberOpt = memberService.findByKakaoId(kakaoId);
		if (!memberOpt.isPresent()) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
		}
		Member member = memberOpt.get();

		// 새로운 엑세스 토큰 및 리프레시 토큰 생성
		String newAccessToken = tokenService.createAccessToken(
			member.getKakaoId().toString()
		);
		String newRefreshToken = tokenService.createRefreshToken(userId);

		// HttpOnly 쿠키로 새 토큰 전송
		Cookie accessCookie = new Cookie("access_token", newAccessToken);
		accessCookie.setHttpOnly(true);
		accessCookie.setSecure(false); // true로 변경
		accessCookie.setPath("/");
		accessCookie.setMaxAge(3600); // 1시간
		accessCookie.setAttribute("SameSite", "Strict");
		response.addCookie(accessCookie);

		Cookie refreshCookie = new Cookie("refresh_token", newRefreshToken);
		refreshCookie.setHttpOnly(true);
		refreshCookie.setSecure(false); // true로 변경
		refreshCookie.setPath("/");
		refreshCookie.setMaxAge(604800); // 7일
		refreshCookie.setAttribute("SameSite", "Strict");
		response.addCookie(refreshCookie);

		return ResponseEntity.ok(Map.of("message", "Token refreshed"));
	}
}
