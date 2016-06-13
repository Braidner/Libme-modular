FROM frolvlad/alpine-oraclejdk8:slim
VOLUME /tmp
ADD /target/torrent-service.jar app.jar
RUN sh -c 'touch /app.jar'
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app.jar"]
EXPOSE 8761