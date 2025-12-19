
# 👑 KIRO: ZERO-TO-HERO LEARNING PORTAL - MASTER ROADMAP & CONTEXT

> **📢 FOR ALL AGENTS:** THIS IS THE CENTRAL SOURCE OF TRUTH.
> **DO NOT** rely on conversation history alone. This file tracks the *actual* state of the project.
> **PROTOCOL**: 
> 1. **READ** this file to understand the current active task and architectural standards.
> 2. **EXECUTE** your task.
> 3. **UPDATE** this file's "Current Status" and "Roadmap" sections before you finish.

---

## 1. 🎯 PROJECT VISION
To build the world's most comprehensive **"Zero-to-Hero"** learning portal for aspiring FAANG Senior Engineers (L5/L6).
*   **Goal**: Go beyond simple "coding questions". Teach *concepts*, *internals*, *patterns*, and *system design* in one cohesive flow.
*   **Differentiation**: "Deep Dive" content (Internals, Memory Layouts) + "Interview Bank" (FAANG questions) + "Gamification" (XP, Streaks).

## 2. 🛠 TECH STACK & ARCHITECTURE
*   **Backend**: Java 21, Spring Boot 3.2.0, PostgreSQL, JPA/Hibernate.
*   **Frontend**: React (Vite), TypeScript, Monaco Editor (Code), Lucide React (Icons).
*   **Infrastructure**: Local Dev (Mac OS), Maven, npm.

## 3. 📜 UNIVERSAL CONTENT PROTOCOL (MANDATORY)
**ALL** new learning content must adhere to this strict standard:
1.  **Volume**: **Exhaustive (Unlimited)**. Do not stop at 20. Collect *every* unique question pattern.
2.  **Breadth**: Basics -> Internals -> Edge Cases -> **The Vault (All FAANG Questions)**.
3.  **Coding Challenge Format**:
    *   **5-Language Solutions**: Java, Python, C++, JavaScript, Go.
    *   **Tabs**: Implemented using `<CodeTabs>`.
    *   **Company Badges**: `**Companies**: Amazon, Google` (Explicit tags).
    *   **Complexity**: Time & Space analysis for every solution.
4.  **Dual-View Architecture (MANDATORY)**:
    *   **Every** Asset (Question, Note, Cheat Sheet) must be accessible in **Two Places**:
    *   1. **Embedded**: Contextually within the relevant Topic.
    *   2. **Central Hub**: In a dedicated global repository (e.g., `/interview-bank`, `/notebook`, `/cheatsheets`).

## 4. 🚦 CURRENT STATUS DASHBOARD (Updated: Dec 14, 2025)

| Phase | Module | Status | Notes |
| :--- | :--- | :--- | :--- |
| **1. Foundation** | Infrastructure | ✅ **COMPLETE** | Build system, Environment, Branding. |
| | UI/UX Core | ✅ **COMPLETE** | Sidebar, Header, Editor, Design System. |
| **2. Content Execution** | **Java Ecosystem** | 🔄 **IN PROGRESS** | The core "Zero-to-Hero" content phase. |
| | *Variables* | ✅ **COMPLETE** | 21 Questions. |
| | *Arrays* | ✅ **COMPLETE** | 100/100 Questions. |
| | *Control Flow* | 🔴 PENDING | Next implementation target. |
| **2.5. Enhancements** | Dual-Mode Hubs | 🔴 PENDING | Central Notes/Questions/Cheatsheet Hubs. |
| | Scalability | 🔴 PENDING | Folder structure assessment. |

## 5. 🗺 DETAILED ROADMAP & BACKLOG

### 🔹 Phase 1: Foundation & UI (Completed)
*   [x] **Infrastructure**: Spring Boot + React + Postgres + branding ("Senior Dev Academy").
*   [x] **Navigation**: Dynamic Sidebar, Floating Header.
*   [x] **Tools**: Monaco Editor integration, Notes Sidebar.

### 🔹 Phase 2: Content Execution (Java Ecosystem)
*   **Goal**: Strict adherence to `CONTENT_METHODOLOGY_V3_FINAL.md`.
*   [x] **2.1 Java Fundamentals**:
    - [x] Variables & Data Types
    - [x] Arrays & Strings (100 Questions)
*   [ ] **2.2 Control Flow**: Loops, Branching, Internals.
*   [ ] **2.3 Methods & Functional Programming**: Lambdas, Streams.
*   [ ] **2.4 OOP Mastery**: Classes, Inheritance, Polymerphism.
*   [ ] **2.5 Collections Framework**: List, Set, Map, Queue Internals.
*   [ ] **2.6 Advanced Topics**: Concurrency, JVM Internals, Memory Management.

### 🔹 Phase 2.5: UI Enhancements & Central Hubs
*   **Goal**: Enable "Centralized" views and ensure Scalability.
*   [ ] **Central Interview Hub**: `/interview-bank` (Aggregate all questions).
*   [ ] **Central Notes Hub**: `/notebook` (Aggregate all notes).
*   [ ] **Central Cheat Sheet Hub**: `/cheatsheets` (Aggregate summaries).
*   [ ] **UI Polish**: Modernize Side Navbar, verify Floating Navbar wiring.

### 🔹 Phase 3: Data Structures & Algorithms
*   **Goal**: The Universe of DSA (30+ structures, 15+ algos).
*   [ ] **Data Structures**: Trees, Graphs, Heaps, Tries.
*   [ ] **Algorithms**: Sorting, Searching, DP, Graph Algos.

### 🔹 Phase 4: Gamification
*   [ ] **XP System**: Points for solving/reading.
*   [ ] **Streaks**: Daily tracking.

