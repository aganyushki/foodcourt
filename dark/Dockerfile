FROM openjdk:8-jdk-alpine
ARG JAR_FILE=./build/libs/dark.jar
COPY ${JAR_FILE} dark.jar
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/dark.jar"]
