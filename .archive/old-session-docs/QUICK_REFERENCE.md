# Quick Reference - Learning Portal

**Last Updated**: 2025-11-27  
**Phase**: Phase 2 - Java Complete Ecosystem  
**Status**: Content loading system operational ✅

---

## 🚀 Quick Start

### Start Application
```bash
cd backend
java -jar target/learning-portal-backend-1.0.0-SNAPSHOT.jar
```
**Access**: http://localhost:2025

### Rebuild Application
```bash
cd backend
mvn clean package -DskipTests
```

---

## 📚 Content Management

### Add New Topic
1. Create file: `content/java/02-operators.md`
2. Follow template: `TOPIC_CONTENT_TEMPLATE.md`
3. Reload content:
   ```bash
   curl -X POST http://localhost:2025/api/admin/clear-content
   # Then restart application
   ```

### Admin Endpoints
```bash
# View stats
curl http://localhost:2025/api/admin/stats

# Clear content
curl -X POST http://localhost:2025/api/admin/clear-content
```

---

## 📁 Important Files

### Content Creation
- `CONTENT_METHODOLOGY_V3_FINAL.md` - Complete guide (10 layers)
- `TOPIC_CONTENT_TEMPLATE.md` - Template for new topics
- `content/java/01-variables-and-data-types.md` - Example (5,183 lines)

### Project Documentation
- `README.md` - Project overview
- `.kiro/specs/comprehensive-learning-portal/` - Requirements, design, tasks
- `.kiro/session-state/context-summary.md` - Current status
- `TESTING_GUIDE.md` - Testing documentation

### Scripts
- `start-app.sh` - Start application
- `create-database.sh` - Create PostgreSQL database
- `test-db-connection.sh` - Test database connection
- `cleanup-workspace.sh` - Clean up old files

---

## 🔧 Key Components

### Backend
- **ContentDataInitializer** - Loads markdown files from `content/java/`
- **AdminController** - Content management endpoints
- **SampleDataInitializer** - ❌ Disabled (old sample data)

### Database
- **PostgreSQL** on localhost:5432
- **Database**: learning_portal
- **User**: postgres

### Frontend
- **React 18** + TypeScript
- **Vite** build tool
- **Monaco Editor** for code

---

## 📊 Current Status

### Completed
- ✅ Phase 1: Foundation (62 tasks)
- ✅ Content loading system
- ✅ First topic: Variables and Data Types (5,183 lines)

### Next Steps
1. Create remaining 99+ Java topics
2. Follow CONTENT_METHODOLOGY_V3_FINAL.md
3. Target: 1050+ questions total

---

## 🆘 Common Commands

### Database
```bash
# Test connection
./test-db-connection.sh

# Reset test user
psql -U postgres -d learning_portal -f reset-test-user.sql
```

### Development
```bash
# Backend tests
cd backend && mvn test

# Frontend tests
cd frontend && npm test

# Check diagnostics
# Use Kiro's getDiagnostics tool
```

### Session Management
```bash
# Start session
bash .kiro/hooks/session-start.sh

# Checkpoint (every 30 min)
bash .kiro/hooks/session-checkpoint.sh

# End session
bash .kiro/hooks/session-end.sh
```

---

## 📞 Quick Links

- **Application**: http://localhost:2025
- **API Docs**: http://localhost:2025/swagger-ui.html
- **Health Check**: http://localhost:2025/actuator/health
- **GitHub**: https://github.com/rahman-refactored-prog-life/learning-portal.git

---

**For detailed information, see README.md and .kiro/session-state/context-summary.md**
