# Modules

Inert, optional extension bundles. Nothing in `modules/` is auto-discovered by
Claude Code — only `.claude/agents/` and `.claude/skills/` are. A module
becomes "active" only when its files are copied into one of those folders.

This keeps the core framework (`skills/feature`, `skills/architecture`,
`knowledge/`, `state/`, `templates/`) untouched no matter how many modules
exist or get added later. See `.claude/docs/EXTENDING.md` for how to build and
enable one.

Each module folder below is currently a placeholder — it documents what's
planned, not a finished agent/skill. See its README for status.

## Planned Modules

- **`web-frontend/`** — UI review (visual, responsive, accessibility) for web projects
- **`auth-security/`** — authentication-specific security auditing
- **`code-quality/`** — deep DRY/duplication analysis (beyond the core `code-reviewer` agent's general scan)
- **`tool-portability/`** — a Claude Code ↔ other-AI-CLI concept map, for teams that use more than one tool
