#!/bin/bash

# Auto-Update Context Hook
# This hook is called automatically by Kiro AI after completing tasks
# It updates context-summary.md with the latest status without user interaction

set -e

# Get project directory
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
cd "$PROJECT_DIR"

# Get current timestamp
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")

# Get current phase from current-phase.json
CURRENT_PHASE=$(cat .kiro/session-state/current-phase.json 2>/dev/null | grep -o '"currentPhase": "[^"]*"' | cut -d'"' -f4 || echo "Unknown Phase")

# Get last completed task from git log
LAST_TASK=$(git log -1 --pretty=format:"%s" 2>/dev/null | head -1 || echo "No recent task")

# Get list of modified files
MODIFIED_FILES=$(git status --short 2>/dev/null | head -10 || echo "No changes")

# Count completed tasks in tasks.md
COMPLETED_TASKS=$(grep -c "\[x\]" .kiro/specs/comprehensive-learning-portal/tasks.md 2>/dev/null || echo "0")
TOTAL_TASKS=$(grep -c "\[ \]\|\[x\]" .kiro/specs/comprehensive-learning-portal/tasks.md 2>/dev/null || echo "0")

# Create auto-update entry at the end of context-summary.md
cat >> .kiro/session-state/context-summary.md << EOF

---

## Auto-Update: $TIMESTAMP

### Status
- **Phase**: $CURRENT_PHASE
- **Progress**: $COMPLETED_TASKS / $TOTAL_TASKS tasks
- **Last Action**: $LAST_TASK

### Recent Changes
\`\`\`
$MODIFIED_FILES
\`\`\`

### Next Session
To resume, read: .kiro/session-state/context-summary.md

EOF

# Commit changes silently
git add .kiro/session-state/context-summary.md 2>/dev/null || true
git commit -m "Auto-update context: $TIMESTAMP" --quiet 2>/dev/null || true

echo "✅ Context auto-updated: $TIMESTAMP"
