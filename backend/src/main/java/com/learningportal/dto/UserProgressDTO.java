package com.learningportal.dto;

import com.learningportal.entity.UserProgress;

import java.time.LocalDateTime;

public class UserProgressDTO {
    
    private Long id;
    private Long moduleId;
    private String moduleName;
    private Integer totalTopics;
    private Integer completedTopics;
    private Integer totalQuestions;
    private Integer completedQuestions;
    private Double completionPercentage;
    private LocalDateTime lastAccessedAt;
    private LocalDateTime startedAt;
    private LocalDateTime completedAt;
    private Boolean isCompleted;
    
    public UserProgressDTO() {
    }
    
    public UserProgressDTO(UserProgress progress) {
        this.id = progress.getId();
        this.moduleId = progress.getModule().getId();
        this.moduleName = progress.getModule().getName();
        this.totalTopics = progress.getTotalTopics();
        this.completedTopics = progress.getCompletedTopics();
        this.totalQuestions = progress.getTotalQuestions();
        this.completedQuestions = progress.getCompletedQuestions();
        this.completionPercentage = progress.getCompletionPercentage();
        this.lastAccessedAt = progress.getLastAccessedAt();
        this.startedAt = progress.getStartedAt();
        this.completedAt = progress.getCompletedAt();
        this.isCompleted = progress.isCompleted();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Long getModuleId() {
        return moduleId;
    }
    
    public void setModuleId(Long moduleId) {
        this.moduleId = moduleId;
    }
    
    public String getModuleName() {
        return moduleName;
    }
    
    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
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
    
    public Double getCompletionPercentage() {
        return completionPercentage;
    }
    
    public void setCompletionPercentage(Double completionPercentage) {
        this.completionPercentage = completionPercentage;
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
    
    public Boolean getIsCompleted() {
        return isCompleted;
    }
    
    public void setIsCompleted(Boolean isCompleted) {
        this.isCompleted = isCompleted;
    }
}
