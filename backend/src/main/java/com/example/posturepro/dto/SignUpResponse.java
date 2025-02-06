package com.example.posturepro.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SignUpResponse {
	private String message;
	private String accessToken;
	private String refreshToken;
}
