package com.example.posturepro.api.oauth.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.security.oauth2.client.OAuth2AuthorizedClient;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class OAuth2Service {

	private final OAuth2AuthorizedClientService authorizedClientService;

	public OAuth2Service(OAuth2AuthorizedClientService authorizedClientService) {
		this.authorizedClientService = authorizedClientService;
	}

	public Map<String, Object> getTokens(OAuth2AuthenticationToken authentication) {
		OAuth2AuthorizedClient client = authorizedClientService.loadAuthorizedClient(
			authentication.getAuthorizedClientRegistrationId(),
			authentication.getName()
		);

		Map<String, Object> tokenResponse = new HashMap<>();
		tokenResponse.put("access_token", client.getAccessToken().getTokenValue());
		// tokenResponse.put("refresh_token", client.getRefreshToken().getTokenValue());
		if (client.getRefreshToken() != null) {
			tokenResponse.put("refresh_token", client.getRefreshToken().getTokenValue());
		} else {
			tokenResponse.put("refresh_token", "No Refresh Token Available");
		}

		tokenResponse.put("expires_at", client.getAccessToken().getExpiresAt());
		tokenResponse.put("user_info", authentication.getPrincipal().getAttributes());

		return tokenResponse;
	}
}