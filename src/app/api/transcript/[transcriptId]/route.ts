import { db } from "@/db";
import { TranscriptStatus } from "@prisma/client";
import { type NextRequest } from "next/server";

interface PageProps {
  params: {
    transcriptId: string;
  };
}

export async function POST(request: NextRequest, { params }: PageProps) {
  // Check API key
  const searchParams = request.nextUrl.searchParams;
  const apiKey = searchParams.get("key");

  if (!apiKey) {
    return new Response("No API key provided.", { status: 401 });
  }

  if (process.env.TRANSCRIPTION_SERVICE_API_KEY !== apiKey) {
    return new Response("Invalid API key.", { status: 401 });
  }

  // Parse data from request body
  let body;
  try {
    body = await request.json();
  } catch (e) {
    return new Response("Invalid JSON body provided.", { status: 400 });
  }

  // Get status id from body
  const transcriptStatusId: number | undefined = body.status;

  // If no status id provided, return 400
  if (!transcriptStatusId) {
    return new Response("No status provided.", { status: 400 });
  }

  // Get status from status id
  let transcriptStatus;
  switch (transcriptStatusId) {
    case 0:
      transcriptStatus = TranscriptStatus.PENDING;
      break;
    case 1:
      transcriptStatus = TranscriptStatus.PROCESSING;
      break;
    case 2:
      transcriptStatus = TranscriptStatus.FAILED;
      break;
    case 3:
      transcriptStatus = TranscriptStatus.SUCCESS;
      break;
    default:
      return new Response("Invalid status provided.", { status: 400 });
  }

  // Get transcript id from params
  const transcriptId = params.transcriptId;

  // Get optional transcript preview from body
  const transcriptPreview: string | undefined = body.preview;

  // Check if transcript exists
  const file = await db.transcript.findFirst({
    where: {
      id: transcriptId,
    },
  });

  // If transcript does not exist, return 404
  if (!file) {
    return new Response("Transcript not found.", { status: 404 });
  }

  // Update transcript status and optinally preview
  const updatedTranscript = await db.transcript.update({
    where: {
      id: transcriptId,
    },
    data: {
      status: transcriptStatus,
      preview: transcriptPreview,
    },
  });

  // Return updated transcript
  return Response.json({ updatedTranscript });
}
