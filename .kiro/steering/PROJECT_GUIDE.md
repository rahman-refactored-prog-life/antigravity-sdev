# Project Guide - Comprehensive Learning Portal

**Purpose**: Complete guide for coding standards, testing practices, and phase implementation

---

## Table of Contents

1. [Coding Standards](#coding-standards)
2. [Testing Standards](#testing-standards)
3. [Phase Guidelines](#phase-guidelines)

---

# Coding Standards

## Java Standards

**Naming Conventions:**
- Classes: PascalCase (e.g., `UserService`, `LearningController`)
- Methods: camelCase (e.g., `getUserById`, `createQuestion`)
- Variables: camelCase (e.g., `userId`, `questionList`)
- Constants: UPPER_SNAKE_CASE (e.g., `MAX_RETRY_COUNT`, `DEFAULT_TIMEOUT`)
- Packages: lowercase (e.g., `com.learningportal.service`)

**Code Style:**
- Indentation: 4 spaces
- Line length: Max 120 characters
- Braces: Always use braces, even for single-line blocks
- Comments: JavaDoc for all public methods and classes
- **NO Lombok**: Write getters/setters manually for educational purposes

**Example:**
```java
/**
 * Service for managing learning content.
 * Provides CRUD operations for modules, topics, and questions.
 */
@Service
public class LearningService {
    
    private static final int MAX_TOPICS_PER_MODULE = 100;
    
    private final LearningModuleRepository moduleRepository;
    
    /**
     * Retrieves a learning module by ID.
     *
     * @param id the module ID
     * @return the learning module
     * @throws ResourceNotFoundException if module not found
     */
    public LearningModule getModuleById(Long id) {
        return moduleRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Module not found: " + id));
    }
}
```

## TypeScript/React Standards

**Naming Conventions:**
- Components: PascalCase (e.g., `CodeEditor`, `QuestionCard`)
- Functions: camelCase (e.g., `handleSubmit`, `fetchQuestions`)
- Variables: camelCase (e.g., `userId`, `isLoading`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_BASE_URL`, `MAX_RETRIES`)
- Interfaces/Types: PascalCase with 'I' prefix for interfaces (e.g., `IUser`, `QuestionProps`)

**Code Style:**
- Indentation: 2 spaces
- Line length: Max 100 characters
- Use TypeScript strict mode
- Prefer functional components with hooks
- Use arrow functions for callbacks

**Example:**
```typescript
/**
 * Code editor component with multi-language support
 */
interface CodeEditorProps {
  language: ProgrammingLanguage;
  initialCode: string;
  onExecute: (code: string) => Promise<ExecutionResult>;
  readOnly?: boolean;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  language,
  initialCode,
  onExecute,
  readOnly = false,
}) => {
  const [code, setCode] = useState(initialCode);
  const [isExecuting, setIsExecuting] = useState(false);
  
  const handleExecute = async () => {
    setIsExecuting(true);
    try {
      const result = await onExecute(code);
      // Handle result
    } catch (error) {
      // Handle error
    } finally {
      setIsExecuting(false);
    }
  };
  
  return (
    <div className="code-editor">
      {/* Editor implementation */}
    </div>
  );
};
```

## Git Commit Standards

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(auth): implement JWT authentication

- Add JWT token generation
- Create authentication filter
- Configure Spring Security

Closes #123

---

fix(editor): resolve Monaco Editor syntax highlighting issue

The syntax highlighting was not working for Python code.
Fixed by updating the language configuration.
```

## Security Standards

### Authentication & Authorization
- Always use JWT for authentication
- Never store passwords in plain text
- Use BCrypt for password hashing
- Implement proper role-based access control

### Input Validation
- Validate all user inputs
- Sanitize data before database operations
- Use parameterized queries (prevent SQL injection)
- Validate file uploads

### Code Execution
- Always use sandboxed environments (Docker)
- Implement resource limits (CPU, memory, time)
- No network access for user code
- Validate code before execution

## Performance Standards

### Backend
- API response time: < 200ms (95th percentile)
- Database queries: < 100ms
- Use connection pooling
- Implement caching where appropriate

### Frontend
- Page load time: < 2 seconds
- Use code splitting and lazy loading
- Optimize images and assets
- Minimize bundle size

## Accessibility Standards
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatibility
- Proper ARIA labels
- High contrast ratios (4.5:1 minimum)

---

# Testing Standards

## Testing Pyramid

```
                    ┌─────────────┐
                    │   E2E Tests │  10% (Critical paths)
                    │   Cypress   │
                    └─────────────┘
                  ┌─────────────────┐
                  │Integration Tests│  30% (API + DB)
                  │  Spring Boot    │
                  └─────────────────┘
              ┌───────────────────────┐
              │     Unit Tests        │  60% (Business logic)
              │  JUnit + Mockito      │
              └───────────────────────┘
```

## Coverage Requirements

- **Overall Code Coverage**: Minimum 80%
- **Critical Components**: Minimum 90%
- **New Code**: Minimum 85%
- **Branch Coverage**: Minimum 75%

## Unit Testing

### Framework
- **Backend**: JUnit 5 + Mockito + AssertJ
- **Frontend**: Vitest + React Testing Library

### Naming Convention
```java
// Pattern: test<MethodName>_<Scenario>_<ExpectedResult>
@Test
void testGetUserById_UserExists_ReturnsUser() { }

@Test
void testGetUserById_UserNotFound_ThrowsException() { }
```

### Structure
Use Given-When-Then or Arrange-Act-Assert

```java
@Test
void testCreateQuestion_ValidInput_ReturnsCreatedQuestion() {
    // Given (Arrange)
    CreateQuestionRequest request = new CreateQuestionRequest(
        "What is polymorphism?",
        Difficulty.MEDIUM
    );
    Question expectedQuestion = new Question(1L, request.getTitle());
    when(questionRepository.save(any())).thenReturn(expectedQuestion);
    
    // When (Act)
    Question actualQuestion = questionService.createQuestion(request);
    
    // Then (Assert)
    assertThat(actualQuestion).isNotNull();
    assertThat(actualQuestion.getTitle()).isEqualTo(request.getTitle());
    verify(questionRepository).save(any(Question.class));
}
```

### What to Test
- ✅ Business logic
- ✅ Edge cases
- ✅ Error conditions
- ✅ Boundary values
- ✅ Null handling

### What NOT to Test
- ❌ Getters/setters (unless they have logic)
- ❌ Constructors (unless they have logic)
- ❌ Framework code
- ❌ Third-party libraries

## Integration Testing

### Framework
- **Backend**: Spring Boot Test + MockMvc + Testcontainers
- **Frontend**: React Testing Library + MSW (Mock Service Worker)

### Backend Integration Test Example

```java
@SpringBootTest
@AutoConfigureMockMvc
@Testcontainers
class LearningControllerIntegrationTest {
    
    @Autowired
    private MockMvc mockMvc;
    
    @Autowired
    private LearningModuleRepository moduleRepository;
    
    @Container
    static PostgreSQLContainer<?> postgres = new PostgreSQLContainer<>("postgres:15")
        .withDatabaseName("testdb")
        .withUsername("test")
        .withPassword("test");
    
    @BeforeEach
    void setUp() {
        moduleRepository.deleteAll();
    }
    
    @Test
    void testGetModuleById_ModuleExists_ReturnsModule() throws Exception {
        // Given
        LearningModule module = moduleRepository.save(
            LearningModule.builder()
                .name("Java Fundamentals")
                .type(ModuleType.JAVA)
                .build()
        );
        
        // When & Then
        mockMvc.perform(get("/api/modules/" + module.getId()))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$.id").value(module.getId()))
            .andExpect(jsonPath("$.name").value("Java Fundamentals"))
            .andExpect(jsonPath("$.type").value("JAVA"));
    }
}
```

### What to Test
- ✅ API endpoints (all HTTP methods)
- ✅ Request/response formats
- ✅ Database operations
- ✅ Transaction handling
- ✅ Error responses
- ✅ Authentication/authorization

## E2E Testing

### Framework
- **Cypress** for frontend E2E tests

### E2E Test Example

```typescript
describe('Learning Flow', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  
  it('should complete full learning workflow', () => {
    // Login
    cy.get('[data-testid="login-button"]').click();
    cy.get('[data-testid="email-input"]').type('test@example.com');
    cy.get('[data-testid="password-input"]').type('password123');
    cy.get('[data-testid="submit-button"]').click();
    
    // Navigate to Java module
    cy.get('[data-testid="sidebar"]').contains('Java').click();
    cy.url().should('include', '/modules/java');
    
    // Select a topic
    cy.contains('Variables and Data Types').click();
    cy.get('[data-testid="topic-content"]').should('be.visible');
    
    // Execute code
    cy.get('[data-testid="code-editor"]').type('System.out.println("Hello");');
    cy.get('[data-testid="execute-button"]').click();
    cy.get('[data-testid="output"]').should('contain', 'Hello');
    
    // Mark topic complete
    cy.get('[data-testid="mark-complete"]').click();
    cy.get('[data-testid="progress-indicator"]').should('contain', '1/100');
  });
});
```

### What to Test
- ✅ Critical user journeys
- ✅ Authentication flows
- ✅ Core features
- ✅ Error handling

### What NOT to Test
- ❌ Every possible path (too slow)
- ❌ Unit-level logic
- ❌ Third-party integrations (mock them)

## Test Execution

### Backend
```bash
# Run all tests
mvn test

# Run with coverage
mvn test jacoco:report

# Run integration tests only
mvn verify -P integration-tests
```

### Frontend
```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run E2E tests
npm run cypress:run
```

## Checklist Before Marking Task Complete

- [ ] All new code has unit tests
- [ ] Unit test coverage > 80%
- [ ] Integration tests added for new APIs
- [ ] E2E tests added for new features
- [ ] All tests pass locally
- [ ] No flaky tests
- [ ] Test code is clean and maintainable

---

# Phase Guidelines

## General Phase Principles

### Before Starting Any Phase

1. **Review Phase Requirements**
   - Read all requirements for the phase in requirements.md
   - Understand what needs to be built
   - Identify dependencies on previous phases

2. **Review Phase Design**
   - Study the architecture in design.md
   - Understand component interfaces
   - Review data models

3. **Review Phase Tasks**
   - Read all tasks for the phase in tasks.md
   - Understand task dependencies
   - Estimate time for each task

4. **Set Up Environment**
   - Ensure all prerequisites are installed
   - Verify previous phase is complete
   - Run all existing tests to ensure nothing is broken

### During Phase Implementation

1. **Work Sequentially**
   - Complete tasks in order
   - Don't skip tasks
   - Don't work on multiple tasks simultaneously

2. **Test Continuously**
   - Test after each task
   - Don't accumulate untested code
   - Fix issues immediately

3. **Document as You Go**
   - Update documentation with each change
   - Document decisions and rationale
   - Keep README files current

4. **Checkpoint Regularly**
   - Run session-checkpoint every 30-60 minutes
   - Commit after each task completion
   - Push to remote frequently

### After Completing Phase

1. **Validation**
   - Run all tests (unit, integration, E2E)
   - Verify all phase requirements are met
   - Test all features manually

2. **Documentation**
   - Update phase completion status
   - Document lessons learned
   - Update CHANGELOG

3. **Checkpoint**
   - Run final session-checkpoint
   - Update current-phase.json
   - Prepare for next phase

---

## Phase-Specific Guidelines

### Phase 1: Foundation and Infrastructure (3-4 weeks)

**Focus**: Set up solid technical foundation

**Critical Success Factors**:
- Spring Boot backend running smoothly
- PostgreSQL connected and working (NO H2!)
- React frontend rendering
- Monaco Editor integrated
- Authentication working
- Code execution working (basic)

**Common Pitfalls**:
- Spending too much time on perfect setup
- Not testing Docker code execution early
- Skipping session continuity setup
- Not configuring CORS properly

**Tips**:
- Get basic versions working first, optimize later
- Test code execution with simple "Hello World" programs
- Create all hooks early in the phase
- Use PostgreSQL for all environments (development and production)

**Validation Checklist**:
- [ ] Backend starts without errors
- [ ] Database connection works
- [ ] Frontend loads and displays
- [ ] Can login/register
- [ ] Monaco Editor displays code
- [ ] Can execute simple Java code
- [ ] All hooks created and tested
- [ ] All tests pass

---

### Phase 2: Java Complete Ecosystem (12-14 weeks)

**Focus**: Comprehensive Java content with 1050+ questions

**Critical Success Factors**:
- All 100+ Java topics implemented
- 1050+ questions with solutions in 5 languages
- Practice questions embedded in topics
- Progress tracking working
- Content quality is high

**Common Pitfalls**:
- Rushing through topics without depth
- Not testing code examples
- Forgetting to add practice questions
- Not implementing solutions in all 5 languages
- Poor content organization

**Tips**:
- Create content templates for consistency
- Test all code examples before adding
- Use AI to help generate initial content, but review carefully
- Implement one topic completely before moving to next
- Track question count to ensure 1050+ target

**Validation Checklist**:
- [ ] All Java topics implemented
- [ ] 1050+ questions added
- [ ] All questions have 5-language solutions
- [ ] Practice questions embedded in topics
- [ ] All code examples compile and run
- [ ] Progress tracking works
- [ ] All tests pass

---

### Phase 3: Data Structures Complete Universe (6-8 weeks)

**Focus**: 30+ data structures with visualizations and 1000+ questions

**Critical Success Factors**:
- All 30+ data structures implemented
- Interactive visualizations for each
- 1000+ questions with 5-language solutions
- Visualizations are smooth and educational
- Complexity analysis displayed

**Tips**:
- Start with simple visualizations, enhance later
- Use D3.js templates for consistency
- Test visualizations on mobile devices
- Implement basic operations first, advanced later
- Reuse visualization components

---

### Phase 4: Algorithms Complete Mastery (6-8 weeks)

**Focus**: 15+ algorithm categories with visualizations and 1000+ questions

**Critical Success Factors**:
- All 15+ algorithm categories implemented
- Step-by-step algorithm visualizations
- 1000+ questions with 5-language solutions
- Comparison mode working
- Optimization progressions shown

**Tips**:
- Add speed controls to visualizations
- Highlight current operation clearly
- Show before/after states
- Implement brute force → optimal progressions
- Test with different input sizes

---

### Phase 5: Centralized Question Hub (4-5 weeks)

**Focus**: Automated question acquisition and centralized hub

**Critical Success Factors**:
- Web scraping working for 10+ sources
- Deduplication working correctly
- Company tagging accurate
- Difficulty classification working
- Centralized hub UI functional
- 3000+ questions acquired

**Tips**:
- Respect rate limits (1 request per 2 seconds)
- Test scrapers on small samples first
- Implement robust error handling
- Log all scraping activity
- Review scraped data quality regularly

---

### Phase 6: Database Systems Complete (5-6 weeks)

**Focus**: SQL/NoSQL comprehensive coverage with 500+ questions

**Critical Success Factors**:
- All SQL topics implemented
- NoSQL coverage complete
- Interactive SQL editor working
- 500+ questions with solutions
- Query execution working
- Performance analysis working

**Tips**:
- Use PostgreSQL with separate schema for SQL editor practice
- Implement query timeout limits
- Sanitize all SQL inputs
- Provide sample databases for practice
- Show execution plans

---

### Phase 7: System Design Complete (5-6 weeks)

**Focus**: 20+ patterns, 15+ case studies, 500+ questions

**Critical Success Factors**:
- All 20+ patterns implemented
- All 15+ case studies complete
- Interactive diagrams working
- 500+ questions with solutions
- Trade-off analysis included

**Tips**:
- Use simple, clear diagrams
- Explain why decisions were made
- Include pros/cons for each approach
- Link to relevant database/algorithm topics
- Use real company examples

---

### Phase 8: Backend Frameworks & Modern Web Dev (20-26 weeks)

**Focus**: Spring Boot, Hibernate, React, Node.js with 2190+ questions

**Critical Success Factors**:
- All Spring Boot topics implemented (430+ questions)
- All Hibernate topics implemented (430+ questions)
- All React topics implemented (630+ questions)
- All Node.js topics implemented (700+ questions)
- Hands-on projects working
- All code examples tested

**Tips**:
- Break into sub-phases (Spring, Hibernate, React, Node.js)
- Create working example projects
- Test all framework code
- Show common patterns and best practices
- Include troubleshooting guides

---

### Phase 9: Advanced Features & Final Polish (4-5 weeks)

**Focus**: AI features, mock interviews, final polish

**Critical Success Factors**:
- AI learning assistant working
- Mock interview system functional
- Spaced repetition implemented
- All performance optimizations done
- Security audit complete
- 10,000+ questions achieved

**Tips**:
- Focus on core advanced features
- Run comprehensive performance tests
- Conduct thorough security review
- Verify question count and quality
- Test on production-like environment

---

## Phase Transition Checklist

When moving from one phase to another:

- [ ] All tasks in current phase completed
- [ ] All tests passing
- [ ] Documentation updated
- [ ] CHANGELOG updated
- [ ] Session checkpoint run
- [ ] current-phase.json updated
- [ ] Next phase requirements reviewed
- [ ] Next phase design reviewed
- [ ] Next phase tasks reviewed

---

## Troubleshooting

### If Phase Is Taking Too Long
1. Review task estimates
2. Identify bottlenecks
3. Consider simplifying scope
4. Ask for help if stuck
5. Update timeline estimates

### If Quality Is Suffering
1. Slow down
2. Add more tests
3. Review code more carefully
4. Refactor as needed
5. Don't rush to next phase

### If Losing Motivation
1. Take a break
2. Review progress made
3. Celebrate small wins
4. Remember the end goal
5. Adjust timeline if needed

---

**Remember**: Each phase builds on the previous. Don't rush. Quality over speed. The 16-20 month timeline is realistic and achievable if you follow these guidelines!
