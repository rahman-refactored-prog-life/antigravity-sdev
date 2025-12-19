package com.learningportal.controller;

import com.learningportal.repository.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.transaction.annotation.Transactional;

@RestController
@RequestMapping("/api/admin/db")
public class DBManagementController {

    private final LearningModuleRepository moduleRepository;
    private final TopicRepository topicRepository;
    private final PracticeQuestionRepository questionRepository;
    private final CodeExampleRepository codeExampleRepository;
    private final UserProgressRepository userProgressRepository;
    private final TopicProgressRepository topicProgressRepository;

    public DBManagementController(
            LearningModuleRepository moduleRepository,
            TopicRepository topicRepository,
            PracticeQuestionRepository questionRepository,
            CodeExampleRepository codeExampleRepository,
            UserProgressRepository userProgressRepository,
            TopicProgressRepository topicProgressRepository) {
        this.moduleRepository = moduleRepository;
        this.topicRepository = topicRepository;
        this.questionRepository = questionRepository;
        this.codeExampleRepository = codeExampleRepository;
        this.userProgressRepository = userProgressRepository;
        this.topicProgressRepository = topicProgressRepository;
    }

    @PostMapping("/clean")
    @Transactional
    public String cleanDatabase() {
        topicProgressRepository.deleteAll();
        userProgressRepository.deleteAll();
        codeExampleRepository.deleteAll();
        questionRepository.deleteAll();
        topicRepository.deleteAll();
        moduleRepository.deleteAll();
        return "Database cleaned strictly!";
    }
}
