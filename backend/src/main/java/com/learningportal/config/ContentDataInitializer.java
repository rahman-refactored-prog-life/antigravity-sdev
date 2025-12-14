package com.learningportal.config;

import com.learningportal.entity.*;
import com.learningportal.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.stream.Stream;

/**
 * Content data initializer for Phase 2+.
 * Loads learning content from markdown files in content/ directory.
 * This replaces SampleDataInitializer for production content.
 */
@Component
@Order(2) // Run after SampleDataInitializer if both exist
public class ContentDataInitializer implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(ContentDataInitializer.class);

    private final LearningModuleRepository moduleRepository;
    private final TopicRepository topicRepository;

    public ContentDataInitializer(LearningModuleRepository moduleRepository,
            TopicRepository topicRepository) {
        this.moduleRepository = moduleRepository;
        this.topicRepository = topicRepository;
    }

    @Override
    @Transactional
    public void run(String... args) {
        // Always check content to allow incremental updates
        // if (topicRepository.count() > 0) { ... }

        logger.info("Loading content from markdown files...");

        try {
            loadJavaContent();
            logger.info("Content loading complete!");
        } catch (Exception e) {
            logger.error("Error loading content: {}", e.getMessage(), e);
        }
    }

    private void loadJavaContent() {
        // Get or create Java module
        List<LearningModule> existingModules = moduleRepository.findByType(ModuleType.JAVA);
        final LearningModule javaModule;

        if (!existingModules.isEmpty()) {
            javaModule = existingModules.get(0);
        } else {
            LearningModule newModule = new LearningModule();
            newModule.setName("Java Programming");
            newModule.setDescription("Master Java programming from fundamentals to advanced concepts");
            newModule.setType(ModuleType.JAVA);
            newModule.setOrderIndex(1);
            javaModule = moduleRepository.save(newModule);
        }

        // Load all Java topic files from content/java/
        Path javaContentDir = Paths.get("content/java");
        if (!Files.exists(javaContentDir)) {
            javaContentDir = Paths.get("../content/java");
        }

        if (!Files.exists(javaContentDir)) {
            logger.warn("Java content directory not found: content/java/");
            return;
        }

        try (Stream<Path> files = Files.list(javaContentDir)) {
            files.filter(path -> path.toString().endsWith(".md"))
                    .sorted()
                    .forEach(path -> loadTopicFromFile(javaModule, path));
        } catch (Exception e) {
            logger.error("Error reading content directory: {}", e.getMessage());
        }
    }

    private void loadTopicFromFile(LearningModule module, Path filePath) {
        try {
            String content = Files.readString(filePath);
            String fileName = filePath.getFileName().toString();

            // Extract topic info from content
            String title = extractTitle(content, fileName);
            String description = extractDescription(content);
            DifficultyLevel difficulty = extractDifficulty(content);
            int estimatedMinutes = extractEstimatedTime(content);

            // Create topic
            Topic topic = new Topic();
            topic.setModule(module);
            topic.setTitle(title);
            topic.setDescription(description);
            topic.setDifficulty(difficulty);
            topic.setEstimatedMinutes(estimatedMinutes);
            topic.setContent(content);
            topic.setOrderIndex(extractOrderIndex(fileName));
            topic.setPublished(true);

            // Check if topic already exists
            if (topicRepository.findByModuleAndTitle(module, title).isPresent()) {
                logger.info("Topic already exists: {}", title);
                return;
            }

            topicRepository.save(topic);
            logger.info("Loaded topic: {} ({} lines)", title, content.lines().count());

        } catch (Exception e) {
            logger.error("Error loading topic from {}: {}", filePath, e.getMessage());
        }
    }

    private String extractTitle(String content, String fileName) {
        // Try to extract from first # heading
        return content.lines()
                .filter(line -> line.startsWith("# "))
                .findFirst()
                .map(line -> line.substring(2).split(" - ")[0].trim())
                .orElse(fileName.replace(".md", "").replace("-", " "));
    }

    private String extractDescription(String content) {
        // Look for description in metadata or use first paragraph
        return content.lines()
                .filter(line -> !line.trim().isEmpty() && !line.startsWith("#"))
                .findFirst()
                .orElse("Learn about this Java topic");
    }

    private DifficultyLevel extractDifficulty(String content) {
        String lowerContent = content.toLowerCase();
        if (lowerContent.contains("difficulty**: beginner") || lowerContent.contains("difficulty: beginner")) {
            return DifficultyLevel.BEGINNER;
        } else if (lowerContent.contains("difficulty**: intermediate")
                || lowerContent.contains("difficulty: intermediate")) {
            return DifficultyLevel.INTERMEDIATE;
        } else if (lowerContent.contains("difficulty**: advanced") || lowerContent.contains("difficulty: advanced")) {
            return DifficultyLevel.ADVANCED;
        }
        return DifficultyLevel.BEGINNER; // Default
    }

    private int extractEstimatedTime(String content) {
        // Look for "Estimated Time: X hours" or similar
        return content.lines()
                .filter(line -> line.toLowerCase().contains("estimated time"))
                .findFirst()
                .map(line -> {
                    if (line.contains("2-3 hours"))
                        return 180;
                    if (line.contains("3-4 hours"))
                        return 240;
                    if (line.contains("1-2 hours"))
                        return 120;
                    return 180; // Default 3 hours
                })
                .orElse(180);
    }

    private int extractOrderIndex(String fileName) {
        // Extract number from filename like "01-variables.md" -> 1
        try {
            String number = fileName.split("-")[0];
            return Integer.parseInt(number);
        } catch (Exception e) {
            return 999; // Put at end if can't parse
        }
    }
}
