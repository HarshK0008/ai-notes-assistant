import { NextRequest, NextResponse } from "next/server";
import { deleteNote, getNote, NotFoundError, updateNote, ValidationError } from "@/lib/notes";

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  const note = await getNote(params.id);
  if (!note) {
    return NextResponse.json({ error: "Note not found" }, { status: 404 });
  }
  return NextResponse.json(note);
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json();

  try {
    const note = await updateNote(params.id, { title: body.title, content: body.content });
    return NextResponse.json(note);
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    if (error instanceof NotFoundError) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    throw error;
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await deleteNote(params.id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof NotFoundError) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    throw error;
  }
}
