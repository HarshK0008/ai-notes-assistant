# AI Auto-tag

## Overview

Suggest tags/keywords for a note via Groq's OpenAI-compatible chat
completions API — the same LLM integration used for summarization — so notes
can be scanned or found by topic without manual tagging. Follow-up feature
layered on top of Note Management, using the `tags` field already reserved
(but unpopulated) on the `Note` model.

## Requirements

- [ ] Extend the server-only Groq wrapper (`lib/groq.ts`) with a tagging
      function (e.g. `generateTags`) that calls `chat/completions` with a
      tagging prompt and parses a short list of tags from the response
- [ ] `POST /api/notes/[id]/tag` route handler: loads the note, generates
      tags for its content via Groq, persists the result to `Note.tags`
      (joined as a comma-separated string per the existing schema), and
      returns the updated note
- [ ] 404 if the note doesn't exist; validation error if content is empty
- [ ] Handle Groq API failures gracefully (timeout, rate limit, malformed
      response) — map to a 502 with a clear message, matching the existing
      `GroqApiError` handling pattern
- [ ] Note detail view (`app/notes/[id]/NoteDetail.tsx`) gets a "Generate
      Tags" action alongside the existing Summarize action, displaying
      `tags` once populated, following the same try/catch/finally and
      cross-action button-disabling pattern already used there
- [ ] Vitest coverage for the new Groq tagging function (mocked HTTP) and
      the route's status-code mapping, per the project's testing policy

## Notes

- `Note.tags` already exists in `prisma/schema.prisma` (nullable) — no
  migration needed, just start writing to it
- Stored as a single comma-separated string since SQLite has no native array
  type (per `data-model.md`) — join/split accordingly when generating and
  displaying tags
- Model: `llama-3.3-70b-versatile` (or current Groq free-tier equivalent) per
  `.claude/config/project.config.md`
- Regenerating tags should overwrite the previous set (no history), matching
  the summarize feature's behavior
- Keep this feature scoped to auto-tagging only — reuse the existing Groq
  error-handling conventions from summarization rather than modifying that
  feature's logic

## References

- `.claude/knowledge/features/ai-note-summarization.md` — closest precedent
  (Groq wrapper, route shape, UI action, error handling)
- `.claude/knowledge/features/note-management.md` — establishes the `Note`
  model and the `tags` field this feature populates
- `.claude/knowledge/data-model.md` — Note entity schema
- `.claude/knowledge/product-spec.md` — Core Features section
- `.claude/knowledge/tech-stack.md` — Groq rationale and integration notes
- `.claude/config/project.config.md` — AI provider/model configuration
