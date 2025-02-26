import { db } from "@/db";
import { logMessage } from "@/lib/cloudwatch-logs/utils";
import { deleteS3OriginalAudio } from "@/lib/s3/utils";
import { TranscriptStatus } from "@prisma/client";
import { type NextRequest } from "next/server";
import { checkApiKey } from "../security";

interface PageProps {
  params: Promise<{
    transcriptId: string;
  }>;
}

/**
 * Update the status of a transcript.
 * This endpoint is used by the worker / the transcription service.
 */
export async function POST(request: NextRequest, props: PageProps) {
  checkApiKey(request);

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
  const params = await props.params;
  const transcriptId = params.transcriptId;

  // Get optional paramters from body
  const transcriptPreview: string | undefined = body.preview;
  const speakerDiarizationProgress: number | undefined =
    body.speakerDiarizationProgress;
  const transcriptionProgress: number | undefined = body.transcriptionProgress;

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

  logMessage(
    `POST /api/transcript/${transcriptId} status: ${transcriptStatus} sd_pgs: ${speakerDiarizationProgress} t_pgs: ${transcriptionProgress}`,
    "Info",
  );

  // Update transcript status and optionally preview
  const updatedTranscript = await db.transcript.update({
    where: {
      id: transcriptId,
    },
    data: {
      status: transcriptStatus,
      preview: transcriptPreview,
      speakerDiarizationProgress: speakerDiarizationProgress,
      transcriptionProgress: transcriptionProgress,
      // Set heartbeat if transcript is still in a processing state
      ...((transcriptStatus === TranscriptStatus.PROCESSING ||
        transcriptStatus === TranscriptStatus.SPEAKER_DIARIZATION ||
        transcriptStatus === TranscriptStatus.TRANSCRIPTION) && {
        heartbeat: new Date(),
      }),
    },
  });

  // Delete original audio if transcript was successful
  if (transcriptStatus === TranscriptStatus.SUCCESS) {
    deleteS3OriginalAudio({
      key: updatedTranscript.fileNameWithExt,
    });
  }

  // Return updated transcript
  return Response.json({ updatedTranscript });
}
