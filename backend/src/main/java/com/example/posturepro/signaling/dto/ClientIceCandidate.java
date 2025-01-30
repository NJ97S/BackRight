package com.example.posturepro.signaling.dto;

public record ClientIceCandidate(String candidate, String sdpMid, int sdpMLineIndex,
								 String usernameFragment) {
}
