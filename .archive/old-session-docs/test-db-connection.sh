#!/bin/bash

# PostgreSQL Connection Test Script
# This script tests if we can connect to the learning_portal database

echo "🔍 Testing PostgreSQL Connection..."
echo ""

# Database connection details
DB_NAME="learning-portal"
DB_USER="postgres"  # Change if you created a different user
DB_HOST="localhost"
DB_PORT="5432"

# Try to connect and run a simple query
# You'll be prompted for the password

echo "Attempting to connect to database: $DB_NAME"
echo "Host: $DB_HOST:$DB_PORT"
echo "User: $DB_USER"
echo ""

# Test connection
PGPASSWORD="" psql -h $DB_HOST -p $DB_PORT -U $DB_USER -d $DB_NAME -c "SELECT version();" 2>/dev/null

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Connection successful!"
    echo ""
    echo "Database is ready for Phase 1 implementation."
else
    echo ""
    echo "❌ Connection failed!"
    echo ""
    echo "Please check:"
    echo "1. PostgreSQL is running"
    echo "2. Database 'learning_portal' exists"
    echo "3. User credentials are correct"
    echo ""
    echo "You can also test manually:"
    echo "  Open SQL Shell and run: \\c learning_portal"
fi
