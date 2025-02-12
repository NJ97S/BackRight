package com.example.posturepro.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

import com.example.posturepro.signaling.JwtHandshakeInterceptor;
import com.example.posturepro.signaling.SignalingHandler;

@Configuration
public class WebSocketConfig implements WebSocketConfigurer {
	private final SignalingHandler signalingHandler;

	public WebSocketConfig(SignalingHandler signalingHandler) {
		this.signalingHandler = signalingHandler;
	}

	@Override
	public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		registry.addHandler(signalingHandler, "/helloworld")
			.setAllowedOrigins("*")
			.addInterceptors(new JwtHandshakeInterceptor());
	}

}
