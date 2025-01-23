package com.example.posturepro.domain.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.posturepro.api.oauth.utils.JwtUtil;
import com.example.posturepro.domain.member.service.MemberService;
import com.example.posturepro.domain.member.Member;
import com.example.posturepro.dto.SignUpRequest;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/members")
public class MemberController {

	private final MemberService memberService;
	private final JwtUtil jwtUtil;

	@Autowired
	public MemberController(MemberService memberService, JwtUtil jwtUtil) {
		this.memberService = memberService;
		this.jwtUtil = jwtUtil;
	}

	@PostMapping("/signup")
	public ResponseEntity<?> signUp(@RequestBody SignUpRequest signUpRequest, HttpServletRequest request) {
		// 유효성 검증 (필요 시 추가)
		if (signUpRequest.getName() == null || signUpRequest.getNickname() == null
			|| signUpRequest.getBirthDate() == null || signUpRequest.getGender() == null) {
			return ResponseEntity.badRequest().body("필수 입력 항목이 누락되었습니다.");
		}

		// 임시 토큰 가져오기
		String kakaoId = null;
		if (request.getCookies() != null) {
			for (Cookie cookie : request.getCookies()) {
				if ("temp_token".equals(cookie.getName())) {
					String tempToken = cookie.getValue();
					if (jwtUtil.validateToken(tempToken)) {
						kakaoId = jwtUtil.getUserIdFromToken(tempToken);
						break;
					}
				}
			}
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

		return ResponseEntity.ok("회원 가입이 완료되었습니다.");
	}

}