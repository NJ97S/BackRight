package com.example.posturepro.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class UpdateProfileResponse {
	private String nickname;
	private String preSignedUrl;
	private String profileImgUrl;
}
