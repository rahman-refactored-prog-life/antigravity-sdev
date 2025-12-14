package com.learningportal.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Entity representing a topic within a learning module.
 * Contains educational content following Content_Methodology_v3_Framework (10 layers).
 */
@Entity
@Table(name = "topics")
public class Topic extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "module_id", nullable = false)
    private LearningModule module;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(length = 500)
    private String description;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content; // Markdown content following Content_Methodology_v3_Framework

    @Column(name = "order_index", nullable = false)
    private Integer orderIndex;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private DifficultyLevel difficulty;

    @Column(name = "estimated_minutes")
    private Integer estimatedMinutes;

    @Column(name = "total_practice_questions")
    private Integer totalPracticeQuestions;

    @Column(name = "total_interview_questions")
    private Integer totalInterviewQuestions;

    @Column(nullable = false)
    private Boolean published = false;

    @OneToMany(mappedBy = "topic", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<PracticeQuestion> practiceQuestions = new ArrayList<>();

    @OneToMany(mappedBy = "topic", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CodeExample> codeExamples = new ArrayList<>();

    // Constructors
    public Topic() {
    }

    public Topic(String title, String description, Integer orderIndex, DifficultyLevel difficulty) {
        this.title = title;
        this.description = description;
        this.orderIndex = orderIndex;
        this.difficulty = difficulty;
    }

    // Getters and Setters
    public LearningModule getModule() {
        return module;
    }

    public void setModule(LearningModule module) {
        this.module = module;
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

    public Integer getOrderIndex() {
        return orderIndex;
    }

    public void setOrderIndex(Integer orderIndex) {
        this.orderIndex = orderIndex;
    }

    public DifficultyLevel getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(DifficultyLevel difficulty) {
        this.difficulty = difficulty;
    }

    public Integer getEstimatedMinutes() {
        return estimatedMinutes;
    }

    public void setEstimatedMinutes(Integer estimatedMinutes) {
        this.estimatedMinutes = estimatedMinutes;
    }

    public Integer getTotalPracticeQuestions() {
        return totalPracticeQuestions;
    }

    public void setTotalPracticeQuestions(Integer totalPracticeQuestions) {
        this.totalPracticeQuestions = totalPracticeQuestions;
    }

    public Integer getTotalInterviewQuestions() {
        return totalInterviewQuestions;
    }

    public void setTotalInterviewQuestions(Integer totalInterviewQuestions) {
        this.totalInterviewQuestions = totalInterviewQuestions;
    }

    public Boolean getPublished() {
        return published;
    }

    public void setPublished(Boolean published) {
        this.published = published;
    }

    public List<PracticeQuestion> getPracticeQuestions() {
        return practiceQuestions;
    }

    public void setPracticeQuestions(List<PracticeQuestion> practiceQuestions) {
        this.practiceQuestions = practiceQuestions;
    }

    public List<CodeExample> getCodeExamples() {
        return codeExamples;
    }

    public void setCodeExamples(List<CodeExample> codeExamples) {
        this.codeExamples = codeExamples;
    }

    // Helper methods
    public void addPracticeQuestion(PracticeQuestion question) {
        practiceQuestions.add(question);
        question.setTopic(this);
    }

    public void removePracticeQuestion(PracticeQuestion question) {
        practiceQuestions.remove(question);
        question.setTopic(null);
    }

    public void addCodeExample(CodeExample example) {
        codeExamples.add(example);
        example.setTopic(this);
    }

    public void removeCodeExample(CodeExample example) {
        codeExamples.remove(example);
        example.setTopic(null);
    }
}
