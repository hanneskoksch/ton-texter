import { db } from "@/db";
import { TranscriptStatus } from "@prisma/client";
import { type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  // Check API key
  const searchParams = request.nextUrl.searchParams;
  const apiKey = searchParams.get("key");

  if (!apiKey) {
    return new Response("No API key provided.", { status: 401 });
  }

  if (process.env.TRANSCRIPTION_SERVICE_API_KEY !== apiKey) {
    return new Response("Invalid API key.", { status: 401 });
  }

  // Check for filter and get transcripts
  const filter = searchParams.get("filter");
  let transcripts;
  if (filter) {
    if (!(filter in TranscriptStatus)) {
      return new Response("Invalid filter.", { status: 400 });
    }
    const filterEnum: TranscriptStatus = filter as TranscriptStatus;
    transcripts = await db.transcript.findMany({
      where: {
        status: filterEnum,
      },
    });
  } else {
    transcripts = await db.transcript.findMany();
  }

  // Return transcripts
  return Response.json({ transcripts });
}
