package com.example.posturepro.domain.member.service;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.posturepro.domain.member.Gender;
import com.example.posturepro.domain.member.Member;
import com.example.posturepro.domain.member.repository.MemberRepository;
import com.example.posturepro.api.oauth.service.TokenService;
import com.example.posturepro.dto.SignUpRequest;
import com.example.posturepro.api.oauth.utils.CookieUtil;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;

@Service
public class MemberService {
	private final MemberRepository memberRepository;
	private final TokenService tokenService;

	@Autowired
	public MemberService(MemberRepository memberRepository, TokenService tokenService) {
		this.memberRepository = memberRepository;
		this.tokenService = tokenService;
	}

	@Transactional
	public Optional<Member> findByKakaoId(Long kakaoId) {
		return memberRepository.findByKakaoId(kakaoId);
	}

	@Transactional
	public Member createMember(Long kakaoId, String name, String nickname, LocalDate birthDate, Gender gender) {
		Optional<Member> existingMember = memberRepository.findByKakaoId(kakaoId);
		if (existingMember.isPresent()) {
			throw new IllegalArgumentException("이미 존재하는 사용자입니다.");
		}

		Member newMember = Member.builder()
			.kakaoId(kakaoId)
			.name(name)
			.nickname(nickname)
			.birthDate(birthDate)
			.gender(gender)
			.build();

		return memberRepository.save(newMember);
	}

	@Transactional
	public Member signUpAndIssueTokens(Long kakaoId, SignUpRequest signUpRequest, HttpServletResponse response) {
		Member newMember = createMember(
			kakaoId,
			signUpRequest.getName(),
			signUpRequest.getNickname(),
			signUpRequest.getBirthDate(),
			signUpRequest.getGender()
		);

		String jwtAccessToken = tokenService.createAccessToken(newMember.getKakaoId().toString());
		String jwtRefreshToken = tokenService.createRefreshToken(newMember.getKakaoId().toString());

		Cookie accessCookie = CookieUtil.createCookie(
			"access-token",
			jwtAccessToken,
			true,
			false,                    // 프로덕션 환경에서는 true로 설정
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
				false,                // 프로덕션 환경에서는 true로 설정
				"/",
				604800,
				"Strict"
			);
			response.addCookie(refreshCookie);
		}

		Cookie tempCookie = CookieUtil.deleteCookie("temp-token", false, "/", "Strict");
		response.addCookie(tempCookie);

		return newMember;
	}
}
