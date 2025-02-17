FROM node:18-alpine AS builder

# Build arguments
ARG VITE_API_BASE_URL
ARG VITE_WEBSOCKET_URL

# 환경 변수 설정
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV VITE_WEBSOCKET_URL=${VITE_WEBSOCKET_URL}

WORKDIR /app

# 패키지 매니저 설치
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm

# 강제로 devDependencies 포함하여 설치
RUN pnpm install --frozen-lockfile --production=false

# 소스 복사 후 빌드 실행
COPY . .

RUN pnpm run build:web

# Nginx 컨테이너에서 사용하기 위해 빌드된 파일을 export
FROM nginx:alpine AS frontend
WORKDIR /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 빌드된 정적 파일만 복사
COPY --from=builder /app/dist .
