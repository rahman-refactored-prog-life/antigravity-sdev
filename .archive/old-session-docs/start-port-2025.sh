#!/bin/bash

# Start Learning Portal on Port 2025
# Both frontend and backend on same port

echo "🚀 Starting Learning Portal on Port 2025..."
echo ""

cd /Users/syedrahman/Desktop/Career-and-Growth/KIRO/interview-prep-attempt-100/backend

echo "📦 Building frontend and starting backend..."
echo "   This may take a minute on first run..."
echo ""

mvn clean package spring-boot:run

echo ""
echo "=========================================="
echo "✅ Learning Portal Running!"
echo "=========================================="
echo ""
echo "🌐 Access at: http://localhost:2025"
echo ""
echo "Available pages:"
echo "  • Home:      http://localhost:2025/"
echo "  • Login:     http://localhost:2025/login"
echo "  • Register:  http://localhost:2025/register"
echo "  • Dashboard: http://localhost:2025/dashboard"
echo "  • API Docs:  http://localhost:2025/swagger-ui.html"
echo ""
echo "=========================================="
