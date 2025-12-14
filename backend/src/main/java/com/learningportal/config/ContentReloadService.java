package com.learningportal.config;

import com.learningportal.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service to manage content reloading.
 * Provides methods to clear and reload learning content from files.
 */
@Service
public class ContentReloadService {
    
    private static final Logger logger = LoggerFactory.getLogger(ContentReloadService.class);
    
    private final LearningModuleRepository moduleRepository;
    private final TopicRepository topicRepository;
    private final PracticeQuestionRepository questionRepository;
    private final CodeExampleRepository codeExampleRepository;
    
    public ContentReloadService(LearningModuleRepository moduleRepository,
                                TopicRepository topicRepository,
                                PracticeQuestionRepository questionRepository,
                                CodeExampleRepository codeExampleRepository) {
        this.moduleRepository = moduleRepository;
        this.topicRepository = topicRepository;
        this.questionRepository = questionRepository;
        this.codeExampleRepository = codeExampleRepository;
    }
    
    /**
     * Clear all learning content data.
     * Deletes in correct order to respect foreign key constraints.
     */
    @Transactional
    public void clearAllContent() {
        logger.info("Clearing all learning content...");
        
        try {
            // Delete in correct order (respecting foreign keys)
            long codeExamples = codeExampleRepository.count();
            long questions = questionRepository.count();
            long topics = topicRepository.count();
            long modules = moduleRepository.count();
            
            codeExampleRepository.deleteAll();
            questionRepository.deleteAll();
            topicRepository.deleteAll();
            moduleRepository.deleteAll();
            
            logger.info("Successfully cleared: {} modules, {} topics, {} questions, {} code examples",
                    modules, topics, questions, codeExamples);
        } catch (Exception e) {
            logger.error("Error clearing content: {}", e.getMessage(), e);
            throw e;
        }
    }
    
    /**
     * Check if content needs to be reloaded.
     * Returns true if database is empty or content has changed.
     */
    public boolean needsReload() {
        return moduleRepository.count() == 0;
    }
}
