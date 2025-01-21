package com.example.posturepro.api.oauth.service;

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

	public String getAccessToken(OAuth2AuthenticationToken authentication) {
		OAuth2AuthorizedClient client = authorizedClientService.loadAuthorizedClient(
			authentication.getAuthorizedClientRegistrationId(),
			authentication.getName()
		);

		return client.getAccessToken().getTokenValue();
	}
}
