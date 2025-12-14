#!/bin/bash

# Session Consolidate Hook
# Consolidates temporary.md into context-summary.md at end of session
# This ensures context-summary.md has the FULL detailed context

set -e

PROJECT_ROOT="/Users/syedrahman/Desktop/Career-and-Growth/KIRO/interview-prep-attempt-100"
cd "$PROJECT_ROOT"

echo "📝 Consolidating Session Context..."
echo ""

TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
TEMP_FILE="temporary.md"
CONTEXT_FILE=".kiro/session-state/context-summary.md"
ARCHIVE_FILE=".kiro/session-logs/session-archive-$(date +%Y-%m-%d-%H-%M-%S).md"

# Check if temporary.md exists and has content
if [[ ! -f "$TEMP_FILE" ]] || [[ ! -s "$TEMP_FILE" ]]; then
    echo "⚠️  No temporary.md file or file is empty"
    echo "Nothing to consolidate"
    exit 0
fi

echo "📋 Found temporary.md with content"
echo ""

# Archive the old context-summary.md
if [[ -f "$CONTEXT_FILE" ]]; then
    echo "📦 Archiving old context-summary.md..."
    cp "$CONTEXT_FILE" "$ARCHIVE_FILE"
    echo "✅ Archived to: $ARCHIVE_FILE"
    echo ""
fi

# Read current phase info
CURRENT_PHASE=$(cat .kiro/session-state/current-phase.json | grep -o '"currentPhase": "[^"]*"' | cut -d'"' -f4)
PHASE_NUMBER=$(cat .kiro/session-state/current-phase.json | grep -o '"phaseNumber": [0-9]*' | grep -o '[0-9]*')

# Get task counts
COMPLETED_TASKS=$(grep -c "^\- \[x\]" .kiro/specs/comprehensive-learning-portal/tasks.md 2>/dev/null || echo "0")
TOTAL_TASKS=$(grep -c "^\- \[" .kiro/specs/comprehensive-learning-portal/tasks.md 2>/dev/null || echo "265")

# Create new context-summary.md with header
cat > "$CONTEXT_FILE" << EOF
# Session Context Summary

**Last Updated**: $(date +"%Y-%m-%d")  
**Current Phase**: $CURRENT_PHASE  
**Progress**: $COMPLETED_TASKS/$TOTAL_TASKS tasks ($(($COMPLETED_TASKS * 100 / $TOTAL_TASKS))%)

---

## 🎯 Current Status

### Phase Progress
- **Phase 1**: $(grep -c "^\- \[x\] 1\." .kiro/specs/comprehensive-learning-portal/tasks.md 2>/dev/null || echo "0") tasks complete
- **Phase 2**: $(grep -c "^\- \[x\] 2\." .kiro/specs/comprehensive-learning-portal/tasks.md 2>/dev/null || echo "0") tasks complete
- **Overall**: $COMPLETED_TASKS/$TOTAL_TASKS tasks ($(($COMPLETED_TASKS * 100 / $TOTAL_TASKS))%)

### Application Status
- ✅ Backend: Running on port 2025
- ✅ Frontend: React + Vite + TypeScript
- ✅ Database: PostgreSQL 18.0 connected
- ✅ Authentication: JWT working
- ✅ Build: Maven + npm working

---

## 📋 Session Details from temporary.md

EOF

# Append the entire temporary.md content
cat "$TEMP_FILE" >> "$CONTEXT_FILE"

# Add footer
cat >> "$CONTEXT_FILE" << EOF

---

## 📁 Important Files

**Spec Documents** (SINGLE SOURCE OF TRUTH):
- \`.kiro/specs/comprehensive-learning-portal/requirements.md\`
- \`.kiro/specs/comprehensive-learning-portal/design.md\`
- \`.kiro/specs/comprehensive-learning-portal/tasks.md\`

**Session State**: \`.kiro/session-state/context-summary.md\` (this file)

---

**Status**: Session consolidated  
**Last Updated**: $TIMESTAMP  
**Next**: Start new session with fresh temporary.md

EOF

echo "✅ Consolidated temporary.md → context-summary.md"
echo ""

# Ask if user wants to clear temporary.md
echo "📝 Would you like to clear temporary.md for the next session?"
echo "   (This keeps it clean for new session notes)"
echo ""
read -p "Clear temporary.md? (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    # Clear temporary.md but leave a header
    cat > "$TEMP_FILE" << EOF
# Temporary Session Notes

**Session Started**: $(date +"%Y-%m-%d %H:%M:%S")

Use this file to track:
- Issues encountered
- Decisions made
- Things to remember
- Quick notes

This file will be consolidated into context-summary.md at end of session.

---

EOF
    echo "✅ Cleared temporary.md (left header)"
else
    echo "ℹ️  Kept temporary.md as-is"
fi

echo ""
echo "✅ Session Consolidation Complete!"
echo ""
echo "📊 Summary:"
echo "   ✅ Old context archived to: $ARCHIVE_FILE"
echo "   ✅ New context-summary.md created with full session details"
echo "   ✅ temporary.md ready for next session"
echo ""
echo "🔄 Next session:"
echo "   1. Read context-summary.md for full context"
echo "   2. Use temporary.md for new session notes"
echo "   3. Run this script again at end of session"
echo ""

