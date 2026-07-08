---
name: cleanup
description: Clean up project housekeeping tasks (add "run" to execute fixes)
argument-hint: run|check
---

Review the codebase for cleanup tasks:

1. Make sure that the history in @.claude/state/current-feature.md is in order from oldest to newest
2. Check that @.claude/knowledge/ files match actual project state
3. Run the stack-specific checklist from the **Cleanup Checklist** section of
   @.claude/config/project.config.md (e.g. stale env vars, lint-suppression
   comments, unused imports, orphaned files — whatever is listed there)

**Mode: $ARGUMENTS**

If no argument or argument is "check":

- Only report findings, don't modify anything
- List what WOULD be cleaned up

If the argument is "run" or "fix":

- First, report all findings with numbered items
- Then ask: "Which items would you like me to fix? (enter numbers like 1,3,5 or 'all' or 'none')"
- Wait for user response before making any changes
- Only fix the items the user specifies
- Report what you changed
