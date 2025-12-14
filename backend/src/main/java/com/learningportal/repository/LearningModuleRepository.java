package com.learningportal.repository;

import com.learningportal.entity.LearningModule;
import com.learningportal.entity.ModuleType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LearningModuleRepository extends JpaRepository<LearningModule, Long> {
    
    Optional<LearningModule> findByName(String name);
    
    List<LearningModule> findByType(ModuleType type);
    
    List<LearningModule> findAllByOrderByOrderIndexAsc();
    
    boolean existsByName(String name);
}
