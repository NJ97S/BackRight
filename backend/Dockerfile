# 1️⃣ Gradle 빌드가 가능한 이미지 사용 (JDK + Gradle)
FROM gradle:8-jdk17 AS build

# 2️⃣ 작업 디렉토리 설정
WORKDIR /app

# 3️⃣ Gradle 캐시 최적화: dependencies 먼저 복사 후 빌드
COPY build.gradle settings.gradle ./
COPY src/main/resources src/main/resources
RUN gradle dependencies --no-daemon

# 4️⃣ 프로젝트 소스 코드 복사 후 빌드
COPY src src
RUN gradle build -x test --no-daemon

# 5️⃣ 배포용 JDK 이미지 사용
FROM openjdk:17-jdk-slim
RUN apt-get update
RUN apt-get install -y libpulse0
RUN apt-get install -y libx11-6
# 6️⃣ 작업 디렉토리 생성
WORKDIR /app

# 7️⃣ 위 단계에서 빌드된 JAR 파일을 복사
COPY --from=build /app/build/libs/*.jar app.jar

# 8️⃣ 컨테이너가 시작될 때 실행할 명령
ENTRYPOINT ["java", "-jar", "/app/app.jar"]
