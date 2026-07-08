# Tech Stack

This is the narrative explanation of the stack and how the pieces fit
together. `config/project.config.md`'s Stack section is the terse
key-value reference skills/agents read — keep the two consistent, but don't
duplicate prose here into config.md or vice versa.

## Overview

A full-stack Next.js (App Router) application written in TypeScript. UI and
API routes live in a single deployable app — no separate backend service.
Notes are persisted via Prisma ORM to a local SQLite database file. AI
features (summarize, auto-tag) call Groq's OpenAI-compatible chat completions
endpoint from server-side route handlers.

## Why These Choices

Next.js was chosen to keep frontend and backend in one project so a working
demo can ship same-day, without standing up and wiring a separate API server.
Prisma + SQLite gives a real relational schema and migration story without
provisioning external database infrastructure — good enough for a
single-user demo, easy to swap for Postgres later if this ever grows beyond
a showcase.

Groq was chosen for the AI calls specifically because it offers a free tier
with very fast inference on open-weight models (e.g. Llama 3.3), so the AI
summarize/auto-tag feature can actually work end-to-end today without a paid
API key or waiting on rate limits.

## Notable Libraries / Services

- **Prisma** — ORM, schema, and migrations for the `Note` model
- **Tailwind CSS** — styling
- **Groq API** (OpenAI-compatible `chat/completions`) — note summarization and
  auto-tagging; called only from server-side code (route handlers), never
  from the client
- **Vitest** — unit tests for note CRUD logic and the Groq API wrapper

## Deployment

Local development only for this demo (`npm run dev`). The app is
Vercel-deployable later without structural changes, but no deploy target has
been committed to yet.
