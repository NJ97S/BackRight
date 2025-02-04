FROM nginx:alpine

# Certbot 설치 (Let's Encrypt SSL 인증서 발급용)
RUN apk add --no-cache certbot certbot-nginx

WORKDIR /etc/nginx

# Nginx reverse proxy 설정 파일 복사
COPY default.conf /etc/nginx/conf.d/default.conf

# 인증서 갱신을 위한 스크립트 추가
COPY certbot-renew.sh /certbot-renew.sh
RUN chmod +x /certbot-renew.sh

CMD ["/bin/sh", "-c", "/certbot-renew.sh & nginx -g 'daemon off;'"]
