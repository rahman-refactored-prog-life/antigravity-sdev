package com.learningportal.service;

import com.learningportal.entity.*;
import com.learningportal.exception.ResourceNotFoundException;
import com.learningportal.repository.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class LearningServiceImpl implements LearningService {
    
    private final LearningModuleRepository moduleRepository;
    private final TopicRepository topicRepository;
    private final PracticeQuestionRepository questionRepository;
    private final CodeExampleRepository codeExampleRepository;
    
    public LearningServiceImpl(LearningModuleRepository moduleRepository,
                               TopicRepository topicRepository,
                               PracticeQuestionRepository questionRepository,
                               CodeExampleRepository codeExampleRepository) {
        this.moduleRepository = moduleRepository;
        this.topicRepository = topicRepository;
        this.questionRepository = questionRepository;
        this.codeExampleRepository = codeExampleRepository;
    }
    
    // Learning Module operations
    
    @Override
    public LearningModule createModule(LearningModule module) {
        if (moduleRepository.existsByName(module.getName())) {
            throw new IllegalArgumentException("Module with name '" + module.getName() + "' already exists");
        }
        return moduleRepository.save(module);
    }
    
    @Override
    public LearningModule updateModule(Long id, LearningModule module) {
        LearningModule existing = getModuleById(id);
        existing.setName(module.getName());
        existing.setDescription(module.getDescription());
        existing.setType(module.getType());
        existing.setOrderIndex(module.getOrderIndex());
        return moduleRepository.save(existing);
    }
    
    @Override
    @Transactional(readOnly = true)
    public LearningModule getModuleById(Long id) {
        return moduleRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Module not found with id: " + id));
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<LearningModule> getAllModules() {
        return moduleRepository.findAllByOrderByOrderIndexAsc();
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<LearningModule> getModulesByType(ModuleType type) {
        return moduleRepository.findByType(type);
    }
    
    @Override
    public void deleteModule(Long id) {
        if (!moduleRepository.existsById(id)) {
            throw new ResourceNotFoundException("Module not found with id: " + id);
        }
        moduleRepository.deleteById(id);
    }
    
    // Topic operations
    
    @Override
    public Topic createTopic(Long moduleId, Topic topic) {
        LearningModule module = getModuleById(moduleId);
        topic.setModule(module);
        return topicRepository.save(topic);
    }
    
    @Override
    public Topic updateTopic(Long id, Topic topic) {
        Topic existing = getTopicById(id);
        existing.setTitle(topic.getTitle());
        existing.setDescription(topic.getDescription());
        existing.setContent(topic.getContent());
        existing.setDifficulty(topic.getDifficulty());
        existing.setOrderIndex(topic.getOrderIndex());
        existing.setEstimatedMinutes(topic.getEstimatedMinutes());
        return topicRepository.save(existing);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Topic getTopicById(Long id) {
        return topicRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Topic not found with id: " + id));
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<Topic> getTopicsByModule(Long moduleId) {
        return topicRepository.findByModuleIdOrderByOrderIndexAsc(moduleId);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<Topic> getTopicsByModulePaginated(Long moduleId, Pageable pageable) {
        return topicRepository.findByModuleId(moduleId, pageable);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<Topic> searchTopics(Long moduleId, String searchTerm, Pageable pageable) {
        return topicRepository.searchTopicsByModule(moduleId, searchTerm, pageable);
    }
    
    @Override
    public void deleteTopic(Long id) {
        if (!topicRepository.existsById(id)) {
            throw new ResourceNotFoundException("Topic not found with id: " + id);
        }
        topicRepository.deleteById(id);
    }
    
    @Override
    @Transactional(readOnly = true)
    public long getTopicCountByModule(Long moduleId) {
        return topicRepository.countByModuleId(moduleId);
    }
    
    // Practice Question operations
    
    @Override
    public PracticeQuestion createQuestion(Long topicId, PracticeQuestion question) {
        Topic topic = getTopicById(topicId);
        question.setTopic(topic);
        return questionRepository.save(question);
    }
    
    @Override
    public PracticeQuestion updateQuestion(Long id, PracticeQuestion question) {
        PracticeQuestion existing = getQuestionById(id);
        existing.setTitle(question.getTitle());
        existing.setDescription(question.getDescription());
        existing.setDifficulty(question.getDifficulty());
        existing.setType(question.getType());
        existing.setOrderIndex(question.getOrderIndex());
        existing.setHints(question.getHints());
        existing.setSolution(question.getSolution());
        existing.setTestCases(question.getTestCases());
        return questionRepository.save(existing);
    }
    
    @Override
    @Transactional(readOnly = true)
    public PracticeQuestion getQuestionById(Long id) {
        return questionRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Question not found with id: " + id));
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<PracticeQuestion> getQuestionsByTopic(Long topicId) {
        return questionRepository.findByTopicIdOrderByOrderIndexAsc(topicId);
    }
    
    @Override
    @Transactional(readOnly = true)
    public Page<PracticeQuestion> getQuestionsByTopicPaginated(Long topicId, Pageable pageable) {
        return questionRepository.findByTopicId(topicId, pageable);
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<PracticeQuestion> getQuestionsByType(Long topicId, QuestionType type) {
        return questionRepository.findByTopicIdAndType(topicId, type);
    }
    
    @Override
    public void deleteQuestion(Long id) {
        if (!questionRepository.existsById(id)) {
            throw new ResourceNotFoundException("Question not found with id: " + id);
        }
        questionRepository.deleteById(id);
    }
    
    // Code Example operations
    
    @Override
    public CodeExample createCodeExample(Long topicId, CodeExample codeExample) {
        Topic topic = getTopicById(topicId);
        codeExample.setTopic(topic);
        return codeExampleRepository.save(codeExample);
    }
    
    @Override
    public CodeExample updateCodeExample(Long id, CodeExample codeExample) {
        CodeExample existing = getCodeExampleById(id);
        existing.setLanguage(codeExample.getLanguage());
        existing.setCode(codeExample.getCode());
        existing.setExplanation(codeExample.getExplanation());
        return codeExampleRepository.save(existing);
    }
    
    @Override
    @Transactional(readOnly = true)
    public CodeExample getCodeExampleById(Long id) {
        return codeExampleRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Code example not found with id: " + id));
    }
    
    @Override
    @Transactional(readOnly = true)
    public List<CodeExample> getCodeExamplesByTopic(Long topicId) {
        return codeExampleRepository.findByTopicId(topicId);
    }
    
    @Override
    @Transactional(readOnly = true)
    public CodeExample getCodeExampleByTopicAndLanguage(Long topicId, ProgrammingLanguage language) {
        return codeExampleRepository.findByTopicIdAndLanguage(topicId, language)
            .orElseThrow(() -> new ResourceNotFoundException(
                "Code example not found for topic " + topicId + " and language " + language));
    }
    
    @Override
    public void deleteCodeExample(Long id) {
        if (!codeExampleRepository.existsById(id)) {
            throw new ResourceNotFoundException("Code example not found with id: " + id);
        }
        codeExampleRepository.deleteById(id);
    }
}
