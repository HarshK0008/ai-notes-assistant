# Data Model

## Overview

A single entity, `Note`, holds all user-authored content. No relationships to
other entities exist in the MVP.

## Entities

### Note

- **Fields**: id: String (cuid, PK), title: String, content: String, tags: String[] (nullable, populated by the AI auto-tag feature), summary: String (nullable, populated by the AI summarize feature), createdAt: DateTime, updatedAt: DateTime
- **Relationships**: none

## Schema

```prisma
model Note {
  id        String   @id @default(cuid())
  title     String
  content   String
  tags      String?
  summary   String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

`tags` is stored as a single string (e.g. comma-separated) since SQLite has no
native array type — revisit if this moves to Postgres.
