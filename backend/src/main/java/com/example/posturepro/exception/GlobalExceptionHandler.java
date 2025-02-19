package com.example.posturepro.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.SignatureException;
import io.swagger.v3.oas.annotations.Hidden;

@Hidden
@RestControllerAdvice
public class GlobalExceptionHandler {
	@ExceptionHandler(EntityNotFoundException.class)
	public ResponseEntity<ErrorResponse> handleEntityNotFoundException(EntityNotFoundException exception) {
		return ResponseEntity
			.badRequest()
			.body(new ErrorResponse(exception.getMessage()));
	}

	@ExceptionHandler(SignatureException.class)
	public ResponseEntity<ErrorResponse> handleSignatureException() {
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("토큰이 유효하지 않습니다."));
	}

	@ExceptionHandler(MalformedJwtException.class)
	public ResponseEntity<ErrorResponse> handleMalformedJwtException() {
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("올바르지 않은 토큰입니다."));
	}

	@ExceptionHandler(ExpiredJwtException.class)
	public ResponseEntity<ErrorResponse> handleExpiredJwtException() {
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ErrorResponse("토큰이 만료되었습니다. 다시 로그인해주세요."));
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<ErrorResponse> handleUnhandledException(Exception exception) {
		exception.printStackTrace();
		return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
			.body(new ErrorResponse(exception.getMessage() + "처리되지 않은 에러입니다. 문의해주세요."));
	}
}
