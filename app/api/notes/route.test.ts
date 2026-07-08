import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const mocks = vi.hoisted(() => ({
  listNotes: vi.fn(),
  createNote: vi.fn(),
}));

vi.mock("@/lib/notes", async () => {
  const actual = await vi.importActual<typeof import("@/lib/notes")>("@/lib/notes");
  return { ...actual, listNotes: mocks.listNotes, createNote: mocks.createNote };
});

import { GET, POST } from "./route";
import { ValidationError } from "@/lib/notes";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("GET /api/notes", () => {
  it("returns the note list as JSON", async () => {
    mocks.listNotes.mockResolvedValue([{ id: "1" }]);
    const response = await GET();
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual([{ id: "1" }]);
  });
});

describe("POST /api/notes", () => {
  it("creates a note and returns 201", async () => {
    mocks.createNote.mockResolvedValue({ id: "1", title: "A", content: "B" });
    const request = new NextRequest("http://localhost/api/notes", {
      method: "POST",
      body: JSON.stringify({ title: "A", content: "B" }),
    });

    const response = await POST(request);

    expect(response.status).toBe(201);
    expect(await response.json()).toEqual({ id: "1", title: "A", content: "B" });
  });

  it("returns 400 when the input fails validation", async () => {
    mocks.createNote.mockRejectedValue(new ValidationError("Title is required"));
    const request = new NextRequest("http://localhost/api/notes", {
      method: "POST",
      body: JSON.stringify({ title: "", content: "B" }),
    });

    const response = await POST(request);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "Title is required" });
  });
});
