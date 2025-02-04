FROM nginx:alpine

WORKDIR /etc/nginx

# Certbot 및 OpenSSL 설치
RUN apk add --no-cache certbot certbot-nginx openssl

# ✅ Self-signed 인증서 생성 (초기 실행을 위해)
RUN openssl req -x509 -nodes -days 1 -newkey rsa:2048 \
    -keyout /etc/nginx/dummy-key.pem \
    -out /etc/nginx/dummy-cert.pem \
    -subj "/CN=localhost"

COPY default.conf /etc/nginx/conf.d/default.conf
COPY certbot-renew.sh /certbot-renew.sh

RUN chmod +x /certbot-renew.sh

CMD ["/bin/sh", "-c", "/certbot-renew.sh & nginx -g 'daemon off;'"]
