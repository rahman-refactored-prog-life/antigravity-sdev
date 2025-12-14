package com.learningportal.repository;

import com.learningportal.entity.DifficultyLevel;
import com.learningportal.entity.Topic;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TopicRepository extends JpaRepository<Topic, Long> {
    
    List<Topic> findByModuleIdOrderByOrderIndexAsc(Long moduleId);
    
    Page<Topic> findByModuleId(Long moduleId, Pageable pageable);
    
    Optional<Topic> findByModuleIdAndTitle(Long moduleId, String title);
    
    @Query("SELECT t FROM Topic t WHERE t.module = :module AND t.title = :title")
    Optional<Topic> findByModuleAndTitle(@Param("module") com.learningportal.entity.LearningModule module, 
                                         @Param("title") String title);
    
    List<Topic> findByDifficulty(DifficultyLevel difficulty);
    
    @Query("SELECT t FROM Topic t WHERE t.module.id = :moduleId AND " +
           "(LOWER(t.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(t.description) LIKE LOWER(CONCAT('%', :searchTerm, '%')))")
    Page<Topic> searchTopicsByModule(@Param("moduleId") Long moduleId, 
                                      @Param("searchTerm") String searchTerm, 
                                      Pageable pageable);
    
    long countByModuleId(Long moduleId);
}
