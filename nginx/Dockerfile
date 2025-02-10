FROM nginx:alpine

WORKDIR /etc/nginx

# Certbot 및 OpenSSL 설치
RUN apk add --no-cache certbot certbot-nginx openssl

# ✅ 기존 인증서 디렉터리를 유지 (도커 볼륨 마운트 전제)
VOLUME ["/etc/letsencrypt"]

COPY default.conf /etc/nginx/conf.d/default.conf
COPY certbot-renew.sh /certbot-renew.sh

RUN chmod +x /certbot-renew.sh

CMD ["/bin/sh", "-c", "/certbot-renew.sh"]