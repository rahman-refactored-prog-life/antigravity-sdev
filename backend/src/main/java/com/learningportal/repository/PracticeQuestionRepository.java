package com.learningportal.repository;

import com.learningportal.entity.DifficultyLevel;
import com.learningportal.entity.PracticeQuestion;
import com.learningportal.entity.QuestionType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PracticeQuestionRepository extends JpaRepository<PracticeQuestion, Long> {
    
    List<PracticeQuestion> findByTopicIdOrderByOrderIndexAsc(Long topicId);
    
    Page<PracticeQuestion> findByTopicId(Long topicId, Pageable pageable);
    
    List<PracticeQuestion> findByDifficulty(DifficultyLevel difficulty);
    
    List<PracticeQuestion> findByType(QuestionType type);
    
    List<PracticeQuestion> findByTopicIdAndType(Long topicId, QuestionType type);
    
    long countByTopicId(Long topicId);
}
