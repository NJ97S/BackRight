package com.example.posturepro.domain.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.posturepro.domain.member.service.MemberService;
import com.example.posturepro.domain.member.Member;
import com.example.posturepro.dto.SignUpRequest;
import com.example.posturepro.api.oauth.service.TokenService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

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
	public ResponseEntity<?> signUp(@RequestBody SignUpRequest signUpRequest, HttpServletRequest request, HttpServletResponse response) {
		// 유효성 검증 (필요 시 추가)
		if (signUpRequest.getName() == null || signUpRequest.getNickname() == null
			|| signUpRequest.getBirthDate() == null || signUpRequest.getGender() == null) {
			return ResponseEntity.badRequest().body("필수 입력 항목이 누락되었습니다.");
		}

		// 2. 임시 토큰 추출 및 검증
		String kakaoId = extractAndValidateTempToken(request);
		if (kakaoId == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유효한 인증 정보가 없습니다. 다시 로그인해주세요.");
		}

		if (kakaoId == null) {
			return ResponseEntity.badRequest().body("유효한 인증 정보가 없습니다.");
		}

		// 이미 사용자가 존재하는지 확인
		Member existingMember = memberService.findByKakaoId(Long.parseLong(kakaoId)).orElse(null);
		if (existingMember != null) {
			return ResponseEntity.badRequest().body("이미 등록된 사용자입니다.");
		}

		// 사용자 생성
		Member newMember = memberService.createMember(
			Long.parseLong(kakaoId),
			signUpRequest.getName(),
			signUpRequest.getNickname(),
			signUpRequest.getBirthDate(),
			signUpRequest.getGender()
		);

		String jwtAccessToken = tokenService.createAccessToken(newMember.getKakaoId().toString());
		String jwtRefreshToken = tokenService.createRefreshToken(newMember.getKakaoId().toString());

		Cookie accessCookie = new Cookie("access_token", jwtAccessToken);
		accessCookie.setHttpOnly(true);
		accessCookie.setSecure(false); // 프로덕션 환경에서는 true로 설정
		accessCookie.setPath("/");
		accessCookie.setMaxAge(3600);
		accessCookie.setAttribute("SameSite", "Strict");
		response.addCookie(accessCookie);

		if (jwtRefreshToken != null) {
			Cookie refreshCookie = new Cookie("refresh_token", jwtRefreshToken);
			refreshCookie.setHttpOnly(true);
			refreshCookie.setSecure(false); // 프로덕션 환경에서는 true로 설정
			refreshCookie.setPath("/");
			refreshCookie.setMaxAge(604800);
			refreshCookie.setAttribute("SameSite", "Strict");
			response.addCookie(refreshCookie);
		}

		// 7. 임시 토큰 쿠키 제거
		Cookie tempCookie = new Cookie("temp_token", null);
		tempCookie.setHttpOnly(true);
		tempCookie.setSecure(false); // 프로덕션 환경에서는 true로 설정
		tempCookie.setPath("/");
		tempCookie.setMaxAge(0); // 쿠키 삭제
		tempCookie.setAttribute("SameSite", "Strict");
		response.addCookie(tempCookie);

		return ResponseEntity.ok("회원 가입이 완료되었습니다.");
	}

	private String extractAndValidateTempToken(HttpServletRequest request) {
		if (request.getCookies() != null) {
			for (Cookie cookie : request.getCookies()) {
				if ("temp_token".equals(cookie.getName())) {
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