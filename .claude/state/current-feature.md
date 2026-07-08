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
