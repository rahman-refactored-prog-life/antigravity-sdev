#!/bin/bash

# Session Resume Hook
# Loads all context and suggests next actions

set -e

# Navigate to project root
PROJECT_ROOT="/Users/syedrahman/Desktop/Career-and-Growth/KIRO/interview-prep-attempt-100"
cd "$PROJECT_ROOT"

echo "🔄 Resuming Session..."
echo "📁 Project Directory: $PROJECT_ROOT"
echo ""

# Check if resume context exists
if [ ! -f ".kiro/session-state/resume-context.md" ]; then
    echo "⚠️  No resume context found. This might be your first session."
    echo ""
    echo "📋 Getting Started:"
    echo "   1. Read: .kiro/specs/comprehensive-learning-portal/README.md"
    echo "   2. Review: .kiro/specs/comprehensive-learning-portal/tasks.md"
    echo "   3. Start with Phase 1, Task 1.1.1"
    echo ""
    exit 0
fi

# Display resume context
echo "📋 Loading Context..."
echo "===================="
echo ""

# Read and display key information
CURRENT_PHASE=$(cat .kiro/session-state/current-phase.json | grep -o '"currentPhase": "[^"]*"' | cut -d'"' -f4)
PHASE_NUMBER=$(cat .kiro/session-state/current-phase.json | grep -o '"phaseNumber": [0-9]*' | grep -o '[0-9]*')
NEXT_PHASE=$(cat .kiro/session-state/current-phase.json | grep -o '"nextPhase": "[^"]*"' | cut -d'"' -f4)

echo "📍 Current Phase: $CURRENT_PHASE (Phase $PHASE_NUMBER/9)"
echo "📍 Next Phase: $NEXT_PHASE"
echo ""

# Show recent activity
echo "📜 Recent Activity:"
echo "-------------------"
git log --oneline -5 --pretty=format:"   %h - %s (%cr)" 2>/dev/null || echo "   (No git history)"
echo ""
echo ""

# Show task progress
COMPLETED_TASKS=$(grep -c "^\- \[x\]" .kiro/specs/comprehensive-learning-portal/tasks.md 2>/dev/null || echo "0")
TOTAL_TASKS=$(grep -c "^\- \[" .kiro/specs/comprehensive-learning-portal/tasks.md 2>/dev/null || echo "161")
PROGRESS=$(($COMPLETED_TASKS * 100 / $TOTAL_TASKS))

echo "📊 Progress:"
echo "------------"
echo "   Tasks Completed: $COMPLETED_TASKS / $TOTAL_TASKS ($PROGRESS%)"
echo "   Current Phase: Phase $PHASE_NUMBER / 9"
echo ""

# Find next uncompleted task
echo "🎯 Next Task:"
echo "-------------"

# Extract next uncompleted task from tasks.md
NEXT_TASK=$(grep -n "^\- \[ \]" .kiro/specs/comprehensive-learning-portal/tasks.md | head -1)

if [ -n "$NEXT_TASK" ]; then
    LINE_NUM=$(echo "$NEXT_TASK" | cut -d: -f1)
    TASK_TEXT=$(echo "$NEXT_TASK" | cut -d: -f2- | sed 's/^- \[ \] //')
    
    echo "   Line $LINE_NUM: $TASK_TEXT"
    echo ""
    echo "   📖 To view full task details:"
    echo "      sed -n '${LINE_NUM},$((LINE_NUM + 5))p' .kiro/specs/comprehensive-learning-portal/tasks.md"
else
    echo "   ✅ All tasks in current phase complete!"
    echo "   🎉 Ready to move to next phase: $NEXT_PHASE"
fi

echo ""

# Show important files
echo "📁 Important Files:"
echo "-------------------"
echo "   📋 Tasks:        .kiro/specs/comprehensive-learning-portal/tasks.md"
echo "   📝 Requirements: .kiro/specs/comprehensive-learning-portal/requirements.md"
echo "   🏗️  Design:      .kiro/specs/comprehensive-learning-portal/design.md"
echo "   💬 Conversation: .kiro/session-logs/conversation-history.md"
echo "   📊 Context:      .kiro/session-state/resume-context.md"
echo ""

# Show uncommitted changes
UNCOMMITTED=$(git status -s | wc -l | tr -d ' ')
if [ "$UNCOMMITTED" -gt 0 ]; then
    echo "⚠️  Uncommitted Changes: $UNCOMMITTED files"
    echo "   Run 'git status' to see details"
    echo ""
fi

# Suggest next actions
echo "🚀 Suggested Next Actions:"
echo "--------------------------"
echo "   1. Review resume context:"
echo "      cat .kiro/session-state/resume-context.md"
echo ""
echo "   2. Check conversation history:"
echo "      tail -50 .kiro/session-logs/conversation-history.md"
echo ""
echo "   3. View next task details:"
echo "      # Open tasks.md and find next unchecked task"
echo ""
echo "   4. Start working on next task"
echo ""
echo "   5. When done, run checkpoint:"
echo "      bash .kiro/hooks/session-checkpoint.sh"
echo ""

# Display full resume context
echo "📄 Full Resume Context:"
echo "========================"
echo ""
cat .kiro/session-state/resume-context.md
echo ""

echo "✅ Session Resume Complete!"
echo ""
echo "💡 Tip: Keep this terminal open for reference while you work"
echo ""
