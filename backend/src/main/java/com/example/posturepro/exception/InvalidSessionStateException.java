package com.example.posturepro.exception;

public class InvalidSessionStateException extends RuntimeException {

	public InvalidSessionStateException(Long sessionId) {
		super("Session ID " + sessionId + " is not in FINISHED state.");
	}
}
