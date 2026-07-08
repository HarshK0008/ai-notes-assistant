import { prisma } from "@/lib/prisma";

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
