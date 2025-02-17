package com.example.posturepro.dto;

import com.example.posturepro.domain.member.Member;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberResponse {
	private String providerId;
	private String name;
	private String nickname;
	private String profileImgUrl;
	private String message;

	public static MemberResponse fromMember(Member member, String cloudFrontBaseUrl) {
		String profileImgKey = member.getProfileImgUrl();

		String profileImgUrl = (profileImgKey != null && !profileImgKey.isEmpty())
			? cloudFrontBaseUrl + "/" + profileImgKey
			: null;

		return new MemberResponse(
			member.getProviderId(),
			member.getName(),
			member.getNickname(),
			profileImgUrl,
			null
		);
	}

	public static MemberResponse withMessage(String message) {
		return new MemberResponse(null, null, null, null, message);
	}
}
