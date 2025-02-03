package com.example.posturepro.pose;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.Data;

@Data
public class PoseResponse {
	boolean initialSet;
	boolean detected;
	int problemCode;    // neck = 1<<3, left shoulder = 1<<2, right shoulder = 1<<1, back = 1

	public PoseResponse() {
		initialSet = true;
		detected = false;
		problemCode = 0;
	}

	public String JSONString() {
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			return objectMapper.writeValueAsString(this);
		} catch (JsonProcessingException e) {

			return "{}";  // 오류 발생 시 빈 JSON 반환
		}
	}

	public void addError(int errorCode) {
		switch (errorCode) {
			case 0: // neck
				problemCode += 1 << 3;
				break;
			case 1: // left shoulder
				problemCode += 1 << 2;
				break;
			case 2: // right shoulder
				problemCode += 1 << 1;
				break;
			case 3: // back
				problemCode += 1;
				break;
		}
	}
}
