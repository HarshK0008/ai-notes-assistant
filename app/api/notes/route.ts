import { NextRequest, NextResponse } from "next/server";
import { createNote, listNotes, ValidationError } from "@/lib/notes";

export async function GET() {
  const notes = await listNotes();
  return NextResponse.json(notes);
}

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const note = await createNote({ title: body.title, content: body.content });
    return NextResponse.json(note, { status: 201 });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    throw error;
  }
}
