package com.learningportal.dto;

import com.learningportal.entity.ModuleType;

public class LearningModuleDTO {
    
    private Long id;
    private String name;
    private String description;
    private ModuleType type;
    private Integer orderIndex;
    private Long topicCount;
    
    // Constructors
    public LearningModuleDTO() {
    }
    
    public LearningModuleDTO(Long id, String name, String description, ModuleType type, Integer orderIndex) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.orderIndex = orderIndex;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getDescription() {
        return description;
    }
    
    public void setDescription(String description) {
        this.description = description;
    }
    
    public ModuleType getType() {
        return type;
    }
    
    public void setType(ModuleType type) {
        this.type = type;
    }
    
    public Integer getOrderIndex() {
        return orderIndex;
    }
    
    public void setOrderIndex(Integer orderIndex) {
        this.orderIndex = orderIndex;
    }
    
    public Long getTopicCount() {
        return topicCount;
    }
    
    public void setTopicCount(Long topicCount) {
        this.topicCount = topicCount;
    }
}
