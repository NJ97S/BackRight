package com.example.posturepro.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.example.posturepro.api.oauth.filter.JwtAuthenticationFilter;
import com.example.posturepro.api.oauth.handler.CustomAuthenticationSuccessHandler;
import com.example.posturepro.api.oauth.service.TokenBlacklistService;
import com.example.posturepro.api.oauth.service.TokenService;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
	private final CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler;
	private final TokenService tokenService;
	private final TokenBlacklistService blacklistService;
	private final AuthenticationEntryPoint entryPoint;    // 추가

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
			.cors(cors -> cors.configurationSource(corsConfigurationSource()))
			.csrf(AbstractHttpConfigurer::disable)
			.formLogin(AbstractHttpConfigurer::disable)
			.sessionManagement(session ->
				session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			)
			.authorizeHttpRequests(auth -> auth
				.requestMatchers("/", "/auth/**", "/oauth2/**", "/members/signup", "/swagger-ui/**", "/v3/api-docs/**")
				.permitAll()
				.anyRequest()
				.authenticated()
			)

			.oauth2Login(oauth2 -> oauth2
				.successHandler(customAuthenticationSuccessHandler)
			)
			.addFilterBefore(new JwtAuthenticationFilter(tokenService, blacklistService),
				OAuth2LoginAuthenticationFilter.class)
			.exceptionHandling(handler -> handler.authenticationEntryPoint(entryPoint))
			.headers(headers -> headers
					.contentSecurityPolicy(csp -> csp
						.policyDirectives("default-src 'self'; script-src 'self'; style-src 'self'")
					)
					.frameOptions(HeadersConfigurer.FrameOptionsConfig::deny)
				// .httpStrictTransportSecurity(hsts -> hsts
				// 	.includeSubDomains(true)
				// 	.maxAgeInSeconds(31536000)
				// )  테스트를 위해 주석처리
			);

		return http.build();
	}

	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();

		configuration.setAllowedOrigins(
			List.of("http://localhost:5173", "https://localhost", "https://i12a601.p.ssafy.io"));
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
		configuration.setAllowCredentials(true);
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

		source.registerCorsConfiguration("/**", configuration);

		return source;
	}
}
