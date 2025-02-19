package com.example.posturepro.pose;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;

import lombok.Getter;

@Getter
public abstract class AbstractResponse {
	private final ResponseType responseType;
	private static final Logger logger = LoggerFactory.getLogger(AbstractResponse.class);

	private static final ObjectMapper objectMapper = new ObjectMapper()
		.registerModule(new JavaTimeModule())
		.disable(SerializationFeature.WRITE_DATES_AS_TIMESTAMPS);

	protected AbstractResponse(ResponseType responseType) {
		this.responseType = responseType;
	}

	public String toJSONString() {
		try {
			return objectMapper.writeValueAsString(this);
		} catch (JsonProcessingException e) {
			logger.error("Failed to convert PoseResponse to JSON string: {}", e.getMessage());
			return "{}";
		}
	}
}
