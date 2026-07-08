# Current Feature: Note Management

## Status

In Progress

## Goals

- Prisma schema defines a `Note` model (id, title, content, tags, summary, createdAt, updatedAt)
- `POST /api/notes` creates a note (title + content required)
- `GET /api/notes` lists all notes, newest first
- `GET /api/notes/[id]` returns a single note
- `PUT /api/notes/[id]` updates a note's title/content
- `DELETE /api/notes/[id]` deletes a note
- `/` renders a notes list linking to a detail view
- `/notes/[id]` renders note detail with edit/delete actions, plus a reachable "new note" form
- Empty title/content is rejected with a 400 validation error

## Notes

- No auth — single implicit user, all notes are global
- Plain text content only (no markdown rendering) for this feature
- `tags` and `summary` fields exist in the schema now but stay null until the AI summarize/auto-tag feature
- Spec: `.claude/knowledge/features/note-management.md`
- References: `.claude/knowledge/data-model.md`, `.claude/knowledge/product-spec.md`

## History
