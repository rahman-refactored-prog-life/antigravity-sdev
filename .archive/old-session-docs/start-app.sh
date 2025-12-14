#!/bin/bash

# Learning Portal Startup Script

echo "🚀 Starting Learning Portal..."
echo ""

PROJECT_ROOT="/Users/syedrahman/Desktop/Career-and-Growth/KIRO/interview-prep-attempt-100"

# Check if frontend dependencies are installed
if [ ! -d "$PROJECT_ROOT/frontend/node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    cd "$PROJECT_ROOT/frontend"
    npm install
    echo "✅ Frontend dependencies installed"
    echo ""
fi

# Start backend
echo "🔧 Starting Backend (Port 2025)..."
cd "$PROJECT_ROOT/backend"
mvn spring-boot:run > /dev/null 2>&1 &
BACKEND_PID=$!
echo "✅ Backend starting... (PID: $BACKEND_PID)"
echo ""

# Wait a bit for backend to start
sleep 5

# Start frontend
echo "🎨 Starting Frontend (Port 3000)..."
cd "$PROJECT_ROOT/frontend"
npm run dev > /dev/null 2>&1 &
FRONTEND_PID=$!
echo "✅ Frontend starting... (PID: $FRONTEND_PID)"
echo ""

echo "=========================================="
echo "✅ Learning Portal Started!"
echo "=========================================="
echo ""
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 Backend:  http://localhost:2025"
echo "📚 API Docs: http://localhost:2025/swagger-ui.html"
echo ""
echo "📝 To stop the application:"
echo "   kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo "Or use: pkill -f 'spring-boot:run' && pkill -f 'vite'"
echo ""
echo "🎉 Happy Learning!"
echo "=========================================="
