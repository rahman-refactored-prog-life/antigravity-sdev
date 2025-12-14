package com.learningportal.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "user_progress")
public class UserProgress extends BaseEntity {
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "module_id", nullable = false)
    private LearningModule module;
    
    @Column(name = "total_topics")
    private Integer totalTopics = 0;
    
    @Column(name = "completed_topics")
    private Integer completedTopics = 0;
    
    @Column(name = "total_questions")
    private Integer totalQuestions = 0;
    
    @Column(name = "completed_questions")
    private Integer completedQuestions = 0;
    
    @Column(name = "last_accessed_at")
    private LocalDateTime lastAccessedAt;
    
    @Column(name = "started_at")
    private LocalDateTime startedAt;
    
    @Column(name = "completed_at")
    private LocalDateTime completedAt;
    
    // Constructors
    public UserProgress() {
    }
    
    public UserProgress(User user, LearningModule module) {
        this.user = user;
        this.module = module;
        this.startedAt = LocalDateTime.now();
        this.lastAccessedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public User getUser() {
        return user;
    }
    
    public void setUser(User user) {
        this.user = user;
    }
    
    public LearningModule getModule() {
        return module;
    }
    
    public void setModule(LearningModule module) {
        this.module = module;
    }
    
    public Integer getTotalTopics() {
        return totalTopics;
    }
    
    public void setTotalTopics(Integer totalTopics) {
        this.totalTopics = totalTopics;
    }
    
    public Integer getCompletedTopics() {
        return completedTopics;
    }
    
    public void setCompletedTopics(Integer completedTopics) {
        this.completedTopics = completedTopics;
    }
    
    public Integer getTotalQuestions() {
        return totalQuestions;
    }
    
    public void setTotalQuestions(Integer totalQuestions) {
        this.totalQuestions = totalQuestions;
    }
    
    public Integer getCompletedQuestions() {
        return completedQuestions;
    }
    
    public void setCompletedQuestions(Integer completedQuestions) {
        this.completedQuestions = completedQuestions;
    }
    
    public LocalDateTime getLastAccessedAt() {
        return lastAccessedAt;
    }
    
    public void setLastAccessedAt(LocalDateTime lastAccessedAt) {
        this.lastAccessedAt = lastAccessedAt;
    }
    
    public LocalDateTime getStartedAt() {
        return startedAt;
    }
    
    public void setStartedAt(LocalDateTime startedAt) {
        this.startedAt = startedAt;
    }
    
    public LocalDateTime getCompletedAt() {
        return completedAt;
    }
    
    public void setCompletedAt(LocalDateTime completedAt) {
        this.completedAt = completedAt;
    }
    
    // Helper methods
    public double getCompletionPercentage() {
        if (totalTopics == null || totalTopics == 0) {
            return 0.0;
        }
        return (completedTopics * 100.0) / totalTopics;
    }
    
    public boolean isCompleted() {
        return completedTopics != null && totalTopics != null && 
               completedTopics.equals(totalTopics) && totalTopics > 0;
    }
}
