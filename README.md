# Comprehensive Learning Portal

A comprehensive FAANG interview preparation platform with 10,000+ questions across Java, Data Structures, Algorithms, System Design, Databases, and Modern Web Development.

## Project Structure

```
interview-prep-attempt-100/
├── backend/                 # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/learningportal/
│   │   │   │   ├── controller/      # REST controllers
│   │   │   │   ├── service/         # Business logic
│   │   │   │   ├── repository/      # Data access
│   │   │   │   ├── entity/          # JPA entities
│   │   │   │   ├── dto/             # Data transfer objects
│   │   │   │   ├── config/          # Configuration
│   │   │   │   ├── security/        # Security & JWT
│   │   │   │   ├── exception/       # Exception handling
│   │   │   │   └── util/            # Utilities
│   │   │   └── resources/
│   │   │       ├── application.yml
│   │   │       ├── application-dev.yml
│   │   │       └── application-prod.yml
│   │   └── test/                    # Tests
│   └── pom.xml
│
├── frontend/                # React + TypeScript frontend
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API services
│   │   ├── hooks/           # Custom hooks
│   │   ├── utils/           # Utilities
│   │   ├── types/           # TypeScript types
│   │   ├── styles/          # CSS files
│   │   └── assets/          # Static assets
│   ├── package.json
│   └── vite.config.ts
│
└── .kiro/                   # Session continuity system
    ├── specs/               # Feature specifications
    ├── hooks/               # Automation hooks
    ├── steering/            # Project guidelines
    ├── session-logs/        # Session history
    └── session-state/       # Current state
```

## Tech Stack

### Backend
- **Java 21** - Latest LTS version
- **Spring Boot 3.2** - Framework
- **Spring Data JPA** - Data access
- **Spring Security** - Authentication & authorization
- **PostgreSQL** - Database
- **JWT** - Token-based auth
- **Swagger/OpenAPI** - API documentation
- **Docker** - Code execution sandbox

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Routing
- **Monaco Editor** - Code editor
- **Axios** - HTTP client

## Prerequisites

- Java 21
- Maven 3.8+
- Node.js 18+
- PostgreSQL 15+
- Docker (for code execution)

## Setup Instructions

### 1. Database Setup

```bash
# Create database
createdb learning-portal

# Or using psql
psql -U postgres
CREATE DATABASE "learning-portal";
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies and run
mvn clean install
mvn spring-boot:run

# Backend runs on http://localhost:8080
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev

# Frontend runs on http://localhost:3000
```

## Development

### Running Tests

```bash
# Backend tests
cd backend
mvn test

# Frontend tests
cd frontend
npm test
```

### API Documentation

Once the backend is running, access Swagger UI at:
```
http://localhost:8080/swagger-ui.html
```

### Session Continuity

Use the session hooks for maintaining context:

```bash
# Start session
bash .kiro/hooks/session-start.sh

# Save progress (run every 30-60 min)
bash .kiro/hooks/session-checkpoint.sh

# Resume session
bash .kiro/hooks/session-resume.sh

# End session
bash .kiro/hooks/session-end.sh
```

## Project Phases

1. **Phase 1**: Foundation and Infrastructure (3-4 weeks) ← Current
2. **Phase 2**: Java Complete Ecosystem (12-14 weeks)
3. **Phase 3**: Data Structures Complete Universe (6-8 weeks)
4. **Phase 4**: Algorithms Complete Mastery (6-8 weeks)
5. **Phase 5**: Centralized Question Hub (4-5 weeks)
6. **Phase 6**: Database Systems Complete (5-6 weeks)
7. **Phase 7**: System Design Complete (5-6 weeks)
8. **Phase 8**: Backend Frameworks & Modern Web Dev (20-26 weeks)
9. **Phase 9**: Advanced Features & Final Polish (4-5 weeks)

**Total Timeline**: 16-20 months

## Key Features

- 🎯 10,000+ interview questions
- 💻 Multi-language code execution (Java, Python, JavaScript, C, C++)
- 📊 Progress tracking and analytics
- 🎨 AWS-inspired UI design
- 🔐 Secure authentication with JWT
- 📱 Responsive design
- 🚀 Real-time code execution
- 📈 Spaced repetition learning
- 🤖 AI learning assistant
- 🎤 Mock interview system

## Contributing

This is a personal learning project. For questions or suggestions, please open an issue.

## License

Private project - All rights reserved.


---

## 📚 Content Management (Phase 2+)

### Adding New Learning Content

The application automatically loads learning content from markdown files in the `content/` directory.

#### Content Structure
```
content/
└── java/
    ├── 01-variables-and-data-types.md  ✅ Complete (5,183 lines)
    ├── 02-operators.md                  (next topic)
    ├── 03-control-flow.md
    └── ... (100+ topics total)
```

#### Adding a New Topic

1. **Create markdown file** in `content/java/`:
   ```bash
   # Use the template
   cp TOPIC_CONTENT_TEMPLATE.md content/java/02-operators.md
   ```

2. **Follow the template structure** (see `CONTENT_METHODOLOGY_V3_FINAL.md`):
   - 10 layers of content
   - Code examples in 5 languages
   - Practice questions
   - Interview questions
   - Cheatsheet

3. **Reload content**:
   ```bash
   # Clear existing content
   curl -X POST http://localhost:2025/api/admin/clear-content
   
   # Restart application
   cd backend && java -jar target/learning-portal-backend-1.0.0-SNAPSHOT.jar
   ```

4. **Verify**: Visit http://localhost:2025 and check the new topic appears

#### Content Loader

- **File**: `backend/src/main/java/com/learningportal/config/ContentDataInitializer.java`
- **Behavior**: Automatically loads all `.md` files from `content/java/` on startup
- **Metadata extraction**: Reads title, difficulty, estimated time from markdown
- **Order**: Files are loaded in alphabetical order (use `01-`, `02-` prefixes)

#### Admin Endpoints

```bash
# View database statistics
curl http://localhost:2025/api/admin/stats

# Clear all learning content
curl -X POST http://localhost:2025/api/admin/clear-content
```

---

## 🗂️ Project Structure

```
interview-prep-attempt-100/
├── backend/                    # Spring Boot backend
│   ├── src/main/java/
│   │   └── com/learningportal/
│   │       ├── config/
│   │       │   ├── ContentDataInitializer.java  ✅ Loads markdown files
│   │       │   └── SampleDataInitializer.java   ❌ Disabled
│   │       ├── controller/
│   │       │   └── AdminController.java         ✅ Content management
│   │       └── ...
│   └── target/                 # Build output
├── frontend/                   # React frontend
├── content/                    # Learning content (markdown)
│   └── java/                   # Java topics
├── database-scripts/           # SQL scripts
├── .kiro/                      # Session & spec files
│   ├── specs/                  # Requirements, design, tasks
│   ├── session-state/          # Context preservation
│   └── steering/               # Project guidelines
├── .archive/                   # Archived old docs
├── CONTENT_METHODOLOGY_V3_FINAL.md  # Content creation guide
├── TOPIC_CONTENT_TEMPLATE.md        # Template for topics
└── README.md                   # This file
```

---

**Last Updated**: 2025-11-27
**Phase**: Phase 2 - Java Complete Ecosystem
**Status**: Content loading system operational ✅
