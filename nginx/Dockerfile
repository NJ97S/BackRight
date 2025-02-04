# nginx/Dockerfile
FROM nginx:alpine

# Nginx reverse proxy 설정 파일 복사
COPY default.conf /etc/nginx/conf.d/default.conf

# TLS 인증서 파일들을 컨테이너 이미지로 포함하거나, 실행 시 volume 마운트도 가능합니다.
# COPY certs /etc/nginx/certs

EXPOSE 80
# (옵션) 만약 포트 80도 노출하고 싶다면, default.conf에 관련 설정을 추가 후 EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
