package com.example.posturepro.pose;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Getter;

@Getter
public class DisconnectResponse {
	private ResponseType responseType = ResponseType.DISCONNECT_RESPONSE;

	public DisconnectResponse() {
	}

	public String toJSONString() {
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			return objectMapper.writeValueAsString(this);
		} catch (JsonProcessingException e) {
			throw new RuntimeException("JSON 변환 오류", e);
		}
	}
}
