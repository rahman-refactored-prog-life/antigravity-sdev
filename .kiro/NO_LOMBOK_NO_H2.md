# ⚠️ IMPORTANT: No Lombok, No H2

## Project Policy

This project uses:
- ✅ **PostgreSQL ONLY** - for all environments
- ✅ **Manual getters/setters** - no Lombok
- ✅ **Testcontainers** - for integration tests

This project does NOT use:
- ❌ **NO Lombok** - write explicit code
- ❌ **NO H2** - PostgreSQL everywhere
- ❌ **NO in-memory databases** - real PostgreSQL only

## Why?

### PostgreSQL Only
- Consistency across all environments
- No H2/PostgreSQL compatibility issues
- Real database behavior in development and testing
- Production-like environment from day one

### No Lombok
- Explicit code is clearer
- Better for learning (this is an educational platform)
- No annotation processor complexity
- Better IDE support without plugins
- What you see is what you get

## What This Means

### For Development
```yaml
# application.yml (development)
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/learning_portal_dev
    username: postgres
    password: your_password
  jpa:
    hibernate:
      ddl-auto: update
```

### For Testing
```java
// Use Testcontainers
@Testcontainers
class MyIntegrationTest {
    @Container
    static PostgreSQLContainer<?> postgres = 
        new PostgreSQLContainer<>("postgres:15");
}
```

### For Entities
```java
// NO Lombok - write explicit code
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String username;
    private String email;
    
    // Explicit getters and setters
    public Long getId() {
        return id;
    }
    
    public void setId(Long id) {
        this.id = id;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
}
```

## Files Updated

All references to Lombok and H2 have been removed from:
- ✅ `.kiro/specs/comprehensive-learning-portal/tasks.md`
- ✅ `.kiro/specs/comprehensive-learning-portal/README.md`
- ✅ `.kiro/steering/phase-guidelines.md`
- ✅ `.kiro/steering/project-standards.md`

New files created:
- ✅ `.kiro/specs/comprehensive-learning-portal/TECHNICAL_DECISIONS.md`
- ✅ `.kiro/NO_LOMBOK_NO_H2.md` (this file)

## Remember

When implementing any task:
- ❌ Don't add Lombok to pom.xml
- ❌ Don't use H2 database
- ✅ Use PostgreSQL for everything
- ✅ Write getters/setters manually (or use IDE generation)
- ✅ Use Testcontainers for integration tests

---

**This is a project-wide policy. No exceptions.**
