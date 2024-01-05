import { db } from "@/db";
import { TranscriptStatus } from "@prisma/client";
import { type NextRequest } from "next/server";

interface PageProps {
  params: {
    transcriptId: string;
  };
}

export async function POST(request: NextRequest, { params }: PageProps) {
  const { searchParams } = new URL(request.url);
  const apiKey = searchParams.get("key");
  const transcriptStatusId = searchParams.get("status");
  const transcriptId = params.transcriptId;

  if (!apiKey) {
    return new Response("No API key provided.", { status: 401 });
  }

  if (process.env.TRANSCRIPTION_SERVICE_API_KEY !== apiKey) {
    return new Response("Invalid API key.", { status: 401 });
  }

  if (!transcriptStatusId) {
    return new Response("No status provided.", { status: 400 });
  }

  let transcriptStatus;
  switch (transcriptStatusId) {
    case "0":
      transcriptStatus = TranscriptStatus.PENDING;
      break;
    case "1":
      transcriptStatus = TranscriptStatus.PROCESSING;
      break;
    case "2":
      transcriptStatus = TranscriptStatus.FAILED;
      break;
    case "3":
      transcriptStatus = TranscriptStatus.SUCCESS;
      break;
    default:
      return new Response("Invalid status provided.", { status: 400 });
  }

  const file = await db.transcript.findFirst({
    where: {
      id: transcriptId,
    },
  });

  if (!file) {
    return new Response("Transcript not found.", { status: 404 });
  }

  const updatedTranscript = await db.transcript.update({
    where: {
      id: transcriptId,
    },
    data: {
      status: transcriptStatus,
    },
  });

  return Response.json({ updatedTranscript });
}
