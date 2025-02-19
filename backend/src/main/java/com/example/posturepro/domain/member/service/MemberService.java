package com.example.posturepro.domain.member.service;

import java.time.LocalDate;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.posturepro.api.oauth.service.TokenService;
import com.example.posturepro.api.s3.component.S3Component;
import com.example.posturepro.domain.member.Gender;
import com.example.posturepro.domain.member.Member;
import com.example.posturepro.domain.member.repository.MemberRepository;
import com.example.posturepro.dto.SignUpRequest;
import com.example.posturepro.dto.SignUpToken;
import com.example.posturepro.dto.UpdateProfileRequest;
import com.example.posturepro.dto.UpdateProfileResponse;
import com.example.posturepro.exception.EntityNotFoundException;

import jakarta.transaction.Transactional;

@Service
public class MemberService {

	private final MemberRepository memberRepository;
	private final TokenService tokenService;
	private final S3Component s3Component;

	@Value("${CLOUDFRONT_BASE_URL}")
	private String cloudFrontBaseUrl;

	@Autowired
	public MemberService(MemberRepository memberRepository, TokenService tokenService, S3Component s3Component) {
		this.memberRepository = memberRepository;
		this.tokenService = tokenService;
		this.s3Component = s3Component;
	}

	@Transactional
	public Optional<Member> findByProviderId(String providerId) {
		return memberRepository.findByProviderId(providerId);
	}

	@Transactional
	public String findByProfileImgKey(String providerId) {
		return memberRepository.findProfileImgUrlByProviderId(providerId).orElse(null);
	}

	@Transactional
	public Member createMember(String providerId, String name, String nickname, LocalDate birthDate, Gender gender,
		String profileImgUrl) {
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
			.profileImgUrl(profileImgUrl)
			.build();

		return memberRepository.save(newMember);
	}

	public Member getMember(Long memberId) {
		return memberRepository.findById(memberId).orElseThrow(
			() -> new EntityNotFoundException(Member.class.getName(), "id", memberId)
		);
	}

	@Transactional
	public SignUpToken signUpToken(String providerId, String registrationId, SignUpRequest signUpRequest) {
		Member newMember = createMember(
			providerId,
			signUpRequest.getName(),
			signUpRequest.getNickname(),
			signUpRequest.getBirthDate(),
			signUpRequest.getGender(),
			signUpRequest.getProfileImgUrl()
		);

		String jwtAccessToken = tokenService.createAccessToken(newMember.getProviderId(), registrationId);
		String jwtRefreshToken = tokenService.createRefreshToken(newMember.getProviderId(), registrationId);

		return new SignUpToken(newMember, jwtAccessToken, jwtRefreshToken);
	}

	@Transactional
	public UpdateProfileResponse updateProfile(String providerId, UpdateProfileRequest request) {
		Member member = memberRepository.findByProviderId(providerId)
			.orElseThrow(() -> new IllegalArgumentException("사용자를 찾을 수 없습니다."));

		if (request.getNickname() != null && !request.getNickname().isEmpty()) {
			member.setNickname(request.getNickname());
		}

		String profileImgKey = findByProfileImgKey(providerId);

		String preSignedUrl = null;
		if (request.getProfileImgUrl() != null && !request.getProfileImgUrl().isEmpty()) {
			if (profileImgKey == null) {
				Map<String, String> imgPreSignedUrl = s3Component.generatePreSignedUrls(providerId, null,
					request.getProfileImgUrl());
				profileImgKey = imgPreSignedUrl.get("profileImgKey");
				preSignedUrl = imgPreSignedUrl.get("profileImgPreSignedUrl");

				member.setProfileImgUrl(profileImgKey);
			} else {
				preSignedUrl = s3Component.generatePreSignedUrlForProfileImageUpdate(profileImgKey);
			}
		}

		String cloudFrontUrl = cloudFrontBaseUrl + "/" + profileImgKey + "?v=" + System.currentTimeMillis();

		memberRepository.save(member);

		return new UpdateProfileResponse(member.getNickname(), preSignedUrl, cloudFrontUrl);
	}

}
