package com.example.posturepro.dto;

import java.time.LocalDate;

import com.example.posturepro.domain.member.Gender;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class SignUpRequest {

	@NotBlank(message = "이름은 필수 입력 항목입니다.")
	private String name;

	@NotBlank(message = "닉네임은 필수 입력 항목입니다.")
	private String nickname;

	@NotNull(message = "생년월일은 필수 입력 항목입니다.")
	private LocalDate birthDate;

	@NotNull(message = "성별은 필수 입력 항목입니다.")
	private Gender gender;

}