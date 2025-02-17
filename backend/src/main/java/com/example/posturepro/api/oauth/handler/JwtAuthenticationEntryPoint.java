package com.example.posturepro.api.oauth.handler;

import java.io.IOException;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.example.posturepro.exception.ErrorResponse;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationEntryPoint implements AuthenticationEntryPoint {
	private final ObjectMapper objectMapper = new ObjectMapper();

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
		AuthenticationException authException) throws IOException {
		System.out.println("JwtAuthenticationEntryPoint 실행됨");
		System.out.println("authException 클래스: " + authException.getClass().getName());
		System.out.println("authException 메시지: " + authException.getMessage());

		// 만약 request에 이미 예외가 세팅되어 있다면 해당 예외의 메시지를 사용
		Exception exception = (Exception)request.getAttribute("exception");
		String errorMessage = (exception != null) ? exception.getMessage() : authException.getMessage();

		// 직접 JSON 응답 작성
		ErrorResponse errorResponse = new ErrorResponse(errorMessage);
		String jsonResponse = objectMapper.writeValueAsString(errorResponse);

		response.setContentType("application/json");
		// 적절한 상태 코드 설정 (예: 인증 관련 문제라면 401 혹은 400)
		response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
		response.getWriter().write(jsonResponse);
	}

}