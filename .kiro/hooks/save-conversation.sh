#!/bin/bash

# Save Conversation Hook
# Saves the current conversation from temporary.md to session logs

set -e

TIMESTAMP=$(date +"%Y-%m-%d-%H-%M-%S")
DATE=$(date +"%Y-%m-%d %H:%M:%S")

echo "💾 Saving Conversation..."
echo ""

# Check if temporary.md exists and has content
if [ ! -f "temporary.md" ]; then
    echo "❌ Error: temporary.md not found!"
    echo ""
    echo "📝 To use this script:"
    echo "   1. Copy your Kiro conversation"
    echo "   2. Paste it into temporary.md"
    echo "   3. Save the file"
    echo "   4. Run this script"
    echo ""
    exit 1
fi

if [ ! -s "temporary.md" ]; then
    echo "❌ Error: temporary.md is empty!"
    echo ""
    exit 1
fi

# Copy temporary.md to session logs
SESSION_FILE=".kiro/session-logs/session-$TIMESTAMP.md"
cp temporary.md "$SESSION_FILE"

echo "✅ Conversation saved to: $SESSION_FILE"
echo ""

# Get file size
SIZE=$(du -h "$SESSION_FILE" | cut -f1)
echo "📊 File size: $SIZE"
echo ""

# Ask if user wants to run checkpoint
echo "🔄 Would you like to run a full checkpoint now?"
echo "   (This will commit to git and update all context files)"
echo ""
read -p "Run checkpoint? (y/n): " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "🔄 Running checkpoint..."
    bash .kiro/hooks/session-checkpoint.sh
else
    echo ""
    echo "⏭️  Skipped checkpoint. You can run it later with:"
    echo "   bash .kiro/hooks/session-checkpoint.sh"
    echo ""
fi

echo "✅ Done!"
echo ""
echo "💡 Tip: Keep copying your Kiro conversation to temporary.md"
echo "   and run this script every 30 minutes to avoid losing work!"
echo ""
