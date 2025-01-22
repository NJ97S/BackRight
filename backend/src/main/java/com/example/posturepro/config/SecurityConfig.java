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
			// CSRF 보호 비활성화 (상태 비저장 애플리케이션의 경우)
			.csrf(AbstractHttpConfigurer::disable)
			// 폼 로그인 비활성화
			.formLogin(AbstractHttpConfigurer::disable)
			// 세션 관리 정책 설정 (상태 비저장)
			.sessionManagement(session ->
				session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
			)
			// 권한 설정
			.authorizeHttpRequests(auth -> auth
				.requestMatchers("/", "/auth/**", "/oauth2/**").permitAll() // 홈 및 인증 관련 경로 허용
				.anyRequest().authenticated()
			)
			// OAuth2 로그인 설정
			.oauth2Login(oauth2 -> oauth2
				.successHandler(customAuthenticationSuccessHandler)
				.failureUrl("/auth/fail")
			)
			// JWT 인증 필터 추가
			.addFilterBefore(new JwtAuthenticationFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class)
			// CORS 설정 (필요에 따라 커스터마이징)
			.cors(Customizer.withDefaults())
			// 보안 헤더 설정
			.headers(headers -> headers
				.contentSecurityPolicy(csp -> csp
					.policyDirectives("default-src 'self'; script-src 'self'; style-src 'self'")
				)
				.frameOptions(HeadersConfigurer.FrameOptionsConfig::deny
				)
				.httpStrictTransportSecurity(hsts -> hsts
					.includeSubDomains(true)
					.maxAgeInSeconds(31536000)
				)
			);

		return http.build();
	}
}
