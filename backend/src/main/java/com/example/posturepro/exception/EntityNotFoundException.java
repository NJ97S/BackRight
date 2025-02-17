package com.example.posturepro.exception;

public class EntityNotFoundException extends RuntimeException {

	public EntityNotFoundException(String entityType, String key, Object value) {
		super(String.format("%s not found with %s : %s", entityType, key, value));
	}
}
