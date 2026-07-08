# Module: code-quality (placeholder)

**Status**: Not yet built. Planned content below.

## Planned

An `agents/refactor-scanner.md` subagent focused specifically on DRY
violations and extraction opportunities — deeper and narrower than the core
`code-reviewer` agent's general quality/security/performance scan. Should
preserve a "don't over-abstract, verify duplication actually exists across
multiple files before flagging it" discipline.

## How to Enable (once built)

Copy `agents/refactor-scanner.md` into `.claude/agents/`. Use alongside, not
instead of, the core `code-reviewer` agent — they check different things.
