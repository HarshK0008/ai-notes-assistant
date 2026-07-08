# AI Notes Assistant

A small showcase app demonstrating the complete AI development workflow —
idea → requirements → architecture → feature planning → implementation →
testing → review → delivery — built on the AI Workflow boilerplate. Lets a
single user capture notes and (in a follow-up feature) get AI-generated
summaries/tags for them via Groq.

## Knowledge Files

Read the following to get the full context of the project:

- @.claude/knowledge/product-spec.md
- @.claude/knowledge/tech-stack.md
- @.claude/knowledge/coding-standards.md
- @.claude/knowledge/tech-standards.md
- @.claude/knowledge/ai-interaction.md
- @.claude/state/current-feature.md

## Configuration

Project identity, stack choices, naming conventions, and workflow toggles live in
@.claude/config/project.config.md. Skills and agents read this file instead of
having behavior hardcoded — check it before assuming a convention.

## Commands

- **Dev server**: `npm run dev`
- **Build**: `npm run build`
- **Test**: `npm run test` (Vitest)
- **Lint**: `npm run lint`
- **DB migrate**: `npx prisma migrate dev`
- **DB browser**: `npx prisma studio`

## Hard Rules

- Do not add stack-specific assumptions to core files (`knowledge/ai-interaction.md`,
  `knowledge/coding-standards.md`, `skills/`, `templates/`) — those belong in
  `knowledge/tech-standards.md`, `config/project.config.md`, or a `modules/` entry.
- Server-only code (Prisma client, `GROQ_API_KEY` usage) must never be imported
  into a client component.
- Never commit `.env` — `GROQ_API_KEY` and `DATABASE_URL` live there.
