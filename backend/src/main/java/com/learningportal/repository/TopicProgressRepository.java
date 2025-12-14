package com.learningportal.repository;

import com.learningportal.entity.TopicProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TopicProgressRepository extends JpaRepository<TopicProgress, Long> {
    
    Optional<TopicProgress> findByUserIdAndTopicId(Long userId, Long topicId);
    
    List<TopicProgress> findByUserId(Long userId);
    
    List<TopicProgress> findByUserIdAndTopicModuleId(Long userId, Long moduleId);
    
    List<TopicProgress> findByUserIdAndIsCompletedTrue(Long userId);
    
    Long countByUserIdAndTopicModuleIdAndIsCompletedTrue(Long userId, Long moduleId);
}
