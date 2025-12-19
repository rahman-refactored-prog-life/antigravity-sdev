package com.learningportal.dto;

import com.learningportal.entity.QuestionType;

public class PracticeQuestionDTO {

    private Long id;
    private String title;
    private String description;
    private QuestionType type;
    private Long topicId;

    public PracticeQuestionDTO() {
    }

    public PracticeQuestionDTO(Long id, String title, String description, QuestionType type, Long topicId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.type = type;
        this.topicId = topicId;
    }

    // Getters and setters

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

    public QuestionType getType() {
        return type;
    }

    public void setType(QuestionType type) {
        this.type = type;
    }

    public Long getTopicId() {
        return topicId;
    }

    public void setTopicId(Long topicId) {
        this.topicId = topicId;
    }
}
