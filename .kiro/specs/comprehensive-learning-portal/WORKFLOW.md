# Documentation Update Workflow

**Purpose**: Simple guide for keeping spec documents up-to-date

---

## 📋 Quick Reference

| Document | When to Update | Who Updates | How Often |
|----------|---------------|-------------|-----------|
| **PROGRESS.md** | After each task | You or Kiro | Every task |
| **tasks.md** | When task completes | You or Kiro | Every task |
| **CHANGELOG.md** | Significant milestones | You or Kiro | Weekly/milestone |
| **requirements.md** | Requirement changes | You or Kiro | Rarely |
| **design.md** | Design changes | You or Kiro | Rarely |

---

## 🔄 Standard Workflow

### Starting a Session

```bash
# 1. Run session start hook
bash .kiro/hooks/session-start.sh

# 2. Read PROGRESS.md to see where you left off
cat .kiro/specs/comprehensive-learning-portal/PROGRESS.md

# 3. Check tasks.md for next task
grep -A 5 "^\- \[ \]" .kiro/specs/comprehensive-learning-portal/tasks.md | head -20
```

### During Work (After Each Task)

**Option A: Manual Update** (Simple)
```bash
# 1. Mark task complete in tasks.md
# Change: - [ ] 1.8.4 Write property tests
# To:     - [x] 1.8.4 Write property tests

# 2. Update PROGRESS.md
# Add to "Current Session Progress" section:
# - ✅ Task 1.8.4: Property tests for authentication (2 hours)

# 3. Run checkpoint
bash .kiro/hooks/session-checkpoint.sh
```

**Option B: With Kiro** (Assisted)
```
Just tell me: "I completed task 1.8.4"
I'll update both files for you!
```

### Ending a Session

```bash
# 1. Final update to PROGRESS.md
# Update "Time Invested" and "Next Steps"

# 2. Run session end
bash .kiro/hooks/session-end.sh

# 3. Commit everything
git add .
git commit -m "Session complete: [brief summary]"
git push
```

---

## 📝 Document-Specific Guidelines

### PROGRESS.md Updates

**After Each Task:**
```markdown
### Today's Accomplishments (Nov 22, 2025)

**Testing Infrastructure Setup** - 4 tasks completed:  # ← Update count

1. ✅ **Task 1.8.1**: Unit Testing Framework
   - [existing content]

2. ✅ **Task 1.8.2**: Property-Based Testing (Backend)
   - [existing content]

3. ✅ **Task 1.8.3**: Property-Based Testing (Frontend)
   - [existing content]

4. ✅ **Task 1.8.4**: Property Tests for Authentication  # ← ADD NEW
   - Implemented Properties 1-3 from design document
   - JWT token round-trip, password hashing, invalid token rejection
   - All 3 properties passing with 100 iterations each

**Time Invested**: ~3.5 hours  # ← Update total
```

**Update Progress Bar:**
```markdown
Phase 1: ████████████████████░░░░ 88% (57/64 tasks)  # ← Recalculate
```

**Update Remaining Work:**
```markdown
### Remaining Work

**Estimated Time**: 11-14 hours (~1.5 days)  # ← Adjust estimate

1. ~~**Task 1.8.4**: Property tests for authentication~~ ✅ DONE
2. **Task 1.8.5**: Property tests for code execution (4-5 hours)  # ← Next task
```

### tasks.md Updates

**Simple checkbox change:**
```markdown
# Before:
- [ ] 1.8.4 Write property tests for authentication

# After:
- [x] 1.8.4 Write property tests for authentication
```

**That's it!** The task details stay the same.

### CHANGELOG.md Updates

**When to update:**
- Completed a full section (e.g., all testing infrastructure)
- Made significant technical decisions
- Completed a phase
- Weekly summary

**Format:**
```markdown
## Version 1.0.4 - [Feature Name] (2024-11-23)

### Added
- List of new features/capabilities

### Completed Tasks
- ✅ Task X.Y.Z: Description

### Files Created
- List of new files

### Test Results
- Test metrics

### Impact
- What this enables

### Rationale
- Why we did it this way
```

---

## 🤖 Automation Options

### Current Automation (Via Hooks)

**session-checkpoint.sh** does:
```bash
# 1. Git commit and push
git add .
git commit -m "Checkpoint: [timestamp]"
git push

# 2. Log conversation
echo "[conversation]" >> .kiro/session-logs/conversation-history.md

# 3. Generate context summary
# Updates .kiro/session-state/context-summary.md
```

### Potential Enhancements

**Auto-update PROGRESS.md:**
```bash
# Could add to session-checkpoint.sh:
# - Count completed tasks in tasks.md
# - Calculate progress percentage
# - Update timestamp
# - Append to "Current Session Progress"
```

**Auto-update tasks.md:**
```bash
# Could create task-complete.sh enhancement:
# - Mark task as complete
# - Update PROGRESS.md
# - Run checkpoint
```

---

## 💡 Best Practices

### DO ✅

1. **Update PROGRESS.md after each task**
   - Keeps status current
   - Easy to resume later

2. **Mark tasks in tasks.md immediately**
   - Don't forget what you completed
   - Accurate progress tracking

3. **Run session-checkpoint regularly**
   - Every 30-60 minutes
   - After completing each task
   - Before taking breaks

4. **Update CHANGELOG.md for milestones**
   - Weekly summaries
   - Phase completions
   - Major features

5. **Keep updates concise**
   - Bullet points
   - Key metrics
   - No essays

### DON'T ❌

1. **Don't create new status files**
   - Use PROGRESS.md instead
   - Keep it centralized

2. **Don't skip updates**
   - Hard to remember later
   - Context loss

3. **Don't update requirements/design casually**
   - These are stable documents
   - Only change for real requirement changes

4. **Don't forget to commit**
   - Updates are useless if not saved
   - Use session-checkpoint

---

## 🎯 Quick Commands

### View Current Status
```bash
# See progress
cat .kiro/specs/comprehensive-learning-portal/PROGRESS.md | head -50

# See recent changes
cat .kiro/specs/comprehensive-learning-portal/CHANGELOG.md | head -100

# Count completed tasks
grep -c "^\- \[x\]" .kiro/specs/comprehensive-learning-portal/tasks.md

# Count remaining tasks
grep -c "^\- \[ \]" .kiro/specs/comprehensive-learning-portal/tasks.md
```

### Update Files
```bash
# Edit PROGRESS.md
code .kiro/specs/comprehensive-learning-portal/PROGRESS.md

# Edit tasks.md
code .kiro/specs/comprehensive-learning-portal/tasks.md

# Edit CHANGELOG.md
code .kiro/specs/comprehensive-learning-portal/CHANGELOG.md
```

### Run Hooks
```bash
# Checkpoint (do this often!)
bash .kiro/hooks/session-checkpoint.sh

# End session
bash .kiro/hooks/session-end.sh

# Resume session
bash .kiro/hooks/session-resume.sh
```

---

## 📊 Example: Complete Task Workflow

Let's say you just completed Task 1.8.4:

```bash
# 1. Mark task complete in tasks.md
# Change: - [ ] 1.8.4 Write property tests for authentication
# To:     - [x] 1.8.4 Write property tests for authentication

# 2. Update PROGRESS.md
# Add to "Today's Accomplishments":
# 4. ✅ **Task 1.8.4**: Property Tests for Authentication
#    - Implemented Properties 1-3
#    - All tests passing (300+ test cases)
#    - Time: 2 hours

# Update "Time Invested": ~3.5 hours (was ~1.5 hours)
# Update progress bar: 88% (57/64 tasks)
# Update "Remaining Work": Remove 1.8.4, adjust estimates

# 3. Run checkpoint
bash .kiro/hooks/session-checkpoint.sh

# 4. Commit
git add .
git commit -m "Complete Task 1.8.4: Authentication property tests"
git push
```

**Done!** That's the complete workflow.

---

## 🔧 Future Automation Ideas

### Task Completion Script
```bash
#!/bin/bash
# .kiro/hooks/complete-task.sh

TASK_ID=$1  # e.g., "1.8.4"
DESCRIPTION=$2  # e.g., "Property tests for authentication"

# 1. Mark task complete in tasks.md
sed -i '' "s/- \[ \] $TASK_ID/- [x] $TASK_ID/" .kiro/specs/comprehensive-learning-portal/tasks.md

# 2. Append to PROGRESS.md
echo "- ✅ **Task $TASK_ID**: $DESCRIPTION" >> .kiro/specs/comprehensive-learning-portal/PROGRESS.md

# 3. Run checkpoint
bash .kiro/hooks/session-checkpoint.sh

echo "✅ Task $TASK_ID marked complete!"
```

**Usage:**
```bash
bash .kiro/hooks/complete-task.sh "1.8.4" "Property tests for authentication"
```

### Progress Calculator Script
```bash
#!/bin/bash
# .kiro/hooks/calculate-progress.sh

COMPLETED=$(grep -c "^\- \[x\]" .kiro/specs/comprehensive-learning-portal/tasks.md)
TOTAL=$(grep -c "^\- \[" .kiro/specs/comprehensive-learning-portal/tasks.md)
PERCENT=$((COMPLETED * 100 / TOTAL))

echo "Progress: $COMPLETED/$TOTAL tasks ($PERCENT%)"
```

---

## 📞 Need Help?

**If you're unsure what to update:**
1. Just ask me: "What should I update after completing task X?"
2. I'll tell you exactly what to change
3. Or I can update it for you!

**If you forget to update:**
1. Check git log to see what you did
2. Update PROGRESS.md retroactively
3. Better late than never!

**If files get out of sync:**
1. PROGRESS.md is the source of truth
2. Recalculate from tasks.md checkboxes
3. Ask me to help reconcile

---

**Remember**: The goal is to make resuming work easy. A few minutes updating docs saves hours of confusion later!
