#!/bin/sh

# 환경 변수 확인
if [ -z "$DOMAIN" ]; then
  echo "🚨 ERROR: DOMAIN 환경 변수가 설정되지 않았습니다!"
  exit 1
fi

if [ -z "$EMAIL" ]; then
  echo "🚨 ERROR: EMAIL 환경 변수가 설정되지 않았습니다!"
  exit 1
fi

# ✅ 1️⃣ SSL 인증서 최초 발급 (이미 발급된 경우 건너뜀)
if [ ! -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
  echo "🔹 SSL 인증서가 없으므로 Let's Encrypt에서 발급을 시도합니다..."
  certbot certonly --standalone --non-interactive --agree-tos -m $EMAIL -d $DOMAIN --http-01-port 80
fi

# ✅ 2️⃣ 인증서 존재 여부 확인 (없으면 Nginx 실행 안 함)
if [ ! -f "/etc/letsencrypt/live/$DOMAIN/fullchain.pem" ]; then
  echo "❌ ERROR: SSL 인증서 발급 실패! certbot을 수동 실행하세요."
  exit 1
fi

# ✅ 3️⃣ Nginx 시작 (이제 SSL 인증서가 있으므로 실행 가능)
exec nginx -g 'daemon off;'

# ✅ 4️⃣ 인증서 갱신 (12시간마다 실행)
while :; do
  certbot renew --quiet
  sleep 12h
done
