package com.example.posturepro.api.oauth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class RefreshTokenResponse {
	private String message;
	private String accessToken;
	private String refreshToken;
}
