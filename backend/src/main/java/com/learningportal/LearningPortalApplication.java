package com.learningportal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/**
 * Main Spring Boot application class for the Learning Portal.
 * 
 * This application provides a comprehensive FAANG interview preparation platform
 * with 10,000+ questions, interactive code execution, and progress tracking.
 */
@SpringBootApplication
@EnableJpaAuditing
public class LearningPortalApplication {

    public static void main(String[] args) {
        SpringApplication.run(LearningPortalApplication.class, args);
    }
}
