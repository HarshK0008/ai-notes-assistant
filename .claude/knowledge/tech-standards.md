# Tech Standards

Stack-specific rules for this project. Fill this in based on the choices
recorded in `config/project.config.md` and `tech-stack.md`. Keeping these
rules in their own file means swapping stacks later only means rewriting this
one file, not `coding-standards.md` or anything under `skills/`.

## Next.js / TypeScript

- Route folders and files use kebab-case (Next.js App Router convention),
  e.g. `app/notes/[id]/page.tsx`
- React component filenames use PascalCase, e.g. `NoteCard.tsx`
- Functions and variables use camelCase
- API routes live under `app/api/**/route.ts`, one resource per folder
- TypeScript strict mode is on; don't add `any` or `@ts-ignore` without a
  comment explaining why it's necessary

## Data & AI Calls

- `prisma/schema.prisma` is the source of truth for the data model — after
  changing it, run `npx prisma migrate dev` and keep
  `knowledge/data-model.md` in sync
- Server-only code (the Prisma client, `GROQ_API_KEY` usage) must only be
  imported into server components or route handlers — never into a client
  component
- Environment variables (`GROQ_API_KEY`, `DATABASE_URL`) live in `.env`,
  documented in `.env.example`; never commit `.env`

## Styling

- Tailwind utility classes go directly in JSX; extract a component only once
  a class combination repeats 3+ times
