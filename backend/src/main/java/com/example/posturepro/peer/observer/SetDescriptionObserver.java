/*
 * Copyright 2019 Alex Andres
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.example.posturepro.peer.observer;

import static java.util.Objects.*;

import java.io.IOException;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Future;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import dev.onvoid.webrtc.SetSessionDescriptionObserver;

/**
 * {@link SetSessionDescriptionObserver} implementation providing synchronized
 * behaviour, causing the current thread to wait until the session description
 * is set.
 *
 * @author Alex Andres
 */
public class SetDescriptionObserver implements SetSessionDescriptionObserver, Future<Void> {

	private CountDownLatch latch = new CountDownLatch(1);

	private String error;

	@Override
	public void onSuccess() {
		latch.countDown();
	}

	@Override
	public void onFailure(String error) {
		this.error = error;

		latch.countDown();
	}

	@Override
	public boolean cancel(boolean mayInterruptIfRunning) {
		return false;
	}

	@Override
	public boolean isCancelled() {
		return false;
	}

	@Override
	public boolean isDone() {
		return latch.getCount() == 0;
	}

	@Override
	public Void get() throws InterruptedException, ExecutionException {
		latch.await();

		checkError();

		return null;
	}

	@Override
	public Void get(long timeout, TimeUnit unit)
		throws InterruptedException, ExecutionException, TimeoutException {
		if (latch.await(timeout, unit)) {
			checkError();
			return null;
		} else {
			throw new TimeoutException();
		}
	}

	private void checkError() throws ExecutionException {
		if (nonNull(error)) {
			throw new ExecutionException(error, new IllegalStateException());
		}
	}

	public static class SessionHandler {
		private final WebSocketSession session;
		private final BlockingQueue<String> messageQueue = new LinkedBlockingQueue<>();
		private boolean isSending = false;

		public SessionHandler(WebSocketSession session) {
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

		public void close() throws IOException {
			try {
				this.session.close();
			} catch (IOException e) {
				throw new IOException("세션 종료 실패", e);
			}
		}
	}
}
