# Quick Start Guide - Context & Spec-Driven Development

## 🚀 For New Sessions

### 1. Tell Kiro to Load Context
```
"Please read .kiro/steering/SESSION_GUIDE.md to load the full project context"
```

Kiro will automatically read:
- `temporary.md` (current session notes)
- `.kiro/session-state/context-summary.md` (full context)
- `.kiro/session-state/resume-context.md` (quick overview)
- `.kiro/session-state/current-phase.json` (phase tracking)

### 2. Kiro Should Acknowledge
- Current phase
- Tasks complete
- Last accomplishment
- Current issues/blockers

---

## 📝 During Work

### Add Notes to temporary.md
Both you and Kiro should add notes as you work:
- Issues encountered
- Decisions made
- Things to remember
- What's fixed, what's not

### Run Checkpoint Every 30-60 Minutes
```bash
bash .kiro/hooks/session-checkpoint.sh
```

---

## 🎯 Spec-Driven Development

### BEFORE Writing ANY Code:

1. **Update requirements.md**
   - Add user story
   - Add acceptance criteria (EARS format)

2. **Update design.md**
   - Add component architecture
   - Add interfaces/data models
   - Document design decisions

3. **Update tasks.md**
   - Add implementation task
   - Reference requirements
   - Set dependencies

4. **THEN implement the code**

5. **Mark task complete in tasks.md**

### The 3 Spec Files:
```
.kiro/specs/comprehensive-learning-portal/
├── requirements.md  ← WHAT to build
├── design.md        ← HOW to build
└── tasks.md         ← WHEN to build
```

---

## 🏁 End of Session

### 1. Consolidate Context
```bash
bash .kiro/hooks/session-consolidate.sh
```
This moves `temporary.md` → `context-summary.md`

### 2. End Session
```bash
bash .kiro/hooks/session-end.sh
```

---

## 📚 Reference Documents

All steering documents are auto-loaded for Kiro in every session:

- **.kiro/steering/CONTEXT_MANAGEMENT_GUIDE.md** - Full context management guide
- **.kiro/steering/SPEC_DRIVEN_WORKFLOW.md** - Spec-driven workflow with examples
- **.kiro/steering/SESSION_GUIDE.md** - Complete session management guide
- **.kiro/steering/KIRO_CHECKLIST.md** - Kiro's pre-flight checklist
- **.kiro/steering/PROJECT_GUIDE.md** - Coding standards and testing
- **.kiro/steering/PROJECT_STATUS.md** - Current progress
- **my-reference** - Your personal quick reference

---

## ⚠️ Critical Rules

### ✅ ALWAYS:
- Update specs BEFORE writing code
- Read full context at session start
- Add notes to temporary.md
- Run checkpoint every 30-60 min
- Consolidate at end of session

### ❌ NEVER:
- Write code without updating specs first
- Skip reading context files
- Skip consolidation at end of session
- Keep decisions only in temporary.md
- Assume specs are "done"

---

## 🔍 Quick Commands

```bash
# Session management
bash .kiro/hooks/session-checkpoint.sh      # Save progress
bash .kiro/hooks/session-consolidate.sh     # Consolidate context
bash .kiro/hooks/session-end.sh             # End session

# View files
cat temporary.md                            # Current notes
cat .kiro/session-state/context-summary.md  # Full context
cat .kiro/specs/comprehensive-learning-portal/tasks.md  # Tasks

# Edit specs
code .kiro/specs/comprehensive-learning-portal/requirements.md
code .kiro/specs/comprehensive-learning-portal/design.md
code .kiro/specs/comprehensive-learning-portal/tasks.md
```

---

**Print this and keep it visible!**

