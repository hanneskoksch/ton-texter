import { db } from "@/db";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const apiKey = searchParams.get("key");

  if (!apiKey) {
    return new Response("No API key provided.", { status: 401 });
  }

  if (process.env.TRANSCRIPTION_SERVICE_API_KEY !== apiKey) {
    return new Response("Invalid API key.", { status: 401 });
  }

  const transcripts = await db.transcript.findMany();
  return Response.json({ transcripts });
}