package com.example.posturepro.signaling;

import java.io.IOException;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

public class SerializedWebSocketSender {
	private final WebSocketSession session;
	private final BlockingQueue<String> messageQueue = new LinkedBlockingQueue<>();
	private boolean isSending = false;

	public SerializedWebSocketSender(WebSocketSession session) {
		this.session = session;
	}

	public synchronized void sendMessage(String message) throws IOException {
		messageQueue.add(message);
		if (!isSending) {
			isSending = true;
			processNextMessage();
		}
	}

	private void processNextMessage() throws IOException {
		String message = messageQueue.poll();
		if (message == null) {
			isSending = false;
			return;
		}

		try {
			session.sendMessage(new TextMessage(message));
			processNextMessage(); // 재귀적으로 다음 메시지 처리
		} catch (IOException exception) {
			throw new IOException("메시지 전송 실패", exception);
		}
	}
}