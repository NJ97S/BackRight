package com.example.posturepro.api.oauth.handler;

import com.example.posturepro.api.oauth.utils.CookieUtil;
import com.example.posturepro.api.oauth.utils.JwtUtil;
import com.example.posturepro.domain.member.Member;
import com.example.posturepro.domain.member.service.MemberService;
import com.example.posturepro.api.oauth.service.TokenService;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
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
	private final TokenService tokenService;
	private static final Logger logger = LoggerFactory.getLogger(CustomAuthenticationSuccessHandler.class);

	@Autowired
	public CustomAuthenticationSuccessHandler(OAuth2AuthorizedClientService authorizedClientService,
		JwtUtil jwtUtil,
		MemberService memberService,
		TokenService tokenService) {
		this.authorizedClientService = authorizedClientService;
		this.jwtUtil = jwtUtil;
		this.memberService = memberService;
		this.tokenService = tokenService;
	}

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException, ServletException {
		OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
		String registrationId = oauthToken.getAuthorizedClientRegistrationId();
		String userName = oauthToken.getName();


		OAuth2AuthorizedClient client = authorizedClientService.loadAuthorizedClient(registrationId, userName);
		if (client == null) {
			throw new ServletException("OAuth2AuthorizedClient not found");
		}

		String oauthAccessToken = client.getAccessToken().getTokenValue();

		Map<String, Object> kakaoUserInfo = fetchKakaoUserInfo(oauthAccessToken);
		Long kakaoId = Long.parseLong(kakaoUserInfo.get("id").toString());

		Member member = memberService.findByKakaoId(kakaoId).orElse(null);

		if (member != null) {
			onMemberLogin(member, response);
		} else {
			onNewMember(kakaoId, response);
		}
	}

	private void onMemberLogin(Member member, HttpServletResponse response) throws IOException {
		String jwtAccessToken = tokenService.createAccessToken(member.getKakaoId().toString());
		String jwtRefreshToken = tokenService.createRefreshToken(member.getKakaoId().toString());

		Cookie accessCookie = CookieUtil.createCookie(
			"access-token",
			jwtAccessToken,
			true,
			false,  // 프로덕션 환경에서는 true로 변경 필요
			"/",
			3600,
			"Strict"
		);
		response.addCookie(accessCookie);

		if (jwtRefreshToken != null) {
			Cookie refreshCookie = CookieUtil.createCookie(
				"refresh-token",
				jwtRefreshToken,
				true,
				false,  // 프로덕션 환경에서는 true로 변경 필요
				"/",
				604800,
				"Strict"
			);
			response.addCookie(refreshCookie);
		}
		response.sendRedirect("http://localhost:5173/");
	}


	private void onNewMember(Long kakaoId, HttpServletResponse response) throws IOException {
		String tempToken = jwtUtil.generateTempToken(kakaoId.toString());
		Cookie tempTokenCookie = CookieUtil.createCookie(
			"temp-token",
			tempToken,
			true,
			true,
			"/",
			300,
			"Strict"
		);
		response.addCookie(tempTokenCookie);
		response.sendRedirect("http://localhost:5173/sign-up");
	}

	private Map<String, Object> fetchKakaoUserInfo(String accessToken) throws IOException, ServletException {
		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", "Bearer " + accessToken);
		HttpEntity<String> entity = new HttpEntity<>(headers);

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
			logger.info("Kakao API 응답: {}", userInfo);
		} else {
			logger.warn("응답 본문이 null입니다.");
		}
		return userInfo;
	}

}
