package com.learningportal.service;

import com.learningportal.entity.*;
import com.learningportal.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class ProgressTrackingServiceImpl implements ProgressTrackingService {
    
    private final UserProgressRepository userProgressRepository;
    private final TopicProgressRepository topicProgressRepository;
    private final UserRepository userRepository;
    private final LearningModuleRepository moduleRepository;
    private final TopicRepository topicRepository;
    
    public ProgressTrackingServiceImpl(
            UserProgressRepository userProgressRepository,
            TopicProgressRepository topicProgressRepository,
            UserRepository userRepository,
            LearningModuleRepository moduleRepository,
            TopicRepository topicRepository) {
        this.userProgressRepository = userProgressRepository;
        this.topicProgressRepository = topicProgressRepository;
        this.userRepository = userRepository;
        this.moduleRepository = moduleRepository;
        this.topicRepository = topicRepository;
    }
    
    @Override
    public UserProgress getUserProgress(Long userId, Long moduleId) {
        return userProgressRepository.findByUserIdAndModuleId(userId, moduleId)
                .orElseGet(() -> createUserProgress(userId, moduleId));
    }
    
    @Override
    public List<UserProgress> getAllUserProgress(Long userId) {
        return userProgressRepository.findByUserIdOrderByLastAccessedAtDesc(userId);
    }
    
    @Override
    public UserProgress updateModuleProgress(Long userId, Long moduleId) {
        UserProgress progress = getUserProgress(userId, moduleId);
        LearningModule module = moduleRepository.findById(moduleId)
                .orElseThrow(() -> new IllegalArgumentException("Module not found"));
        
        // Count completed topics
        Long completedCount = topicProgressRepository
                .countByUserIdAndTopicModuleIdAndIsCompletedTrue(userId, moduleId);
        
        progress.setCompletedTopics(completedCount.intValue());
        progress.setTotalTopics(module.getTotalTopics());
        progress.setTotalQuestions(module.getTotalQuestions());
        progress.setLastAccessedAt(LocalDateTime.now());
        
        // Mark module as completed if all topics are done
        if (progress.isCompleted()) {
            progress.setCompletedAt(LocalDateTime.now());
        }
        
        return userProgressRepository.save(progress);
    }
    
    @Override
    public TopicProgress getTopicProgress(Long userId, Long topicId) {
        return topicProgressRepository.findByUserIdAndTopicId(userId, topicId)
                .orElseGet(() -> createTopicProgress(userId, topicId));
    }
    
    @Override
    public List<TopicProgress> getModuleTopicsProgress(Long userId, Long moduleId) {
        return topicProgressRepository.findByUserIdAndTopicModuleId(userId, moduleId);
    }
    
    @Override
    public TopicProgress markTopicStarted(Long userId, Long topicId) {
        TopicProgress progress = getTopicProgress(userId, topicId);
        
        if (progress.getStartedAt() == null) {
            progress.setStartedAt(LocalDateTime.now());
        }
        progress.setLastAccessedAt(LocalDateTime.now());
        
        TopicProgress saved = topicProgressRepository.save(progress);
        
        // Update module progress
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new IllegalArgumentException("Topic not found"));
        updateModuleProgress(userId, topic.getModule().getId());
        
        return saved;
    }
    
    @Override
    public TopicProgress markTopicCompleted(Long userId, Long topicId) {
        TopicProgress progress = getTopicProgress(userId, topicId);
        progress.markComplete();
        
        TopicProgress saved = topicProgressRepository.save(progress);
        
        // Update module progress
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new IllegalArgumentException("Topic not found"));
        updateModuleProgress(userId, topic.getModule().getId());
        
        return saved;
    }
    
    @Override
    public TopicProgress updateTopicProgress(Long userId, Long topicId, Double completionPercentage) {
        TopicProgress progress = getTopicProgress(userId, topicId);
        progress.setCompletionPercentage(completionPercentage);
        progress.setLastAccessedAt(LocalDateTime.now());
        
        // Auto-complete if 100%
        if (completionPercentage >= 100.0 && !progress.getIsCompleted()) {
            progress.markComplete();
        }
        
        return topicProgressRepository.save(progress);
    }
    
    @Override
    public TopicProgress updateTimeSpent(Long userId, Long topicId, Integer additionalMinutes) {
        TopicProgress progress = getTopicProgress(userId, topicId);
        progress.setTimeSpentMinutes(progress.getTimeSpentMinutes() + additionalMinutes);
        progress.setLastAccessedAt(LocalDateTime.now());
        
        return topicProgressRepository.save(progress);
    }
    
    @Override
    public TopicProgress updateQuestionStats(Long userId, Long topicId, Integer attempted, Integer correct) {
        TopicProgress progress = getTopicProgress(userId, topicId);
        progress.setQuestionsAttempted(progress.getQuestionsAttempted() + attempted);
        progress.setQuestionsCorrect(progress.getQuestionsCorrect() + correct);
        progress.setLastAccessedAt(LocalDateTime.now());
        
        return topicProgressRepository.save(progress);
    }
    
    // Helper methods
    private UserProgress createUserProgress(Long userId, Long moduleId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        LearningModule module = moduleRepository.findById(moduleId)
                .orElseThrow(() -> new IllegalArgumentException("Module not found"));
        
        UserProgress progress = new UserProgress(user, module);
        progress.setTotalTopics(module.getTotalTopics());
        progress.setTotalQuestions(module.getTotalQuestions());
        
        return userProgressRepository.save(progress);
    }
    
    private TopicProgress createTopicProgress(Long userId, Long topicId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
        Topic topic = topicRepository.findById(topicId)
                .orElseThrow(() -> new IllegalArgumentException("Topic not found"));
        
        return topicProgressRepository.save(new TopicProgress(user, topic));
    }
}
