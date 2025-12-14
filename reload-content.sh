#!/bin/bash

echo "🔄 Clearing and reloading content..."
echo ""


SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Run the SQL script to clear content
echo "Step 1: Clearing database content..."
# Ensure psql is in PATH
if ! command -v psql &> /dev/null; then
    echo "Error: psql command not found. Please install PostgreSQL and ensure it's in your PATH."
    exit 1
fi
psql -U postgres -d learning_portal -f "$SCRIPT_DIR/backend/src/main/resources/data.sql"

echo ""
echo "✅ Database cleared!"
echo ""
echo "Step 2: Restart the backend to reload content from files..."
echo "Please restart the backend application."
echo ""
echo "The backend will automatically load content from:"
echo "  - content/java/01-variables-and-data-types.md"
echo ""
