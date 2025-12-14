package com.learningportal.dto;

import com.learningportal.entity.DifficultyLevel;

public class TopicDTO {
    
    private Long id;
    private String title;
    private String description;
    private String content;
    private DifficultyLevel difficulty;
    private Integer orderIndex;
    private Integer estimatedMinutes;
    private Long moduleId;
    private String moduleName;
    private Long questionCount;
    private Long codeExampleCount;
    
    // Constructors
    public TopicDTO() {
    }
    
    public TopicDTO(Long id, String title, String description, DifficultyLevel difficulty, Integer orderIndex) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.difficulty = difficulty;
        this.orderIndex = orderIndex;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getTitle() {
        return title;
    }
    
    public void setTitle(String title) {
        this.title = title;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public String getContent() {
        return content;
    }
    
    public void setContent(String content) {
        this.content = content;
    }
    
    public DifficultyLevel getDifficulty() {
        return difficulty;
    }
    
    public void setDifficulty(DifficultyLevel difficulty) {
        this.difficulty = difficulty;
    }
    
    public Integer getOrderIndex() {
        return orderIndex;
    }
    
    public void setOrderIndex(Integer orderIndex) {
        this.orderIndex = orderIndex;
    }
    
    public Integer getEstimatedMinutes() {
        return estimatedMinutes;
    }
    
    public void setEstimatedMinutes(Integer estimatedMinutes) {
        this.estimatedMinutes = estimatedMinutes;
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
    
    public Long getQuestionCount() {
        return questionCount;
    }
    
    public void setQuestionCount(Long questionCount) {
        this.questionCount = questionCount;
    }
    
    public Long getCodeExampleCount() {
        return codeExampleCount;
    }
    
    public void setCodeExampleCount(Long codeExampleCount) {
        this.codeExampleCount = codeExampleCount;
    }
}
