# Kiro's Pre-Flight Checklist

**Purpose**: Checklist for Kiro to follow BEFORE making any code changes

---

## 📋 Before ANY Code Change

### Step 1: Understand the Request
- [ ] Read user's request completely
- [ ] Clarify any ambiguities
- [ ] Understand the "why" behind the request

### Step 2: Check Current State
- [ ] Read temporary.md for current session context
- [ ] Read context-summary.md for full project context
- [ ] Check current phase in current-phase.json
- [ ] Review relevant spec files

### Step 3: Update Specs FIRST
- [ ] Update requirements.md (add/modify acceptance criteria)
- [ ] Update design.md (add/modify architecture/design)
- [ ] Update tasks.md (add/modify implementation task)
- [ ] Ensure all 3 specs align and reference each other

### Step 4: Implement
- [ ] Follow design from specs
- [ ] Write tests as you go
- [ ] Test functionality
- [ ] Commit code

### Step 5: Document
- [ ] Mark task complete in tasks.md
- [ ] Add notes to temporary.md
- [ ] Update specs if implementation revealed issues
- [ ] Run checkpoint if significant progress

---

## 🚫 NEVER Do This

❌ Write code without updating specs first  
❌ Skip reading context files at session start  
❌ Assume you know the full context  
❌ Make "quick fixes" without documentation  
❌ Skip testing  
❌ Forget to mark tasks complete  
❌ Leave specs outdated

---

## ✅ ALWAYS Do This

✅ Read ALL context files completely (in chunks if needed)  
✅ Update specs BEFORE writing code  
✅ Follow spec-driven development workflow  
✅ Test as you go  
✅ Document decisions in specs  
✅ Add notes to temporary.md  
✅ Mark tasks complete  
✅ Run checkpoint regularly

---

## 📁 File Reading Order (Session Start)

1. **temporary.md** - Current session notes (may be empty)
2. **context-summary.md** - Full consolidated context
3. **resume-context.md** - Quick overview
4. **current-phase.json** - Phase tracking
5. **tasks.md** - Current tasks and progress
6. **requirements.md** - Requirements for current task
7. **design.md** - Design for current task

**If any file is truncated, read it in chunks until complete!**

---

## 🎯 Spec-Driven Development Reminder

```
User Request
     ↓
Update requirements.md
     ↓
Update design.md
     ↓
Update tasks.md
     ↓
Implement code
     ↓
Mark task complete
     ↓
Update specs if needed
```

**NO SHORTCUTS!**

---

## 💬 Communication with User

### After Reading Context:
- State current phase
- State tasks complete
- Mention SPECIFIC last accomplishment
- Mention current issues/blockers
- Ask what to work on next

### Before Making Changes:
- Explain what you'll update in specs
- Explain what you'll implement
- Get user confirmation if unclear

### After Making Changes:
- Summarize what was done
- Show what was updated in specs
- Show what was implemented
- Ask user to test/verify

---

## 🔍 Self-Check Questions

Before proceeding, ask yourself:

1. **Context**: Do I have COMPLETE context from all files?
2. **Specs**: Are specs updated for this change?
3. **Alignment**: Do requirements, design, and tasks align?
4. **Testing**: Have I tested this change?
5. **Documentation**: Are all decisions documented?
6. **Progress**: Is task marked complete in tasks.md?
7. **Notes**: Did I add notes to temporary.md?

If ANY answer is "no", STOP and fix it!

---

## 📊 Quality Metrics

Aim for:
- ✅ 100% spec coverage (every feature in specs)
- ✅ 100% task completion tracking
- ✅ 100% context preservation
- ✅ 0% undocumented decisions
- ✅ 0% code without specs

---

**Remember: You are not just writing code, you are building a sustainable, documented, traceable system that will last 16-20 months!**

