package com.example.posturepro.dto;

import com.example.posturepro.domain.member.Member;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class SignUpToken {
	private Member member;
	private String accessToken;
	private String refreshToken;
}
