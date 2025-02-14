package com.example.posturepro.domain.member.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.posturepro.api.oauth.service.TokenService;
import com.example.posturepro.api.oauth.utils.CookieUtil;
import com.example.posturepro.api.s3.component.S3Component;
import com.example.posturepro.domain.member.Member;
import com.example.posturepro.domain.member.service.MemberService;
import com.example.posturepro.dto.MemberResponse;
import com.example.posturepro.dto.SignUpRequest;
import com.example.posturepro.dto.SignUpResponse;
import com.example.posturepro.dto.SignUpToken;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/members")
public class MemberController {

	private final MemberService memberService;
	private final TokenService tokenService;
	private final S3Component s3Component;

	@Autowired
	public MemberController(MemberService memberService, TokenService tokenService, S3Component s3Component) {
		this.memberService = memberService;
		this.tokenService = tokenService;
		this.s3Component = s3Component;
	}

	@GetMapping("/me")
	public ResponseEntity<MemberResponse> getCurrentUser(HttpServletRequest request) {
		String accessToken = extractAccessToken(request);

		if (accessToken == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
				.body(MemberResponse.withMessage("로그인이 필요합니다."));
		}

		if (!tokenService.validateToken(accessToken)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
				.body(MemberResponse.withMessage("유효하지 않은 토큰입니다. 다시 로그인해주세요."));
		}
		String providerId = tokenService.getProviderIdFromToken(accessToken);

		Optional<Member> member = memberService.findByProviderId(providerId);

		return member.map(value -> ResponseEntity.ok(MemberResponse.fromMember(value)))
			.orElseGet(() -> ResponseEntity.status(HttpStatus.UNAUTHORIZED)
				.body(MemberResponse.withMessage("로그인된 사용자를 찾을 수 없습니다.")));
	}

	private String extractAccessToken(HttpServletRequest request) {
		if (request.getCookies() == null) return null;

		for (Cookie cookie : request.getCookies()) {
			if ("access-token".equals(cookie.getName())) {
				return cookie.getValue();
			}
		}
		return null;
	}


	@PostMapping("/signup/imgpresigned-url")
	public ResponseEntity<?> generateImgPreSignedUrl(@RequestParam String profileImgFileName, Authentication authentication) {

		String providerId = authentication.getName();
		Map<String, String> preSignedUrls = s3Component.generatePreSignedUrls(providerId, null, profileImgFileName);

		return ResponseEntity.ok(preSignedUrls);
	}

	@PostMapping("/signup")
	public ResponseEntity<SignUpResponse> signUp(@RequestBody @Valid SignUpRequest signUpRequest,
		HttpServletRequest request,
		HttpServletResponse response,
		Authentication authentication) {

		String providerId = extractAndValidateTempToken(request);

		// Authentication 타입 체크 후 처리
		String registrationId = null;
		if (authentication instanceof OAuth2AuthenticationToken oauthToken) {
			registrationId = oauthToken.getAuthorizedClientRegistrationId();
		} else if (authentication instanceof UsernamePasswordAuthenticationToken) {
			// JWT 인증을 통해 접근한 경우, registrationId를 따로 설정할 수 없음
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
				.body(new SignUpResponse("OAuth2 인증이 필요합니다.", null, null));
		}

		if (providerId == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
				.body(new SignUpResponse("유효한 인증 정보가 없습니다. 다시 로그인해주세요.", null, null));
		}

		try {
			SignUpToken result = memberService.signUpToken(providerId, registrationId, signUpRequest);

			Cookie accessCookie = CookieUtil.createAccessCookie(result.getAccessToken(), true);
			response.addCookie(accessCookie);

			if (result.getRefreshToken() != null) {
				Cookie refreshCookie = CookieUtil.createRefreshCookie(result.getRefreshToken(), false);
				response.addCookie(refreshCookie);
			}

			Cookie tempCookie = CookieUtil.deleteCookie("temp-token", false, "/", "Strict");
			response.addCookie(tempCookie);

			return ResponseEntity.ok(
				new SignUpResponse("회원 가입이 완료되었습니다.", result.getAccessToken(), result.getRefreshToken()));
		} catch (IllegalArgumentException e) {
			return ResponseEntity.badRequest().body(new SignUpResponse(e.getMessage(), null, null));
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
				.body(new SignUpResponse("회원 가입에 실패했습니다.", null, null));
		}
	}

	private String extractAndValidateTempToken(HttpServletRequest request) {
		if (request.getCookies() != null) {
			for (Cookie cookie : request.getCookies()) {
				if ("temp-token".equals(cookie.getName())) {
					String tempToken = cookie.getValue();
					if (tokenService.validateTempToken(tempToken)) {
						return tokenService.getProviderIdFromToken(tempToken);
					}
				}
			}
		}
		return null;
	}
}
