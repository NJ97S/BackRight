package com.example.posturepro.config;

import com.example.posturepro.api.oauth.filter.JwtAuthenticationFilter;
import com.example.posturepro.api.oauth.handler.CustomAuthenticationSuccessHandler;
import com.example.posturepro.api.oauth.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.client.OAuth2AuthorizedClientService;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.*;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

	private final CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler;
	private final OAuth2AuthorizedClientService authorizedClientService;
	private final JwtUtil jwtUtil;

	@Autowired
	public SecurityConfig(CustomAuthenticationSuccessHandler customAuthenticationSuccessHandler,
		OAuth2AuthorizedClientService authorizedClientService,
		JwtUtil jwtUtil) {
		this.customAuthenticationSuccessHandler = customAuthenticationSuccessHandler;
		this.authorizedClientService = authorizedClientService;
		this.jwtUtil = jwtUtil;
	}

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
				.requestMatchers("/", "/auth/**", "/oauth2/**", "/api/members/signup").permitAll()
				.anyRequest().authenticated()
			)

			.oauth2Login(oauth2 -> oauth2
				.successHandler(customAuthenticationSuccessHandler)
				.failureUrl("/auth/fail")
			)

			.addFilterBefore(new JwtAuthenticationFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class)
			.headers(headers -> headers
				.contentSecurityPolicy(csp -> csp
					.policyDirectives("default-src 'self'; script-src 'self'; style-src 'self'")
				)
				.frameOptions(HeadersConfigurer.FrameOptionsConfig::deny)
				.httpStrictTransportSecurity(hsts -> hsts
					.includeSubDomains(true)
					.maxAgeInSeconds(31536000)
				)
			);

		return http.build();
	}

	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration();

		configuration.setAllowedOrigins(List.of("http://localhost:5173"));
		configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
		configuration.setAllowedHeaders(Arrays.asList("Authorization", "Cache-Control", "Content-Type"));
		configuration.setAllowCredentials(true);
		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();

		source.registerCorsConfiguration("/api/**", configuration);
		source.registerCorsConfiguration("/oauth2/**", configuration);

		return source;
	}
}
