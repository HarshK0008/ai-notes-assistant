# Note Management

## Overview

CRUD functionality for notes — the foundational feature of AI Notes
Assistant. Establishes the `Note` data model, API routes, and minimal UI
needed before any AI-assisted features (summarize/auto-tag) can be layered on
top.

## Requirements

- [ ] Prisma schema defines a `Note` model (id, title, content, tags,
      summary, createdAt, updatedAt) per `.claude/knowledge/data-model.md`
- [ ] `POST /api/notes` creates a note (title + content required)
- [ ] `GET /api/notes` lists all notes, newest first
- [ ] `GET /api/notes/[id]` returns a single note
- [ ] `PUT /api/notes/[id]` updates the title/content of an existing note
- [ ] `DELETE /api/notes/[id]` deletes a note
- [ ] `/` renders a list of notes (title + created date) linking to a detail view
- [ ] `/notes/[id]` renders a single note with edit and delete actions
- [ ] A "new note" form is reachable from the list view
- [ ] Empty title or content is rejected with a clear validation error (400)

## Notes

- No auth — single implicit user, all notes are global
- Plain text content only for this feature (no markdown rendering)
- `tags` and `summary` fields exist in the schema now but are populated by a
  later AI feature — leave them null/empty here
- Keep components simple: a notes list, a note form, a note detail view

## References

- `.claude/knowledge/data-model.md` — Note entity schema
- `.claude/knowledge/product-spec.md` — Core Features section
