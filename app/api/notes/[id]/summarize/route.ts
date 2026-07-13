import { NextRequest, NextResponse } from "next/server";
import { GroqApiError } from "@/lib/groq";
import { NotFoundError, summarizeNote, ValidationError } from "@/lib/notes";

export async function POST(_request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const note = await summarizeNote(params.id);
    return NextResponse.json(note);
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }
    if (error instanceof NotFoundError) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }
    if (error instanceof GroqApiError) {
      return NextResponse.json({ error: error.message }, { status: 502 });
    }
    throw error;
  }
}
