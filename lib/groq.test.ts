import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { generateTags, GroqApiError, summarizeText } from "@/lib/groq";

const originalApiKey = process.env.GROQ_API_KEY;
const originalFetch = global.fetch;

beforeEach(() => {
  process.env.GROQ_API_KEY = "test-api-key";
});

afterEach(() => {
  process.env.GROQ_API_KEY = originalApiKey;
  global.fetch = originalFetch;
  vi.restoreAllMocks();
});

describe("summarizeText", () => {
  it("returns the summary text from a successful response", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ choices: [{ message: { content: "  A short summary.  " } }] }),
    } as Response);

    const summary = await summarizeText("Some long note content.");

    expect(summary).toBe("A short summary.");
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.groq.com/openai/v1/chat/completions",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({ Authorization: "Bearer test-api-key" }),
      }),
    );
  });

  it("throws GroqApiError when GROQ_API_KEY is not configured", async () => {
    delete process.env.GROQ_API_KEY;
    global.fetch = vi.fn();

    await expect(summarizeText("content")).rejects.toThrow(GroqApiError);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("throws GroqApiError when the request fails (network error)", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("network down"));

    await expect(summarizeText("content")).rejects.toThrow(GroqApiError);
  });

  it("throws GroqApiError when the response is not ok (e.g. rate limit)", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 429 } as Response);

    await expect(summarizeText("content")).rejects.toThrow(GroqApiError);
  });

  it("throws GroqApiError when the response is malformed", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({}),
    } as Response);

    await expect(summarizeText("content")).rejects.toThrow(GroqApiError);
  });

  it("throws GroqApiError when the response body isn't valid JSON", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.reject(new SyntaxError("Unexpected token")),
    } as unknown as Response);

    await expect(summarizeText("content")).rejects.toThrow(GroqApiError);
  });

  it("throws GroqApiError when the request times out", async () => {
    global.fetch = vi.fn().mockImplementation(() => {
      const error = new Error("The operation was aborted");
      error.name = "TimeoutError";
      return Promise.reject(error);
    });

    await expect(summarizeText("content")).rejects.toThrow(GroqApiError);
  });
});

describe("generateTags", () => {
  it("returns a parsed list of tags from a successful response", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ choices: [{ message: { content: "  groceries, milk , eggs" } }] }),
    } as Response);

    const tags = await generateTags("Some long note content.");

    expect(tags).toEqual(["groceries", "milk", "eggs"]);
    expect(global.fetch).toHaveBeenCalledWith(
      "https://api.groq.com/openai/v1/chat/completions",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({ Authorization: "Bearer test-api-key" }),
      }),
    );
  });

  it("throws GroqApiError when GROQ_API_KEY is not configured", async () => {
    delete process.env.GROQ_API_KEY;
    global.fetch = vi.fn();

    await expect(generateTags("content")).rejects.toThrow(GroqApiError);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("throws GroqApiError when the request fails (network error)", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("network down"));

    await expect(generateTags("content")).rejects.toThrow(GroqApiError);
  });

  it("throws GroqApiError when the response is not ok (e.g. rate limit)", async () => {
    global.fetch = vi.fn().mockResolvedValue({ ok: false, status: 429 } as Response);

    await expect(generateTags("content")).rejects.toThrow(GroqApiError);
  });

  it("throws GroqApiError when the response is malformed", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({}),
    } as Response);

    await expect(generateTags("content")).rejects.toThrow(GroqApiError);
  });

  it("throws GroqApiError when the response contains no usable tags", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ choices: [{ message: { content: " , , " } }] }),
    } as Response);

    await expect(generateTags("content")).rejects.toThrow(GroqApiError);
  });

  it("throws GroqApiError when the response body isn't valid JSON", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.reject(new SyntaxError("Unexpected token")),
    } as unknown as Response);

    await expect(generateTags("content")).rejects.toThrow(GroqApiError);
  });

  it("throws GroqApiError when the request times out", async () => {
    global.fetch = vi.fn().mockImplementation(() => {
      const error = new Error("The operation was aborted");
      error.name = "TimeoutError";
      return Promise.reject(error);
    });

    await expect(generateTags("content")).rejects.toThrow(GroqApiError);
  });
});
