#!/bin/bash

# Git Sync Hook
# Commits and pushes all changes

set -e

echo "🔄 Git Sync..."
echo ""

# Check if there are changes
if [[ -z $(git status -s) ]]; then
    echo "ℹ️  No changes to sync"
    echo ""
    exit 0
fi

# Show what will be committed
echo "📝 Changes to commit:"
git status -s
echo ""

# Get commit message from argument or use default
if [ -n "$1" ]; then
    COMMIT_MSG="$1"
else
    TIMESTAMP=$(date +"%Y-%m-%d %H:%M:%S")
    COMMIT_MSG="Sync: $TIMESTAMP"
fi

# Commit
git add .
git commit -m "$COMMIT_MSG"
echo "✅ Committed: $COMMIT_MSG"
echo ""

# Push
echo "📤 Pushing to remote..."
git push origin main 2>/dev/null || git push origin master 2>/dev/null || {
    echo "⚠️  Could not push to remote"
    echo "   Possible reasons:"
    echo "   - No remote configured"
    echo "   - Different branch name"
    echo "   - Network issue"
    echo ""
    echo "   Try manually: git push origin <branch-name>"
    exit 1
}

echo "✅ Pushed to remote"
echo ""

# Show latest commits
echo "📜 Latest commits:"
git log --oneline -3
echo ""

echo "✅ Git sync complete!"
echo ""
