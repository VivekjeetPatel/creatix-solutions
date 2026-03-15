# Build Stage
FROM eclipse-temurin:17-jdk-alpine AS build
WORKDIR /app

# Copy maven executable to the image
COPY mvnw .
COPY .mvn .mvn

# Copy the pom.xml file
COPY pom.xml .

# Download dependencies (this layer is cached)
RUN ./mvnw dependency:go-offline -B

# Copy the project source
COPY src src

# Package the application
RUN ./mvnw package -DskipTests

# Run Stage
FROM eclipse-temurin:17-jre-alpine
WORKDIR /app

# Create a non-root user to run the app
RUN addgroup -S spring && adduser -S spring -G spring
USER spring:spring

# Copy built artifact from build stage
COPY --from=build /app/target/*.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
