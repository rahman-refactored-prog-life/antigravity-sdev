# Context Budgeting System

**Purpose**: Prevent excessive context consumption at session start

## 📊 Context Budget Allocation

### Total Context Budget: 100%
- **Session Setup**: ≤ 15% (CRITICAL LIMIT)
- **Current Task**: 60%
- **Reference Materials**: 20%
- **Buffer**: 5%

## 🎯 Smart Loading Strategy

### ALWAYS Load (High Priority - 10%):
- Current task/request
- Application status (servers running)
- Critical errors/blockers
- Project milestones summary

### Load on Demand (Medium Priority - 5%):
- Specific file sections (use grep/search)
- Targeted code snippets
- Relevant spec sections

### NEVER Auto-Load (Avoid):
- ❌ Complete content files (16K+ lines)
- ❌ Full methodology documents (3K+ lines)
- ❌ Entire conversation history
- ❌ All steering files simultaneously

## 🔧 Implementation Rules

### File Reading Strategy:
1. **Use grep/search first** - Find specific information
2. **Read targeted sections** - Use start_line/end_line parameters
3. **Summarize large files** - Create executive summaries
4. **Lazy loading** - Load only when specifically requested

### Context Loading Order:
1. **Project milestones** (this file) - 50 lines
2. **Current task status** - 20 lines
3. **Application status** - 10 lines
4. **Specific request context** - as needed

### Emergency Protocols:
- If context > 40% at start: STOP and consolidate
- If file > 1000 lines: Use search/grep instead
- If multiple large files: Read summaries only

## 📋 Quick Reference Commands

```bash
# Check file size before reading
wc -l filename.md

# Search for specific content
grep -n "search_term" filename.md

# Read specific sections only
# Use readFile with start_line/end_line parameters

# Create summaries for large files
head -50 filename.md > filename-summary.md
```

## 🎯 Session Start Protocol

### Step 1: Load Core Context (≤ 10%)
- Project milestones (this file)
- Application status
- Current task

### Step 2: Task-Specific Loading (≤ 5%)
- Only files relevant to current request
- Use search/grep for specific information
- Read targeted sections, not entire files

### Step 3: Monitor Budget
- Track context consumption
- Stop if approaching limits
- Use summaries instead of full files

## ✅ Success Metrics
- Session start context: ≤ 15%
- Task completion: Efficient
- Context preservation: 100%
- Performance: Optimal