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

CERT_DIR="/etc/letsencrypt/live/$DOMAIN"

# ✅ 1️⃣ 기존 인증서 확인
if [ -f "$CERT_DIR/fullchain.pem" ] && [ -f "$CERT_DIR/privkey.pem" ]; then
  echo "✅ 기존 SSL 인증서가 존재함. 새로운 인증서 발급 없이 Nginx 실행."
else
  echo "🚨 기존 인증서 없음. Let's Encrypt에서 새로운 인증서 발급 시도."

  # ✅ 추가적인 확인: `certbot certificates`에서 인증서가 존재하는지 확인
  if sudo certbot certificates | grep -q "$DOMAIN"; then
    echo "⚠️ 기존 인증서가 certbot 내부에 존재하지만, 스크립트에서 감지하지 못함."
  else
    echo "🔴 기존 인증서를 찾을 수 없음. 새 인증서 발급을 시도합니다."
    certbot certonly --standalone --non-interactive --agree-tos -m $EMAIL -d $DOMAIN || {
      echo "❌ Certbot 실행 실패! 인증서 발급 제한으로 인해 중단됨.";
      exit 1;
    }
  fi
fi

# ✅ 2️⃣ Nginx 시작
echo "🚀 Nginx 시작"
exec nginx -g 'daemon off;' &  # Nginx를 백그라운드에서 실행

# ✅ 3️⃣ 인증서 갱신 (`certbot renew` 주기 최적화)
while :; do
  echo "🔄 인증서 갱신 확인 중..."
  certbot renew --quiet && nginx -s reload  # 인증서 갱신 후 Nginx 재시작
  sleep 1d  # ✅ 하루(24시간)마다 갱신 확인
done