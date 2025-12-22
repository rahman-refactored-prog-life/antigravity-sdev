# How to Build and Run the Application

This guide provides the steps to build and run the backend and frontend services for the Comprehensive Learning Portal.

**Prerequisites:**
- Java 21
- Maven 3.8+
- Node.js 18+
- PostgreSQL 15+ running with a database named `learning-portal`.

---

### Terminal 1: Backend (Spring Boot)

1.  **Navigate to the backend directory:**
    ```sh
    cd backend
    ```

2.  **Build the project without running tests:**
    ```sh
    mvn clean install -DskipTests
    ```

3.  **Run the application:**
    ```sh
    mvn spring-boot:run
    ```
    *The backend will start on port **9095**. You can view the API documentation at `http://localhost:9095/swagger-ui.html`.*

---

### Terminal 2: Frontend (React)

1.  **Navigate to the frontend directory:**
    ```sh
    cd frontend
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```

3.  **Start the development server:**
    ```sh
    npm run dev
    ```
    *The frontend will be available at `http://localhost:3000`.*

---

# 🛑 Stopping the Application

To stop the running processes, simply use the keyboard shortcut `Ctrl+C` in the respective terminal windows.

- **Backend:** Press `Ctrl+C` in Terminal 1.
- **Frontend:** Press `Ctrl+C` in Terminal 2.

If a process refuses to stop or you closed the terminal without stopping it, you can find and kill the process manually:

**Find process on port 9095 (Backend):**
```bash
lsof -i :9095
kill -9 <PID>
```

**Find process on port 3000 (Frontend):**
```bash
lsof -i :3000
kill -9 <PID>
```

---

# 🛠️ Database Management & Troubleshooting

### Database Connection
The application connects to PostgreSQL on `localhost:5432`.
- **Database Name:** `learning-portal`
- **Username:** `postgres`
- **Password:** `password` (or set `DB_PASSWORD` env var)

### Common Issues

**1. "Connection refused" error:**
- Ensure PostgreSQL is running.
- Check if the database `learning-portal` exists.
- Verify credentials in `backend/src/main/resources/application.yml`.

**2. Port already in use:**
- If port 9095 or 3000 is taken, identify the process using `lsof -i :<port>` and kill it.

**3. Frontend API errors:**
- Ensure the backend is running and accessible at `http://localhost:9095`.
- Check browser console for CORS errors (Cross-Origin Resource Sharing).

---

# 🧹 Maintenance & Logs

### Viewing Logs
- **Backend Logs:** Displayed in Terminal 1. Look for lines starting with `INFO`, `WARN`, or `ERROR`.
- **Frontend Logs:** Displayed in Terminal 2 and the browser console.

### Cleaning Build Artifacts
If you encounter weird build issues, try cleaning the project:

**Backend:**
```bash
cd backend
mvn clean
```

**Frontend:**
```bash
cd frontend
rm -rf node_modules
npm install
```

---

# Git Workflow & Command Reference

## 🚀 Pull Request Workflow (Forking Model)

If you have forked this repository and want to contribute back to the original (upstream) repository, follow this workflow.

### 1. Setup (One-time)
```bash
# Clone your fork
git clone https://github.com/YOUR_USERNAME/antigravity-sdev-inJ.git
cd antigravity-sdev-inJ

# Add the original repository as 'upstream'
git remote add upstream https://github.com/ORIGINAL_OWNER/antigravity-sdev-inJ.git

# Verify remotes (should see 'origin' and 'upstream')
git remote -v
```

### 2. Sync with Upstream
Before starting new work, always ensure your local main branch is up to date.
```bash
git checkout main
git fetch upstream
git merge upstream/main
git push origin main  # Update your fork's main
```

### 3. Create a Feature Branch
Never work directly on `main`.
```bash
git checkout -b feature/my-new-feature
```

### 4. Commit Changes
```bash
# Check changed files
git status

# Stage files
git add .             # Stage all changes
# OR
git add path/to/file  # Stage specific file

# Commit
git commit -m "feat: description of changes"
```

### 5. Push and Create PR
```bash
# Push your feature branch to your fork
git push -u origin feature/my-new-feature
```
*After pushing, go to GitHub. You will see a "Compare & pull request" button.*

---

## 📚 Git Command Reference

### Basic Commands

| Command | Description |
|---------|-------------|
| `git init` | Initialize a new git repository |
| `git clone <url>` | Clone a repository |
| `git status` | Show the working tree status |
| `git log` | Show commit logs |
| `git log --oneline --graph` | Show a condensed graph of commits |
| `git diff` | Show changes between commits, commit and working tree, etc |
| `git add .` | Stage all changes for the next commit |
| `git commit -m "msg"` | Commit staged changes with a message |
| `git push origin <branch>` | Upload local branch commits to remote |
| `git pull` | Fetch from and integrate with another repository or a local branch |

### Branching

| Command | Description |
|---------|-------------|
| `git branch` | List local branches |
| `git branch -a` | List all branches (local and remote) |
| `git checkout -b <name>` | Create and switch to a new branch |
| `git switch -c <name>` | (Modern) Create and switch to a new branch |
| `git checkout <name>` | Switch to an existing branch |
| `git branch -d <name>` | Delete a branch (safe) |
| `git branch -D <name>` | Force delete a branch |

### Advanced Commands

#### Stashing
Temporarily shelve changes so you can switch branches.
```bash
git stash              # Save changes to a stack
git stash list         # List stashed changes
git stash pop          # Apply stashed changes and remove from stack
git stash apply        # Apply stashed changes but keep in stack
```

#### Undoing Changes
```bash
# Unstage a file (keep changes in file)
git reset HEAD <file>

# Discard changes in working directory (DANGEROUS)
git checkout -- <file>
# OR
git restore <file>

# Undo last commit, keep changes staged
git reset --soft HEAD~1

# Undo last commit, keep changes unstaged
git reset HEAD~1

# Undo last commit, DESTROY changes (DANGEROUS)
git reset --hard HEAD~1
```

#### Rebasing & History
```bash
# Rebase current branch onto main (cleaner history than merge)
git checkout feature-branch
git rebase main

# Interactive rebase (squash commits, rename, etc.)
git rebase -i HEAD~3   # Modify last 3 commits
```

#### Cherry Picking
Apply the changes introduced by some existing commits.
```bash
git cherry-pick <commit-hash>
```

#### Remote Management
```bash
# View remote URLs
git remote -v

# Add a new remote
git remote add <name> <url>

# Change remote URL
git remote set-url origin <new-url>
```
