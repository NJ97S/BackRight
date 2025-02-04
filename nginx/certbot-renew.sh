#!/bin/sh

# 1️⃣ 초기 SSL 인증서 발급 (처음 한 번만 실행)
if [ ! -d "/etc/letsencrypt/live/$DOMAIN" ]; then
  certbot certonly --nginx --non-interactive --agree-tos -m $EMAIL -d $DOMAIN
fi

# 2️⃣ 인증서 갱신 자동 실행
while :; do
  certbot renew --quiet
  sleep 12h
done
