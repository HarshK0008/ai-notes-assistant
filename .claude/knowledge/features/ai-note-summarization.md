# AI Note Summarization

## Overview

Generate a short AI summary of a note's content via Groq's OpenAI-compatible
chat completions API, so a user can grasp a long note's gist without
re-reading it. Follow-up feature layered on top of Note Management, using the
`summary` field already reserved (but unpopulated) on the `Note` model.

## Requirements

- [ ] Server-only Groq client wrapper (e.g. `lib/groq.ts`) that calls the
      `chat/completions` endpoint with `GROQ_API_KEY`, never imported into a
      client component
- [ ] `POST /api/notes/[id]/summarize` route handler: loads the note, sends
      its content to Groq with a summarization prompt, persists the result to
      `Note.summary`, and returns the updated note
- [ ] 404 if the note doesn't exist; validation error if content is empty
- [ ] Handle Groq API failures gracefully (timeout, rate limit, malformed
      response) — surface a clear error, don't crash the request
- [ ] Note detail view (`app/notes/[id]/NoteDetail.tsx`) gets a "Summarize"
      action that calls the route and displays `summary` once populated
- [ ] Vitest coverage for the Groq wrapper (mocked HTTP) and the route's
      status-code mapping, per the project's testing policy

## Notes

- `Note.summary` already exists in `prisma/schema.prisma` (nullable) —
  no migration needed, just start writing to it
- Model: `llama-3.3-70b-versatile` (or current Groq free-tier equivalent) per
  `.claude/config/project.config.md`
- No `groq-sdk`/`openai` package is installed yet (`package.json` has no AI
  dependency) — add one (or call `fetch` directly against Groq's
  OpenAI-compatible endpoint) as part of implementation
- `GROQ_API_KEY` must be added to `.env` (and documented in `.env.example`);
  never commit `.env`
- Keep this feature scoped to summarization only — auto-tagging (`tags`
  field) is a separate follow-up feature, don't bundle it in here
- Regenerating a summary should overwrite the previous one (no history)

## References

- `.claude/knowledge/features/note-management.md` — establishes the `Note`
  model and the `summary`/`tags` fields this feature populates
- `.claude/knowledge/tech-stack.md` — Groq rationale and integration notes
- `.claude/knowledge/data-model.md` — Note entity schema
- `.claude/config/project.config.md` — AI provider/model configuration
