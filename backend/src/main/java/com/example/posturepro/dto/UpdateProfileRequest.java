package com.example.posturepro.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateProfileRequest {
	private String nickname;
	private String profileImgUrl;
}