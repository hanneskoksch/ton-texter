import { db } from "@/db";
import { TranscriptStatus } from "@prisma/client";
import { type NextRequest } from "next/server";
import { checkApiKey } from "../security";

export async function GET(request: NextRequest) {
  checkApiKey(request);

  // Check for filter and get transcripts
  const searchParams = request.nextUrl.searchParams;
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
