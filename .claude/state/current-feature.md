# Current Feature

## Status

<!-- Not Started | In Progress | Complete -->

## Goals

<!-- Bullet points of what success looks like -->

## Notes

<!-- Additional context, constraints, or details from spec -->

## History

### Note Management (2026-07-08)

Full CRUD for notes — Prisma `Note` model (SQLite), `POST/GET /api/notes`,
`GET/PUT/DELETE /api/notes/[id]`, and a list/detail/new-note UI in Next.js.
Server-side validation rejects empty title/content with 400; updating or
deleting a missing note returns 404. Covered by 23 Vitest tests (CRUD logic
+ API route status-code mapping). Spec:
`.claude/knowledge/features/note-management.md`.

### AI Note Summarization (2026-07-13)

Server-only Groq client wrapper (`lib/groq.ts`) and `POST
/api/notes/[id]/summarize`, which loads a note, summarizes its content via
Groq's `chat/completions` endpoint, and persists the result to
`Note.summary`. 404 for a missing note, 400 for empty content, Groq failures
(timeout, rate limit, malformed response) mapped to a 502 with a clear
message. Note detail view gained a "Summarize" action, plus consistency
fixes to its existing Save/Delete handlers (try/catch/finally error
handling, cross-action button disabling, and a save-time warning when an
existing summary may go stale). Playwright MCP (`.mcp.json`) wired up for
real-time UI verification in future feature work. Covered by 28 Vitest
tests (Groq wrapper, `summarizeNote`, route status-code mapping). Spec:
`.claude/knowledge/features/ai-note-summarization.md`.

### AI Auto-tag (2026-07-13)

Extended the Groq wrapper (`lib/groq.ts`) with `generateTags`, and
`lib/notes.ts` with `tagNote`, mirroring the summarization feature's
pattern. `POST /api/notes/[id]/tag` loads a note, generates tags via Groq,
and persists them to `Note.tags` as a comma-separated string. 404 for a
missing note, 400 for empty content, Groq failures mapped to a 502 via the
existing `GroqApiError` handling. Note detail view gained a "Generate Tags"
action alongside Summarize, with all four actions (Save/Delete/Summarize/
Generate Tags) now cross-disabling on any in-flight state. Fixed the
save-time staleness warning to also account for stale tags, not just a
stale summary. Verified end-to-end against the live app via Playwright MCP
(tag generation, persistence across reload, staleness-warning dialog).
Covered by 15 new Vitest tests (54 total). Spec:
`.claude/knowledge/features/ai-auto-tag.md`.
