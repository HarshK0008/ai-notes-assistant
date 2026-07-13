"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import type { Note } from "@prisma/client";

export function NoteDetail({ note }: { note: Note }) {
  const router = useRouter();
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [summary, setSummary] = useState(note.summary);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [summarizing, setSummarizing] = useState(false);

  async function handleSave(event: FormEvent) {
    event.preventDefault();

    if (summary && content !== note.content) {
      const proceed = window.confirm(
        "Saving will change this note's content. The existing summary won't update automatically and may no longer match. Continue?",
      );
      if (!proceed) {
        return;
      }
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/notes/${note.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (!response.ok) {
        const body = await response.json();
        setError(body.error ?? "Something went wrong");
        return;
      }

      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleDelete() {
    if (!window.confirm("Delete this note? This can't be undone.")) {
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/notes/${note.id}`, { method: "DELETE" });

      if (!response.ok) {
        const body = await response.json();
        setError(body.error ?? "Something went wrong");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSummarize() {
    setSummarizing(true);
    setError(null);

    try {
      const response = await fetch(`/api/notes/${note.id}/summarize`, { method: "POST" });
      const body = await response.json();

      if (!response.ok) {
        setError(body.error ?? "Something went wrong");
        return;
      }

      setSummary(body.summary);
    } catch {
      setError("Something went wrong");
    } finally {
      setSummarizing(false);
    }
  }

  return (
    <main>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Edit Note</h1>
        <button
          onClick={handleDelete}
          disabled={submitting || summarizing}
          className="rounded border border-red-300 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
        >
          Delete
        </button>
      </div>
      <form onSubmit={handleSave} className="space-y-4">
        <div>
          <label htmlFor="title" className="mb-1 block text-sm font-medium">
            Title
          </label>
          <input
            id="title"
            className="w-full rounded border border-gray-300 px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content" className="mb-1 block text-sm font-medium">
            Content
          </label>
          <textarea
            id="content"
            className="h-40 w-full rounded border border-gray-300 px-3 py-2"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={submitting || summarizing}
          className="rounded bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700 disabled:opacity-50"
        >
          Save Changes
        </button>
      </form>
      <div className="mt-6 border-t border-gray-200 pt-6">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-sm font-medium">Summary</h2>
          <button
            onClick={handleSummarize}
            disabled={summarizing || submitting}
            className="rounded border border-gray-300 px-3 py-1.5 text-sm hover:bg-gray-50 disabled:opacity-50"
          >
            {summarizing ? "Summarizing..." : "Summarize"}
          </button>
        </div>
        {summary ? (
          <p className="text-sm text-gray-700">{summary}</p>
        ) : (
          <p className="text-sm text-gray-400">No summary yet.</p>
        )}
      </div>
    </main>
  );
}
