package com.example.posturepro.domain.member.service;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.posturepro.domain.member.Gender;
import com.example.posturepro.domain.member.Member;
import com.example.posturepro.domain.member.repository.MemberRepository;

import jakarta.transaction.Transactional;

@Service
public class MemberService {
	private final MemberRepository memberRepository;

	@Autowired
	public MemberService(MemberRepository memberRepository) {
		this.memberRepository = memberRepository;
	}

	@Transactional
	public Member findOrCreateMember(Long kakaoId, String name, String nickname, LocalDate birthDate, Gender gender) {
		return memberRepository.findByKakaoId(kakaoId)
			.orElseGet(() -> {
				Member newMember = Member.builder()
					.kakaoId(kakaoId)
					.name(name)
					.nickname(nickname)
					.birthDate(birthDate)
					.gender(gender)
					.build();
				return memberRepository.save(newMember);
			});
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
}
