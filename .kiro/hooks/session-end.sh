#!/bin/bash

# Session End Hook
# Saves all context before ending session

set -e

echo "🛑 Ending Session..."
echo ""

# Run checkpoint first
echo "📦 Running final checkpoint..."
bash .kiro/hooks/session-checkpoint.sh

echo ""
echo "💾 Saving final session state..."

# Update session end time in current session log
if [ -f ".kiro/session-state/current-session.txt" ]; then
    CURRENT_SESSION=$(cat .kiro/session-state/current-session.txt)
    if [ -f "$CURRENT_SESSION" ]; then
        echo "" >> "$CURRENT_SESSION"
        echo "---" >> "$CURRENT_SESSION"
        echo "" >> "$CURRENT_SESSION"
        echo "**Ended**: $(date +"%Y-%m-%d %H:%M:%S")" >> "$CURRENT_SESSION"
        echo "**Duration**: (Calculate manually if needed)" >> "$CURRENT_SESSION"
        echo "" >> "$CURRENT_SESSION"
        echo "✅ Session log updated: $CURRENT_SESSION"
    fi
fi

echo ""
echo "✅ Session Ended Successfully!"
echo ""
echo "📊 Summary:"
echo "   ✅ All changes committed to git"
echo "   ✅ Conversation logged"
echo "   ✅ Context preserved"
echo "   ✅ Ready to resume anytime"
echo ""
echo "🔄 To resume next time, run:"
echo "   bash .kiro/hooks/session-start.sh"
echo ""
echo "👋 See you next session!"
echo ""
