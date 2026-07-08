import { notFound } from "next/navigation";
import { getNote } from "@/lib/notes";
import { NoteDetail } from "./NoteDetail";

export const dynamic = "force-dynamic";

export default async function NoteDetailPage({ params }: { params: { id: string } }) {
  const note = await getNote(params.id);

  if (!note) {
    notFound();
  }

  return <NoteDetail note={note} />;
}
