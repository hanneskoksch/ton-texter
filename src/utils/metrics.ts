import { db } from "@/db";
import { logMessage } from "@/lib/cloudwatch-logs/utils";
import { logQueueMetrics } from "@/lib/cloudwatch/utils";
import { TranscriptStatus } from "@prisma/client";

/**
 * Sends queue metrics for pending transcripts to AWS CloudWatch.
 *
 * This function:
 * - Aggregates the count and total audio duration of pending transcripts from the database.
 * - Logs these metrics to CloudWatch using `logQueueMetrics`.
 * - Catches and logs any errors encountered during the process.
 */
export async function sendQueueMetricsToCloudwatch() {
  try {
    const result = await db.transcript.aggregate({
      _count: { id: true },
      _sum: { audioDuration: true },
      where: { status: TranscriptStatus.PENDING },
    });

    const allPendingTranscriptsCount = result._count.id;
    const allPendingTranscriptsDuration = result._sum.audioDuration || 0;

    await logQueueMetrics(
      allPendingTranscriptsCount,
      allPendingTranscriptsDuration,
    );
  } catch (error) {
    logMessage(
      "Error processing metric or sending CloudWatch data:\n" + error,
      "Error",
    );
  }
}
