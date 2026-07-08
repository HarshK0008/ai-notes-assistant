# Decide Action

1. Find the highest existing number in @.claude/knowledge/decisions/ and use the next
   sequential number (four digits, e.g. `0002`)
2. Create `.claude/knowledge/decisions/<NNNN>-<short-slug>.md` from
   @.claude/templates/adr.template.md
3. Fill in Status (`Accepted` unless told otherwise), Context, Decision,
   Alternatives Considered, and Consequences based on the conversation so far —
   don't invent alternatives that weren't actually discussed
4. If this decision reverses an earlier ADR, update that ADR's Status to
   `Superseded by <NNNN>` — never edit its historical content
5. Confirm the ADR was written and show its file path
