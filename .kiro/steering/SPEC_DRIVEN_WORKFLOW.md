# Spec-Driven Development Workflow

## 🎯 Golden Rule

**NO CODE CHANGES WITHOUT UPDATING SPECS FIRST**

---

## The 3 Spec Files (Single Source of Truth)

```
.kiro/specs/comprehensive-learning-portal/
├── requirements.md  ← WHAT (user stories, acceptance criteria)
├── design.md        ← HOW (architecture, components, design)
└── tasks.md         ← WHEN (implementation tasks, progress)
```

---

## Workflow for ANY Change

```
┌─────────────────────────────────────────┐
│ User requests feature/change            │
└─────────────────┬───────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ 1. Update requirements.md               │
│    - Add user story                     │
│    - Add acceptance criteria (EARS)     │
└─────────────────┬───────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ 2. Update design.md                     │
│    - Add component architecture         │
│    - Add interfaces/data models         │
│    - Add correctness properties         │
│    - Document design decisions          │
└─────────────────┬───────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ 3. Update tasks.md                      │
│    - Add implementation task            │
│    - Reference requirements             │
│    - Set task order/dependencies        │
└─────────────────┬───────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ 4. Implement the code                   │
│    - Follow design from specs           │
│    - Test as you go                     │
└─────────────────┬───────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ 5. Mark task complete in tasks.md      │
│    - Update progress                    │
└─────────────────┬───────────────────────┘
                  ↓
┌─────────────────────────────────────────┐
│ 6. Update specs if needed               │
│    - Document any implementation issues │
│    - Refine design based on learnings   │
└─────────────────────────────────────────┘
```

---

## Quick Checklist

Before writing ANY code, ask:

- [ ] Did I update requirements.md with acceptance criteria?
- [ ] Did I update design.md with architecture/design?
- [ ] Did I update tasks.md with implementation task?
- [ ] Do all 3 spec files align and reference each other?

After writing code, ask:

- [ ] Did I mark the task complete in tasks.md?
- [ ] Did implementation reveal any issues that need spec updates?
- [ ] Are the specs still accurate after implementation?
- [ ] Did I document any design decisions made during implementation?

---

## When to Update Specs

### ✅ ALWAYS Update:

- User requests new feature
- Making architectural decisions
- Changing component interfaces
- Discovering issues during implementation
- Modifying existing functionality
- Adding new requirements
- Refactoring major components
- Adding new dependencies

### ❌ NEVER:

- Write code without updating specs first
- Skip spec updates "to save time"
- Keep decisions only in temporary.md or context-summary.md
- Assume specs are "done" after initial creation
- Make "quick fixes" without documenting

---

## Example: Adding CodeTabs Component

### ❌ Bad Workflow:

```
User: "Add CodeTabs for multi-language solutions"
Kiro: *immediately writes CodeTabs.tsx*
Result: 
  - No documentation
  - Specs outdated
  - Future Kiro sessions won't know why it exists
  - Can't trace back to requirements
```

### ✅ Good Workflow:

```
User: "Add CodeTabs for multi-language solutions"

Kiro:
  Step 1: Update requirements.md
    - Add Requirement 1.18: Multi-language Code Display
    - Add acceptance criteria (EARS format)
  
  Step 2: Update design.md
    - Add CodeTabs component architecture
    - Document Monaco Editor integration
    - Add correctness properties
  
  Step 3: Update tasks.md
    - Add Task 2.1.6: Implement CodeTabs component
    - Reference Requirement 1.18
  
  Step 4: Implement CodeTabs.tsx
    - Follow design from specs
    - Test with multiple languages
  
  Step 5: Mark Task 2.1.6 complete
    - Update progress in tasks.md
  
  Step 6: Update specs if needed
    - Document any implementation learnings

Result:
  ✅ Fully documented
  ✅ Specs accurate
  ✅ Traceable to requirements
  ✅ Future sessions have context
```

---

## Why This Matters

### Benefits:

1. **Context Preservation**: Specs survive across sessions
2. **Single Source of Truth**: No conflicting information
3. **Onboarding**: New developers/AI understand the system
4. **Traceability**: Every feature traces to requirements
5. **Quality**: Design decisions documented and reviewed
6. **Maintainability**: Easy to understand why things exist

### Without Spec-Driven Development:

- ❌ Context lost between sessions
- ❌ Code exists without documentation
- ❌ Can't trace features to requirements
- ❌ Design decisions forgotten
- ❌ New developers/AI confused
- ❌ Technical debt accumulates

---

## Commands to Open Spec Files

```bash
# Requirements
code .kiro/specs/comprehensive-learning-portal/requirements.md

# Design
code .kiro/specs/comprehensive-learning-portal/design.md

# Tasks
code .kiro/specs/comprehensive-learning-portal/tasks.md
```

---

## Integration with Session Management

### During Session:

1. Work on task from tasks.md
2. Add notes to temporary.md
3. Update specs as you make decisions
4. Run checkpoint every 30-60 min

### End of Session:

1. Ensure all spec updates are committed
2. Run consolidate (temporary.md → context-summary.md)
3. Run session-end

### Next Session:

1. Read context-summary.md (has full context)
2. Read specs to understand current state
3. Continue with next task

---

## Remember:

**Specs are not "extra work" - they ARE the work.**

Code without specs is technical debt.  
Specs without code is just planning.  
**Specs + Code = Sustainable development.**

---

**Print this and keep it visible while working!**

