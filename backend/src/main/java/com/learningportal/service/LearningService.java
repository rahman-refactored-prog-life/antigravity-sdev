package com.learningportal.service;

import com.learningportal.entity.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

/**
 * Service interface for managing learning content (modules, topics, questions, code examples)
 */
public interface LearningService {
    
    // Learning Module operations
    LearningModule createModule(LearningModule module);
    LearningModule updateModule(Long id, LearningModule module);
    LearningModule getModuleById(Long id);
    List<LearningModule> getAllModules();
    List<LearningModule> getModulesByType(ModuleType type);
    void deleteModule(Long id);
    
    // Topic operations
    Topic createTopic(Long moduleId, Topic topic);
    Topic updateTopic(Long id, Topic topic);
    Topic getTopicById(Long id);
    List<Topic> getTopicsByModule(Long moduleId);
    Page<Topic> getTopicsByModulePaginated(Long moduleId, Pageable pageable);
    Page<Topic> searchTopics(Long moduleId, String searchTerm, Pageable pageable);
    void deleteTopic(Long id);
    long getTopicCountByModule(Long moduleId);
    
    // Practice Question operations
    PracticeQuestion createQuestion(Long topicId, PracticeQuestion question);
    PracticeQuestion updateQuestion(Long id, PracticeQuestion question);
    PracticeQuestion getQuestionById(Long id);
    List<PracticeQuestion> getQuestionsByTopic(Long topicId);
    Page<PracticeQuestion> getQuestionsByTopicPaginated(Long topicId, Pageable pageable);
    List<PracticeQuestion> getQuestionsByType(Long topicId, QuestionType type);
    void deleteQuestion(Long id);
    
    // Code Example operations
    CodeExample createCodeExample(Long topicId, CodeExample codeExample);
    CodeExample updateCodeExample(Long id, CodeExample codeExample);
    CodeExample getCodeExampleById(Long id);
    List<CodeExample> getCodeExamplesByTopic(Long topicId);
    CodeExample getCodeExampleByTopicAndLanguage(Long topicId, ProgrammingLanguage language);
    void deleteCodeExample(Long id);
}
