package com.learningportal.repository;

import com.learningportal.entity.CodeExample;
import com.learningportal.entity.ProgrammingLanguage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CodeExampleRepository extends JpaRepository<CodeExample, Long> {
    
    List<CodeExample> findByTopicId(Long topicId);
    
    List<CodeExample> findByLanguage(ProgrammingLanguage language);
    
    Optional<CodeExample> findByTopicIdAndLanguage(Long topicId, ProgrammingLanguage language);
    
    long countByTopicId(Long topicId);
}
