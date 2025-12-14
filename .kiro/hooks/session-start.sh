#!/bin/bash

# Session Start Hook
# Initializes a new development session

set -e

TIMESTAMP=$(date +"%Y-%m-%d-%H-%M-%S")
DATE=$(date +"%Y-%m-%d %H:%M:%S")

echo "🚀 Starting New Session..."
echo ""
echo "📅 Date: $DATE"
echo "🆔 Session ID: $TIMESTAMP"
echo ""

# Create session log file
SESSION_LOG=".kiro/session-logs/session-$TIMESTAMP.md"

cat > "$SESSION_LOG" << EOF
# Development Session - $TIMESTAMP

**Started**: $DATE
**Session ID**: $TIMESTAMP

## Session Goals
- [ ] Goal 1: (Add your goals for this session)
- [ ] Goal 2:
- [ ] Goal 3:

## Tasks to Complete
- [ ] Task 1: (List specific tasks)
- [ ] Task 2:
- [ ] Task 3:

## Notes
(Add notes as you work)

## Decisions Made
(Document any important decisions)

## Challenges Encountered
(Note any problems and solutions)

## Next Session
(What to do next time)

---

**Session Log**: This file will be updated throughout the session
EOF

echo "✅ Session log created: $SESSION_LOG"
echo ""

# Update current session pointer
echo "$SESSION_LOG" > .kiro/session-state/current-session.txt

# Load previous context if available
if [ -f ".kiro/session-state/resume-context.md" ]; then
    echo "📋 Loading previous context..."
    echo ""
    bash .kiro/hooks/session-resume.sh
else
    echo "ℹ️  No previous context found. Starting fresh!"
    echo ""
    echo "📚 Getting Started:"
    echo "   1. Read: .kiro/specs/comprehensive-learning-portal/README.md"
    echo "   2. Review: .kiro/specs/comprehensive-learning-portal/tasks.md"
    echo "   3. Start with Phase 1, Task 1.1.1"
    echo ""
fi

echo "✅ Session Started!"
echo ""
echo "⚠️  IMPORTANT: If starting a NEW Kiro conversation, tell Kiro:"
echo "   'Please read .kiro/SESSION_INIT.md to load the full project context'"
echo ""
echo "💡 Remember to run 'bash .kiro/hooks/session-checkpoint.sh' regularly!"
echo ""
