package com.learningportal.service;

import com.learningportal.entity.DifficultyLevel;
import com.learningportal.entity.LearningModule;
import com.learningportal.entity.ModuleType;
import com.learningportal.entity.Topic;
import com.learningportal.repository.LearningModuleRepository;
import com.learningportal.repository.TopicRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;

/**
 * Service to load learning content from markdown files into the database.
 * Runs on application startup and loads content if not already present.
 */
@Service
public class ContentLoaderService implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(ContentLoaderService.class);

    private final LearningModuleRepository moduleRepository;
    private final TopicRepository topicRepository;

    public ContentLoaderService(LearningModuleRepository moduleRepository,
                                TopicRepository topicRepository) {
        this.moduleRepository = moduleRepository;
        this.topicRepository = topicRepository;
    }

    @Override
    @Transactional
    public void run(String... args) throws Exception {
        // Skip if content already loaded
        if (topicRepository.count() > 0) {
            logger.info("Content already loaded. Skipping initialization.");
            return;
        }
        
        logger.info("Starting content loading process...");

        // Load Java module and topics
        loadJavaContent();

        logger.info("Content loading completed successfully!");
    }

    private void loadJavaContent() {
        // Create or get Java module
        LearningModule javaModule = moduleRepository.findByName("Java Fundamentals")
                .orElseGet(() -> {
                    LearningModule module = new LearningModule();
                    module.setName("Java Fundamentals");
                    module.setDescription("Complete Java programming from basics to advanced concepts");
                    module.setType(ModuleType.JAVA);
                    module.setOrderIndex(1);
                    return moduleRepository.save(module);
                });

        logger.info("Java module loaded: {}", javaModule.getName());

        // Load Variables and Data Types topic
        loadTopic(
                javaModule,
                "Variables and Data Types",
                "Learn about Java variables, primitive types, and type conversion",
                "content/java/01-variables-and-data-types.md",
                1,
                DifficultyLevel.BEGINNER,
                180 // 3 hours estimated
        );
    }

    private void loadTopic(LearningModule module, String title, String description,
                           String contentFilePath, int orderIndex,
                           DifficultyLevel difficulty, int estimatedMinutes) {
        // Check if topic already exists
        Optional<Topic> existingTopic = topicRepository.findByModuleAndTitle(module, title);
        if (existingTopic.isPresent()) {
            logger.info("Topic already exists: {}", title);
            return;
        }

        try {
            // Read content from file
            String content = readContentFile(contentFilePath);

            // Create topic
            Topic topic = new Topic();
            topic.setModule(module);
            topic.setTitle(title);
            topic.setDescription(description);
            topic.setContent(content);
            topic.setOrderIndex(orderIndex);
            topic.setDifficulty(difficulty);
            topic.setEstimatedMinutes(estimatedMinutes);
            topic.setPublished(true);

            // Count questions and examples from content
            topic.setTotalPracticeQuestions(countOccurrences(content, "#### Exercise"));
            topic.setTotalInterviewQuestions(countOccurrences(content, "#### Question"));

            topicRepository.save(topic);
            logger.info("Loaded topic: {} ({} chars)", title, content.length());

        } catch (IOException e) {
            logger.error("Failed to load content for topic: {}", title, e);
        }
    }

    private String readContentFile(String filePath) throws IOException {
        // Try to read from project root first (for development)
        Path projectPath = Paths.get(filePath);
        if (Files.exists(projectPath)) {
            logger.info("Reading content from project path: {}", projectPath);
            return Files.readString(projectPath, StandardCharsets.UTF_8);
        }

        // Try to read from classpath (for packaged JAR)
        try {
            Resource resource = new ClassPathResource(filePath);
            if (resource.exists()) {
                logger.info("Reading content from classpath: {}", filePath);
                return new String(resource.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
            }
        } catch (IOException e) {
            logger.warn("Could not read from classpath: {}", filePath);
        }

        throw new IOException("Content file not found: " + filePath);
    }

    private int countOccurrences(String text, String substring) {
        if (text == null || substring == null || text.isEmpty() || substring.isEmpty()) {
            return 0;
        }
        int count = 0;
        int index = 0;
        while ((index = text.indexOf(substring, index)) != -1) {
            count++;
            index += substring.length();
        }
        return count;
    }
}
