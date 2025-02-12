FROM nginx:alpine

WORKDIR /etc/nginx

# Certbot 및 OpenSSL 설치
RUN apk add --no-cache certbot certbot-nginx openssl

COPY default.conf /etc/nginx/conf.d/default.conf
COPY certbot-renew.sh /certbot-renew.sh

RUN chmod +x /certbot-renew.sh

CMD ["/bin/sh", "-c", "/certbot-renew.sh"]