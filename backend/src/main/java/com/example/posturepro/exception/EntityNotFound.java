package com.example.posturepro.exception;

public class EntityNotFound extends RuntimeException {

	public EntityNotFound(String entityType, String key, Object value) {
		super(String.format("%s not found with %s : %s", entityType, key, value));
	}
}
