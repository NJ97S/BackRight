package com.example.posturepro.api.oauth.filter;

import com.example.posturepro.api.oauth.utils.JwtUtil;
import com.example.posturepro.api.oauth.service.TokenService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.util.ArrayList;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

	private final TokenService tokenService;

	public JwtAuthenticationFilter(TokenService tokenService) {
		this.tokenService = tokenService;
	}

	@Override
	protected void doFilterInternal(HttpServletRequest request,
		HttpServletResponse response,
		FilterChain filterChain) throws ServletException, IOException {

		Authentication existingAuth = SecurityContextHolder.getContext().getAuthentication();

		if (existingAuth instanceof OAuth2AuthenticationToken) {
			filterChain.doFilter(request, response);
			return;
		}
		String token = getJwtFromCookies(request);

		if (token != null && tokenService.validateToken(token)) {
			String userId = tokenService.getUserIdFromToken(token);
			UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
				userId, null, new ArrayList<>());
			authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

			SecurityContextHolder.getContext().setAuthentication(authentication);

			System.out.println(" SecurityContext에 인증 정보 저장됨: " + authentication.getClass().getName());
		} else {
			System.out.println(" JWT 토큰이 없거나 유효하지 않음");
		}


		filterChain.doFilter(request, response);
	}

	private String getJwtFromCookies(HttpServletRequest request) {
		if (request.getCookies() == null) {
			return null;
		}
		for (Cookie cookie : request.getCookies()) {
			if ("access-token".equals(cookie.getName())) {
				return cookie.getValue();
			}
		}
		return null;
	}
}
