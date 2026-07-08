"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import type { Note } from "@prisma/client";

export function NoteDetail({ note }: { note: Note }) {
  const router = useRouter();
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSave(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const response = await fetch(`/api/notes/${note.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    });

    if (!response.ok) {
      const body = await response.json();
      setError(body.error ?? "Something went wrong");
      setSubmitting(false);
      return;
    }

    router.refresh();
    setSubmitting(false);
  }

  async function handleDelete() {
    if (!window.confirm("Delete this note? This can't be undone.")) {
      return;
    }

    setSubmitting(true);
    setError(null);

    const response = await fetch(`/api/notes/${note.id}`, { method: "DELETE" });

    if (!response.ok) {
      const body = await response.json();
      setError(body.error ?? "Something went wrong");
      setSubmitting(false);
      return;
    }

    router.push("/");
    router.refresh();
  }

  return (
    <main>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Edit Note</h1>
        <button
          onClick={handleDelete}
          disabled={submitting}
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
          disabled={submitting}
          className="rounded bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700 disabled:opacity-50"
        >
          Save Changes
        </button>
      </form>
    </main>
  );
}
