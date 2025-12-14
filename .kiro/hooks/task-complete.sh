#!/bin/bash

# Task Complete Hook
# Marks a task as complete and updates progress

set -e

# Check if task number provided
if [ -z "$1" ]; then
    echo "❌ Error: Please provide task number"
    echo ""
    echo "Usage: bash .kiro/hooks/task-complete.sh <task-number>"
    echo "Example: bash .kiro/hooks/task-complete.sh 1.1.1"
    echo ""
    exit 1
fi

TASK_NUM="$1"
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")

echo "✅ Marking Task Complete: $TASK_NUM"
echo ""

# Find and update task in tasks.md
TASKS_FILE=".kiro/specs/comprehensive-learning-portal/tasks.md"

# Search for the task
TASK_LINE=$(grep -n "^\- \[ \] $TASK_NUM" "$TASKS_FILE" | head -1)

if [ -z "$TASK_LINE" ]; then
    echo "❌ Error: Task $TASK_NUM not found or already completed"
    echo ""
    echo "💡 Tip: Make sure the task number matches exactly"
    echo "   Example: 1.1.1, 2.3.4, etc."
    echo ""
    exit 1
fi

LINE_NUM=$(echo "$TASK_LINE" | cut -d: -f1)
TASK_TEXT=$(echo "$TASK_LINE" | cut -d: -f2-)

echo "📝 Found task at line $LINE_NUM:"
echo "   $TASK_TEXT"
echo ""

# Mark task as complete
sed -i.bak "${LINE_NUM}s/^\- \[ \]/- [x]/" "$TASKS_FILE"
rm "${TASKS_FILE}.bak" 2>/dev/null || true

echo "✅ Task marked as complete!"
echo ""

# Update progress
COMPLETED_TASKS=$(grep -c "^\- \[x\]" "$TASKS_FILE" 2>/dev/null || echo "0")
TOTAL_TASKS=$(grep -c "^\- \[" "$TASKS_FILE" 2>/dev/null || echo "161")
PROGRESS=$(($COMPLETED_TASKS * 100 / $TOTAL_TASKS))

echo "📊 Progress Update:"
echo "   Tasks Completed: $COMPLETED_TASKS / $TOTAL_TASKS ($PROGRESS%)"
echo ""

# Log completion
COMPLETION_LOG=".kiro/session-state/task-completions.log"
echo "$TIMESTAMP - Task $TASK_NUM completed" >> "$COMPLETION_LOG"

# Commit the change
git add "$TASKS_FILE"
git commit -m "✅ Complete task $TASK_NUM" 2>/dev/null || echo "ℹ️  (No git commit - run checkpoint to commit)"

echo "💡 Next Steps:"
echo "   1. Test your implementation"
echo "   2. Update documentation if needed"
echo "   3. Run: bash .kiro/hooks/session-checkpoint.sh"
echo "   4. Move to next task"
echo ""

# Show next task
NEXT_TASK=$(grep -n "^\- \[ \]" "$TASKS_FILE" | head -1)
if [ -n "$NEXT_TASK" ]; then
    NEXT_LINE=$(echo "$NEXT_TASK" | cut -d: -f1)
    NEXT_TEXT=$(echo "$NEXT_TASK" | cut -d: -f2-)
    echo "🎯 Next Task:"
    echo "   $NEXT_TEXT"
    echo ""
fi

echo "✅ Task completion recorded!"
echo ""
