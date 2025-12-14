# Session Guide - Context Loading & Continuity

**Purpose**: Complete guide for session management, context loading, and hook usage

---

## Table of Contents

1. [Session Initialization](#session-initialization)
2. [Spec-Driven Development](#spec-driven-development)
3. [Hook Usage Guide](#hook-usage-guide)
4. [Context Files](#context-files)
5. [Session Workflow](#session-workflow)
6. [Troubleshooting](#troubleshooting)

---

# Session Initialization

## How to Start Every Session

**IMPORTANT**: At the start of EVERY new session, ask Kiro to read this file first:

```
"Please read .kiro/steering/SESSION_GUIDE.md to load the full project context"
```

This tells Kiro to load all the context from previous sessions.

---

## Context Loading Instructions for Kiro

When you see this file, you MUST immediately read these files in order:

### 1. 🔥 CRITICAL: temporary.md (Most recent conversation)
- **File**: `temporary.md`
- **Contains**: The ACTUAL conversation from the last session
- **READ THIS FIRST** - This has the real context!
- If this file is empty or doesn't exist, proceed to other files

### 2. Context Summary (Detailed state)
- **File**: `.kiro/session-state/context-summary.md`
- **Contains**: Complete project state, decisions, technical environment
- **IMPORTANT**: Check the "Session Update" sections at the bottom for latest changes

### 3. Resume Context (Quick overview)
- **File**: `.kiro/session-state/resume-context.md`
- **Contains**: Last session summary, next actions, current phase

### 4. Current Phase (Progress tracking)
- **File**: `.kiro/session-state/current-phase.json`
- **Contains**: Phase number, status, completed tasks

### 5. Recent Conversation (Last 200 lines)
- **File**: `.kiro/session-logs/conversation-history.md`
- **Contains**: Recent conversation history

### 6. Tasks (Current work)
- **File**: `.kiro/specs/comprehensive-learning-portal/tasks.md`
- **Contains**: All tasks with completion status

### After Reading Context Files

You should:
- Acknowledge what phase we're in
- State how many tasks are complete
- **Mention the SPECIFIC last thing that was accomplished** (from temporary.md or context-summary.md)
- **Mention any CURRENT ISSUES or BLOCKERS** that need to be addressed
- Ask what the user wants to work on next

---

# Spec-Driven Development

## 🎯 CRITICAL RULE: Specs Are Single Source of Truth

**BEFORE making ANY code changes, you MUST update the spec files.**

### The 3 Spec Files:

1. **`requirements.md`** - WHAT needs to be built
   - User stories
   - Acceptance criteria (EARS format)
   - Functional requirements

2. **`design.md`** - HOW it will be built
   - Architecture
   - Component interfaces
   - Data models
   - Correctness properties
   - Design decisions

3. **`tasks.md`** - WHEN it will be built
   - Implementation tasks
   - Task order and dependencies
   - Progress tracking

### Workflow for ANY Change:

```
User requests feature/change
         ↓
Update requirements.md (add acceptance criteria)
         ↓
Update design.md (add architecture/design)
         ↓
Update tasks.md (add implementation task)
         ↓
Implement the code
         ↓
Mark task complete in tasks.md
         ↓
Update specs if implementation reveals issues
```

### When to Update Specs:

✅ **ALWAYS update specs when:**
- User requests a new feature
- Making architectural decisions
- Changing component interfaces
- Discovering issues during implementation
- Modifying existing functionality
- Adding new requirements

❌ **NEVER:**
- Write code without updating specs first
- Skip spec updates "to save time"
- Keep decisions only in temporary.md
- Assume specs are "done" after initial creation

### Spec File Locations:

```
.kiro/specs/comprehensive-learning-portal/
├── requirements.md  ← User stories & acceptance criteria
├── design.md        ← Architecture & design decisions
└── tasks.md         ← Implementation tasks & progress
```

### Example:

**Bad Workflow:**
```
User: "Add CodeTabs component"
Kiro: *writes code immediately*
❌ Result: No documentation, specs outdated
```

**Good Workflow:**
```
User: "Add CodeTabs component"
Kiro:
  1. Updates requirements.md (adds Requirement 1.18)
  2. Updates design.md (adds CodeTabs architecture)
  3. Updates tasks.md (adds Task 2.1.6)
  4. Implements the code
  5. Marks Task 2.1.6 complete
✅ Result: Fully documented, specs accurate
```

---

## Current Project Status (Quick Reference)

**Project**: Comprehensive Learning Portal (FAANG Interview Prep)  
**Timeline**: 16-20 months, 9 phases  
**Tech Stack**: Spring Boot 3.2 + Java 21 + PostgreSQL + React 18 + TypeScript  
**Repository**: https://github.com/rahman-refactored-prog-life/learning-portal.git

### Key Decisions
- **NO Lombok** (write getters/setters manually)
- **NO H2** (PostgreSQL only for all environments)
- AWS-inspired UI design
- 10,000+ questions target across all topics
- 5 languages for all solutions (Java, Node.js, Python, C, C++)

### Session Continuity System
- All hooks created and tested ✅
- Session logs in `.kiro/session-logs/`
- Context preserved in `.kiro/session-state/`
- Git commits after every checkpoint

---

# Hook Usage Guide

## Core Principles

1. **Log Everything**: Every conversation, decision, and change must be logged
2. **Commit Frequently**: Commit code after every significant change
3. **Document Decisions**: Record why decisions were made, not just what
4. **Preserve Context**: Maintain complete context for seamless resumption
5. **Automate**: Use hooks to automate repetitive tasks

---

## session-start.sh

**When to use**: At the beginning of every development session

**What it does**:
- Creates a new session log file
- Loads previous context
- Shows where you left off
- Displays next tasks

**Usage**:
```bash
bash .kiro/hooks/session-start.sh
```

**Best Practice**: Run this FIRST thing when you start working

---

## session-checkpoint.sh (Master Hook)

**When to use**: 
- After completing a task
- After making significant progress
- Before taking a break
- At least once per hour of work
- Before ending session

**What it does** (3 actions):
1. **Git Commit & Push**: Saves all code changes
2. **Conversation Log**: Records what was done
3. **Context Summary**: Generates resume context

**Usage**:
```bash
bash .kiro/hooks/session-checkpoint.sh
```

**Best Practice**: Run this frequently! Can't run it too often.

---

## session-consolidate.sh (NEW!)

**When to use**: At the end of every development session (BEFORE session-end)

**What it does**:
- Consolidates temporary.md → context-summary.md
- Archives old context-summary.md
- Clears temporary.md for next session
- Ensures FULL context is preserved

**Usage**:
```bash
bash .kiro/hooks/session-consolidate.sh
```

**Best Practice**: Run this at end of session to preserve all context

---

## session-end.sh

**When to use**: At the end of every development session (AFTER consolidate)

**What it does**:
- Runs final checkpoint
- Updates session end time
- Ensures everything is saved

**Usage**:
```bash
bash .kiro/hooks/session-end.sh
```

**Best Practice**: ALWAYS run this before closing your terminal

---

## session-resume.sh

**When to use**: 
- After running session-start.sh
- When you need to remember what you were doing
- When returning after a break

**What it does**:
- Loads all previous context
- Shows recent activity
- Displays next tasks
- Suggests next actions

**Usage**:
```bash
bash .kiro/hooks/session-resume.sh
```

**Best Practice**: Run this whenever you feel lost or need context

---

## task-complete.sh

**When to use**: After completing a task from tasks.md

**What it does**:
- Marks task as complete in tasks.md
- Updates progress metrics
- Logs completion
- Shows next task

**Usage**:
```bash
bash .kiro/hooks/task-complete.sh <task-number>

# Example:
bash .kiro/hooks/task-complete.sh 1.1.1
```

**Best Practice**: Run immediately after completing and testing a task

---

## git-sync.sh

**When to use**: 
- When you want to commit and push quickly
- When checkpoint is overkill
- For quick saves

**What it does**:
- Commits all changes
- Pushes to remote

**Usage**:
```bash
bash .kiro/hooks/git-sync.sh "Your commit message"

# Or use default message:
bash .kiro/hooks/git-sync.sh
```

**Best Practice**: Use checkpoint instead for better context preservation

---

# Context Files

## .kiro/session-state/current-phase.json

**Purpose**: Tracks current phase and progress

**When to update**: 
- When moving to a new phase
- When completing major milestones

**Format**:
```json
{
  "currentPhase": "Phase 1: Foundation",
  "phaseNumber": 1,
  "phaseStatus": "in-progress",
  "nextPhase": "Phase 2: Java Complete",
  "completedTasks": ["1.1.1", "1.1.2"],
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## .kiro/session-state/context-summary.md

**Purpose**: Comprehensive context for current state

**When to update**: Automatically updated by session-checkpoint

**Contains**:
- What was accomplished
- Current status
- Next actions
- Important decisions
- Technical environment

---

## .kiro/session-state/resume-context.md

**Purpose**: Quick resume guide for next session

**When to update**: Automatically updated by session-checkpoint

**Contains**:
- Quick status
- Recent activity
- Where you left off
- Next immediate actions

---

## .kiro/session-logs/conversation-history.md

**Purpose**: Complete log of all sessions

**When to update**: Automatically updated by session-checkpoint

**Contains**:
- All session entries
- Tasks completed
- Files modified
- Conversations
- Next actions

---

# Session Workflow

## Starting a Session

```bash
# 1. Start session
bash .kiro/hooks/session-start.sh

# 2. Review context (automatically shown by session-start)
# Read the output carefully

# 3. Open relevant files
# - tasks.md (to see next task)
# - requirements.md (to understand requirements)
# - design.md (to understand architecture)

# 4. Start working on next task
```

---

## During a Session

```bash
# After completing a task:
bash .kiro/hooks/task-complete.sh 1.1.1

# After significant progress (every 30-60 minutes):
bash .kiro/hooks/session-checkpoint.sh

# Quick save (if needed):
bash .kiro/hooks/git-sync.sh "Quick save: working on feature X"
```

---

## Ending a Session

```bash
# 1. Complete current task or reach a good stopping point

# 2. Run final checkpoint
bash .kiro/hooks/session-checkpoint.sh

# 3. Consolidate session notes (NEW!)
bash .kiro/hooks/session-consolidate.sh

# 4. End session
bash .kiro/hooks/session-end.sh

# 5. Review session log (optional)
cat .kiro/session-logs/conversation-history.md
```

---

# Troubleshooting

## If You Forget Where You Were

```bash
# 1. Run session resume
bash .kiro/hooks/session-resume.sh

# 2. Read resume context
cat .kiro/session-state/resume-context.md

# 3. Check conversation history
tail -100 .kiro/session-logs/conversation-history.md

# 4. Check git log
git log --oneline -10

# 5. Check task progress
grep "\[x\]" .kiro/specs/comprehensive-learning-portal/tasks.md | tail -5
```

---

## If Context Files Are Missing

```bash
# 1. Check git history
git log --all --full-history -- .kiro/session-state/

# 2. Restore from git
git checkout HEAD~1 -- .kiro/session-state/

# 3. If all else fails, reconstruct from:
# - Git commit messages
# - Completed tasks in tasks.md
# - Code changes in git diff
```

---

## If You Made Changes Without Committing

```bash
# 1. Check what changed
git status
git diff

# 2. Review changes carefully

# 3. Commit with descriptive message
git add .
git commit -m "Detailed description of changes"

# 4. Run checkpoint to update context
bash .kiro/hooks/session-checkpoint.sh
```

---

## If Everything Is Lost

1. **Check Git Remote**:
   ```bash
   git fetch origin
   git log origin/main
   ```

2. **Restore from Remote**:
   ```bash
   git reset --hard origin/main
   ```

3. **Reconstruct Context**:
   - Review git commit history
   - Check completed tasks in tasks.md
   - Review code to understand current state
   - Manually update context files

4. **Resume Work**:
   ```bash
   bash .kiro/hooks/session-start.sh
   ```

---

## Best Practices

### DO:
✅ Run session-start at beginning of every session  
✅ Run session-checkpoint frequently (every 30-60 min)  
✅ Run session-end at end of every session  
✅ Commit after completing each task  
✅ Write descriptive commit messages  
✅ Document decisions in session logs  
✅ Keep context files up-to-date  
✅ Review context before starting work

### DON'T:
❌ Skip running hooks  
❌ Make changes without committing  
❌ Delete context files  
❌ Work for hours without checkpoint  
❌ End session without running session-end  
❌ Ignore uncommitted changes  
❌ Forget to push to remote

---

## Automation Tips

### Create Aliases

Add to your `.bashrc` or `.zshrc`:

```bash
alias session-start='bash .kiro/hooks/session-start.sh'
alias session-checkpoint='bash .kiro/hooks/session-checkpoint.sh'
alias session-end='bash .kiro/hooks/session-end.sh'
alias session-resume='bash .kiro/hooks/session-resume.sh'
alias task-done='bash .kiro/hooks/task-complete.sh'
```

Then use:
```bash
session-start
session-checkpoint
task-done 1.1.1
session-end
```

---

## Why This Is Needed

Without proper session continuity, Kiro starts each session "fresh" without knowledge of:
- What was accomplished in previous sessions
- Current phase and progress
- Technical decisions made
- Build configurations
- Issues that were resolved

This causes:
- ❌ Repeated questions about the same things
- ❌ Loss of context between sessions
- ❌ Frustration and wasted time
- ❌ Having to re-explain everything

With proper session continuity:
- ✅ Kiro loads all context automatically
- ✅ Knows exactly where you left off
- ✅ Remembers all decisions and fixes
- ✅ Can continue work seamlessly

---

**Remember**: Session continuity is not optional. It's the foundation that enables a 16-20 month project to succeed without context loss. Use the hooks religiously!
