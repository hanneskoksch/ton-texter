import { db } from "@/db";
import { deleteS3OriginalAudio } from "@/lib/s3/utils";
import { TranscriptStatus } from "@prisma/client";
import { type NextRequest } from "next/server";

interface PageProps {
  params: Promise<{
    transcriptId: string;
  }>;
}

export async function POST(request: NextRequest, props: PageProps) {
  const params = await props.params;
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
  const transcriptStatusString: string | undefined = body.status;

  // If no status id provided, return 400
  if (transcriptStatusString === undefined) {
    return new Response("No status provided.", { status: 400 });
  }

  // Check if status is valid
  if (!(transcriptStatusString in TranscriptStatus)) {
    return new Response("Invalid status provided.", { status: 400 });
  }

  // Convert status to enum
  const transcriptStatus = transcriptStatusString as TranscriptStatus;

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

  if (transcriptStatus === TranscriptStatus.SUCCESS) {
    deleteS3OriginalAudio({
      key: updatedTranscript.fileNameWithExt,
    });
  }

  // Return updated transcript
  return Response.json({ updatedTranscript });
}
