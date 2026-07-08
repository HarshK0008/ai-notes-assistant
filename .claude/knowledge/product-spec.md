# Product Spec

## Problem

People capture notes across scattered tools and lose track of what matters in
them — re-reading a long note to remember its gist, or manually tagging it for
later search, is friction most heavyweight note apps don't remove. This
project is also a vehicle to demonstrate a complete AI-assisted development
workflow end to end, so the product itself is intentionally small.

## Users

Single-user demo persona: someone who wants low-friction note capture with
lightweight AI assistance (a short summary, suggested tags) rather than a
full-featured note-taking product. No teams, no sharing, no accounts.

## Core Features

- **Note Management** (first feature, MVP): create, list, view, edit, and
  delete notes (title + plain-text content).
- **AI Summarize** (planned, follow-up feature): generate a short summary of a
  note's content via a hosted LLM (Groq).
- **AI Auto-tag** (planned, follow-up feature): suggest tags/keywords for a
  note via the same LLM.

## UI / UX Principles

Minimal: a notes list view and a note detail/edit view. No visual polish
beyond Tailwind defaults — the point is to demonstrate the workflow, not to
ship a designed product. No auth screens or onboarding flow.

## Out of Scope / Non-Goals

- Multi-user accounts, auth, or sharing/collaboration
- Real-time sync or offline support
- Mobile app
- Rich-text/markdown rendering (plain text only)
- Full-text search (may become a future feature, not part of the MVP)
