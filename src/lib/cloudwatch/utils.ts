import { PutMetricDataCommand } from "@aws-sdk/client-cloudwatch";
import { client } from "./client";

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
