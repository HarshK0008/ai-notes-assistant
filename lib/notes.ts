import { prisma } from "@/lib/prisma";
import { summarizeText } from "@/lib/groq";

export class ValidationError extends Error {}
export class NotFoundError extends Error {}

export interface NoteInput {
  title: string;
  content: string;
}

export function validateNoteInput(input: NoteInput): void {
  if (typeof input.title !== "string" || !input.title.trim()) {
    throw new ValidationError("Title is required");
  }
  if (typeof input.content !== "string" || !input.content.trim()) {
    throw new ValidationError("Content is required");
  }
}

export function listNotes() {
  return prisma.note.findMany({ orderBy: { createdAt: "desc" } });
}

export function getNote(id: string) {
  return prisma.note.findUnique({ where: { id } });
}

export function createNote(input: NoteInput) {
  validateNoteInput(input);
  return prisma.note.create({
    data: { title: input.title.trim(), content: input.content.trim() },
  });
}

export async function updateNote(id: string, input: NoteInput) {
  validateNoteInput(input);
  const existing = await getNote(id);
  if (!existing) {
    throw new NotFoundError("Note not found");
  }
  return prisma.note.update({
    where: { id },
    data: { title: input.title.trim(), content: input.content.trim() },
  });
}

export async function deleteNote(id: string) {
  const existing = await getNote(id);
  if (!existing) {
    throw new NotFoundError("Note not found");
  }
  return prisma.note.delete({ where: { id } });
}

export async function summarizeNote(id: string) {
  const existing = await getNote(id);
  if (!existing) {
    throw new NotFoundError("Note not found");
  }
  if (!existing.content.trim()) {
    // Unreachable via createNote/updateNote (both enforce non-empty content),
    // but content can be mutated out-of-band (e.g. Prisma Studio) — this is
    // the API's own boundary check, not just a defensive copy of the other one.
    throw new ValidationError("Content is required");
  }

  const summary = await summarizeText(existing.content);
  return prisma.note.update({ where: { id }, data: { summary } });
}
