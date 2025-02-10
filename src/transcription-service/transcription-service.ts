import { db } from "@/db";
import { logMessage } from "@/lib/cloudwatch-logs/utils";
import { Prisma, PrismaClient, TranscriptStatus } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";

/**
 * Triggers the transcription service endpoint to start machines transcribing audio files.
 *
 * @param userId - The user ID that triggered the transcription (for logging purposes).
 * @param newTranscriptId - The ID of the transcript that was created (for logging purposes).
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
 * Statuses that are considered when checking for unhealthy transcripts.
 */
const statusesToMonitorInHealthChecks = [
  TranscriptStatus.FORWARDED,
  TranscriptStatus.PROCESSING,
  TranscriptStatus.SPEAKER_DIARIZATION,
  TranscriptStatus.TRANSCRIPTION,
];

/**
 * Finds and unhealthy transcripts.
 * Transcripts are considered unhealthy if they have not been updated in the last 30 seconds.
 * @returns Unhealthy transcripts.
 */
export const getUnhealthyTranscript = async () => {
  return await db.transcript.findMany({
    where: {
      status: {
        in: statusesToMonitorInHealthChecks,
      },
      heartbeat: {
        lt: new Date(Date.now() - 30 * 1000),
      },
    },
  });
};

/**
 * Finds and resets unhealthy transcripts.
 * Transcripts are considered unhealthy if they have not been updated in the last 30 seconds.
 *
 * If a transcript has been reset and has a retryAfterError value greater than 0,
 * it will be marked as failed and will not be retried again.
 *
 * @param prisma - Prisma client instance from transaction.
 * @returns Unhealthy transcripts that have been reset.
 */
export const resetUnhealthyTranscripts = async (
  prisma: Omit<
    PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
    "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
  >,
) => {
  const unhealthyTranscripts = await prisma.transcript.updateManyAndReturn({
    where: {
      status: {
        in: statusesToMonitorInHealthChecks,
      },
      heartbeat: {
        lt: new Date(Date.now() - 30 * 1000),
      },
      retryAfterError: 0,
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
  }

  const unhealthyTranscriptsRetried =
    await prisma.transcript.updateManyAndReturn({
      where: {
        status: {
          in: statusesToMonitorInHealthChecks,
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
