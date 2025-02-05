package com.example.posturepro.domain.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.posturepro.api.oauth.utils.CookieUtil;
import com.example.posturepro.domain.member.service.MemberService;
import com.example.posturepro.domain.member.Member;
import com.example.posturepro.dto.SignUpRequest;
import com.example.posturepro.api.oauth.service.TokenService;
import com.example.posturepro.dto.SignUpToken;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/members")
public class MemberController {

	private final MemberService memberService;
	private final TokenService tokenService;

	@Autowired
	public MemberController(MemberService memberService, TokenService tokenService) {
		this.memberService = memberService;
		this.tokenService = tokenService;
	}

	@PostMapping("/signup")
	public ResponseEntity<?> signUp(@RequestBody @Valid SignUpRequest signUpRequest,
		HttpServletRequest request,
		HttpServletResponse response,
		Authentication authentication) {
		String providerId = extractAndValidateTempToken(request);
		OAuth2AuthenticationToken oauthToken = (OAuth2AuthenticationToken) authentication;
		String registrationId = oauthToken.getAuthorizedClientRegistrationId();
		if (providerId == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효한 인증 정보가 없습니다. 다시 로그인해주세요.");
		}

		try {
			SignUpToken result = memberService.signUpToken(providerId, registrationId, signUpRequest);

			Cookie accessCookie = CookieUtil.createAccessCookie(result.getAccessToken(),false);
			response.addCookie(accessCookie);

			if (result.getRefreshToken() != null) {
				Cookie refreshCookie = CookieUtil.createRefreshCookie(result.getRefreshToken(),false);
				response.addCookie(refreshCookie);
			}

			Cookie tempCookie = CookieUtil.deleteCookie("temp-token", false, "/", "Strict");
			response.addCookie(tempCookie);

			return ResponseEntity.ok("회원 가입이 완료되었습니다.");
		} catch (IllegalArgumentException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("회원 가입에 실패했습니다.");
		}
	}

	private String extractAndValidateTempToken(HttpServletRequest request) {
		if (request.getCookies() != null) {
			for (Cookie cookie : request.getCookies()) {
				if ("temp-token".equals(cookie.getName())) {
					String tempToken = cookie.getValue();
					if (tokenService.validateTempToken(tempToken)) {
						return tokenService.getUserIdFromToken(tempToken);
					}
				}
			}
		}
		return null;
	}
}
