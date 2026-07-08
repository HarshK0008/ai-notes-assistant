# Project Configuration

Explicit, human-owned settings. Skills and agents read these values instead of
having behavior hardcoded. The AI never invents or changes values in this file
on its own — it asks, and a human decides.

## Project Identity

- **Name**: AI Notes Assistant
- **Type**: web app (full-stack)
- **Purpose**: A small showcase app demonstrating the complete AI development workflow (idea → requirements → architecture → feature planning → implementation → testing → review → delivery). Lets a single user capture notes and get AI-generated summaries/tags for them.
- **Current phase**: MVP
- **Owner**: Varun Prashar
- **Created**: 2026-07-08

## Stack

- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Database / ORM**: SQLite + Prisma
- **Styling**: Tailwind CSS
- **Auth provider**: none (single implicit user, no login)
- **File storage**: none
- **AI provider / model**: Groq (OpenAI-compatible chat completions API, free-tier hosted model e.g. `llama-3.3-70b-versatile`) — used for note summarize/auto-tag
- **Payments**: none
- **Deploy target**: local only for this demo (Next.js app is Vercel-deployable later if needed)
- **Test runner(s)**: Vitest

## Naming & Commit Conventions

- **Branch scheme**: feature/[name], fix/[name]
- **Commit message style**: Conventional Commits (feat:, fix:, chore:, docs:, test:)
- **AI attribution in commits**: not allowed
- **File / folder naming rules**: kebab-case for files and route folders (Next.js App Router convention, e.g. `app/notes/[id]/page.tsx`); PascalCase for React component filenames (e.g. `NoteCard.tsx`); camelCase for functions and variables

## Workflow Toggles

- **Merge strategy**: single-merged-push-to-main
- **Release mechanism**: direct push to main
- **Is `state/current-feature.md` committed to version control?**: yes

## Testing Policy

- **Required coverage**: lib/server utilities (note CRUD logic, Groq API wrapper) — not UI components
- **When is E2E required?**: not required for this demo
- **Judgment call**: test the happy path and realistic error cases — do not write tests for the sake of writing tests.

## Cleanup Checklist (stack-specific items for `/cleanup`)

- Check `.env.example` lists the same keys as `.env` (`GROQ_API_KEY`, `DATABASE_URL`)
- Flag stale `@ts-ignore` / `any` types without justification
- Check `prisma/schema.prisma` matches the latest migration and `knowledge/data-model.md`
- Flag unused Next.js API routes or orphaned components

## Subagent Model Tiers & MCP Bindings

| Agent | Model tier | MCP servers |
|---|---|---|
| code-reviewer | sonnet | none required |
