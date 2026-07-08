# Plan Action

1. Read @.claude/state/current-feature.md for the goals in flight (or, if $ARGUMENTS
   names a different feature/system, use that instead)
2. Read @.claude/knowledge/product-spec.md, @.claude/knowledge/tech-stack.md, and
   @.claude/knowledge/data-model.md for constraints the plan must respect
3. Propose a technical approach:
   - Key components/modules involved and how they interact
   - Data flow, if relevant
   - Any new dependencies or schema changes required
   - Notable risks or open questions
4. If the approach involves a non-obvious choice between real alternatives, run
   the `tradeoff` action before finalizing
5. If this plan represents a decision worth preserving (see the "When to Write
   an ADR" section of @.claude/knowledge/ai-interaction.md), offer to run the
   `decide` action to record it
6. Add a short summary of the agreed approach to current-feature.md's Notes
   section — do not start implementing until the human confirms the approach
