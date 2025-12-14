#!/bin/bash

# Update Context Hook
# Manually update context-summary.md with what you actually did

set -e

echo "📝 Update Context Summary"
echo "========================="
echo ""
echo "This script helps you update context-summary.md with what you actually accomplished."
echo ""

# Check if temporary.md exists
if [ -f "temporary.md" ] && [ -s "temporary.md" ]; then
    echo "📄 Found temporary.md with conversation content"
    echo ""
    read -p "Would you like to save temporary.md to session logs first? (y/n): " -n 1 -r
    echo ""
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        bash .kiro/hooks/save-conversation.sh
    fi
    echo ""
fi

echo "Please answer these questions to update the context:"
echo ""

# Get current phase
CURRENT_PHASE=$(cat .kiro/session-state/current-phase.json | grep -o '"currentPhase": "[^"]*"' | cut -d'"' -f4)
echo "Current Phase: $CURRENT_PHASE"
echo ""

# Ask what was accomplished
echo "1️⃣  What did you accomplish in this session?"
echo "   (Describe the main things you did - be specific!)"
echo ""
read -p "   > " ACCOMPLISHMENT
echo ""

# Ask what problem was solved
echo "2️⃣  What problem did you solve (if any)?"
echo "   (Describe the issue and the solution)"
echo ""
read -p "   > " PROBLEM_SOLVED
echo ""

# Ask what's the current status
echo "3️⃣  What's the current status?"
echo "   (What's working? What's not? What's next?)"
echo ""
read -p "   > " CURRENT_STATUS
echo ""

# Ask what needs to be done next
echo "4️⃣  What needs to be done next session?"
echo "   (Be specific about the next steps)"
echo ""
read -p "   > " NEXT_STEPS
echo ""

# Create a context update entry
TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
CONTEXT_FILE=".kiro/session-state/context-summary.md"

# Append to context summary
cat >> "$CONTEXT_FILE" << EOF

---

## Session Update: $TIMESTAMP

### What Was Accomplished
$ACCOMPLISHMENT

### Problem Solved
$PROBLEM_SOLVED

### Current Status
$CURRENT_STATUS

### Next Steps
$NEXT_STEPS

EOF

echo "✅ Context updated!"
echo ""
echo "📁 Updated file: $CONTEXT_FILE"
echo ""
echo "💡 Tip: Run this script at the end of each session to maintain accurate context!"
echo ""

# Ask if they want to run checkpoint
read -p "Run full checkpoint now? (y/n): " -n 1 -r
echo ""
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    bash .kiro/hooks/session-checkpoint.sh
fi

echo ""
echo "✅ Done!"
echo ""
