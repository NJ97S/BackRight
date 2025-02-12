package com.example.posturepro.api.oauth.handler;

import java.io.IOException;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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

import com.example.posturepro.api.oauth.service.TokenService;
import com.example.posturepro.api.oauth.utils.CookieUtil;
import com.example.posturepro.api.oauth.utils.JwtUtil;
import com.example.posturepro.domain.member.Member;
import com.example.posturepro.domain.member.service.MemberService;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

	private final OAuth2AuthorizedClientService authorizedClientService;
	private final JwtUtil jwtUtil;
	private final MemberService memberService;
	private final TokenService tokenService;
	private static final Logger logger = LoggerFactory.getLogger(CustomAuthenticationSuccessHandler.class);

	@Value("${BASE_URL}")
	private String baseUrl;

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
		OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken)authentication;
		String registrationId = oauthToken.getAuthorizedClientRegistrationId();
		String userName = oauthToken.getName();

		OAuth2AuthorizedClient client = authorizedClientService.loadAuthorizedClient(registrationId, userName);
		if (client == null) {
			throw new ServletException("OAuth2AuthorizedClient not found");
		}

		String oauthAccessToken = client.getAccessToken().getTokenValue();
		Map<String, Object> providerUserInfo = fetchProviderUserInfo(registrationId, oauthAccessToken);

		String providerId = extractProviderId(registrationId, providerUserInfo);

		Member member = memberService.findByProviderId(providerId).orElse(null);
		if (member != null) {
			onMemberLogin(member, registrationId, response);
		} else {
			onNewMember(providerId, registrationId, response);
		}
	}

	private String extractProviderId(String registrationId, Map<String, Object> providerUserInfo)
		throws ServletException {
		Object providerId = null;

		if ("naver".equalsIgnoreCase(registrationId)) {
			@SuppressWarnings("unchecked")
			Map<String, Object> responseMap = (Map<String, Object>)providerUserInfo.get("response");
			if (responseMap != null) {
				providerId = responseMap.get("id");
			}
		} else if ("kakao".equalsIgnoreCase(registrationId)) {
			providerId = providerUserInfo.get("id");
		} else {
			throw new ServletException("Invalid registration id " + registrationId);
		}

		if (providerId == null) {
			throw new ServletException("User Id not found in provider" + registrationId);
		}
		return providerId.toString();
	}

	private void onMemberLogin(Member member, String registrationId, HttpServletResponse response) throws IOException {
		String jwtAccessToken = tokenService.createAccessToken(member.getProviderId(), registrationId);
		String jwtRefreshToken = tokenService.createRefreshToken(member.getProviderId(), registrationId);

		Cookie accessCookie = CookieUtil.createAccessCookie(jwtAccessToken, false);
		response.addCookie(accessCookie);

		if (jwtRefreshToken != null) {
			Cookie refreshCookie = CookieUtil.createRefreshCookie(jwtRefreshToken, false);
			response.addCookie(refreshCookie);
		}
		logger.info("New refresh token: {}", jwtRefreshToken);
		response.sendRedirect(baseUrl);
	}

	private void onNewMember(String providerId, String registrationId, HttpServletResponse response) throws
		IOException {
		String tempToken = jwtUtil.generateTempToken(providerId, registrationId);
		Cookie tempCookie = CookieUtil.createTempCookie(tempToken, false);
		response.addCookie(tempCookie);
		response.sendRedirect(baseUrl + "/sign-up");
	}

	private Map<String, Object> fetchProviderUserInfo(String registrationId, String accessToken) throws
		IOException,
		ServletException {
		if ("kakao".equalsIgnoreCase(registrationId)) {
			return fetchKakaoUserInfo(accessToken);
		} else if ("naver".equalsIgnoreCase(registrationId)) {
			return fetchNaverUserInfo(accessToken);
		} else {
			throw new ServletException("Unsupported OAuth provider: " + registrationId);
		}
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
			new ParameterizedTypeReference<Map<String, Object>>() {
			}
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

	private Map<String, Object> fetchNaverUserInfo(String accessToken) throws IOException, ServletException {
		RestTemplate restTemplate = new RestTemplate();
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", "Bearer " + accessToken);
		HttpEntity<String> entity = new HttpEntity<>(headers);

		ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
			"https://openapi.naver.com/v1/nid/me",
			HttpMethod.GET,
			entity,
			new ParameterizedTypeReference<Map<String, Object>>() {
			}
		);

		if (!response.getStatusCode().is2xxSuccessful()) {
			throw new ServletException("Failed to fetch user info from Naver");
		}

		Map<String, Object> userInfo = response.getBody();
		if (userInfo != null) {
			logger.info("Naver API 응답: {}", userInfo);
		} else {
			logger.warn("응답 본문이 null입니다.");
		}
		return userInfo;
	}
}
