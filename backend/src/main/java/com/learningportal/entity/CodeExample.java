package com.learningportal.entity;

import jakarta.persistence.*;

/**
 * Entity representing a code example in multiple languages.
 * Part of Layer 4 (Code) in Content_Methodology_v3_Framework.
 * Each topic must have code examples in all 5 languages: Java, Python, JavaScript, C++, Go.
 */
@Entity
@Table(name = "code_examples")
public class CodeExample extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id", nullable = false)
    private Topic topic;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(length = 500)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private ProgrammingLanguage language;

    @Column(name = "code", columnDefinition = "TEXT", nullable = false)
    private String code;

    @Column(name = "explanation", columnDefinition = "TEXT")
    private String explanation; // Line-by-line explanation

    @Column(name = "time_complexity", length = 50)
    private String timeComplexity;

    @Column(name = "space_complexity", length = 50)
    private String spaceComplexity;

    @Column(name = "order_index", nullable = false)
    private Integer orderIndex;

    @Column(name = "is_production_version")
    private Boolean isProductionVersion = false; // false = learning version, true = production version

    // Constructors
    public CodeExample() {
    }

    public CodeExample(String title, ProgrammingLanguage language, String code, Integer orderIndex) {
        this.title = title;
        this.language = language;
        this.code = code;
        this.orderIndex = orderIndex;
    }

    // Getters and Setters
    public Topic getTopic() {
        return topic;
    }

    public void setTopic(Topic topic) {
        this.topic = topic;
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

    public ProgrammingLanguage getLanguage() {
        return language;
    }

    public void setLanguage(ProgrammingLanguage language) {
        this.language = language;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getExplanation() {
        return explanation;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }

    public String getTimeComplexity() {
        return timeComplexity;
    }

    public void setTimeComplexity(String timeComplexity) {
        this.timeComplexity = timeComplexity;
    }

    public String getSpaceComplexity() {
        return spaceComplexity;
    }

    public void setSpaceComplexity(String spaceComplexity) {
        this.spaceComplexity = spaceComplexity;
    }

    public Integer getOrderIndex() {
        return orderIndex;
    }

    public void setOrderIndex(Integer orderIndex) {
        this.orderIndex = orderIndex;
    }

    public Boolean getIsProductionVersion() {
        return isProductionVersion;
    }

    public void setIsProductionVersion(Boolean isProductionVersion) {
        this.isProductionVersion = isProductionVersion;
    }
}
