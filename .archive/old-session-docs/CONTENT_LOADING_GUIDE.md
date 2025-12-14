# Content Loading Guide - Spring Boot Standard Approach

**Last Updated**: November 30, 2024

---

## Overview

The learning portal uses **Spring Boot's standard `CommandLineRunner` approach** to automatically load content from markdown files into the database on application startup.

---

## How It Works

### 1. Automatic Loading on Startup

When you start the Spring Boot application, the following happens automatically:

```
Application Starts
    ↓
CommandLineRunner beans execute
    ↓
ContentLoaderService.run() executes
    ↓
Checks if content already exists
    ↓
If empty → Loads from content/java/*.md files
    ↓
Content saved to PostgreSQL database
    ↓
Application ready!
```

### 2. Key Components

#### **ContentLoaderService.java** (Primary Loader)
- **Location**: `backend/src/main/java/com/learningportal/service/ContentLoaderService.java`
- **Purpose**: Loads content from markdown files on startup
- **Implements**: `CommandLineRunner` (Spring Boot standard)
- **Behavior**: 
  - Runs automatically when application starts
  - Checks if topics exist in database
  - If empty, reads markdown files from `content/java/` directory
  - Parses metadata (title, difficulty, estimated time)
  - Saves to database

#### **ContentDataInitializer.java** (Alternative Loader)
- **Location**: `backend/src/main/java/com/learningportal/config/ContentDataInitializer.java`
- **Purpose**: Alternative content loader with more advanced parsing
- **Order**: `@Order(2)` - runs after ContentLoaderService
- **Features**:
  - Automatically discovers all `.md` files in `content/java/`
  - Extracts metadata from markdown headers
  - Handles multiple topics automatically

#### **ContentReloadService.java** (Management)
- **Location**: `backend/src/main/java/com/learningportal/config/ContentReloadService.java`
- **Purpose**: Provides methods to clear and reload content
- **Methods**:
  - `clearAllContent()` - Deletes all learning content
  - `needsReload()` - Checks if reload is needed

---

## Usage Instructions

### First Time Setup

1. **Place your markdown files** in `content/java/` directory:
   ```
   content/
   └── java/
       ├── 01-variables-and-data-types.md  ✅ (6,678 lines, complete!)
       ├── 02-operators.md
       ├── 03-control-flow.md
       └── ...
   ```

2. **Start the application**:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

3. **Content loads automatically**:
   ```
   [INFO] Starting content loading process...
   [INFO] Java module loaded: Java Fundamentals
   [INFO] Loaded topic: Variables and Data Types (6678 chars)
   [INFO] Content loading completed successfully!
   ```

4. **Verify in database**:
   ```bash
   # Check if content loaded
   curl http://localhost:2025/api/admin/stats
   ```

### Reloading Content

If you update the markdown files and want to reload:

**Option 1: Clear and Restart (Recommended)**
```bash
# 1. Clear existing content
curl -X POST http://localhost:2025/api/admin/clear-content

# 2. Restart application
# Content will reload automatically on startup
```

**Option 2: Manual Database Clear**
```bash
# Connect to PostgreSQL
psql -U postgres -d learning_portal

# Clear tables
DELETE FROM code_examples;
DELETE FROM practice_questions;
DELETE FROM topic_progress;
DELETE FROM topics;
DELETE FROM user_progress;
DELETE FROM learning_modules;

# Exit and restart application
\q
```

---

## File Structure

### Content Directory
```
content/
└── java/
    ├── 01-variables-and-data-types.md  ← Loaded automatically
    ├── 02-operators.md                 ← Will be loaded when created
    ├── 03-control-flow.md              ← Will be loaded when created
    └── ...
```

### Backend Structure
```
backend/src/main/java/com/learningportal/
├── config/
│   ├── ContentDataInitializer.java    ← Alternative loader
│   └── ContentReloadService.java      ← Management service
├── service/
│   └── ContentLoaderService.java      ← Primary loader ⭐
├── entity/
│   ├── Topic.java                     ← Database entity
│   └── LearningModule.java            ← Module entity
└── repository/
    └── TopicRepository.java            ← Data access
```

---

## Metadata Extraction

The loaders automatically extract metadata from your markdown files:

### Title
```markdown
# Variables and Data Types - Complete Learning Guide
     ↓
Title: "Variables and Data Types"
```

### Difficulty
```markdown
**Difficulty**: Beginner
     ↓
Difficulty: BEGINNER
```

### Estimated Time
```markdown
**Estimated Time**: 2-3 hours to master
     ↓
EstimatedMinutes: 180
```

### Order Index
```markdown
Filename: 01-variables-and-data-types.md
     ↓
OrderIndex: 1
```

---

## Admin Endpoints

### Get Statistics
```bash
GET http://localhost:2025/api/admin/stats

Response:
{
  "modules": 1,
  "topics": 1,
  "questions": 0,
  "codeExamples": 0,
  "topicProgress": 0,
  "userProgress": 0
}
```

### Clear Content
```bash
POST http://localhost:2025/api/admin/clear-content

Response:
{
  "success": true,
  "message": "Learning content cleared successfully",
  "deleted": {
    "modules": 1,
    "topics": 1,
    "questions": 0,
    "codeExamples": 0
  },
  "nextStep": "Restart the application to reload content"
}
```

---

## Database Schema

### Topics Table
```sql
CREATE TABLE topics (
    id BIGSERIAL PRIMARY KEY,
    module_id BIGINT NOT NULL REFERENCES learning_modules(id),
    title VARCHAR(200) NOT NULL,
    description VARCHAR(500),
    content TEXT,                    -- Full markdown content stored here
    order_index INTEGER NOT NULL,
    difficulty VARCHAR(20) NOT NULL,
    estimated_minutes INTEGER,
    total_practice_questions INTEGER,
    total_interview_questions INTEGER,
    published BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

---

## Troubleshooting

### Content Not Loading

**Problem**: Application starts but no content in database

**Solutions**:
1. Check if `content/java/` directory exists
2. Check file permissions (files must be readable)
3. Check application logs for errors
4. Verify database connection

**Check logs**:
```bash
# Look for these messages
[INFO] Starting content loading process...
[INFO] Loaded topic: Variables and Data Types
```

### Content Already Exists

**Problem**: Want to reload but content already in database

**Solution**:
```bash
# Clear content first
curl -X POST http://localhost:2025/api/admin/clear-content

# Then restart application
```

### File Not Found

**Problem**: `Content file not found: content/java/01-variables-and-data-types.md`

**Solutions**:
1. Check file path is correct
2. Run from project root directory
3. Check if file exists: `ls -la content/java/`

---

## Best Practices

### ✅ DO:
- Keep markdown files in `content/java/` directory
- Use numbered prefixes for ordering (01-, 02-, 03-)
- Include metadata in markdown headers
- Test content loading in development before production
- Use admin endpoints to verify content loaded

### ❌ DON'T:
- Don't manually insert content into database
- Don't modify content in database (update markdown files instead)
- Don't delete content directory while application is running
- Don't skip the clear step when reloading

---

## Development Workflow

### Adding New Topics

1. **Create markdown file**:
   ```bash
   # Create new topic file
   touch content/java/02-operators.md
   ```

2. **Write content** following the template

3. **Reload content**:
   ```bash
   # Clear existing
   curl -X POST http://localhost:2025/api/admin/clear-content
   
   # Restart application
   # New topic loads automatically
   ```

4. **Verify**:
   ```bash
   # Check stats
   curl http://localhost:2025/api/admin/stats
   
   # Should show 2 topics now
   ```

### Updating Existing Topics

1. **Edit markdown file**:
   ```bash
   vim content/java/01-variables-and-data-types.md
   ```

2. **Reload**:
   ```bash
   # Clear and restart
   curl -X POST http://localhost:2025/api/admin/clear-content
   # Restart application
   ```

---

## Production Deployment

### Option 1: Include Content in JAR
```bash
# Copy content to resources
cp -r content/ backend/src/main/resources/

# Build JAR
mvn clean package

# Content is included in JAR
# Loads automatically on startup
```

### Option 2: External Content Directory
```bash
# Keep content separate
# Set content path in application.properties
content.directory=/opt/learning-portal/content

# Application reads from external directory
```

---

## Summary

**The Spring Boot Standard Way:**
1. ✅ `CommandLineRunner` runs on startup
2. ✅ Checks if content exists
3. ✅ Loads from markdown files if empty
4. ✅ Saves to PostgreSQL database
5. ✅ Application ready to serve content

**No manual scripts needed!** Everything is automatic. 🚀

---

## Current Status

- ✅ **ContentLoaderService** - Implemented and working
- ✅ **ContentDataInitializer** - Implemented as backup
- ✅ **ContentReloadService** - Implemented for management
- ✅ **Admin endpoints** - Available for testing
- ✅ **Variables and Data Types** - Complete (6,678 lines)
- ⏳ **Ready to load** - Just start the application!

---

**Next Steps**: Start the application and watch the content load automatically! 🎉
