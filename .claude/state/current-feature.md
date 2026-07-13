# Current Feature

## Status

Not Started

## Goals

## Notes

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
