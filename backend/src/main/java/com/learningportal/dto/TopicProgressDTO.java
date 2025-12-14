package com.learningportal.dto;

import com.learningportal.entity.TopicProgress;

import java.time.LocalDateTime;

public class TopicProgressDTO {
    
    private Long id;
    private Long topicId;
    private String topicTitle;
    private Boolean isCompleted;
    private Double completionPercentage;
    private Integer timeSpentMinutes;
    private Integer questionsAttempted;
    private Integer questionsCorrect;
    private Double accuracyPercentage;
    private LocalDateTime lastAccessedAt;
    private LocalDateTime startedAt;
    private LocalDateTime completedAt;
    private String notes;
    
    public TopicProgressDTO() {
    }
    
    public TopicProgressDTO(TopicProgress progress) {
        this.id = progress.getId();
        this.topicId = progress.getTopic().getId();
        this.topicTitle = progress.getTopic().getTitle();
        this.isCompleted = progress.getIsCompleted();
        this.completionPercentage = progress.getCompletionPercentage();
        this.timeSpentMinutes = progress.getTimeSpentMinutes();
        this.questionsAttempted = progress.getQuestionsAttempted();
        this.questionsCorrect = progress.getQuestionsCorrect();
        this.accuracyPercentage = progress.getAccuracyPercentage();
        this.lastAccessedAt = progress.getLastAccessedAt();
        this.startedAt = progress.getStartedAt();
        this.completedAt = progress.getCompletedAt();
        this.notes = progress.getNotes();
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public Long getTopicId() {
        return topicId;
    }
    
    public void setTopicId(Long topicId) {
        this.topicId = topicId;
    }
    
    public String getTopicTitle() {
        return topicTitle;
    }
    
    public void setTopicTitle(String topicTitle) {
        this.topicTitle = topicTitle;
    }
    
    public Boolean getIsCompleted() {
        return isCompleted;
    }
    
    public void setIsCompleted(Boolean isCompleted) {
        this.isCompleted = isCompleted;
    }
    
    public Double getCompletionPercentage() {
        return completionPercentage;
    }
    
    public void setCompletionPercentage(Double completionPercentage) {
        this.completionPercentage = completionPercentage;
    }
    
    public Integer getTimeSpentMinutes() {
        return timeSpentMinutes;
    }
    
    public void setTimeSpentMinutes(Integer timeSpentMinutes) {
        this.timeSpentMinutes = timeSpentMinutes;
    }
    
    public Integer getQuestionsAttempted() {
        return questionsAttempted;
    }
    
    public void setQuestionsAttempted(Integer questionsAttempted) {
        this.questionsAttempted = questionsAttempted;
    }
    
    public Integer getQuestionsCorrect() {
        return questionsCorrect;
    }
    
    public void setQuestionsCorrect(Integer questionsCorrect) {
        this.questionsCorrect = questionsCorrect;
    }
    
    public Double getAccuracyPercentage() {
        return accuracyPercentage;
    }
    
    public void setAccuracyPercentage(Double accuracyPercentage) {
        this.accuracyPercentage = accuracyPercentage;
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
    
    public String getNotes() {
        return notes;
    }
    
    public void setNotes(String notes) {
        this.notes = notes;
    }
}
