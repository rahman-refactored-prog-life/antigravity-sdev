package com.learningportal.service;

import com.learningportal.entity.TopicProgress;
import com.learningportal.entity.UserProgress;

import java.util.List;

public interface ProgressTrackingService {
    
    // User Progress
    UserProgress getUserProgress(Long userId, Long moduleId);
    
    List<UserProgress> getAllUserProgress(Long userId);
    
    UserProgress updateModuleProgress(Long userId, Long moduleId);
    
    // Topic Progress
    TopicProgress getTopicProgress(Long userId, Long topicId);
    
    List<TopicProgress> getModuleTopicsProgress(Long userId, Long moduleId);
    
    TopicProgress markTopicStarted(Long userId, Long topicId);
    
    TopicProgress markTopicCompleted(Long userId, Long topicId);
    
    TopicProgress updateTopicProgress(Long userId, Long topicId, Double completionPercentage);
    
    TopicProgress updateTimeSpent(Long userId, Long topicId, Integer additionalMinutes);
    
    TopicProgress updateQuestionStats(Long userId, Long topicId, Integer attempted, Integer correct);
}
