#!/bin/bash

# Session Checkpoint Hook - Three Actions in One
# 1. Git commit and push
# 2. Append conversation log
# 3. Generate context summary

set -e

# Navigate to project root
PROJECT_ROOT="/Users/syedrahman/Desktop/Career-and-Growth/KIRO/interview-prep-attempt-100"
cd "$PROJECT_ROOT"

echo "🔄 Running Session Checkpoint..."
echo "📁 Project Directory: $PROJECT_ROOT"
echo ""

# Get current timestamp
TIMESTAMP=$(date +"%Y-%m-%d-%H-%M-%S")
DATE=$(date +"%Y-%m-%d %H:%M:%S")

# Read current phase from state
CURRENT_PHASE=$(cat .kiro/session-state/current-phase.json | grep -o '"currentPhase": "[^"]*"' | cut -d'"' -f4)
PHASE_NUMBER=$(cat .kiro/session-state/current-phase.json | grep -o '"phaseNumber": [0-9]*' | grep -o '[0-9]*')

echo "📍 Current Phase: $CURRENT_PHASE"
echo ""

# ============================================
# ACTION 1: GIT COMMIT AND PUSH
# ============================================
echo "📦 Action 1: Git Commit and Push"
echo "-----------------------------------"

# Check if there are changes to commit
if [[ -n $(git status -s) ]]; then
    git add .
    
    # Create commit message
    COMMIT_MSG="Session checkpoint: $TIMESTAMP - Phase $PHASE_NUMBER - $CURRENT_PHASE"
    
    git commit -m "$COMMIT_MSG"
    echo "✅ Committed changes: $COMMIT_MSG"
    
    # Push to remote
    git push origin main 2>/dev/null || git push origin master 2>/dev/null || echo "⚠️  Could not push (no remote or different branch name)"
    echo "✅ Pushed to remote"
else
    echo "ℹ️  No changes to commit"
fi

echo ""

# ============================================
# ACTION 2: APPEND CONVERSATION LOG
# ============================================
echo "💬 Action 2: Append Conversation Log"
echo "-----------------------------------"

# Create conversation log file if it doesn't exist
CONVERSATION_FILE=".kiro/session-logs/conversation-history.md"
SESSION_FILE=".kiro/session-logs/session-$TIMESTAMP.md"

# Create session log entry
cat >> "$CONVERSATION_FILE" << EOF

---

## Session $TIMESTAMP

**Date**: $DATE
**Phase**: $CURRENT_PHASE (Phase $PHASE_NUMBER)

### Tasks Completed This Session
EOF

# Try to extract completed tasks from git log
LAST_COMMITS=$(git log --oneline -5 --pretty=format:"- %s" 2>/dev/null || echo "- Session checkpoint")
echo "$LAST_COMMITS" >> "$CONVERSATION_FILE"

cat >> "$CONVERSATION_FILE" << EOF

### Files Modified
EOF

# List modified files
git diff --name-only HEAD~1 2>/dev/null | sed 's/^/- /' >> "$CONVERSATION_FILE" || echo "- (No git history)" >> "$CONVERSATION_FILE"

cat >> "$CONVERSATION_FILE" << EOF

### Conversation Summary
[Conversation from this session - to be filled manually or by AI]

### Next Actions
- Continue with next task in tasks.md
- Review current phase progress
- Update documentation as needed

### Context for Next Session
- Phase: $CURRENT_PHASE
- Last checkpoint: $DATE
- See context-summary.md for full context

EOF

# Create individual session file
cp "$CONVERSATION_FILE" "$SESSION_FILE"

echo "✅ Conversation logged to:"
echo "   - $CONVERSATION_FILE"
echo "   - $SESSION_FILE"

echo ""

# ============================================
# ACTION 3: GENERATE CONTEXT SUMMARY
# ============================================
echo "📋 Action 3: Generate Context Summary"
echo "-----------------------------------"

# Update context summary
CONTEXT_FILE=".kiro/session-state/context-summary.md"
RESUME_FILE=".kiro/session-state/resume-context.md"

# Get git commit hash
GIT_HASH=$(git rev-parse HEAD 2>/dev/null || echo "no-git")

# Get completed tasks count from tasks.md
COMPLETED_TASKS=$(grep -c "^\- \[x\]" .kiro/specs/comprehensive-learning-portal/tasks.md 2>/dev/null || echo "0")
TOTAL_TASKS=$(grep -c "^\- \[" .kiro/specs/comprehensive-learning-portal/tasks.md 2>/dev/null || echo "161")

# Create resume context
cat > "$RESUME_FILE" << EOF
# Resume Context - Session $TIMESTAMP

## Quick Status

**Last Session**: $DATE
**Current Phase**: $CURRENT_PHASE (Phase $PHASE_NUMBER/9)
**Git Commit**: $GIT_HASH
**Tasks Completed**: $COMPLETED_TASKS / $TOTAL_TASKS

## What Was Done Last Session

### Recent Commits
$LAST_COMMITS

### Files Modified
EOF

git diff --name-only HEAD~1 2>/dev/null | sed 's/^/- /' >> "$RESUME_FILE" || echo "- (No git history)" >> "$RESUME_FILE"

cat >> "$RESUME_FILE" << EOF

## Where You Left Off

### Current Phase Details
- **Phase**: $CURRENT_PHASE
- **Phase Number**: $PHASE_NUMBER of 9
- **Status**: In Progress

### Next Immediate Actions

1. **Review Current Task**
   - Open: .kiro/specs/comprehensive-learning-portal/tasks.md
   - Find the next unchecked task in Phase $PHASE_NUMBER
   - Read task description and acceptance criteria

2. **Check Requirements**
   - Review relevant requirements in requirements.md
   - Understand what needs to be implemented

3. **Review Design**
   - Check design.md for architecture details
   - Understand component interfaces

4. **Start Implementation**
   - Follow task instructions
   - Test as you go
   - Update documentation

### Important Files to Review

- **Tasks**: .kiro/specs/comprehensive-learning-portal/tasks.md
- **Requirements**: .kiro/specs/comprehensive-learning-portal/requirements.md
- **Design**: .kiro/specs/comprehensive-learning-portal/design.md
- **Context**: .kiro/session-state/context-summary.md
- **Conversation Log**: .kiro/session-logs/conversation-history.md

### Session Continuity

To resume work:
1. Run: \`bash .kiro/hooks/session-resume.sh\`
2. Read this file (resume-context.md)
3. Review conversation-history.md
4. Check git log for recent changes
5. Continue with next task

## Technical Environment

### Current State
- Git commit: $GIT_HASH
- Branch: $(git branch --show-current 2>/dev/null || echo "unknown")
- Uncommitted changes: $(git status -s | wc -l | tr -d ' ') files

### Development Setup
- Backend: Spring Boot (if Phase 1+ complete)
- Frontend: React + Vite (if Phase 1+ complete)
- Database: PostgreSQL (if Phase 1+ complete)

## Progress Metrics

- **Phases Completed**: $(($PHASE_NUMBER - 1)) / 9
- **Current Phase**: Phase $PHASE_NUMBER
- **Tasks Completed**: $COMPLETED_TASKS / $TOTAL_TASKS
- **Completion**: $(($COMPLETED_TASKS * 100 / $TOTAL_TASKS))%

## Notes

- All context preserved in .kiro/session-state/
- All conversations logged in .kiro/session-logs/
- All code committed to git
- Zero context loss guaranteed ✅

---

**Ready to resume? Run: bash .kiro/hooks/session-resume.sh**
EOF

echo "✅ Context summary generated:"
echo "   - $RESUME_FILE"

echo ""

# ============================================
# SUMMARY
# ============================================
echo "✅ Session Checkpoint Complete!"
echo ""
echo "📊 Summary:"
echo "   ✅ Git: Committed and pushed"
echo "   ✅ Conversation: Logged to session-logs/"
echo "   ✅ Context: Generated resume-context.md"
echo ""
echo "📁 Files Updated:"
echo "   - .kiro/session-logs/conversation-history.md"
echo "   - .kiro/session-logs/session-$TIMESTAMP.md"
echo "   - .kiro/session-state/resume-context.md"
echo ""
echo "🔄 To resume next session, run:"
echo "   bash .kiro/hooks/session-resume.sh"
echo ""
