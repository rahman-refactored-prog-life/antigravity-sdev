package com.learningportal.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Entity representing a learning module (e.g., Java, Data Structures, Algorithms).
 * Each module contains multiple topics and tracks overall progress.
 */
@Entity
@Table(name = "learning_modules")
public class LearningModule extends BaseEntity {

    @Column(nullable = false, unique = true, length = 100)
    private String name;

    @Column(length = 500)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private ModuleType type;

    @Column(name = "order_index", nullable = false)
    private Integer orderIndex;

    @Column(name = "estimated_hours")
    private Integer estimatedHours;

    @Column(name = "total_topics")
    private Integer totalTopics;

    @Column(name = "total_questions")
    private Integer totalQuestions;

    @Column(name = "icon_url", length = 255)
    private String iconUrl;

    @Column(nullable = false)
    private Boolean published = false;

    @OneToMany(mappedBy = "module", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Topic> topics = new ArrayList<>();

    // Constructors
    public LearningModule() {
    }

    public LearningModule(String name, String description, ModuleType type, Integer orderIndex) {
        this.name = name;
        this.description = description;
        this.type = type;
        this.orderIndex = orderIndex;
    }

    // Getters and Setters

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

    public Integer getEstimatedHours() {
        return estimatedHours;
    }

    public void setEstimatedHours(Integer estimatedHours) {
        this.estimatedHours = estimatedHours;
    }

    public Integer getTotalTopics() {
        return totalTopics;
    }

    public void setTotalTopics(Integer totalTopics) {
        this.totalTopics = totalTopics;
    }

    public Integer getTotalQuestions() {
        return totalQuestions;
    }

    public void setTotalQuestions(Integer totalQuestions) {
        this.totalQuestions = totalQuestions;
    }

    public String getIconUrl() {
        return iconUrl;
    }

    public void setIconUrl(String iconUrl) {
        this.iconUrl = iconUrl;
    }

    public Boolean getPublished() {
        return published;
    }

    public void setPublished(Boolean published) {
        this.published = published;
    }

    public List<Topic> getTopics() {
        return topics;
    }

    public void setTopics(List<Topic> topics) {
        this.topics = topics;
    }

    // Helper methods
    public void addTopic(Topic topic) {
        topics.add(topic);
        topic.setModule(this);
    }

    public void removeTopic(Topic topic) {
        topics.remove(topic);
        topic.setModule(null);
    }
}
