package com.example.posturepro;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.socket.config.annotation.EnableWebSocket;

@SpringBootApplication
@EnableWebSocket
public class PostureProApplication {

	public static void main(String[] args) {
		SpringApplication.run(PostureProApplication.class, args);
	}

}
