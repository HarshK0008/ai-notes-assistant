# AI Interaction Guidelines

## Communication

- Be concise and direct
- Explain non-obvious decisions briefly
- Ask before large refactors or architectural changes
- Don't add features not in the project spec
- Never delete files without clarification

## Workflow

This is the common workflow that we will use for every single feature/fix:

1. **Document** - Document the feature in @.claude/state/current-feature.md.
2. **Branch** - Create new branch for feature, fix, etc
3. **Implement** - Implement the feature/fix that I create in @.claude/state/current-feature.md
4. **Test** - Verify it works. Run the project's test suite and fix any failures.
5. **Iterate** - Iterate and change things if needed
6. **Commit** - Only after tests/build pass and everything works
7. **Merge** - Merge per the strategy in @.claude/config/project.config.md
8. **Delete Branch** - Delete branch after merge
9. **Review** - Review AI-generated code periodically and on demand.
10. Mark as completed in @.claude/state/current-feature.md and add to history

Do NOT commit without permission and until tests/build pass. If something fails, fix the issues first.

## When to Write an Architecture Decision Record

Not every choice needs an ADR. Write one (via `/architecture decide`) when a
decision would be expensive to reverse, affects multiple features, or a future
reader would reasonably ask "why did we do it this way?" — e.g. choosing a
database, an auth strategy, a state-management approach, or reversing an
earlier decision. Skip it for routine implementation choices already covered
by `coding-standards.md` or `tech-standards.md`.

## Branching

We will create a new branch for every feature/fix. Name branches per the scheme
in @.claude/config/project.config.md (e.g. `feature/[name]` or `fix/[name]`). Ask
to delete the branch once merged.

## Commits

- Ask before committing (don't auto-commit)
- Use the commit message style defined in @.claude/config/project.config.md
- Keep commits focused (one feature/fix per commit)
- Follow the AI-attribution rule in @.claude/config/project.config.md — don't assume either way

## When Stuck

- If something isn't working after 2-3 attempts, stop and explain the issue
- Don't keep trying random fixes
- Ask for clarification if requirements are unclear

## Code Changes

- Make minimal changes to accomplish the task
- Don't refactor unrelated code unless asked
- Don't add "nice to have" features
- Preserve existing patterns in the codebase

## Code Review

Review AI-generated code periodically, especially for:

- Security (auth checks, input validation)
- Performance (unnecessary re-renders, N+1 queries)
- Logic errors (edge cases)
- Patterns (matches existing codebase?)
