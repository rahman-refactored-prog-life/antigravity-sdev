package com.learningportal.controller;

import com.learningportal.dto.TopicProgressDTO;
import com.learningportal.dto.UserProgressDTO;
import com.learningportal.entity.TopicProgress;
import com.learningportal.entity.UserProgress;
import com.learningportal.security.JwtUtil;
import com.learningportal.service.ProgressTrackingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/progress")
@Tag(name = "Progress Tracking", description = "APIs for tracking user learning progress")
public class ProgressController {
    
    private final ProgressTrackingService progressService;
    private final JwtUtil jwtUtil;
    
    public ProgressController(ProgressTrackingService progressService, JwtUtil jwtUtil) {
        this.progressService = progressService;
        this.jwtUtil = jwtUtil;
    }
    
    @GetMapping("/modules/{moduleId}")
    @Operation(summary = "Get user progress for a module")
    public ResponseEntity<UserProgressDTO> getModuleProgress(
            @PathVariable Long moduleId,
            @RequestHeader("Authorization") String token) {
        Long userId = getUserIdFromToken(token);
        UserProgress progress = progressService.getUserProgress(userId, moduleId);
        return ResponseEntity.ok(new UserProgressDTO(progress));
    }
    
    @GetMapping("/modules")
    @Operation(summary = "Get all user progress")
    public ResponseEntity<List<UserProgressDTO>> getAllProgress(
            @RequestHeader("Authorization") String token) {
        Long userId = getUserIdFromToken(token);
        List<UserProgress> progressList = progressService.getAllUserProgress(userId);
        List<UserProgressDTO> dtos = progressList.stream()
                .map(UserProgressDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }
    
    @GetMapping("/topics/{topicId}")
    @Operation(summary = "Get user progress for a topic")
    public ResponseEntity<TopicProgressDTO> getTopicProgress(
            @PathVariable Long topicId,
            @RequestHeader("Authorization") String token) {
        Long userId = getUserIdFromToken(token);
        TopicProgress progress = progressService.getTopicProgress(userId, topicId);
        return ResponseEntity.ok(new TopicProgressDTO(progress));
    }
    
    @GetMapping("/modules/{moduleId}/topics")
    @Operation(summary = "Get progress for all topics in a module")
    public ResponseEntity<List<TopicProgressDTO>> getModuleTopicsProgress(
            @PathVariable Long moduleId,
            @RequestHeader("Authorization") String token) {
        Long userId = getUserIdFromToken(token);
        List<TopicProgress> progressList = progressService.getModuleTopicsProgress(userId, moduleId);
        List<TopicProgressDTO> dtos = progressList.stream()
                .map(TopicProgressDTO::new)
                .collect(Collectors.toList());
        return ResponseEntity.ok(dtos);
    }
    
    @PostMapping("/topics/{topicId}/start")
    @Operation(summary = "Mark topic as started")
    public ResponseEntity<TopicProgressDTO> startTopic(
            @PathVariable Long topicId,
            @RequestHeader("Authorization") String token) {
        Long userId = getUserIdFromToken(token);
        TopicProgress progress = progressService.markTopicStarted(userId, topicId);
        return ResponseEntity.ok(new TopicProgressDTO(progress));
    }
    
    @PostMapping("/topics/{topicId}/complete")
    @Operation(summary = "Mark topic as completed")
    public ResponseEntity<TopicProgressDTO> completeTopic(
            @PathVariable Long topicId,
            @RequestHeader("Authorization") String token) {
        Long userId = getUserIdFromToken(token);
        TopicProgress progress = progressService.markTopicCompleted(userId, topicId);
        return ResponseEntity.ok(new TopicProgressDTO(progress));
    }
    
    @PutMapping("/topics/{topicId}/progress")
    @Operation(summary = "Update topic completion percentage")
    public ResponseEntity<TopicProgressDTO> updateProgress(
            @PathVariable Long topicId,
            @RequestParam Double percentage,
            @RequestHeader("Authorization") String token) {
        Long userId = getUserIdFromToken(token);
        TopicProgress progress = progressService.updateTopicProgress(userId, topicId, percentage);
        return ResponseEntity.ok(new TopicProgressDTO(progress));
    }
    
    @PutMapping("/topics/{topicId}/time")
    @Operation(summary = "Update time spent on topic")
    public ResponseEntity<TopicProgressDTO> updateTimeSpent(
            @PathVariable Long topicId,
            @RequestParam Integer minutes,
            @RequestHeader("Authorization") String token) {
        Long userId = getUserIdFromToken(token);
        TopicProgress progress = progressService.updateTimeSpent(userId, topicId, minutes);
        return ResponseEntity.ok(new TopicProgressDTO(progress));
    }
    
    @PutMapping("/topics/{topicId}/questions")
    @Operation(summary = "Update question statistics")
    public ResponseEntity<TopicProgressDTO> updateQuestionStats(
            @PathVariable Long topicId,
            @RequestParam Integer attempted,
            @RequestParam Integer correct,
            @RequestHeader("Authorization") String token) {
        Long userId = getUserIdFromToken(token);
        TopicProgress progress = progressService.updateQuestionStats(userId, topicId, attempted, correct);
        return ResponseEntity.ok(new TopicProgressDTO(progress));
    }
    
    private Long getUserIdFromToken(String token) {
        String jwt = token.replace("Bearer ", "");
        return jwtUtil.getUserIdFromToken(jwt);
    }
}
