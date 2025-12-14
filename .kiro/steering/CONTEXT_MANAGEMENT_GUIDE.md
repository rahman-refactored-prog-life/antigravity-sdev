# Context Management Guide

## The Problem We're Solving

The CONVERSATION SUMMARY at session start was incomplete because:
1. It's auto-generated and condensed (loses details)
2. `temporary.md` wasn't being consolidated into `context-summary.md`
3. Context was fragmented across multiple files

## The Solution

### 3-File System:

1. **`temporary.md`** - Active session notes (you and Kiro add notes during work)
2. **`context-summary.md`** - Complete consolidated context (read at session start)
3. **Session logs** - Archived history (`.kiro/session-logs/`)

---

## Workflow

### 📝 During Session

**Use `temporary.md` for:**
- Issues encountered
- Decisions made
- Things to remember
- Quick notes
- "Where we left off"

**Both you and Kiro should add notes to this file as you work!**

Example:
```markdown
## 2024-11-30 Session

### Issues Found
- TOC anchor links not working (ID mismatch)
- CodeTabs not displaying (grouping logic issue)

### Decisions Made
- No pagination for long content (better UX)
- Dynamic sidebar needed (add to tasks)

### Fixed
- ✅ Sidebar 404 error
- ✅ Template header removed

### Still TODO
- ❌ TOC anchor links
- ❌ CodeTabs integration
- ❌ Interactive Monaco Editor
```

### 🔄 Every 30-60 Minutes

Run checkpoint to save progress:
```bash
bash .kiro/hooks/session-checkpoint.sh
```

This commits code and logs activity.

### 🏁 End of Session

**Step 1: Consolidate Context**
```bash
bash .kiro/hooks/session-consolidate.sh
```

This:
- Moves ALL content from `temporary.md` → `context-summary.md`
- Archives old `context-summary.md`
- Clears `temporary.md` for next session

**Step 2: End Session**
```bash
bash .kiro/hooks/session-end.sh
```

This runs final checkpoint and closes session.

### 🚀 Start of Next Session

**Step 1: Tell Kiro to read context**
```
"Please read .kiro/steering/SESSION_GUIDE.md to load the full project context"
```

**Step 2: Kiro reads these files IN ORDER:**
1. `temporary.md` (current session notes - may be empty if new session)
2. `.kiro/session-state/context-summary.md` (FULL consolidated context)
3. `.kiro/session-state/resume-context.md` (quick overview)
4. `.kiro/session-state/current-phase.json` (phase tracking)

**Step 3: Kiro acknowledges:**
- Current phase
- Tasks complete
- Last thing accomplished
- Current issues/blockers

---

## Why This Works

### ✅ Benefits:

1. **No Context Loss**: Everything from `temporary.md` gets consolidated
2. **Full Details**: `context-summary.md` has complete session history
3. **Clean Slate**: Each session starts with fresh `temporary.md`
4. **Archived History**: Old contexts saved in session-logs
5. **Easy Recovery**: Can always restore from archives

### 📊 File Sizes:

- `temporary.md`: Grows during session, cleared at end
- `context-summary.md`: Complete but organized (not bloated)
- Archives: Unlimited history in `.kiro/session-logs/`

---

## Best Practices

### DO:
✅ Add notes to `temporary.md` as you work  
✅ Run checkpoint every 30-60 minutes  
✅ Run consolidate at end of EVERY session  
✅ Read `context-summary.md` at start of EVERY session  
✅ Keep notes organized and clear  
✅ **ALWAYS update spec files (requirements.md, design.md, tasks.md) for ANY changes**  
✅ **Follow spec-driven development - specs are single source of truth**

### DON'T:
❌ Skip consolidation (context will be lost!)  
❌ Let `temporary.md` grow too large (consolidate regularly)  
❌ Delete `context-summary.md` (it's your source of truth)  
❌ Forget to read context at session start  
❌ **Make code changes without updating spec documents first**  
❌ **Skip updating specs when decisions or features change**

---

## 🎯 CRITICAL: Spec-Driven Development

### The Golden Rule:

**ALL decisions, features, and changes MUST be documented in spec files FIRST.**

### The 3 Spec Files (Single Source of Truth):

1. **`requirements.md`** - WHAT needs to be built (user stories, acceptance criteria)
2. **`design.md`** - HOW it will be built (architecture, components, correctness properties)
3. **`tasks.md`** - WHEN it will be built (implementation tasks, order, dependencies)

### Workflow for ANY Change:

```
1. Identify need for change/feature
   ↓
2. Update requirements.md (add/modify acceptance criteria)
   ↓
3. Update design.md (add/modify architecture/components)
   ↓
4. Update tasks.md (add/modify implementation tasks)
   ↓
5. THEN implement the code
   ↓
6. Update specs if implementation reveals issues
```

### When to Update Specs:

✅ **ALWAYS update specs when:**
- Adding a new feature
- Modifying existing functionality
- Making architectural decisions
- Changing component interfaces
- Adding new requirements
- Discovering issues during implementation
- User requests changes
- Design needs refinement

❌ **NEVER:**
- Make code changes without updating specs first
- Skip spec updates "to save time"
- Keep decisions only in temporary.md or context-summary.md
- Assume specs are "done" after initial creation

### Example:

**Bad Workflow:**
```
User: "Add CodeTabs component"
Kiro: *writes code immediately*
Result: No documentation, context lost, specs outdated
```

**Good Workflow:**
```
User: "Add CodeTabs component"
Kiro: 
  1. Updates requirements.md (adds acceptance criteria)
  2. Updates design.md (adds component architecture)
  3. Updates tasks.md (adds implementation task)
  4. Implements the code
  5. Marks task complete
Result: Fully documented, specs accurate, context preserved
```

### Spec File Locations:

```
.kiro/specs/comprehensive-learning-portal/
├── requirements.md  ← User stories & acceptance criteria
├── design.md        ← Architecture & design decisions
└── tasks.md         ← Implementation tasks & progress
```

### Why This Matters:

- **Context Preservation**: Specs survive across sessions
- **Single Source of Truth**: No conflicting information
- **Onboarding**: New developers/AI can understand the system
- **Traceability**: Every feature traces back to requirements
- **Quality**: Design decisions are documented and reviewed

---

## Troubleshooting

### If Context Is Missing:

1. Check `.kiro/session-logs/` for archived sessions
2. Check git history: `git log --all --full-history -- .kiro/session-state/`
3. Restore from archive: `cp .kiro/session-logs/session-archive-*.md .kiro/session-state/context-summary.md`

### If `temporary.md` Is Too Large:

1. Run consolidate immediately: `bash .kiro/hooks/session-consolidate.sh`
2. This moves everything to `context-summary.md`
3. Clears `temporary.md` for fresh start

### If Kiro Doesn't Have Context:

1. Verify Kiro read `context-summary.md` completely
2. Check file size: `wc -l .kiro/session-state/context-summary.md`
3. If truncated, tell Kiro to read in chunks (lines 1-1000, 1001-2000, etc.)

---

## Quick Reference

### Session Start:
```bash
# Tell Kiro:
"Please read .kiro/steering/SESSION_GUIDE.md"

# Kiro will automatically read:
# - temporary.md
# - context-summary.md
# - resume-context.md
# - current-phase.json
```

### During Session:
```bash
# Add notes to temporary.md as you work
# Run checkpoint every 30-60 min
bash .kiro/hooks/session-checkpoint.sh
```

### Session End:
```bash
# Consolidate context
bash .kiro/hooks/session-consolidate.sh

# End session
bash .kiro/hooks/session-end.sh
```

---

**Remember**: Context management is not optional. It's the foundation that enables a 16-20 month project to succeed without context loss!

