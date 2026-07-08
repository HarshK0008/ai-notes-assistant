# Coding Standards

Universal, stack-agnostic conventions. Anything specific to a framework,
language, or library belongs in `tech-standards.md` instead — this file should
stay true no matter what stack `tech-stack.md` names.

## Naming

- Names should describe purpose, not implementation
- Be consistent within a file and across similar files — pick one convention and stick to it (see `tech-standards.md` for the stack's specific casing rules)
- Avoid abbreviations unless they're standard in the domain

## File Organization

- Group files by feature/domain, not by file type, unless the stack's own conventions dictate otherwise
- One responsibility per file — split when a file is doing more than one job
- Keep functions focused and short; if a function needs a comment to explain what it does (not why), it's a sign it should be split or renamed

## Error Handling

- Fail loudly in development, gracefully in production
- Validate all external input (user input, API responses, environment variables) at the boundary — trust internal code after that
- Return or raise errors in a consistent shape across the codebase (defined per-project in `tech-standards.md`)
- Never swallow an error silently

## Code Quality

- No commented-out code unless explicitly requested
- No unused imports, variables, or files
- No dead code paths "just in case"
- Don't add abstractions for a pattern that only appears once or twice — three similar lines is better than a premature abstraction

## Testing

- Test happy paths and realistic error cases; don't write tests for the sake of having tests (see the Testing Policy in `config/project.config.md` for what's required in this project)
