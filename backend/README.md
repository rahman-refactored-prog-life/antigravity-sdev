# Learning Portal - Backend

## Overview
Spring Boot 3.2.0 backend for the Comprehensive FAANG Interview Preparation Platform.

## Tech Stack
- **Java**: 21
- **Spring Boot**: 3.2.0
- **Database**: PostgreSQL 18
- **Build Tool**: Maven
- **No Lombok**: Plain Java with explicit getters/setters
- **No H2**: PostgreSQL only

## Prerequisites
- Java 21
- Maven 3.9+
- PostgreSQL 18
- Database: `learning-portal`

## Database Configuration
Update `src/main/resources/application.yml` with your PostgreSQL password:
```yaml
spring:
  datasource:
    password: your_postgres_password
```

Or set environment variable:
```bash
export DB_PASSWORD=your_postgres_password
```

## Build and Run

### Build
```bash
mvn clean install
```

### Run
```bash
mvn spring-boot:run
```

### Test
```bash
mvn test
```

## API Documentation
Once running, access Swagger UI at:
- http://localhost:8080/swagger-ui.html

## Health Check
- http://localhost:8080/actuator/health

## Project Structure
```
backend/
├── src/main/java/com/learningportal/
│   ├── LearningPortalApplication.java
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── entity/
│   ├── dto/
│   ├── config/
│   ├── security/
│   ├── exception/
│   └── util/
├── src/main/resources/
│   └── application.yml
└── pom.xml
```

## Next Steps
- Implement User entity and authentication
- Create REST controllers
- Add business logic services
- Implement security configuration
