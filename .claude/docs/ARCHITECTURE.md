# Framework Architecture

This is the design rationale for the boilerplate itself — why it's shaped the
way it is. It is written once and revisited only when the framework's own
mechanism changes, not when a project using it changes. Per-project decisions
belong in `knowledge/decisions/` (ADRs), not here.

## Why `knowledge/`, `state/`, and `config/` are three separate folders

An earlier version of this framework kept a project's permanent spec and its
"feature currently in flight" doc as peers in the same folder. That's an easy
mistake: the transient file gets treated like the permanent ones, or the
permanent ones get edited casually like scratch notes. Splitting them into
three top-level folders makes the category structural, not just a naming
convention:

- `knowledge/` — permanent project truth (product spec, data model, tech
  stack, coding standards, ADRs). Changes slowly.
- `state/` — the feature currently in flight. Reset every cycle. Never
  contains anything meant to outlive the current feature.
- `config/` — explicit settings that skills and agents read as configuration
  (stack choices, naming conventions, workflow toggles), not narrative
  documentation a human reads for background.

## Why skills instead of one-off commands

A thin `SKILL.md` plus one file per action (`actions/load.md`,
`actions/start.md`, etc.) keeps each verb independently editable. Changing
how `complete` works shouldn't require reading or risking the other five
actions. This also makes lifecycle drift visible: if the prose lifecycle in
`ai-interaction.md` and the skill's action set ever disagree, it shows up as
two files that are easy to compare side by side, rather than being buried in
one large document.

## Why modules stay inert until copied in

Claude Code only auto-discovers `.claude/agents/` and `.claude/skills/`.
Anything under `.claude/modules/` is invisible to the agent until a human
copies it into one of those folders. This means the framework can grow new
modules indefinitely — mobile, DevOps, security, whatever a future project
needs — without ever touching the core files every project shares, and
without an unused module silently influencing behavior it wasn't asked to.

## Why configuration is externalized

Values like commit-message style, whether AI attribution is allowed in
commits, and whether a feature branch gets pushed per-branch or merged once to
main are project decisions, not framework decisions — and they can differ
sharply between teams. Hardcoding any of them into a skill means the skill
silently breaks (or silently does the wrong thing) the moment a project's
conventions differ. `config/project.config.md` makes every one of these an
explicit, visible choice a human makes once, instead of behavior baked into
prose that's easy to miss.

## Why framework versioning exists

`.claude/framework.yaml` tracks which version of this boilerplate a project
is running. Without it, there's no way to tell an old copy from a new one, or
to write a migration guide from one framework version to the next. It exists
so the framework itself can evolve (v0.1 → v0.2 → v1.0) without every project
that adopted an earlier version being stranded.

## Why architecture decisions are a first-class skill, not just a folder

A folder alone doesn't get used — without something that prompts "should this
be an ADR?", decisions get made in conversation and forgotten. The
`architecture` skill's `plan`/`tradeoff`/`decide` actions, plus the explicit
"when to write an ADR" guidance in `ai-interaction.md`, give the habit a
concrete trigger instead of relying on people remembering the folder exists.

## The three "why" documents, and how they differ

- **This file** — the framework's own rationale. Fixed; edited only when the
  mechanism itself changes.
- **`knowledge/decisions/*.md`** (ADRs) — a specific project's decisions.
  Grows constantly; append-only.
- **`modules/*/README.md`** — usage instructions for enabling a module. No
  rationale — if a module needs to explain *why* it exists, that belongs
  here, in a short paragraph about the module, not duplicated into every
  module's own README.
