package com.learningportal.entity;

import jakarta.persistence.*;

/**
 * Entity representing a practice question within a topic.
 * Part of Layer 5 (Practice) in Content_Methodology_v3_Framework.
 */
@Entity
@Table(name = "practice_questions")
public class PracticeQuestion extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "topic_id", nullable = false)
    private Topic topic;

    @Column(nullable = false, length = 500)
    private String title;

    @Column(name = "description", length = 50000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private DifficultyLevel difficulty;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 50)
    private QuestionType type; // CORE_EXERCISE, EDGE_CASE_DRILL, CHALLENGE, MINI_PROJECT, QUIZ

    @Column(name = "solution", length = 50000)
    private String solution;

    @Column(name = "hints", length = 50000)
    private String hints; // JSON array of hints

    @Column(name = "test_cases", length = 50000)
    private String testCases; // JSON array of test cases

    @Column(name = "order_index", nullable = false)
    private Integer orderIndex;

    // Constructors
    public PracticeQuestion() {
    }

    public PracticeQuestion(String title, DifficultyLevel difficulty, QuestionType type, Integer orderIndex) {
        this.title = title;
        this.difficulty = difficulty;
        this.type = type;
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

    public DifficultyLevel getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(DifficultyLevel difficulty) {
        this.difficulty = difficulty;
    }

    public QuestionType getType() {
        return type;
    }

    public void setType(QuestionType type) {
        this.type = type;
    }

    public String getSolution() {
        return solution;
    }

    public void setSolution(String solution) {
        this.solution = solution;
    }

    public String getHints() {
        return hints;
    }

    public void setHints(String hints) {
        this.hints = hints;
    }

    public String getTestCases() {
        return testCases;
    }

    public void setTestCases(String testCases) {
        this.testCases = testCases;
    }

    public Integer getOrderIndex() {
        return orderIndex;
    }

    public void setOrderIndex(Integer orderIndex) {
        this.orderIndex = orderIndex;
    }
}
