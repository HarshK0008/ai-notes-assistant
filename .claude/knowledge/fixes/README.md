# Fixes

Bug-fix spec files consumed by `/feature load <name>` — the feature lifecycle
skill treats a fix the same as a feature once it's loaded. One file per fix,
written from `.claude/templates/fix-spec.template.md`.

## Shape

- `## Problem` — what's broken, from the user/observer's point of view
- `## Root Cause` — why it's actually happening, not just the symptom
- `## Solution` — the approach being taken
- `## Changes Required` — concrete list of files/areas affected
- `## Verification` — how to confirm the fix works

This folder starts empty — add a file here when a bug is ready to be fixed.
