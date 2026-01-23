FROM eclipse-temurin:17-jre

WORKDIR /app

COPY target/*.jar /app/reservations-system.jar

EXPOSE 8087

CMD ["java", "-jar", "/app/reservations-system.jar"]
