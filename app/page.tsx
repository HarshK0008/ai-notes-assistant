import Link from "next/link";
import { listNotes } from "@/lib/notes";

export const dynamic = "force-dynamic";

export default async function NotesListPage() {
  const notes = await listNotes();

  return (
    <main>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Notes</h1>
        <Link
          href="/notes/new"
          className="rounded bg-gray-900 px-3 py-1.5 text-sm text-white hover:bg-gray-700"
        >
          + New Note
        </Link>
      </div>

      {notes.length === 0 ? (
        <p className="text-gray-500">No notes yet. Create your first one.</p>
      ) : (
        <ul className="space-y-2">
          {notes.map((note) => (
            <li key={note.id}>
              <Link
                href={`/notes/${note.id}`}
                className="block rounded border border-gray-200 bg-white px-4 py-3 hover:border-gray-400"
              >
                <div className="font-medium">{note.title}</div>
                <div className="text-xs text-gray-500">
                  {new Date(note.createdAt).toLocaleString()}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
