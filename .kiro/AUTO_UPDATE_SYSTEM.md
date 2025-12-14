# Auto-Update Context System

## 🎯 Purpose

This system automatically keeps `context-summary.md` up-to-date during your session, so even if Kiro crashes or the session ends abruptly, the next session can pick up where you left off.

## 🔧 How It Works

### Automatic Updates

**When**: After completing each task or making significant changes

**What happens**:
1. Kiro AI calls `bash .kiro/hooks/auto-update-context.sh`
2. The hook updates `context-summary.md` with:
   - Current timestamp
   - Current phase
   - Task progress (X/Y completed)
   - Last action taken
   - Modified files
3. Changes are auto-committed to git

**You don't have to do anything!**

### Manual Updates (Optional)

If you want to add notes or details:
```bash
bash .kiro/hooks/update-context.sh
```

This prompts you for:
- What you accomplished
- Problems solved
- Current status
- Next steps

## 📋 Session Workflow

### Starting a New Session

**Step 1**: In Kiro chat, type:
```
Read .kiro/session-state/context-summary.md
```

**That's it!** Kiro will be up to speed.

### During the Session

**Nothing required!** Kiro automatically updates context after each task.

### Ending the Session

**Option 1 (Quick)**: Just close Kiro
- Context is already saved from auto-updates
- Git commits are already done

**Option 2 (Detailed)**: Run manual update
```bash
bash .kiro/hooks/update-context.sh
```
- Add your notes and observations
- More detailed context for next session

## 🔄 Existing Hooks (Still Work!)

All your existing hooks still work exactly as before:

- `session-start.sh` - Start a new session
- `session-checkpoint.sh` - Full checkpoint (git + logs + context)
- `session-end.sh` - End session
- `session-resume.sh` - Resume from last session
- `task-complete.sh` - Mark task complete
- `git-sync.sh` - Quick git commit
- `save-conversation.sh` - Save conversation from temporary.md
- `update-context.sh` - Manual context update

**New hook**:
- `auto-update-context.sh` - Automatic context update (called by Kiro AI)

## ✅ Benefits

1. **Crash-proof**: Context saved automatically, even if session crashes
2. **Zero effort**: You don't have to remember to update anything
3. **Always current**: Context is updated after every task
4. **Git history**: Every update is committed, so you can see history
5. **Simple resume**: Just read one file to get back up to speed

## 🎯 Best Practices

### Every Session Start
```
Read .kiro/session-state/context-summary.md
```

### During Session
- Let Kiro work and auto-update
- Optionally run `update-context` if you want to add notes

### Session End
- Just close Kiro (context already saved)
- Or run `update-context` for detailed notes

## 📊 What Gets Auto-Updated

- ✅ Current phase
- ✅ Task progress (X/Y completed)
- ✅ Last completed task
- ✅ Modified files
- ✅ Timestamp of update
- ✅ Git commit with changes

## 🚫 What Doesn't Get Auto-Updated

- ❌ Your personal notes
- ❌ Problem descriptions
- ❌ Decision rationale
- ❌ Things to remember

**For these, run `update-context` manually**

## 🔍 Checking Context Status

View current context:
```bash
cat .kiro/session-state/context-summary.md
```

View recent auto-updates:
```bash
tail -50 .kiro/session-state/context-summary.md
```

View git history:
```bash
git log --oneline --grep="Auto-update" -10
```

## 🎉 Result

**Before**: Spend 30 minutes every session getting Kiro up to speed

**After**: Spend 30 seconds telling Kiro to read one file

---

**Status**: Auto-update system active  
**Last Updated**: 2025-11-19  
**Maintained By**: Kiro AI automatically
