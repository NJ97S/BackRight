package com.example.posturepro.api.oauth.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
			.authorizeHttpRequests(auth -> auth
				.requestMatchers("/", "/oauth2/**").permitAll()  // 카카오 로그인 페이지 허용
				.anyRequest().authenticated()  // 나머지는 인증 필요
			)
			.oauth2Login(oauth2 -> oauth2
				.defaultSuccessUrl("/auth/success")  // 로그인 성공 후 이동 경로
			)
			.logout(logout -> logout.logoutSuccessUrl("/"))
			.csrf(csrf -> csrf.disable());  // 테스트를 위해 CSRF 비활성화

		return http.build();
	}
}
