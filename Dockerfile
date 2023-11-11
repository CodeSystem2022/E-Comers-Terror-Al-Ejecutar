FROM amazoncorretto:17-alpine-jdk
MAINTAINER Ivandlf
COPY target/ecommerce.jar-0.0.1-SNAPSHOT.jar ecommerce-app.jar

ENTRYPOINT ["java", "-jar", "ecommerce-app.jar"]