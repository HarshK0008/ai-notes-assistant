import { beforeEach, describe, expect, it, vi } from "vitest";

const mockNote = vi.hoisted(() => ({
  findMany: vi.fn(),
  findUnique: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  delete: vi.fn(),
}));

vi.mock("@/lib/prisma", () => ({
  prisma: { note: mockNote },
}));

import {
  createNote,
  deleteNote,
  getNote,
  listNotes,
  NotFoundError,
  updateNote,
  validateNoteInput,
  ValidationError,
} from "@/lib/notes";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("validateNoteInput", () => {
  it("accepts a note with a title and content", () => {
    expect(() => validateNoteInput({ title: "Groceries", content: "Milk, eggs" })).not.toThrow();
  });

  it("rejects an empty title", () => {
    expect(() => validateNoteInput({ title: "", content: "Milk, eggs" })).toThrow(ValidationError);
  });

  it("rejects a whitespace-only title", () => {
    expect(() => validateNoteInput({ title: "   ", content: "Milk, eggs" })).toThrow(ValidationError);
  });

  it("rejects an empty content", () => {
    expect(() => validateNoteInput({ title: "Groceries", content: "" })).toThrow(ValidationError);
  });
});

describe("listNotes", () => {
  it("lists notes ordered by createdAt descending", async () => {
    mockNote.findMany.mockResolvedValue([{ id: "1" }]);
    const result = await listNotes();
    expect(mockNote.findMany).toHaveBeenCalledWith({ orderBy: { createdAt: "desc" } });
    expect(result).toEqual([{ id: "1" }]);
  });
});

describe("getNote", () => {
  it("looks up a note by id", async () => {
    mockNote.findUnique.mockResolvedValue({ id: "1" });
    const result = await getNote("1");
    expect(mockNote.findUnique).toHaveBeenCalledWith({ where: { id: "1" } });
    expect(result).toEqual({ id: "1" });
  });
});

describe("createNote", () => {
  it("trims input and creates a note", async () => {
    mockNote.create.mockResolvedValue({ id: "1", title: "Groceries", content: "Milk" });
    await createNote({ title: "  Groceries  ", content: "  Milk  " });
    expect(mockNote.create).toHaveBeenCalledWith({
      data: { title: "Groceries", content: "Milk" },
    });
  });

  it("rejects an empty title before hitting the database", () => {
    expect(() => createNote({ title: "", content: "Milk" })).toThrow(ValidationError);
    expect(mockNote.create).not.toHaveBeenCalled();
  });
});

describe("updateNote", () => {
  it("trims input and updates a note", async () => {
    mockNote.findUnique.mockResolvedValue({ id: "1" });
    mockNote.update.mockResolvedValue({ id: "1", title: "Updated", content: "New" });
    await updateNote("1", { title: " Updated ", content: " New " });
    expect(mockNote.update).toHaveBeenCalledWith({
      where: { id: "1" },
      data: { title: "Updated", content: "New" },
    });
  });

  it("rejects empty content before hitting the database", async () => {
    await expect(updateNote("1", { title: "Updated", content: "" })).rejects.toThrow(ValidationError);
    expect(mockNote.findUnique).not.toHaveBeenCalled();
    expect(mockNote.update).not.toHaveBeenCalled();
  });

  it("throws NotFoundError when the note doesn't exist", async () => {
    mockNote.findUnique.mockResolvedValue(null);
    await expect(updateNote("missing", { title: "Updated", content: "New" })).rejects.toThrow(
      NotFoundError,
    );
    expect(mockNote.update).not.toHaveBeenCalled();
  });
});

describe("deleteNote", () => {
  it("deletes a note by id", async () => {
    mockNote.findUnique.mockResolvedValue({ id: "1" });
    mockNote.delete.mockResolvedValue({ id: "1" });
    await deleteNote("1");
    expect(mockNote.delete).toHaveBeenCalledWith({ where: { id: "1" } });
  });

  it("throws NotFoundError when the note doesn't exist", async () => {
    mockNote.findUnique.mockResolvedValue(null);
    await expect(deleteNote("missing")).rejects.toThrow(NotFoundError);
    expect(mockNote.delete).not.toHaveBeenCalled();
  });
});
