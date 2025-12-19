package com.learningportal.controller;

import com.learningportal.dto.CodeExampleDTO;
import com.learningportal.dto.LearningModuleDTO;
import com.learningportal.dto.PracticeQuestionDTO;
import com.learningportal.dto.TopicDTO;
import com.learningportal.entity.*;
import com.learningportal.service.LearningService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/learning")
@Tag(name = "Learning", description = "Learning content management API")
public class LearningController {
    
    private final LearningService learningService;
    
    public LearningController(LearningService learningService) {
        this.learningService = learningService;
    }
    
    // ==================== Module Endpoints ====================
    
    @GetMapping("/modules")
    @Operation(summary = "Get all learning modules", description = "Retrieve all learning modules ordered by index")
    public ResponseEntity<List<LearningModuleDTO>> getAllModules() {
        List<LearningModule> modules = learningService.getAllModules();
        List<LearningModuleDTO> dtos = modules.stream()
            .map(this::convertToModuleDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }
    
    @GetMapping("/modules/{id}")
    @Operation(summary = "Get module by ID", description = "Retrieve a specific learning module by its ID")
    public ResponseEntity<LearningModuleDTO> getModuleById(
            @Parameter(description = "Module ID") @PathVariable Long id) {
        LearningModule module = learningService.getModuleById(id);
        return ResponseEntity.ok(convertToModuleDTO(module));
    }
    
    @GetMapping("/modules/type/{type}")
    @Operation(summary = "Get modules by type", description = "Retrieve modules filtered by type")
    public ResponseEntity<List<LearningModuleDTO>> getModulesByType(
            @Parameter(description = "Module type") @PathVariable ModuleType type) {
        List<LearningModule> modules = learningService.getModulesByType(type);
        List<LearningModuleDTO> dtos = modules.stream()
            .map(this::convertToModuleDTO)
            .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }
    
    @PostMapping("/modules")
    @Operation(summary = "Create module", description = "Create a new learning module")
    public ResponseEntity<LearningModuleDTO> createModule(@RequestBody LearningModule module) {
        LearningModule created = learningService.createModule(module);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToModuleDTO(created));
    }
    
    @PutMapping("/modules/{id}")
    @Operation(summary = "Update module", description = "Update an existing learning module")
    public ResponseEntity<LearningModuleDTO> updateModule(
            @Parameter(description = "Module ID") @PathVariable Long id,
            @RequestBody LearningModule module) {
        LearningModule updated = learningService.updateModule(id, module);
        return ResponseEntity.ok(convertToModuleDTO(updated));
    }
    
    @DeleteMapping("/modules/{id}")
    @Operation(summary = "Delete module", description = "Delete a learning module")
    public ResponseEntity<Void> deleteModule(
            @Parameter(description = "Module ID") @PathVariable Long id) {
        learningService.deleteModule(id);
        return ResponseEntity.noContent().build();
    }
    
    // ==================== Topic Endpoints ====================
    
    @GetMapping("/modules/{moduleId}/topics")
    @Operation(summary = "Get topics by module", description = "Retrieve all topics for a specific module with pagination")
    public ResponseEntity<Page<TopicDTO>> getTopicsByModule(
            @Parameter(description = "Module ID") @PathVariable Long moduleId,
            @Parameter(description = "Page number (0-indexed)") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "20") int size,
            @Parameter(description = "Sort field") @RequestParam(defaultValue = "orderIndex") String sortBy,
            @Parameter(description = "Sort direction") @RequestParam(defaultValue = "ASC") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("DESC") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending();
        Pageable pageable = PageRequest.of(page, size, sort);
        
        Page<Topic> topics = learningService.getTopicsByModulePaginated(moduleId, pageable);
        Page<TopicDTO> dtos = topics.map(this::convertToTopicDTO);
        
        return ResponseEntity.ok(dtos);
    }
    
    @GetMapping("/modules/{moduleId}/topics/search")
    @Operation(summary = "Search topics", description = "Search topics within a module by title or description")
    public ResponseEntity<Page<TopicDTO>> searchTopics(
            @Parameter(description = "Module ID") @PathVariable Long moduleId,
            @Parameter(description = "Search term") @RequestParam String q,
            @Parameter(description = "Page number") @RequestParam(defaultValue = "0") int page,
            @Parameter(description = "Page size") @RequestParam(defaultValue = "20") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<Topic> topics = learningService.searchTopics(moduleId, q, pageable);
        Page<TopicDTO> dtos = topics.map(this::convertToTopicDTO);
        
        return ResponseEntity.ok(dtos);
    }
    
    @GetMapping("/topics/{id}")
    @Operation(summary = "Get topic by ID", description = "Retrieve a specific topic by its ID")
    public ResponseEntity<TopicDTO> getTopicById(
            @Parameter(description = "Topic ID") @PathVariable Long id) {
        Topic topic = learningService.getTopicById(id);
        return ResponseEntity.ok(convertToTopicDTO(topic));
    }
    
    @PostMapping("/modules/{moduleId}/topics")
    @Operation(summary = "Create topic", description = "Create a new topic within a module")
    public ResponseEntity<TopicDTO> createTopic(
            @Parameter(description = "Module ID") @PathVariable Long moduleId,
            @RequestBody Topic topic) {
        Topic created = learningService.createTopic(moduleId, topic);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToTopicDTO(created));
    }
    
    @PutMapping("/topics/{id}")
    @Operation(summary = "Update topic", description = "Update an existing topic")
    public ResponseEntity<TopicDTO> updateTopic(
            @Parameter(description = "Topic ID") @PathVariable Long id,
            @RequestBody Topic topic) {
        Topic updated = learningService.updateTopic(id, topic);
        return ResponseEntity.ok(convertToTopicDTO(updated));
    }
    
    @DeleteMapping("/topics/{id}")
    @Operation(summary = "Delete topic", description = "Delete a topic")
    public ResponseEntity<Void> deleteTopic(
            @Parameter(description = "Topic ID") @PathVariable Long id) {
        learningService.deleteTopic(id);
        return ResponseEntity.noContent().build();
    }
    
    // ==================== Practice Question Endpoints ====================
    
    @GetMapping("/topics/{topicId}/questions")
    @Operation(summary = "Get questions by topic", description = "Retrieve all practice questions for a topic")
    public ResponseEntity<List<PracticeQuestionDTO>> getQuestionsByTopic(
            @Parameter(description = "Topic ID") @PathVariable Long topicId) {
        List<PracticeQuestion> questions = learningService.getQuestionsByTopic(topicId);
        List<PracticeQuestionDTO> dtos = questions.stream()
                .map(this::convertToPracticeQuestionDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }
    
    @GetMapping("/topics/{topicId}/questions/type/{type}")
    @Operation(summary = "Get questions by type", description = "Retrieve questions filtered by type")
    public ResponseEntity<List<PracticeQuestionDTO>> getQuestionsByType(
            @Parameter(description = "Topic ID") @PathVariable Long topicId,
            @Parameter(description = "Question type") @PathVariable QuestionType type) {
        List<PracticeQuestion> questions = learningService.getQuestionsByType(topicId, type);
        List<PracticeQuestionDTO> dtos = questions.stream()
                .map(this::convertToPracticeQuestionDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }
    
    @GetMapping("/questions/{id}")
    @Operation(summary = "Get question by ID", description = "Retrieve a specific practice question")
    public ResponseEntity<PracticeQuestionDTO> getQuestionById(
            @Parameter(description = "Question ID") @PathVariable Long id) {
        PracticeQuestion question = learningService.getQuestionById(id);
        return ResponseEntity.ok(convertToPracticeQuestionDTO(question));
    }
    
    @PostMapping("/topics/{topicId}/questions")
    @Operation(summary = "Create question", description = "Create a new practice question")
    public ResponseEntity<PracticeQuestionDTO> createQuestion(
            @Parameter(description = "Topic ID") @PathVariable Long topicId,
            @RequestBody PracticeQuestion question) {
        PracticeQuestion created = learningService.createQuestion(topicId, question);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertToPracticeQuestionDTO(created));
    }
    
    @PutMapping("/questions/{id}")
    @Operation(summary = "Update question", description = "Update an existing practice question")
    public ResponseEntity<PracticeQuestionDTO> updateQuestion(
            @Parameter(description = "Question ID") @PathVariable Long id,
            @RequestBody PracticeQuestion question) {
        PracticeQuestion updated = learningService.updateQuestion(id, question);
        return ResponseEntity.ok(convertToPracticeQuestionDTO(updated));
    }
    
    @DeleteMapping("/questions/{id}")
    @Operation(summary = "Delete question", description = "Delete a practice question")
    public ResponseEntity<Void> deleteQuestion(
            @Parameter(description = "Question ID") @PathVariable Long id) {
        learningService.deleteQuestion(id);
        return ResponseEntity.noContent().build();
    }
    
    // ==================== Code Example Endpoints ====================
    
    @GetMapping("/topics/{topicId}/code-examples")
    @Operation(summary = "Get code examples by topic", description = "Retrieve all code examples for a topic")
    public ResponseEntity<List<CodeExampleDTO>> getCodeExamplesByTopic(
            @Parameter(description = "Topic ID") @PathVariable Long topicId) {
        List<CodeExample> examples = learningService.getCodeExamplesByTopic(topicId);
        List<CodeExampleDTO> dtos = examples.stream()
                .map(this::convertTocodeExampleDTO)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }
    
    @GetMapping("/topics/{topicId}/code-examples/{language}")
    @Operation(summary = "Get code example by language", description = "Retrieve code example for a specific language")
    public ResponseEntity<CodeExampleDTO> getCodeExampleByLanguage(
            @Parameter(description = "Topic ID") @PathVariable Long topicId,
            @Parameter(description = "Programming language") @PathVariable ProgrammingLanguage language) {
        CodeExample example = learningService.getCodeExampleByTopicAndLanguage(topicId, language);
        return ResponseEntity.ok(convertTocodeExampleDTO(example));
    }
    
    @GetMapping("/code-examples/{id}")
    @Operation(summary = "Get code example by ID", description = "Retrieve a specific code example")
    public ResponseEntity<CodeExampleDTO> getCodeExampleById(
            @Parameter(description = "Code example ID") @PathVariable Long id) {
        CodeExample example = learningService.getCodeExampleById(id);
        return ResponseEntity.ok(convertTocodeExampleDTO(example));
    }
    
    @PostMapping("/topics/{topicId}/code-examples")
    @Operation(summary = "Create code example", description = "Create a new code example")
    public ResponseEntity<CodeExampleDTO> createCodeExample(
            @Parameter(description = "Topic ID") @PathVariable Long topicId,
            @RequestBody CodeExample codeExample) {
        CodeExample created = learningService.createCodeExample(topicId, codeExample);
        return ResponseEntity.status(HttpStatus.CREATED).body(convertTocodeExampleDTO(created));
    }
    
    @PutMapping("/code-examples/{id}")
    @Operation(summary = "Update code example", description = "Update an existing code example")
    public ResponseEntity<CodeExampleDTO> updateCodeExample(
            @Parameter(description = "Code example ID") @PathVariable Long id,
            @RequestBody CodeExample codeExample) {
        CodeExample updated = learningService.updateCodeExample(id, codeExample);
        return ResponseEntity.ok(convertTocodeExampleDTO(updated));
    }
    
    @DeleteMapping("/code-examples/{id}")
    @Operation(summary = "Delete code example", description = "Delete a code example")
    public ResponseEntity<Void> deleteCodeExample(
            @Parameter(description = "Code example ID") @PathVariable Long id) {
        learningService.deleteCodeExample(id);
        return ResponseEntity.noContent().build();
    }
    
    // ==================== Helper Methods ====================
    
    private LearningModuleDTO convertToModuleDTO(LearningModule module) {
        LearningModuleDTO dto = new LearningModuleDTO(
            module.getId(),
            module.getName(),
            module.getDescription(),
            module.getType(),
            module.getOrderIndex()
        );
        dto.setTopicCount(learningService.getTopicCountByModule(module.getId()));
        return dto;
    }
    
    private TopicDTO convertToTopicDTO(Topic topic) {
        TopicDTO dto = new TopicDTO(
            topic.getId(),
            topic.getTitle(),
            topic.getDescription(),
            topic.getDifficulty(),
            topic.getOrderIndex()
        );
        dto.setContent(topic.getContent());
        dto.setEstimatedMinutes(topic.getEstimatedMinutes());
        dto.setModuleId(topic.getModule().getId());
        dto.setModuleName(topic.getModule().getName());
        return dto;
    }

    private PracticeQuestionDTO convertToPracticeQuestionDTO(PracticeQuestion question) {
        return new PracticeQuestionDTO(
                question.getId(),
                question.getTitle(),
                question.getDescription(),
                question.getType(),
                question.getTopic().getId()
        );
    }

    private CodeExampleDTO convertTocodeExampleDTO(CodeExample example) {
        return new CodeExampleDTO(
                example.getId(),
                example.getTitle(),
                example.getDescription(),
                example.getLanguage(),
                example.getCode(),
                example.getTopic().getId()
        );
    }
}
