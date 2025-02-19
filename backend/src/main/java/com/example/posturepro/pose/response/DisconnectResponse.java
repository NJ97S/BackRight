package com.example.posturepro.pose.response;

import lombok.Getter;

@Getter
public class DisconnectResponse extends AbstractResponse {
	public DisconnectResponse() {
		super(ResponseType.DISCONNECT_RESPONSE);
	}
}
