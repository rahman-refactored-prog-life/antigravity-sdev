# Testing Guide - Phase 2 UI

## 🚀 Start the Application

```bash
java -jar backend/target/learning-portal-backend-1.0.0-SNAPSHOT.jar
```

The app will start on **http://localhost:2025**

## 📝 What to Test

### 1. Authentication
- **Register**: Create a new account at `/register`
- **Login**: Login with your credentials at `/login`

### 2. Dashboard
- After login, you'll see the dashboard at `/dashboard`
- Check that the UI loads correctly

### 3. Java Module Page
- Navigate to: **http://localhost:2025/modules/java**
- You should see:
  - ✅ "Java Programming" module header
  - ✅ Module description
  - ✅ Topic count (1 topic)
  - ✅ One topic card: "Variables and Data Types"
  - ✅ Difficulty badge (BEGINNER - green)
  - ✅ Estimated time (45 min)
  - ✅ Question count (3 questions)

### 4. Topic Detail Page
- Click on "Variables and Data Types" topic
- You should see:
  - ✅ Breadcrumb navigation (← Java Programming / Variables and Data Types)
  - ✅ Topic title and difficulty badge
  - ✅ Topic description
  - ✅ Metadata (45 minutes, 3 questions, 5 code examples)
  - ✅ Full markdown content rendered
  - ✅ Code blocks with syntax highlighting
  - ✅ "Back to Topics" and "Mark as Complete" buttons

### 5. API Endpoints (Optional - Test with Postman/curl)

```bash
# Get all modules
curl http://localhost:2025/api/learning/modules

# Get topics for Java module
curl http://localhost:2025/api/learning/modules/1/topics

# Get topic by ID
curl http://localhost:2025/api/learning/topics/1

# Get questions for topic
curl http://localhost:2025/api/learning/topics/1/questions

# Get code examples for topic
curl http://localhost:2025/api/learning/topics/1/code-examples
```

## 🎨 UI Features to Verify

### Design System
- ✅ AWS-inspired color scheme
- ✅ Consistent spacing and typography
- ✅ Smooth hover effects on cards
- ✅ Responsive layout (try resizing browser)

### Navigation
- ✅ Breadcrumbs work correctly
- ✅ Back button navigates properly
- ✅ Sidebar navigation (if visible)

### Content Rendering
- ✅ Markdown renders correctly
- ✅ Code blocks have syntax highlighting
- ✅ Lists and headings formatted properly
- ✅ Difficulty badges color-coded

## 📊 Sample Data Included

**Module**: Java Programming
- **Topics**: 1 (Variables and Data Types)
- **Questions**: 3 (Core Exercise, Edge Case Drill, Challenge)
- **Code Examples**: 5 (Java, Python, JavaScript, C++, Go)

## 🐛 What to Look For

### Potential Issues
- [ ] Does the page load without errors?
- [ ] Are all images/icons displaying?
- [ ] Does navigation work smoothly?
- [ ] Is the content readable and well-formatted?
- [ ] Do buttons respond to clicks?
- [ ] Are there any console errors? (Check browser DevTools)

### Mobile Testing
- [ ] Try on mobile screen size (or resize browser)
- [ ] Check if layout adapts properly
- [ ] Verify touch interactions work

## 🔄 Reset Data (If Needed)

If you want to reset the sample data:

1. Stop the application
2. Delete the database or clear tables
3. Restart the application (SampleDataInitializer will run again)

## ✅ Success Criteria

You should be able to:
1. ✅ Login successfully
2. ✅ Navigate to Java module page
3. ✅ See the sample topic
4. ✅ Click and view topic details
5. ✅ Read the full content with proper formatting
6. ✅ Navigate back to topics list

## 📝 Feedback

After testing, note:
- What works well?
- What needs improvement?
- Any bugs or issues?
- UI/UX suggestions?

---

**Ready for Phase 2.2**: Once testing is complete, we'll start creating full topics following the Content_Methodology_v3_Framework!
