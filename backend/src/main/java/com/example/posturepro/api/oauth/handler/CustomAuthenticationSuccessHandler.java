package com.example.posturepro.api.oauth.handler;

import com.example.posturepro.api.oauth.utils.JwtUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
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
	private static final Logger logger = LoggerFactory.getLogger(CustomAuthenticationSuccessHandler.class);

	public CustomAuthenticationSuccessHandler(OAuth2AuthorizedClientService authorizedClientService, JwtUtil jwtUtil) {
		this.authorizedClientService = authorizedClientService;
		this.jwtUtil = jwtUtil;
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
		String kakaoRefreshToken = client.getRefreshToken() != null ? client.getRefreshToken().getTokenValue() : null;

		// 카카오 리소스 서버에서 사용자 정보 가져오기
		Map<String, Object> kakaoUserInfo = fetchKakaoUserInfo(kakaoAccessToken);

		String userId = kakaoUserInfo.get("id").toString();

		String jwtAccessToken = jwtUtil.generateAccessToken(userId, kakaoAccessToken, kakaoRefreshToken);
		String jwtRefreshToken = jwtUtil.generateRefreshToken(userId);

		// HttpOnly 쿠키로 JWT 액세스 토큰 전송
		Cookie accessCookie = new Cookie("access_token", jwtAccessToken);
		accessCookie.setHttpOnly(true);
		accessCookie.setSecure(true);
		accessCookie.setPath("/");
		accessCookie.setMaxAge(3600);
		accessCookie.setAttribute("SameSite", "Strict");
		response.addCookie(accessCookie);

		// HttpOnly 쿠키로 JWT 리프레시 토큰 전송
		if (jwtRefreshToken != null) {
			Cookie refreshCookie = new Cookie("refresh_token", jwtRefreshToken);
			refreshCookie.setHttpOnly(true);
			refreshCookie.setSecure(true);
			refreshCookie.setPath("/");
			refreshCookie.setMaxAge(604800);
			refreshCookie.setAttribute("SameSite", "Strict");
			response.addCookie(refreshCookie);
		}

		// 로깅
		logger.info("OAuth2 login successful for user: {}", userId);
		logger.info("JWT access Token: {}", jwtAccessToken);
		logger.info("JWT refresh Token: {}", jwtRefreshToken);

		// 로그인 성공 후 리다이렉션 또는 응답
		response.sendRedirect("http://localhost:5173");
	}

	private Map<String, Object> fetchKakaoUserInfo(String accessToken) throws IOException, ServletException {
		// 카카오 API 호출하여 사용자 정보 가져오기
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
			// 사용자 ID
			Object idObj = userInfo.get("id");
			String userId = idObj != null ? idObj.toString() : "Unknown";

			// kakao_account 정보
			Map<String, Object> kakaoAccount = (Map<String, Object>) userInfo.get("kakao_account");
			if (kakaoAccount != null) {
				// 이름
				Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");
				String nickname = profile != null ? (String) profile.get("nickname") : "Unknown";

				// 성별
				String gender = (String) kakaoAccount.get("gender");
				if (gender == null) {
					gender = "Unknown";
				}

				// 연령대
				String ageRange = (String) kakaoAccount.get("age_range");
				if (ageRange == null) {
					ageRange = "Unknown";
				}

				// 생년월일
				// String birthyear = (String) kakaoAccount.get("birthyear");

				// 로깅
				logger.info("사용자 ID: {}", userId);
				logger.info("이름: {}", nickname);
				logger.info("성별: {}", gender);
				logger.info("연령대: {}", ageRange);
				// logger.info("생년: {}", birthyear);

			} else {
				logger.warn("kakao_account 정보가 없습니다.");
			}
		} else {
			logger.warn("응답 본문이 null입니다.");
		}

		return userInfo;
	}
}
