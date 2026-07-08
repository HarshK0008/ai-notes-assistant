import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const mocks = vi.hoisted(() => ({
  getNote: vi.fn(),
  updateNote: vi.fn(),
  deleteNote: vi.fn(),
}));

vi.mock("@/lib/notes", async () => {
  const actual = await vi.importActual<typeof import("@/lib/notes")>("@/lib/notes");
  return {
    ...actual,
    getNote: mocks.getNote,
    updateNote: mocks.updateNote,
    deleteNote: mocks.deleteNote,
  };
});

import { DELETE, GET, PUT } from "./route";
import { NotFoundError, ValidationError } from "@/lib/notes";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("GET /api/notes/[id]", () => {
  it("returns 404 when the note doesn't exist", async () => {
    mocks.getNote.mockResolvedValue(null);
    const response = await GET(new NextRequest("http://localhost/api/notes/1"), {
      params: { id: "1" },
    });

    expect(response.status).toBe(404);
  });

  it("returns the note when found", async () => {
    mocks.getNote.mockResolvedValue({ id: "1", title: "A" });
    const response = await GET(new NextRequest("http://localhost/api/notes/1"), {
      params: { id: "1" },
    });

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ id: "1", title: "A" });
  });
});

describe("PUT /api/notes/[id]", () => {
  it("updates the note and returns it", async () => {
    mocks.updateNote.mockResolvedValue({ id: "1", title: "Updated", content: "New" });
    const request = new NextRequest("http://localhost/api/notes/1", {
      method: "PUT",
      body: JSON.stringify({ title: "Updated", content: "New" }),
    });

    const response = await PUT(request, { params: { id: "1" } });

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ id: "1", title: "Updated", content: "New" });
  });

  it("returns 400 when the input fails validation", async () => {
    mocks.updateNote.mockRejectedValue(new ValidationError("Content is required"));
    const request = new NextRequest("http://localhost/api/notes/1", {
      method: "PUT",
      body: JSON.stringify({ title: "Updated", content: "" }),
    });

    const response = await PUT(request, { params: { id: "1" } });

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "Content is required" });
  });

  it("returns 404 when the note doesn't exist", async () => {
    mocks.updateNote.mockRejectedValue(new NotFoundError("Note not found"));
    const request = new NextRequest("http://localhost/api/notes/missing", {
      method: "PUT",
      body: JSON.stringify({ title: "Updated", content: "New" }),
    });

    const response = await PUT(request, { params: { id: "missing" } });

    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({ error: "Note not found" });
  });
});

describe("DELETE /api/notes/[id]", () => {
  it("deletes the note and confirms", async () => {
    mocks.deleteNote.mockResolvedValue(undefined);
    const response = await DELETE(new NextRequest("http://localhost/api/notes/1"), {
      params: { id: "1" },
    });

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
  });

  it("returns 404 when the note doesn't exist", async () => {
    mocks.deleteNote.mockRejectedValue(new NotFoundError("Note not found"));
    const response = await DELETE(new NextRequest("http://localhost/api/notes/missing"), {
      params: { id: "missing" },
    });

    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({ error: "Note not found" });
  });
});
