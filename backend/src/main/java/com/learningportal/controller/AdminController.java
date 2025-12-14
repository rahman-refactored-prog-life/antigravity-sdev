package com.learningportal.controller;

import com.learningportal.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * Admin controller for database management operations.
 * WARNING: These endpoints should be secured in production!
 */
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    
    private static final Logger logger = LoggerFactory.getLogger(AdminController.class);
    
    private final LearningModuleRepository moduleRepository;
    private final TopicRepository topicRepository;
    private final PracticeQuestionRepository questionRepository;
    private final CodeExampleRepository codeExampleRepository;
    private final TopicProgressRepository topicProgressRepository;
    private final UserProgressRepository userProgressRepository;
    
    public AdminController(LearningModuleRepository moduleRepository,
                          TopicRepository topicRepository,
                          PracticeQuestionRepository questionRepository,
                          CodeExampleRepository codeExampleRepository,
                          TopicProgressRepository topicProgressRepository,
                          UserProgressRepository userProgressRepository) {
        this.moduleRepository = moduleRepository;
        this.topicRepository = topicRepository;
        this.questionRepository = questionRepository;
        this.codeExampleRepository = codeExampleRepository;
        this.topicProgressRepository = topicProgressRepository;
        this.userProgressRepository = userProgressRepository;
    }
    
    /**
     * Clear all learning content data.
     * Call this endpoint, then restart the application to reload content.
     * 
     * POST http://localhost:2025/api/admin/clear-content
     */
    @PostMapping("/clear-content")
    @Transactional
    public ResponseEntity<Map<String, Object>> clearContent() {
        logger.info("Admin: Clearing all learning content...");
        
        Map<String, Object> response = new HashMap<>();
        
        try {
            // Count before deletion
            long modulesCount = moduleRepository.count();
            long topicsCount = topicRepository.count();
            long questionsCount = questionRepository.count();
            long codeExamplesCount = codeExampleRepository.count();
            long topicProgressCount = topicProgressRepository.count();
            long userProgressCount = userProgressRepository.count();
            
            // Delete in correct order (respecting foreign keys)
            codeExampleRepository.deleteAll();
            questionRepository.deleteAll();
            topicProgressRepository.deleteAll();
            topicRepository.deleteAll();
            userProgressRepository.deleteAll();
            moduleRepository.deleteAll();
            
            response.put("success", true);
            response.put("message", "Learning content cleared successfully");
            response.put("deleted", Map.of(
                "modules", modulesCount,
                "topics", topicsCount,
                "questions", questionsCount,
                "codeExamples", codeExamplesCount,
                "topicProgress", topicProgressCount,
                "userProgress", userProgressCount
            ));
            response.put("nextStep", "Restart the application to reload content from content/java/ directory");
            
            logger.info("Successfully cleared: {} modules, {} topics, {} questions, {} code examples",
                    modulesCount, topicsCount, questionsCount, codeExamplesCount);
            
            return ResponseEntity.ok(response);
            
        } catch (Exception e) {
            logger.error("Error clearing content: {}", e.getMessage(), e);
            response.put("success", false);
            response.put("error", e.getMessage());
            return ResponseEntity.internalServerError().body(response);
        }
    }
    
    /**
     * Get current database statistics.
     * 
     * GET http://localhost:2025/api/admin/stats
     */
    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        
        stats.put("modules", moduleRepository.count());
        stats.put("topics", topicRepository.count());
        stats.put("questions", questionRepository.count());
        stats.put("codeExamples", codeExampleRepository.count());
        stats.put("topicProgress", topicProgressRepository.count());
        stats.put("userProgress", userProgressRepository.count());
        
        return ResponseEntity.ok(stats);
    }
}
