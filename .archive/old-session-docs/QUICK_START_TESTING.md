# Quick Start - Testing the Content Integration

**Goal**: Load the completed Variables and Data Types content and test it in the UI

---

## Step 1: Start PostgreSQL Database

```bash
# If using Docker
docker start postgres-learning-portal

# Or start your local PostgreSQL
# Make sure it's running on port 5432
```

---

## Step 2: Start Backend

```bash
cd backend

# Clean and start
mvn clean spring-boot:run

# Watch for these log messages:
# [INFO] Starting content loading process...
# [INFO] Java module loaded: Java Fundamentals
# [INFO] Loaded topic: Variables and Data Types (6678 chars)
# [INFO] Content loading completed successfully!
```

**Expected Output**:
```
  .   ____          _            __ _ _
 /\\ / ___'_ __ _ _(_)_ __  __ _ \ \ \ \
( ( )\___ | '_ | '_| | '_ \/ _` | \ \ \ \
 \\/  ___)| |_)| | | | | || (_| |  ) ) ) )
  '  |____| .__|_| |_|_| |_\__, | / / / /
 =========|_|==============|___/=/_/_/_/
 :: Spring Boot ::                (v3.2.0)

[INFO] Starting LearningPortalApplication...
[INFO] Starting content loading process...
[INFO] Java module loaded: Java Fundamentals
[INFO] Loaded topic: Variables and Data Types (6678 chars)
[INFO] Content loading completed successfully!
[INFO] Started LearningPortalApplication in 5.234 seconds
```

---

## Step 3: Verify Content Loaded

```bash
# Check database stats
curl http://localhost:2025/api/admin/stats

# Expected response:
{
  "modules": 1,
  "topics": 1,
  "questions": 0,
  "codeExamples": 0,
  "topicProgress": 0,
  "userProgress": 0
}
```

---

## Step 4: Start Frontend

```bash
# Open new terminal
cd frontend

# Install dependencies (if not done)
npm install

# Start development server
npm run dev

# Frontend will start on http://localhost:5173
```

---

## Step 5: Test in Browser

### 5.1 Register/Login
1. Open http://localhost:5173
2. Click "Register" or "Login"
3. Create account or use existing credentials

### 5.2 Navigate to Java Module
1. Click "Java" in sidebar or dashboard
2. You should see "Java Fundamentals" module
3. Click to view topics

### 5.3 View Variables and Data Types Topic
1. Click on "Variables and Data Types" topic
2. Content should display with:
   - ✅ Title and description
   - ✅ Difficulty badge (BEGINNER)
   - ✅ Estimated time (180 minutes)
   - ✅ Full markdown content rendered
   - ✅ Code examples with syntax highlighting
   - ✅ Tables, lists, and formatting

### 5.4 Test Features
- [ ] Scroll through content
- [ ] Check code blocks render correctly
- [ ] Verify tables display properly
- [ ] Test "Mark as Complete" button
- [ ] Check progress tracking

---

## Step 6: Test API Endpoints

### Get All Modules
```bash
curl http://localhost:2025/api/learning/modules

# Expected: Array with Java module
```

### Get Topics for Java Module
```bash
# Replace {moduleId} with actual ID (usually 1)
curl http://localhost:2025/api/learning/modules/1/topics

# Expected: Paginated response with Variables and Data Types topic
```

### Get Specific Topic
```bash
# Replace {topicId} with actual ID (usually 1)
curl http://localhost:2025/api/learning/topics/1

# Expected: Full topic with content field containing markdown
```

---

## Common Issues & Solutions

### Issue 1: Content Not Loading

**Symptom**: No topics in database

**Check**:
```bash
# Verify file exists
ls -la content/java/01-variables-and-data-types.md

# Check backend logs for errors
# Look for "Content file not found" or similar
```

**Solution**:
```bash
# Make sure you're running from project root
cd /path/to/learning-portal
mvn -f backend/pom.xml spring-boot:run
```

### Issue 2: Database Connection Error

**Symptom**: `Connection refused` or `database does not exist`

**Solution**:
```bash
# Create database if it doesn't exist
psql -U postgres
CREATE DATABASE learning_portal;
\q

# Or run the creation script
bash create-database.sh
```

### Issue 3: Port Already in Use

**Symptom**: `Port 2025 is already in use`

**Solution**:
```bash
# Find and kill process using port 2025
lsof -ti:2025 | xargs kill -9

# Or change port in application.properties
# server.port=2026
```

### Issue 4: Frontend Can't Connect to Backend

**Symptom**: API calls fail with CORS or network errors

**Check**:
```bash
# Verify backend is running
curl http://localhost:2025/api/admin/stats

# Check CORS configuration in SecurityConfig.java
```

**Solution**:
- Ensure backend is running on port 2025
- Check `VITE_API_BASE_URL` in frontend/.env
- Verify CORS allows localhost:5173

---

## Testing Checklist

### Backend ✅
- [ ] PostgreSQL running
- [ ] Backend starts without errors
- [ ] Content loads on startup
- [ ] Admin stats endpoint works
- [ ] Topics API returns data
- [ ] Content field contains markdown

### Frontend ✅
- [ ] Frontend starts on port 5173
- [ ] Can register/login
- [ ] Java module appears
- [ ] Topics list displays
- [ ] Topic detail page loads
- [ ] Markdown renders correctly
- [ ] Code blocks have syntax highlighting
- [ ] Tables and lists display properly
- [ ] Progress tracking works

### Integration ✅
- [ ] Frontend fetches data from backend
- [ ] Authentication works end-to-end
- [ ] Progress updates save to database
- [ ] Navigation works smoothly
- [ ] No console errors

---

## Expected Results

### Database
```sql
-- Check topics table
SELECT id, title, difficulty, estimated_minutes, LENGTH(content) as content_length
FROM topics;

-- Expected:
-- id | title                      | difficulty | estimated_minutes | content_length
-- 1  | Variables and Data Types   | BEGINNER   | 180              | ~450000
```

### API Response
```json
{
  "id": 1,
  "title": "Variables and Data Types",
  "description": "Learn about Java variables, primitive types, and type conversion",
  "difficulty": "BEGINNER",
  "estimatedMinutes": 180,
  "moduleId": 1,
  "moduleName": "Java Fundamentals",
  "content": "# Variables and Data Types - Complete Learning Guide\n\n..."
}
```

### UI Display
- Clean, readable markdown rendering
- Syntax-highlighted code blocks
- Properly formatted tables
- Working navigation
- Progress tracking functional

---

## Next Steps After Testing

1. **If everything works** ✅:
   - Content is successfully integrated!
   - Ready to add more topics
   - Can start using the learning portal

2. **If issues found** ⚠️:
   - Check logs for specific errors
   - Verify database schema
   - Test API endpoints individually
   - Check frontend console for errors

3. **To add more topics**:
   - Create new markdown files in `content/java/`
   - Clear content: `curl -X POST http://localhost:2025/api/admin/clear-content`
   - Restart backend to reload all topics

---

## Quick Commands Reference

```bash
# Start everything
cd backend && mvn spring-boot:run &
cd frontend && npm run dev &

# Check status
curl http://localhost:2025/api/admin/stats

# Clear and reload
curl -X POST http://localhost:2025/api/admin/clear-content
# Then restart backend

# View logs
tail -f backend/logs/application.log

# Stop everything
pkill -f spring-boot
pkill -f vite
```

---

**Ready to test!** 🚀

Start with Step 1 and work through each step. The content should load automatically and display beautifully in the UI!
