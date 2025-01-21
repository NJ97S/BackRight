package com.example.posturepro.api.oauth.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.posturepro.api.oauth.utils.JwtUtil;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/auth")
public class OAuth2Controller {

	private final OAuth2AuthorizedClientService authorizedClientService;

	public OAuth2Controller(OAuth2AuthorizedClientService authorizedClientService) {
		this.authorizedClientService = authorizedClientService;
	}

	// 카카오 인증 서버로부터 토큰 받기
	@GetMapping("/success")
	public ResponseEntity<Map<String, Object>> loginSuccess(OAuth2AuthenticationToken authentication) {
		OAuth2AuthorizedClient client = authorizedClientService.loadAuthorizedClient(
			authentication.getAuthorizedClientRegistrationId(),
			authentication.getName()
		);

		// 발급된 액세스 토큰
		String accessToken = client.getAccessToken().getTokenValue();
		String refreshToken = client.getRefreshToken().getTokenValue();

		// 사용자 정보 가져오기
		Map<String, Object> userInfo = authentication.getPrincipal().getAttributes();

		Map<String, Object> response = new HashMap<>();
		response.put("access_token", accessToken);
		response.put("refresh_token", refreshToken);
		response.put("expires_at", client.getAccessToken().getExpiresAt());
		response.put("user_info", userInfo);

		return ResponseEntity.ok(response);
	}

	// 인증 서버로부터 받아온 유저 데이터를 바탕으로 JWT 토큰 발행
	@PostMapping("/login-success")
	public ResponseEntity<?> loginSuccess(@RequestBody Map<String, Object> userInfo, HttpServletResponse response) {
		// 사용자 정보에서 필요한 데이터 추출
		String userId = userInfo.get("id").toString();

		// JWT 액세스 및 리프레시 토큰 생성
		String accessToken = JwtUtil.generateAccessToken(userId);
		String refreshToken = JwtUtil.generateRefreshToken(userId);

		// HttpOnly 쿠키로 토큰 전송 (보안 강화)
		response.addHeader("Set-Cookie", "access_token=" + accessToken + "; HttpOnly; Secure; Path=/; Max-Age=3600");
		response.addHeader("Set-Cookie", "refresh_token=" + refreshToken + "; HttpOnly; Secure; Path=/; Max-Age=604800");

		return ResponseEntity.ok(Map.of("message", "로그인 성공"));
	}

}
