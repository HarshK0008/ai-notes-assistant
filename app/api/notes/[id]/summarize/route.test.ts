import { beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const mocks = vi.hoisted(() => ({
  summarizeNote: vi.fn(),
}));

vi.mock("@/lib/notes", async () => {
  const actual = await vi.importActual<typeof import("@/lib/notes")>("@/lib/notes");
  return {
    ...actual,
    summarizeNote: mocks.summarizeNote,
  };
});

import { POST } from "./route";
import { NotFoundError, ValidationError } from "@/lib/notes";
import { GroqApiError } from "@/lib/groq";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("POST /api/notes/[id]/summarize", () => {
  it("summarizes the note and returns it", async () => {
    mocks.summarizeNote.mockResolvedValue({ id: "1", summary: "A short summary." });
    const response = await POST(new NextRequest("http://localhost/api/notes/1/summarize", { method: "POST" }), {
      params: { id: "1" },
    });

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ id: "1", summary: "A short summary." });
  });

  it("returns 404 when the note doesn't exist", async () => {
    mocks.summarizeNote.mockRejectedValue(new NotFoundError("Note not found"));
    const response = await POST(
      new NextRequest("http://localhost/api/notes/missing/summarize", { method: "POST" }),
      { params: { id: "missing" } },
    );

    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({ error: "Note not found" });
  });

  it("returns 400 when the note has no content", async () => {
    mocks.summarizeNote.mockRejectedValue(new ValidationError("Content is required"));
    const response = await POST(new NextRequest("http://localhost/api/notes/1/summarize", { method: "POST" }), {
      params: { id: "1" },
    });

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "Content is required" });
  });

  it("returns 502 when the Groq API fails", async () => {
    mocks.summarizeNote.mockRejectedValue(new GroqApiError("Groq API returned an error (status 429)"));
    const response = await POST(new NextRequest("http://localhost/api/notes/1/summarize", { method: "POST" }), {
      params: { id: "1" },
    });

    expect(response.status).toBe(502);
    expect(await response.json()).toEqual({ error: "Groq API returned an error (status 429)" });
  });
});
