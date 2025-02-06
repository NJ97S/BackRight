package com.example.posturepro.domain.member.service;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;

import com.example.posturepro.domain.member.Gender;
import com.example.posturepro.domain.member.Member;
import com.example.posturepro.domain.member.repository.MemberRepository;
import com.example.posturepro.api.oauth.service.TokenService;
import com.example.posturepro.dto.SignUpRequest;
import com.example.posturepro.dto.SignUpToken;

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
	public Optional<Member> findByProviderId(String providerId) {
		return memberRepository.findByProviderId(providerId);
	}

	@Transactional
	public Member createMember(String providerId, String name, String nickname, LocalDate birthDate, Gender gender) {
		Optional<Member> existingMember = memberRepository.findByProviderId(providerId);
		if (existingMember.isPresent()) {
			throw new IllegalArgumentException("이미 존재하는 사용자입니다.");
		}

		Member newMember = Member.builder()
			.providerId(providerId)
			.name(name)
			.nickname(nickname)
			.birthDate(birthDate)
			.gender(gender)
			.build();

		return memberRepository.save(newMember);
	}

	@Transactional
	public SignUpToken signUpToken(String providerId, String registrationId, SignUpRequest signUpRequest) {
		Member newMember = createMember(
			providerId,
			signUpRequest.getName(),
			signUpRequest.getNickname(),
			signUpRequest.getBirthDate(),
			signUpRequest.getGender()
		);

		String jwtAccessToken = tokenService.createAccessToken(newMember.getProviderId(), registrationId);
		String jwtRefreshToken = tokenService.createRefreshToken(newMember.getProviderId(), registrationId);

		return new SignUpToken(newMember,jwtAccessToken,jwtRefreshToken);
	}
}
