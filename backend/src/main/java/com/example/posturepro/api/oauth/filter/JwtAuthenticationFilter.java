package com.example.posturepro.api.oauth.filter;

import com.example.posturepro.api.oauth.utils.JwtUtil;
import com.example.posturepro.api.oauth.service.TokenService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
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
		String token = getJwtFromCookies(request);

		if (token != null && tokenService.validateToken(token)) {
			String userId = tokenService.getUserIdFromToken(token);
			UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
				userId, null, new ArrayList<>()); // 권한은 필요에 따라 설정
			authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

			SecurityContextHolder.getContext().setAuthentication(authentication);
		}

		filterChain.doFilter(request, response);
	}

	private String getJwtFromCookies(HttpServletRequest request) {
		if (request.getCookies() == null) return null;

		for (Cookie cookie : request.getCookies()) {
			if ("access_token".equals(cookie.getName())) {
				return cookie.getValue();
			}
		}

		return null;
	}
}
