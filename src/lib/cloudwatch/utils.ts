import { PutMetricDataCommand } from "@aws-sdk/client-cloudwatch";
import { client } from "./client";

/**
 * Logs transcription queue metrics to AWS CloudWatch.
 *
 * This function:
 * - Sends metrics for the count and total duration of pending transcripts.
 * - Uses AWS CloudWatch to store and monitor these metrics.
 *
 * @param allPendingTranscriptsCount - The total number of pending transcripts.
 * @param allPendingTranscriptsDuration - The cumulative duration of pending transcripts in seconds.
 */
export const logQueueMetrics = async (
  allPendingTranscriptsCount: number,
  allPendingTranscriptsDuration: number,
) => {
  const command = new PutMetricDataCommand({
    Namespace: "Custom/TranscriptionMetrics",
    MetricData: [
      {
        MetricName: "PendingTranscriptsCount",
        Value: allPendingTranscriptsCount,
        Unit: "Count",
        Timestamp: new Date(),
      },
      {
        MetricName: "PendingTranscriptsDuration",
        Value: allPendingTranscriptsDuration,
        Unit: "Seconds",
        Timestamp: new Date(),
      },
    ],
  });
  await client.send(command);
};
