const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";
const REQUEST_TIMEOUT_MS = 15_000;

export class GroqApiError extends Error {}

export async function summarizeText(content: string): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new GroqApiError("GROQ_API_KEY is not configured");
  }

  const timeout = AbortSignal.timeout(REQUEST_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(GROQ_API_URL, {
      method: "POST",
      signal: timeout,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          {
            role: "system",
            content:
              "Summarize the following note in 1-2 short sentences. Respond with only the summary text.",
          },
          { role: "user", content },
        ],
      }),
    });
  } catch (error) {
    if (error instanceof Error && error.name === "TimeoutError") {
      throw new GroqApiError("Groq API request timed out");
    }
    throw new GroqApiError("Failed to reach Groq API");
  }

  if (!response.ok) {
    throw new GroqApiError(`Groq API returned an error (status ${response.status})`);
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    throw new GroqApiError("Groq API returned a malformed response");
  }

  const summary = (data as { choices?: { message?: { content?: unknown } }[] })?.choices?.[0]?.message
    ?.content;
  if (typeof summary !== "string" || !summary.trim()) {
    throw new GroqApiError("Groq API returned a malformed response");
  }

  return summary.trim();
}

export async function generateTags(content: string): Promise<string[]> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new GroqApiError("GROQ_API_KEY is not configured");
  }

  const timeout = AbortSignal.timeout(REQUEST_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(GROQ_API_URL, {
      method: "POST",
      signal: timeout,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        messages: [
          {
            role: "system",
            content:
              "Suggest 3-5 short topical tags for the following note. Respond with only a comma-separated list of tags, no numbering or extra text.",
          },
          { role: "user", content },
        ],
      }),
    });
  } catch (error) {
    if (error instanceof Error && error.name === "TimeoutError") {
      throw new GroqApiError("Groq API request timed out");
    }
    throw new GroqApiError("Failed to reach Groq API");
  }

  if (!response.ok) {
    throw new GroqApiError(`Groq API returned an error (status ${response.status})`);
  }

  let data: unknown;
  try {
    data = await response.json();
  } catch {
    throw new GroqApiError("Groq API returned a malformed response");
  }

  const raw = (data as { choices?: { message?: { content?: unknown } }[] })?.choices?.[0]?.message
    ?.content;
  if (typeof raw !== "string" || !raw.trim()) {
    throw new GroqApiError("Groq API returned a malformed response");
  }

  const tags = raw
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);
  if (tags.length === 0) {
    throw new GroqApiError("Groq API returned a malformed response");
  }

  return tags;
}
