FROM maven:3.8.5-openjdk-11 AS MAVEN_BUILD
COPY pom.xml /build/
COPY mvnw /build/
COPY .mvn /build/.mvn
COPY src /build/src/
WORKDIR /build/
RUN mvn clean install -Dmaven.test.skip=true

FROM tomcat:jdk11-temurin-jammy
RUN rm -rf /usr/local/tomcat/webapps/*
COPY --from=MAVEN_BUILD /build/target/Maitinimas-0.0.1-SNAPSHOT.war /usr/local/tomcat/webapps/
RUN sh -c 'touch /usr/local/tomcat/webapps/Maitinimas-0.0.1-SNAPSHOT.war'
ENTRYPOINT [ "sh", "-c", "java -jar /usr/local/tomcat/webapps/Maitinimas-0.0.1-SNAPSHOT.war"]