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

        @org.springframework.data.jpa.repository.Query("SELECT q FROM PracticeQuestion q WHERE " +
                        "(:type IS NULL OR q.type = :type) AND " +
                        "(:difficulty IS NULL OR q.difficulty = :difficulty) AND " +
                        "(:search IS NULL OR LOWER(q.title) LIKE LOWER(CONCAT('%', :search, '%')))")
        Page<PracticeQuestion> searchQuestions(
                        @org.springframework.data.repository.query.Param("type") QuestionType type,
                        @org.springframework.data.repository.query.Param("difficulty") DifficultyLevel difficulty,
                        @org.springframework.data.repository.query.Param("search") String search,
                        Pageable pageable);
}
