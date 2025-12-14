#!/bin/bash
# Reload learning content from content/ directory
# This script clears the database and restarts the application

set -e  # Exit on error

echo "🔄 Reloading Learning Content..."
echo ""

# Check if PostgreSQL is accessible
if ! command -v psql &> /dev/null; then
    echo "❌ Error: psql command not found"
    echo "Please install PostgreSQL client tools or add them to your PATH"
    echo ""
    echo "On macOS with Homebrew: brew install postgresql"
    echo "Or add to PATH: export PATH=\"/Applications/Postgres.app/Contents/Versions/latest/bin:\$PATH\""
    exit 1
fi

# Database connection details (from application.yml)
DB_HOST="localhost"
DB_PORT="5432"
DB_NAME="learning_portal"
DB_USER="postgres"
DB_PASSWORD="${DB_PASSWORD:-password}"

echo "📊 Clearing existing learning content from database..."
PGPASSWORD="$DB_PASSWORD" psql -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" -d "$DB_NAME" -f database-scripts/clear-learning-data.sql

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Database cleared successfully!"
    echo ""
    echo "🚀 Now restart the application to load new content:"
    echo "   cd backend && mvn spring-boot:run"
    echo ""
    echo "   Or if using JAR:"
    echo "   java -jar backend/target/learning-portal-backend-1.0.0-SNAPSHOT.jar"
else
    echo ""
    echo "❌ Error clearing database. Please check your PostgreSQL connection."
    exit 1
fi
