# Features

Feature spec files consumed by `/feature load <name>`. One file per feature,
named after the feature (e.g. `favorites-page.md`), written from
`.claude/templates/feature-spec.template.md`.

## Shape

- `## Overview` — one or two sentences on what and why
- `## Requirements` — concrete, checkable bullet points
- `## Notes` — constraints/edge cases that aren't hard requirements
- `## References` — links to related specs, ADRs, or screenshots

## Large Features

For a feature large enough that one spec file becomes unwieldy, split it into
a master spec plus numbered phase specs (e.g. `auth-master.md`,
`auth-phase-1.md`, `auth-phase-2.md`) rather than writing one giant document.
Load and implement one phase at a time.

This folder starts empty — add a file here when a feature is ready to be
picked up.
