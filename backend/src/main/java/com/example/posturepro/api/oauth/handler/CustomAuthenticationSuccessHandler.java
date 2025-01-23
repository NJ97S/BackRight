package com.example.posturepro.api.oauth.handler;

import com.example.posturepro.api.oauth.utils.JwtUtil;
import com.example.posturepro.domain.member.Member;
import com.example.posturepro.domain.member.service.MemberService;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

	private final OAuth2AuthorizedClientService authorizedClientService;
	private final JwtUtil jwtUtil;
	private final MemberService memberService;
	private static final Logger logger = LoggerFactory.getLogger(CustomAuthenticationSuccessHandler.class);

	@Autowired
	public CustomAuthenticationSuccessHandler(OAuth2AuthorizedClientService authorizedClientService, JwtUtil jwtUtil, MemberService memberService) {
		this.authorizedClientService = authorizedClientService;
		this.jwtUtil = jwtUtil;
		this.memberService = memberService;
	}

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException, ServletException {
		OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
		String registrationId = ((org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken) authentication).getAuthorizedClientRegistrationId();
		String userName = authentication.getName();

		OAuth2AuthorizedClient client = authorizedClientService.loadAuthorizedClient(registrationId, userName);
		if (client == null) {
			throw new ServletException("OAuth2AuthorizedClient not found");
		}

		String kakaoAccessToken = client.getAccessToken().getTokenValue();

		// 카카오 리소스 서버에서 사용자 정보 가져오기
		Map<String, Object> kakaoUserInfo = fetchKakaoUserInfo(kakaoAccessToken);

		// 사용자 ID 추출
		Long kakaoId = Long.parseLong(kakaoUserInfo.get("id").toString());

		// DB에서 사용자 찾기
		Member member = memberService.findByKakaoId(kakaoId).orElse(null);

		if (member != null) {
			// 기존 사용자일 경우: JWT 토큰 생성 및 홈 페이지로 리다이렉트
			String jwtAccessToken = jwtUtil.generateAccessToken(
				member.getKakaoId().toString(),
				member.getNickname(),
				member.getGender().name(),
				member.getBirthDate().toString()
			);
			String jwtRefreshToken = jwtUtil.generateRefreshToken(member.getKakaoId().toString());

			// HttpOnly 쿠키로 JWT 액세스 토큰 전송
			Cookie accessCookie = new Cookie("access_token", jwtAccessToken);
			accessCookie.setHttpOnly(true);
			accessCookie.setSecure(true); // 프로덕션 환경에서는 true로 설정
			accessCookie.setPath("/");
			accessCookie.setMaxAge(3600); // 1시간
			accessCookie.setAttribute("SameSite", "Strict");
			response.addCookie(accessCookie);

			// HttpOnly 쿠키로 JWT 리프레시 토큰 전송
			if (jwtRefreshToken != null) {
				Cookie refreshCookie = new Cookie("refresh_token", jwtRefreshToken);
				refreshCookie.setHttpOnly(true);
				refreshCookie.setSecure(true); // 프로덕션 환경에서는 true로 설정
				refreshCookie.setPath("/");
				refreshCookie.setMaxAge(604800); // 7일
				refreshCookie.setAttribute("SameSite", "Strict");
				response.addCookie(refreshCookie);
			}

			// 로깅
			logger.info("OAuth2 login successful for existing user: {}", member.getKakaoId());
			logger.info("JWT access Token: {}", jwtAccessToken);
			logger.info("JWT refresh Token: {}", jwtRefreshToken);

			// 홈 페이지로 리다이렉트
			response.sendRedirect("http://localhost:5173/");
		} else {
			// 신규 사용자일 경우: 임시 JWT 토큰 생성 및 쿠키 설정 후 회원 가입 페이지로 리다이렉트
			String tempToken = jwtUtil.generateTempToken(kakaoId.toString());

			Cookie tempTokenCookie = new Cookie("temp_token", tempToken);
			tempTokenCookie.setHttpOnly(true);
			tempTokenCookie.setSecure(true); // 프로덕션 환경에서는 true로 설정
			tempTokenCookie.setPath("/");
			tempTokenCookie.setMaxAge(300); // 5분
			tempTokenCookie.setAttribute("SameSite", "Strict");
			response.addCookie(tempTokenCookie);

			// 회원 가입 페이지로 리다이렉트
			response.sendRedirect("http://localhost:5173/sign-up");
		}
	}

	private Map<String, Object> fetchKakaoUserInfo(String accessToken) throws IOException, ServletException {
		RestTemplate restTemplate = new RestTemplate();
		org.springframework.http.HttpHeaders headers = new org.springframework.http.HttpHeaders();
		headers.add("Authorization", "Bearer " + accessToken);
		org.springframework.http.HttpEntity<String> entity = new org.springframework.http.HttpEntity<>(headers);

		ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
			"https://kapi.kakao.com/v2/user/me",
			HttpMethod.GET,
			entity,
			new ParameterizedTypeReference<Map<String, Object>>() {}
		);

		if (!response.getStatusCode().is2xxSuccessful()) {
			throw new ServletException("Failed to fetch user info from Kakao");
		}

		Map<String, Object> userInfo = response.getBody();

		if (userInfo != null) {
			// 전체 사용자 정보 로그 출력 (민감한 정보는 제외하거나 필요 시만 로깅)
			logger.info("Kakao API 응답: {}", userInfo);
		} else {
			logger.warn("응답 본문이 null입니다.");
		}

		return userInfo;
	}
}
