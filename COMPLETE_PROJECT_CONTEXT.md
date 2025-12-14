
# 👑 KIRO: ZERO-TO-HERO LEARNING PORTAL - MASTER PROJECT CONTEXT

> **📢 FOR NEW AGENTS:** READ THIS FILE FIRST. IT IS THE SINGLE SOURCE OF TRUTH.
> **DO NOT** rely on conversation history alone. This file tracks the *actual* state of the project.
> **PROTOCOL**: 
> 1. **READ** this file to understand the current active task and architectural standards.
> 2. **EXECUTE** your task.
> 3. **UPDATE** this file's "Current Status" and "Roadmap" sections before you finish.

---

## 1. 🎯 PROJECT VISION
To build the world's most comprehensive **"Zero-to-Hero"** learning portal for aspiring FAANG Senior Engineers (L5/L6).
*   **Goal**: Go beyond simple "coding questions". Teach *concepts*, *internals*, *patterns*, and *system design* in one cohesive flow.
*   **differentiation**: "Deep Dive" content (Internals, Memory Layouts) + "Interview Bank" (FAANG questions) + "Gamification" (XP, Streaks).

## 2. 🛠 TECH STACK & ARCHITECTURE
*   **Backend**: Java 21, Spring Boot 3.2.0, PostgreSQL, JPA/Hibernate.
*   **Frontend**: React (Vite), TypeScript, Monaco Editor (Code), Lucide React (Icons).
*   **Infrastructure**: Local Dev (Mac OS), Maven, npm.

## 3. 📜 UNIVERSAL CONTENT PROTOCOL (MANDATORY)
**ALL** new learning content must adhere to this strict standard:
1.  **Volume**: **20-50+ Questions** per topic. No "sampling".
2.  **Breadth**: Basics -> Internals -> Edge Cases -> FAANG Interview Questions.
3.  **Coding Challenge Format**:
    *   **5-Language Solutions**: Java, Python, C++, JavaScript, Go.
    *   **Tabs**: Implemented using `<CodeTabs>`.
    *   **Company Badges**: `**Companies**: Amazon, Google` (Explicit tags).
    *   **Complexity**: Time & Space analysis for every solution.

## 4. 🚦 CURRENT STATUS DASHBOARD (Updated: Dec 8, 2025)

| Phase | Module | Status | Notes |
| :--- | :--- | :--- | :--- |
| **1. Infra** | Build System | ✅ **COMPLETE** | Java/React builds working.Env verified. |
| **2. UI/UX** | Navigation | ✅ **COMPLETE** | Dynamic Sidebar live. Floating Header live. |
| | Visuals | ✅ **COMPLETE** | Glowing Cards, Glassmorphism, Back-to-Top. |
| | Tools | ✅ **COMPLETE** | Monaco Editor embedded. Notes Sidebar ready. |
| **3. Content**| **Variables** | ✅ **COMPLETE** | Protocol applied. 21 Questions added. |
| | **Arrays** | ✅ **COMPLETE**| **100/100**. Protocol Applied. |
| | Control Flow | 🔴 PENDING | |
| | Methods | 🔴 PENDING | |
| **4. Game** | XP System | 🔴 PENDING | |

## 5. 🗺 DETAILED ROADMAP & BACKLOG

### 🔹 Phase 2: UI/UX & Navigation (Completed)
*   [x] **Dynamic Sidebar**: Refactor `Sidebar.tsx` to fetch modules/topics from API.
*   [x] **Monaco Editor**: Replace textareas with professional IDE component.
*   [x] **Notes System**: Implement sliding `NotesSidebar`.

### 🔹 Phase 3: Content Expansion (Current Focus)
*   **Goal**: Standards enforcement ("Zero-to-Hero").
*   [x] **3.1 Variables & Data Types**: Added 21 FAANG questions (Bit manipulation, Overflow).
*   [x] **3.2 Arrays & Strings (ACTIVE)**:
    *   **Target**: 100/100 Questions (Complete "Zero-to-Hero" coverage).
    *   **Files**: `content/java/02-arrays-and-strings.md` (Fully Implemented).
    *   **Action**: Completed. Ready for Verification.
*   [ ] **3.3 Control Flow**: Loops, switch-case internals, breaking loops.

### 🔹 Phase 4: Gamification (Next)
*   [ ] **XP System**: Award points for reading and solving.
*   [ ] **Streaks**: Daily activity tracking.
*   [ ] **User Dashboard**: Visual progress bars and "Level" display.

## 6. 📂 CRITICAL FILE INDEX
*   `frontend/src/components/Sidebar.tsx`: Core navigation logic (Dynamic).
*   `frontend/src/services/learningService.ts`: API client for content.
*   `backend/src/main/resources/application.yml`: Config (Ports: 2025, DB).
*   `CONTENT_METHODOLOGY_V3_FINAL.md`: The detailed Content Rulebook.

---
** instructions for the next agent: **
1.  **System Verification**: The "Arrays & Strings" module has 100+ new questions.
2.  **Action**: Start the backend and frontend. Navigate to the Arrays topic.
3.  **Verify**: Check if the huge content file renders correctly (loading time, scroll performance, CodeTabs).
4.  **Next Module**: Proceed to **Phase 3.3: Control Flow**.
