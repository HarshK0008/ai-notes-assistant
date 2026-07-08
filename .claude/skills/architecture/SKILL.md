---
name: architecture
description: Plan a technical approach, run a tradeoff analysis, or record an architecture decision
argument-hint: plan|decide|tradeoff
---

# Architecture Workflow

Supports the "Architecture" stage of the feature lifecycle — the step between
Planning and Implementation where a technical approach gets decided, not just
a feature's goals.

## Task

Execute the requested action: $ARGUMENTS

| Action | Description |
|--------|-------------|
| `plan` | Propose a technical approach for the current feature/system before implementation starts |
| `tradeoff` | Structured comparison of options when a decision isn't obvious |
| `decide` | Record an accepted decision as a new ADR in @.claude/knowledge/decisions/ |

See [actions/](actions/) for detailed instructions.

If no action provided, explain the available options.
