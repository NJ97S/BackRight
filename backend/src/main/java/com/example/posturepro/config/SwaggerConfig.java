package com.example.posturepro.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;

@Configuration
public class SwaggerConfig {

	@Bean
	public OpenAPI customOpenAPI() {
		return new OpenAPI()
			.info(new Info()
				.title("Backright API 문서")
				.version("1.0")
			).addSecurityItem(new SecurityRequirement().addList("cookieAuth"))
			.components(new io.swagger.v3.oas.models.Components()
				.addSecuritySchemes("cookieAuth",
					new SecurityScheme()
						.name("JSESSIONID")  // 보통 JSESSIONID 또는 access-token을 사용
						.type(SecurityScheme.Type.APIKEY)
						.in(SecurityScheme.In.COOKIE)
				)
			);
	}
}
