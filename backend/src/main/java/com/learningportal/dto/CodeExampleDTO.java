package com.learningportal.dto;

import com.learningportal.entity.ProgrammingLanguage;

public class CodeExampleDTO {

    private Long id;
    private String title;
    private String description;
    private ProgrammingLanguage language;
    private String code;
    private Long topicId;

    public CodeExampleDTO() {
    }

    public CodeExampleDTO(Long id, String title, String description, ProgrammingLanguage language, String code, Long topicId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.language = language;
        this.code = code;
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

    public Long getTopicId() {
        return topicId;
    }

    public void setTopicId(Long topicId) {
        this.topicId = topicId;
    }
}
