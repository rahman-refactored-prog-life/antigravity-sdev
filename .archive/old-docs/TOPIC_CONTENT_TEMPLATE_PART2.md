# [TOPIC NAME] - Template Part 2 (Layers 4-10)

## 4. Code Implementation (Multi-Language)

### Version 1: Learning Version (Simplest Possible)

**Goal**: Understand the concept, not optimize

---

#### Java (Primary Language)

```java
/**
 * [FILL: Description of what this code demonstrates]
 * 
 * Time Complexity: O([FILL])
 * Space Complexity: O([FILL])
 * 
 * @param [FILL: param1] [FILL: description]
 * @return [FILL: description]
 */
public static [FILL: ReturnType] methodName([FILL: params]) {
    // Step 1: [FILL: What this step does]
    [FILL: code line 1]
    
    // Step 2: [FILL: What this step does]
    [FILL: code line 2]
    
    // Step 3: [FILL: What this step does]
    [FILL: code line 3]
    
    return [FILL: result];
}

// Unit Test
@Test
public void testMethodName_BasicCase_ReturnsExpected() {
    // Given
    [FILL: input setup]
    
    // When
    [FILL: ReturnType] result = methodName([FILL: params]);
    
    // Then
    assertEquals([FILL: expected], result);
}

// Edge Case Test
@Test
public void testMethodName_EdgeCase_HandlesCorrectly() {
    // Given
    [FILL: edge case setup]
    
    // When
    [FILL: ReturnType] result = methodName([FILL: params]);
    
    // Then
    assertEquals([FILL: expected], result);
}
```

---

#### Python

```python
def method_name(params):
    """
    [FILL: Description]
    
    Time: O([FILL]) | Space: O([FILL])
    
    Args:
        [FILL: param1]: [FILL: description]
    
    Returns:
        [FILL: description]
    """
    # Step 1: [FILL: What this step does]
    [FILL: code line 1]
    
    # Step 2: [FILL: What this step does]
    [FILL: code line 2]
    
    # Step 3: [FILL: What this step does]
    [FILL: code line 3]
    
    return [FILL: result]

# Unit Test
def test_method_name_basic_case():
    # Given
    [FILL: input setup]
    
    # When
    result = method_name([FILL: params])
    
    # Then
    assert result == [FILL: expected]

# Edge Case Test
def test_method_name_edge_case():
    # Given
    [FILL: edge case setup]
    
    # When
    result = method_name([FILL: params])
    
    # Then
    assert result == [FILL: expected]
```

---

#### JavaScript (Node.js)

```javascript
/**
 * [FILL: Description]
 * 
 * Time: O([FILL]) | Space: O([FILL])
 * 
 * @param {[FILL: type]} param1 - [FILL: description]
 * @returns {[FILL: type]} [FILL: description]
 */
function methodName(params) {
    // Step 1: [FILL: What this step does]
    [FILL: code line 1]
    
    // Step 2: [FILL: What this step does]
    [FILL: code line 2]
    
    // Step 3: [FILL: What this step does]
    [FILL: code line 3]
    
    return [FILL: result];
}

// Unit Test (Jest)
test('methodName - basic case', () => {
    // Given
    const [FILL: input] = [FILL: setup];
    
    // When
    const result = methodName([FILL: params]);
    
    // Then
    expect(result).toBe([FILL: expected]);
});

// Edge Case Test
test('methodName - edge case', () => {
    // Given
    const [FILL: input] = [FILL: setup];
    
    // When
    const result = methodName([FILL: params]);
    
    // Then
    expect(result).toBe([FILL: expected]);
});
```

---

#### C++

```cpp
/**
 * [FILL: Description]
 * 
 * Time: O([FILL]) | Space: O([FILL])
 */
[FILL: ReturnType] methodName([FILL: params]) {
    // Step 1: [FILL: What this step does]
    [FILL: code line 1]
    
    // Step 2: [FILL: What this step does]
    [FILL: code line 2]
    
    // Step 3: [FILL: What this step does]
    [FILL: code line 3]
    
    return [FILL: result];
}

// Unit Test (Google Test)
TEST(MethodNameTest, BasicCase) {
    // Given
    [FILL: input setup]
    
    // When
    [FILL: ReturnType] result = methodName([FILL: params]);
    
    // Then
    EXPECT_EQ([FILL: expected], result);
}

// Edge Case Test
TEST(MethodNameTest, EdgeCase) {
    // Given
    [FILL: edge case setup]
    
    // When
    [FILL: ReturnType] result = methodName([FILL: params]);
    
    // Then
    EXPECT_EQ([FILL: expected], result);
}
```

---

#### Go

```go
// [FILL: Description]
//
// Time: O([FILL]) | Space: O([FILL])
func MethodName(params) [FILL: returnType] {
    // Step 1: [FILL: What this step does]
    [FILL: code line 1]
    
    // Step 2: [FILL: What this step does]
    [FILL: code line 2]
    
    // Step 3: [FILL: What this step does]
    [FILL: code line 3]
    
    return [FILL: result]
}

// Unit Test
func TestMethodName_BasicCase(t *testing.T) {
    // Given
    [FILL: input setup]
    
    // When
    result := MethodName([FILL: params])
    
    // Then
    if result != [FILL: expected] {
        t.Errorf("got %v, want %v", result, [FILL: expected])
    }
}

// Edge Case Test
func TestMethodName_EdgeCase(t *testing.T) {
    // Given
    [FILL: edge case setup]
    
    // When
    result := MethodName([FILL: params])
    
    // Then
    if result != [FILL: expected] {
        t.Errorf("got %v, want %v", result, [FILL: expected])
    }
}
```

---

### Line-by-Line Explanation (Java Version)

**Line 1**: `[FILL: code]`
- **What it does**: [FILL: Detailed explanation]
- **Why**: [FILL: Reason for this line]
- **Example**: If input is [FILL: X], this becomes [FILL: Y]

**Line 2**: `[FILL: code]`
- **What it does**: [FILL: Detailed explanation]
- **Why**: [FILL: Reason for this line]
- **Example**: If input is [FILL: X], this becomes [FILL: Y]

**Line 3**: `[FILL: code]`
- **What it does**: [FILL: Detailed explanation]
- **Why**: [FILL: Reason for this line]
- **Example**: If input is [FILL: X], this becomes [FILL: Y]

[FILL: Continue for all important lines...]

---

### Execution Trace

**Input**: [FILL: Example input]
**Goal**: [FILL: What we want to achieve]

```
Initial State:
  [FILL: variable1] = [FILL: value]
  [FILL: variable2] = [FILL: value]

Step 1: [FILL: Action]
  [FILL: variable1] = [FILL: new value]
  [FILL: variable2] = [FILL: new value]
  
Step 2: [FILL: Action]
  [FILL: variable1] = [FILL: new value]
  [FILL: variable2] = [FILL: new value]

Step 3: [FILL: Action]
  [FILL: variable1] = [FILL: new value]
  [FILL: variable2] = [FILL: new value]

Final State:
  Return: [FILL: result]
```

---

### Interactive Code Runner

**Try it yourself**: [FILL: Link to online IDE (repl.it, jdoodle, etc.) or description]
- Modify the input
- See step-by-step execution
- Visualize data structures
- Compare different approaches

---

### Version 2: Production Version (Real-World)

**Goal**: How you'd actually write this in production

```java
/**
 * Production-ready implementation with full error handling
 * 
 * Time: O([FILL]) | Space: O([FILL])
 */
public static [FILL: ReturnType] methodName([FILL: params]) {
    // Input validation
    if ([FILL: invalid condition]) {
        throw new IllegalArgumentException("[FILL: error message]");
    }
    
    // Edge case handling
    if ([FILL: edge case condition]) {
        return [FILL: special result];
    }
    
    // Main logic (optimized)
    [FILL: optimized code]
    
    return [FILL: result];
}
```

---

### What Changed from Learning to Production?

1. **Input Validation**: Added [FILL: validation]
   - **Why**: [FILL: Reason]
   - **Impact**: [FILL: Effect on robustness/performance]

2. **Edge Case Handling**: Added [FILL: handling]
   - **Why**: [FILL: Reason]
   - **Impact**: [FILL: Effect on correctness]

3. **Optimization**: Changed [FILL: what]
   - **Before**: O([FILL])
   - **After**: O([FILL])
   - **Trade-off**: [FILL: What we sacrifice]

4. **Error Handling**: Added [FILL: handling]
   - **Why**: [FILL: Reason]
   - **Impact**: [FILL: Effect on reliability]

---

### Edge Cases Handled

| Edge Case | Input Example | Expected Behavior | Why Important |
|-----------|---------------|-------------------|---------------|
| [FILL: Case 1] | `[FILL]` | [FILL: behavior] | [FILL: reason] |
| [FILL: Case 2] | `[FILL]` | [FILL: behavior] | [FILL: reason] |
| [FILL: Case 3] | `[FILL]` | [FILL: behavior] | [FILL: reason] |
| [FILL: Case 4] | `[FILL]` | [FILL: behavior] | [FILL: reason] |
| [FILL: Case 5] | `[FILL]` | [FILL: behavior] | [FILL: reason] |

---

### Naming Conventions (Consistent Across Languages)

| Language | Function/Method | Class | Variable | Constant |
|----------|----------------|-------|----------|----------|
| Java | `camelCase` | `PascalCase` | `camelCase` | `UPPER_SNAKE` |
| Python | `snake_case` | `PascalCase` | `snake_case` | `UPPER_SNAKE` |
| JavaScript | `camelCase` | `PascalCase` | `camelCase` | `UPPER_SNAKE` |
| C++ | `camelCase` | `PascalCase` | `snake_case` | `UPPER_SNAKE` |
| Go | `PascalCase` (exported) | `PascalCase` | `camelCase` | `PascalCase` |

---

### Memory Layout (For Data Structures)

```
[FILL: Visual representation of how this is stored in memory]

Example:
┌───┬───┬───┬───┬───┐
│ [FILL] │ [FILL] │ [FILL] │ [FILL] │ [FILL] │  ← [FILL: Description]
└───┴───┴───┴───┴───┘
  [FILL]   [FILL]   [FILL]   [FILL]   [FILL]    ← [FILL: Labels]
  
Memory addresses: [FILL: addresses]
```

---

### Complexity Visualizer

**Interactive Widget**: [FILL: Description or link to visualization]
- Adjust input size (n)
- See time/space usage
- Compare with other approaches
- Visualize growth rate

---

## 5. Practice & Assessment

### Core Exercises (Basic Implementation)

#### Exercise 1: Basic Application (Easy)

**Difficulty**: ⭐ Easy  
**Time**: 10-15 minutes  
**Skills**: [FILL: Skills being tested]

**Problem**: [FILL: Clear problem statement]

**Example**:
```
Input: [FILL: example input]
Output: [FILL: example output]
Explanation: [FILL: why this output]
```

**Constraints**:
- [FILL: Constraint 1]
- [FILL: Constraint 2]
- [FILL: Constraint 3]

**Hint 1**: [FILL: Gentle nudge in right direction]

**Hint 2**: [FILL: More specific guidance]

**Hint 3**: [FILL: Almost the answer]

**Solution**:
<details>
<summary>Click to reveal solution</summary>

**Approach**: [FILL: Strategy explanation]

**Java**:
```java
[FILL: Full solution with comments]
// Time: O([FILL]) | Space: O([FILL])
```

**Python**:
```python
[FILL: Full solution with comments]
# Time: O([FILL]) | Space: O([FILL])
```

**JavaScript**:
```javascript
[FILL: Full solution with comments]
// Time: O([FILL]) | Space: O([FILL])
```

**C++**:
```cpp
[FILL: Full solution with comments]
// Time: O([FILL]) | Space: O([FILL])
```

**Go**:
```go
[FILL: Full solution with comments]
// Time: O([FILL]) | Space: O([FILL])
```

**Complexity Analysis**:
- **Time**: [FILL: Detailed explanation]
- **Space**: [FILL: Detailed explanation]

**Key Insights**:
- [FILL: Insight 1]
- [FILL: Insight 2]
- [FILL: Insight 3]

</details>

**Auto-Grade**: [FILL: Link to LeetCode/HackerRank or test cases]

---

#### Exercise 2: Slight Variation (Medium)

**Difficulty**: ⭐⭐ Medium  
**Time**: 20-30 minutes  
**Skills**: [FILL: Skills being tested]

[FILL: Similar structure to Exercise 1...]

---

#### Exercise 3: Different Context (Medium)

**Difficulty**: ⭐⭐ Medium  
**Time**: 20-30 minutes  
**Skills**: [FILL: Skills being tested]

[FILL: Similar structure to Exercise 1...]

---

### Edge Case Drills (Stress Boundaries)

**Purpose**: Learn to handle edge cases systematically

#### Drill 1: Empty Input

**Challenge**: Make your solution work with empty input  
**Test Case**: `input = []` or `input = ""`  
**Expected**: [FILL: What should happen]  
**Common Mistake**: [FILL: What people do wrong]  
**Correct Approach**: [FILL: How to handle it]

**Code**:
```java
if (input == null || input.length == 0) {
    return [FILL: appropriate value];
}
```

---

#### Drill 2: Single Element

**Challenge**: Handle the smallest valid input  
**Test Case**: `input = [1]` or `input = "a"`  
**Expected**: [FILL: What should happen]  
**Why Tricky**: [FILL: Explanation]  
**Correct Approach**: [FILL: How to handle it]

---

#### Drill 3: All Same Elements

**Challenge**: Handle duplicates  
**Test Case**: `input = [5, 5, 5, 5]`  
**Expected**: [FILL: What should happen]  
**Why Tricky**: [FILL: Explanation]  
**Correct Approach**: [FILL: How to handle it]

---

#### Drill 4: Maximum Size

**Challenge**: Handle large inputs efficiently  
**Test Case**: `input = [1..10^6]`  
**Expected**: [FILL: What should happen]  
**Performance Requirement**: [FILL: Time limit]  
**Optimization Needed**: [FILL: What to optimize]

---

#### Drill 5: Negative/Invalid Values

**Challenge**: Handle invalid input gracefully  
**Test Case**: `input = [-1, -5]` or `input = null`  
**Expected**: [FILL: What should happen]  
**Error Handling**: [FILL: How to handle]

---

### Challenge Problems (Interview-Style)

#### Challenge 1: [FILL: Problem Name]

**Company**: [FILL: e.g., Google]  
**Difficulty**: ⭐⭐⭐ Hard  
**Frequency**: [FILL: Very High/High/Medium]  
**Time**: 45 minutes

**Problem Statement**:
[FILL: Full problem description with examples]

**Constraints**:
- [FILL: Constraint 1]
- [FILL: Constraint 2]
- [FILL: Constraint 3]

**Examples**:
```
Example 1:
Input: [FILL: input]
Output: [FILL: output]
Explanation: [FILL: why]

Example 2:
Input: [FILL: input]
Output: [FILL: output]
Explanation: [FILL: why]
```

**Hints**:
1. [FILL: Hint 1 - High level]
2. [FILL: Hint 2 - More specific]
3. [FILL: Hint 3 - Key insight]
4. [FILL: Hint 4 - Almost the approach]

**Solution**:
<details>
<summary>Step-by-step approach</summary>

**Approach 1: Brute Force**
- [FILL: Description]
- Time: O([FILL])
- Space: O([FILL])
- Why it works: [FILL: Explanation]
- Why it's not optimal: [FILL: Explanation]

**Approach 2: Optimized**
- [FILL: Description]
- Time: O([FILL])
- Space: O([FILL])
- Why it's better: [FILL: Explanation]
- Key insight: [FILL: The "aha!" moment]

**Implementation** (All 5 languages):

[FILL: Complete solutions in Java, Python, JavaScript, C++, Go]

**Complexity Analysis**:
- Time: [FILL: Detailed explanation]
- Space: [FILL: Detailed explanation]

**Common Pitfalls**:
- [FILL: Pitfall 1]: [FILL: How to avoid]
- [FILL: Pitfall 2]: [FILL: How to avoid]

**Follow-up Questions**:
- Q1: [FILL: Question] → A: [FILL: Approach]
- Q2: [FILL: Question] → A: [FILL: Approach]

</details>

---

#### Challenge 2: [FILL: Problem Name]

[FILL: Similar structure for another hard problem]

---

#### Challenge 3: [FILL: Problem Name]

[FILL: Similar structure for another hard problem]

---

### Mini-Projects (Real-World Simulation)

#### Project 1: [FILL: Project Name]

**Goal**: Build a real application using this concept  
**Time**: 2-4 hours  
**Difficulty**: ⭐⭐⭐

**Requirements**:
1. [FILL: Requirement 1]
2. [FILL: Requirement 2]
3. [FILL: Requirement 3]
4. [FILL: Requirement 4]
5. [FILL: Requirement 5]

**Features to Implement**:
- [ ] [FILL: Feature 1]
- [ ] [FILL: Feature 2]
- [ ] [FILL: Feature 3]
- [ ] [FILL: Feature 4]
- [ ] [FILL: Feature 5]

**Starter Code**:
```java
// Basic structure to get you started
[FILL: starter code]
```

**Test Cases**:
```
Test 1: [FILL: Description]
Input: [FILL: input]
Expected: [FILL: output]

Test 2: [FILL: Description]
Input: [FILL: input]
Expected: [FILL: output]

Test 3: [FILL: Description]
Input: [FILL: input]
Expected: [FILL: output]
```

**Example Solution**: [FILL: Link to GitHub repo or full implementation]

**Extensions** (Make it better):
1. **[FILL: Extension 1]**: [FILL: Description]
   - Difficulty: [FILL: Level]
   - Learning: [FILL: What you'll learn]

2. **[FILL: Extension 2]**: [FILL: Description]
   - Difficulty: [FILL: Level]
   - Learning: [FILL: What you'll learn]

3. **[FILL: Extension 3]**: [FILL: Description]
   - Difficulty: [FILL: Level]
   - Learning: [FILL: What you'll learn]

**Real-World Connection**:
This project simulates [FILL: real system] used by [FILL: companies].

---

### Auto-Graded Quizzes

#### Multiple Choice Questions

**Question 1**: [FILL: Question text]

A) [FILL: Option A]  
B) [FILL: Option B]  
C) [FILL: Option C]  
D) [FILL: Option D]

<details>
<summary>Answer & Explanation</summary>

**Correct Answer**: [FILL: Letter]

**Why [FILL] is correct**: [FILL: Explanation]

**Why others are wrong**:
- A: [FILL: Why wrong]
- B: [FILL: Why wrong]
- D: [FILL: Why wrong]

**Key Concept**: [FILL: What this tests]

</details>

---

[FILL: Questions 2-10 with similar structure...]

---

#### Coding Questions (Auto-Judged)

**Question 1**: [FILL: Problem statement]

**Input Format**: [FILL: Description]  
**Output Format**: [FILL: Description]

**Test Cases**:
```
Input 1: [FILL: input]
Output 1: [FILL: output]

Input 2: [FILL: input]
Output 2: [FILL: output]

Input 3: [FILL: input]
Output 3: [FILL: output]
```

**Submit Your Solution**: [FILL: Link to online judge]

**Hints Available**: Yes (click for hints)

---

[FILL: Questions 2-5 with similar structure...]

---

#### True/False Questions

**Question 1**: [FILL: Statement]

<details>
<summary>Answer</summary>

**Answer**: [FILL: True/False]

**Explanation**: [FILL: Why]

</details>

---

[FILL: Questions 2-5 with similar structure...]

---

### Practice Roadmap

**Beginner Path** (Start here):
1. Core Exercise 1 (Easy)
2. Core Exercise 2 (Medium)
3. Edge Case Drills 1-3
4. MCQ Quiz (Questions 1-5)

**Intermediate Path**:
1. Core Exercise 3 (Medium)
2. Edge Case Drills 4-5
3. Challenge Problem 1
4. Coding Quiz (Questions 1-3)

**Advanced Path**:
1. Challenge Problems 2-3
2. Mini-Project
3. All Extensions
4. Teach someone else!

**Time Investment**:
- Beginner: 2-3 hours
- Intermediate: 3-4 hours
- Advanced: 5-8 hours
- Total Mastery: 10-15 hours

---

## 6. Common Mistakes, Pitfalls & Anti-Patterns

### Common Mistakes (What Beginners Do Wrong)

#### Mistake 1: [FILL: Common Error Name]

**What people do wrong**:
```java
// ❌ WRONG - [FILL: Why this is wrong]
[FILL: incorrect code]
```

**Why it's wrong**:
[FILL: Technical explanation of the error]

**Why this happens** (Psychological reason):
- **Cognitive reason**: [FILL: Mental model issue]
- **Common assumption**: [FILL: What they assume]
- **Looks right because**: [FILL: Why it seems correct]

**How to fix it**:
```java
// ✅ CORRECT - [FILL: Why this is right]
[FILL: correct code]
```

**How to remember**:
💡 [FILL: Memory trick or mnemonic]

**How to debug this**:
1. **Symptom**: [FILL: What you'll see]
2. **Check**: [FILL: What to look for]
3. **Fix**: [FILL: How to correct]

**Real Example**:
```
Input: [FILL: example]
Wrong Output: [FILL: what wrong code produces]
Correct Output: [FILL: what it should be]
```

---

#### Mistake 2: [FILL: Another Common Error]

[FILL: Similar structure to Mistake 1...]

---

#### Mistake 3: [FILL: Yet Another Error]

[FILL: Similar structure to Mistake 1...]

---

[FILL: Continue for 5-7 common mistakes total]

---

### Pitfalls (Tricky Situations)

#### Pitfall 1: [FILL: Tricky Situation Name]

**The Trap**:
[FILL: Description of the tricky situation]

**Example**:
```java
// This looks fine but...
[FILL: code that seems okay]
```

**What Goes Wrong**:
[FILL: Explanation of the problem]

**When It Happens**:
- [FILL: Scenario 1]
- [FILL: Scenario 2]
- [FILL: Scenario 3]

**How to Avoid**:
```java
// Safe approach
[FILL: correct code]
```

**Warning Signs**:
- 🚩 [FILL: Sign 1]
- 🚩 [FILL: Sign 2]
- 🚩 [FILL: Sign 3]

---

#### Pitfall 2: [FILL: Another Tricky Situation]

[FILL: Similar structure to Pitfall 1...]

---

#### Pitfall 3: [FILL: Yet Another Tricky Situation]

[FILL: Similar structure to Pitfall 1...]

---

### Anti-Patterns (Don't Do This!)

#### Anti-Pattern 1: [FILL: Bad Practice Name]

**What it is**:
[FILL: Description of the anti-pattern]

**Example**:
```java
// ❌ ANTI-PATTERN
[FILL: bad code example]
```

**Why it's bad**:
- **Performance**: [FILL: Impact]
- **Maintainability**: [FILL: Impact]
- **Readability**: [FILL: Impact]
- **Bugs**: [FILL: What can go wrong]

**Real-World Consequences**:
[FILL: What happens in production]

**Better Approach**:
```java
// ✅ BETTER PATTERN
[FILL: good code example]
```

**When You Might See This**:
- [FILL: Context 1]
- [FILL: Context 2]
- [FILL: Context 3]

**How to Refactor**:
1. [FILL: Step 1]
2. [FILL: Step 2]
3. [FILL: Step 3]

---

#### Anti-Pattern 2: [FILL: Another Bad Practice]

[FILL: Similar structure to Anti-Pattern 1...]

---

#### Anti-Pattern 3: [FILL: Yet Another Bad Practice]

[FILL: Similar structure to Anti-Pattern 1...]

---

### Debugging Strategies

#### Strategy 1: [FILL: Debugging Technique]

**When to use**: [FILL: Situation]  
**How to do it**: 
1. [FILL: Step 1]
2. [FILL: Step 2]
3. [FILL: Step 3]

**Example**: [FILL: Concrete example]

---

#### Strategy 2: [FILL: Another Technique]

[FILL: Similar structure to Strategy 1...]

---

#### Strategy 3: [FILL: Yet Another Technique]

[FILL: Similar structure to Strategy 1...]

---

### Common Misconceptions (Revisited)

**Misconception 1**: [FILL: What people think]  
**Reality**: [FILL: What's actually true]  
**Why the confusion**: [FILL: Explanation]  
**How to remember the truth**: [FILL: Memory aid]

**Misconception 2**: [FILL: What people think]  
**Reality**: [FILL: What's actually true]  
**Why the confusion**: [FILL: Explanation]  
**How to remember the truth**: [FILL: Memory aid]

**Misconception 3**: [FILL: What people think]  
**Reality**: [FILL: What's actually true]  
**Why the confusion**: [FILL: Explanation]  
**How to remember the truth**: [FILL: Memory aid]

---

### Interview Red Flags (What NOT to Do)

❌ **Red Flag 1**: [FILL: What not to do]
- **Why it's bad**: [FILL: Explanation]
- **What interviewer thinks**: [FILL: Perception]
- **Do instead**: [FILL: Better approach]

❌ **Red Flag 2**: [FILL: What not to do]
- **Why it's bad**: [FILL: Explanation]
- **What interviewer thinks**: [FILL: Perception]
- **Do instead**: [FILL: Better approach]

❌ **Red Flag 3**: [FILL: What not to do]
- **Why it's bad**: [FILL: Explanation]
- **What interviewer thinks**: [FILL: Perception]
- **Do instead**: [FILL: Better approach]

---

### Checklist: Avoiding Common Mistakes

Before submitting your solution, check:

- [ ] Handled empty input?
- [ ] Handled null input?
- [ ] Handled single element?
- [ ] Handled duplicates?
- [ ] Checked array bounds?
- [ ] Avoided off-by-one errors?
- [ ] Considered integer overflow?
- [ ] Tested edge cases?
- [ ] Analyzed complexity?
- [ ] Wrote clean, readable code?
- [ ] Added comments for complex parts?
- [ ] Used meaningful variable names?
- [ ] Followed language conventions?
- [ ] Handled all error cases?
- [ ] Verified output format?

---
