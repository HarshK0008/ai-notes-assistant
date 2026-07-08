# Extending the Framework

New capabilities (frontend, backend, mobile, AI applications, DevOps, security
review, or anything else) get added as new modules — never by editing
`skills/feature`, `skills/architecture`, `knowledge/`, `state/`, or
`templates/`.

## Adding a New Module

1. Create `.claude/modules/<module-name>/`.
2. Add whatever the module needs — typically one or more agent files under
   `agents/`, occasionally a skill under `skills/`.
3. Add a `README.md` inside the module folder containing only:
   - **Status** — built, or still a placeholder
   - **What it does** — one short paragraph
   - **How to enable** — which files to copy into `.claude/agents/` or
     `.claude/skills/`, and any `config/project.config.md` values it expects
4. List the new module in `.claude/modules/README.md`'s "Planned Modules" (or
   "Available Modules," once built) section.

Do not put design rationale in a module README — see the division below.

## Enabling a Module

Copy the module's files into the live `.claude/agents/` or `.claude/skills/`
folder. That's it — modules are inert until copied in, so enabling one never
requires touching any other file.

## Where "Why" Lives

Three places explain "why," and they must not overlap:

| Document | Explains | Changes |
|---|---|---|
| `docs/ARCHITECTURE.md` | Why the framework itself is shaped this way | Rarely — only when the mechanism changes |
| `knowledge/decisions/*.md` (ADRs) | Why *this project* made a specific technical decision | Constantly — append-only, one file per decision |
| `modules/*/README.md` | How to enable a module, plus one short paragraph on what it's for | Only when that module's status or contents change |

If you find yourself writing a paragraph of justification in a module
README, that's a sign it belongs in `docs/ARCHITECTURE.md` (if it's about the
framework) or an ADR (if it's about a project's specific choice to use the
module).

## Promoting a Module Beyond This Repo

If a module ever needs to be shared across unrelated repositories — not just
copied within one boilerplate — consider promoting it to a real Claude Code
plugin instead. `modules/` is intentionally simpler than the plugin system;
it's meant for "this one project needs this one capability," not
cross-repo distribution.
