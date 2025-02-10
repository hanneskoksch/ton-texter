import { db } from "@/db";
import { logMessage } from "@/lib/cloudwatch-logs/utils";
import { TranscriptStatus } from "@prisma/client";

/**
 * Triggers the transcription service endpoint to start transcribing audio files
 */
export const startTranscription = async ({
  userId,
  newTranscriptId,
}: {
  userId: string;
  newTranscriptId: string;
}) => {
  // Gather metrics
  const result = await db.transcript.aggregate({
    _count: { id: true },
    _sum: { audioDuration: true },
    where: { status: "PENDING" },
  });

  const allPendingTranscriptsCount = result._count.id || 0;
  const allPendingTranscriptsDuration = result._sum.audioDuration || 0;

  logMessage(`Transcription triggered ${userId}.${newTranscriptId}`, "Info");

  fetch(
    "https://hzjgd3yz9g.execute-api.eu-central-1.amazonaws.com/dev/start_transcription?" +
      new URLSearchParams({
        key: process.env.TRANSCRIPTION_SERVICE_API_KEY,
        total_duration: allPendingTranscriptsDuration.toString(),
        total_files: allPendingTranscriptsCount.toString(),
        logging_triggering_user_id: userId,
        logging_triggering_transcript_id: newTranscriptId,
      }).toString(),
  );
};

/**
 * Finds and resets unhealthy transcripts and triggers transcription again.
 * Transcripts are considered unhealthy if they have not been updated in the last 30 seconds.
 *
 * If a transcript has been reseted and has a retryAfterError value greater than 0,
 * it will be marked as failed and will not be retried again.
 */
export const resetUnhealthyTranscripts = async () => {
  const unhealthyTranscripts = await db.transcript.updateManyAndReturn({
    where: {
      status: {
        in: [
          TranscriptStatus.PROCESSING,
          TranscriptStatus.SPEAKER_DIARIZATION,
          TranscriptStatus.TRANSCRIPTION,
        ],
      },
      heartbeat: {
        lt: new Date(Date.now() - 30 * 1000),
      },
      retryAfterError: {
        lt: 1,
      },
    },
    data: {
      status: TranscriptStatus.PENDING,
      heartbeat: null,
      speakerDiarizationProgress: 0,
      transcriptionProgress: 0,
      retryAfterError: {
        increment: 1,
      },
    },
  });

  if (unhealthyTranscripts.length > 0) {
    logMessage(
      `Found ${unhealthyTranscripts.length} unhealthy transcripts: ${unhealthyTranscripts.map((t) => t.id)}`,
      "Warning", // Todo: Maybe change to just "Info"
    );

    await startTranscription({
      // Send data in new transcription trigger about the first unhealthy transcript
      userId: unhealthyTranscripts[0].userId.toString(),
      newTranscriptId: unhealthyTranscripts[0].id,
    });
  }

  const unhealthyTranscriptsRetried = await db.transcript.updateManyAndReturn({
    where: {
      status: {
        in: [
          TranscriptStatus.PROCESSING,
          TranscriptStatus.SPEAKER_DIARIZATION,
          TranscriptStatus.TRANSCRIPTION,
        ],
      },
      heartbeat: {
        lt: new Date(Date.now() - 30 * 1000),
      },
      retryAfterError: {
        gte: 1,
      },
    },
    data: {
      status: TranscriptStatus.FAILED,
    },
  });

  if (unhealthyTranscriptsRetried.length > 0) {
    logMessage(
      `Found ${unhealthyTranscriptsRetried.length} unhealthy retried transcripts: ${unhealthyTranscriptsRetried.map((t) => t.id)}`,
      "Warning", // Todo: Or maybe change to "Error"
    );
  }

  return unhealthyTranscripts;
};
