# Knowledge

Permanent project truth — the opposite of `.claude/state/` (the current task in
flight) and `.claude/config/` (explicit machine-consulted settings). If a file
would still be true a month from now regardless of what feature is being worked
on, it belongs here. If it changes every cycle, it belongs in `state/`.

Only a handful of files are auto-loaded on every session, via the root
`CLAUDE.md`:

- `product-spec.md` — what the project is, for whom, and its core features
- `tech-stack.md` — concrete stack choices for this project
- `coding-standards.md` — universal, stack-agnostic coding philosophy
- `tech-standards.md` — stack-specific coding rules
- `ai-interaction.md` — communication rules and the feature lifecycle

Everything else here is loaded on demand:

- `data-model.md` — data model documentation, referenced during architecture/implementation
- `decisions/` — architecture decision records (ADRs), one file per decision
- `features/` — feature spec files consumed by `/feature load`
- `fixes/` — bug-fix spec files consumed by `/feature load`
- `research/` — research prompts consumed by `/research`, output goes to `docs/`
- `screenshots/` — UI references fed to the AI on demand, not loaded automatically
