package com.learningportal.entity;

/**
 * Enum representing types of practice questions.
 * Aligned with Layer 5 (Practice) of Content_Methodology_v3_Framework.
 */
public enum QuestionType {
    CORE_EXERCISE, // Basic implementation (3+ per topic)
    EDGE_CASE_DRILL, // Edge case handling (5+ per topic)
    CHALLENGE, // Interview-style problems (3+ per topic)
    MINI_PROJECT, // Real-world project (1+ per topic)
    QUIZ_MCQ, // Multiple choice questions (10+ per topic)
    QUIZ_CODING, // Coding quiz questions
    INTERVIEW // Real FAANG interview questions
}
