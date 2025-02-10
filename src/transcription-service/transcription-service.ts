import { db } from "@/db";
import { logMessage } from "@/lib/cloudwatch-logs/utils";

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
